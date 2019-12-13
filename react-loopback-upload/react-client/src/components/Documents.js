import React, { Component } from 'react';
import FileDrop from 'react-file-drop';
import axios from 'axios';
import { Progress } from 'reactstrap';

// defined in .env.development and .env.production
const API_URL = process.env.REACT_APP_API_URL;

class Documents extends Component {

  state = {
    resourceList: [],
    uploadList: {},
  }

  handleDrop = async (files, event) => {
    try {
      console.log(files, event);
  
      let promiseArray = [];
      
      // upload files individually
      for(let i = 0; i < files.length; i++) {
        const file = files[i];
        const id = Date.now()+i;

        const config = {
          onUploadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            // update state on 5% increments
            if(percentCompleted % 5 === 0) {
              console.log(percentCompleted)
              this.setState(prevState => {
                let uploadList = prevState.uploadList;
                uploadList[id] = {
                  name: file.name,
                  size: file.size,
                  progress: percentCompleted
                }

                return { uploadList: uploadList }
              })
            }
          }
        }
        
        let data = new FormData();
        data.append('doc', file);

        promiseArray.push(axios.post(`${API_URL}Documents/upoad-docs`, data, config))
      }
    
      const results = await Promise.all(promiseArray);
      console.log(results);
      
      this.setState({ uploadList: {} });

      let newResourceList = [];
      for(let j = 0; j < results.length; j++) {
        const result = results[j];
        const data = result.data.result.data;
        if(result.data.result.statusCode === 200) {
          newResourceList.push({
            name: data.name,
            original_name: data.original_name,
            size: data.size,
            id: data.id
          })
        }
      }

      this.setState(prevState => {
        let resourceList = prevState.resourceList;
        resourceList = [...resourceList, ...newResourceList];
        return { resourceList }
      })
    } catch(e) {
      console.log(e)
    }
  }

  listResources = () => {
    return this.state.resourceList.map((resource, i) => {
      return (
        <li key={i}>
          <div>{resource.original_name}</div>
          <div>{resource.size}</div>
        </li>
      )
    })
  }

  listUploads = () => {
    const uploadList = Object.values(this.state.uploadList);
    return uploadList.map((resource, i) => {
      return (
        <li key={i}>
          <div>{resource.name}</div>
          <div><Progress value={resource.progress} /></div>
        </li>
      )
    })
  }

  render() {
    const styles = { border: '1px solid black', color: 'black', padding: '10vh' };

    return (
      <div className="row">
        <div className="col-6">
          <div id="react-file-drop-demo" style={styles}>
            <FileDrop onDrop={this.handleDrop}>
              Drop some files here!
            </FileDrop>
          </div>
        </div>
        <div className="col-6">
          <h3>Resources</h3>
          <ul>
            {this.listUploads()}
            {this.listResources()}
          </ul>
        </div>
      </div>
    )
  }

}

export default Documents;
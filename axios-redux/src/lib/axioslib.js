import axios from 'axios';

const Axioslib = axios.create({
  baseURL : process.env.REACT_APP_LOCAL_URL
});

export default Axioslib;
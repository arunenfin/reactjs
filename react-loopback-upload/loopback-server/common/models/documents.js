'use strict';
const multer  = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + ext)
  }
})

function fileFilter (req, file, cb) {
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted
 
  const ext = path.extname(file.originalname);

  if(['.docx', '.doc', '.pdf', '.jpg', '.jpeg'].indexOf(ext) === -1) {  
    // To reject this file pass `false`, like so:
    return cb(null, false)
  }

  // To accept the file pass `true`, like so:
  cb(null, true)
}
 
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('doc');

const uploadPromise = (req, res) => {
  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err) { return reject(err) }
  
      resolve(req.file);
    })
  })
}

module.exports = function(Documents) {
  Documents.fileUpload = async (req, res) => {
    try {

      const file = await uploadPromise(req, res);

      console.log(file);

      const result = await Documents.create({
        name: file.filename,
        original_name: file.originalname,
        size: file.size,
      })

      return {
        data: result,
        status: 'success',
        statusCode: 200,
        message: "Successful",
      }
    } catch(e) {
      return {
        data: [],
        status: 'failure',
        statusCode: 400,
        message: "Failure",
      }
    }
  };

  Documents.remoteMethod('fileUpload', {
      accepts: [
        {arg: 'req', type: 'object', 'http': {source: 'req'}},
        {arg: 'res', type: 'object', 'http': {source: 'res'}}
      ],
      returns: {
          arg: 'result',
          type: 'object'
      },
      http: {
          verb: 'post',
          path: '/upoad-docs'
      }
  })
};

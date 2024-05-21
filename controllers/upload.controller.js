// services/upload.service.js
const s3 = require('../aws-config');

const uploadFileToS3 = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject('No file uploaded.');
    }

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: Date.now() + '-' + file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        return reject('Error uploading file: ' + err);
      }
      resolve(data.Location);
    });
  });
};

module.exports = { uploadFileToS3 };

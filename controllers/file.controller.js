const AWS = require('aws-sdk');

const axios = require('axios');
const fs = require('fs');
const { createPresignedPost } = require('../util/s3');
// Configure AWS credentials
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-west-2' // e.g., 'us-east-1'
});

const s3 = new AWS.S3();

const uploadFile = async (signedUrl, filePath) => {
    try {
        const fileStream = fs.createReadStream(filePath);
        const response = await axios.put(signedUrl, fileStream, {
            headers: {
                'Content-Type': 'image/jpg' // Set the appropriate content type for your file
            }
        });

        console.log('File uploaded successfully:', response.data);
    } catch (err) {
        console.error('Error uploading file:', err);
    }
};

// Function to generate a signed URL
const generateSignedUrl = async (bucketName, objectKey) => {
    const params = {
        Bucket: bucketName,
        Key: objectKey,
        Expires: 300, // Expiration time in seconds (e.g., 5 minutes)
        // ContentType: 'image/jpg', // Set the appropriate content type for your file
        ACL: 'bucket-owner-full-control' // Set the desired access control list
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);
        return url;
    } catch (err) {
        console.error('Error generating signed URL:', err);
        throw err;
    }
};

const signedUrlFunction = async (req, res) => {
    try {
        let {key, content_type} = req.body;
        key = 'public/' + key;
        const data = await createPresignedPost({key, contentType: content_type})
        return res.send({
            status: 'success',
            data,
        })

    } catch(err) {

        console.error(err)
        return res.status(500).send({
            status: 'error',
            message: err.message,
        })
    }
}
module.exports = {signedUrlFunction,generateSignedUrl};

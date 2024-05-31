// const axios = require('axios');
// const multer = require('multer');
// const generateSignedUrl = require('../util/s3');

// // Configure multer for file upload
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const imageController = async (req, res) => {
//     try {
//         console.log("req:",req.file)
//         console.log("body:",req.body)
//         if (!req.file) {
//             return res.status(400).json({ error: 'File is required' });
//         }
//         const maxFileSize = 5 * 1024 * 1024; // 5MB
//         if (req.file.size > maxFileSize) {
//             return res.status(400).json({ error: 'File size exceeds the limit of 5MB' });
//         }
//         const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
//         if (!allowedTypes.includes(req.file.mimetype)) {
//             return res.status(400).json({ error: 'Invalid file type' });
//         }
//         let url;
//         try {
//             url = await generateSignedUrl();

//         } catch (error) {
//             res.status(200).json({message:error.message})
//         }
//         const responseData = await uploadFile(url, req.file); // Pass the uploaded file to uploadFile function
//         res.status(200).json({ url: responseData.url });
//     } catch (error) {
//         console.error('Error in imageController:', error);
//         res.status(500).json({ error: 'Failed to upload file' });
//     }
// };

// const uploadFile = async (url, file) => {
//     try {
//         const response = await axios.put(url, file.buffer, {
//             headers: {
//                 'Content-Type': file.mimetype,
//             }
//         });
//         if(response.status === 200){
//             throw new Error(`Failed to upload file. Status: ${response.status}, Message:${response.statusText}`);
//         }
//         console.log(response.data);
//         return { url: url }; // Return the URL where the file is uploaded
//     } catch (error) {
//         console.error('Error in uploadFile:', error);
//         throw new Error('Failed to upload file');
//     }
// };

// module.exports = {
//     imageController,
//     uploadMiddleware: upload.single('file')
// };




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
        ContentType: 'image/jpg', // Set the appropriate content type for your file
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
module.exports = signedUrlFunction;
// try {
//     // Validate the request data
//     console.log(req.file)
//     if (!req.file) {
//         return res.status(400).json({ error: 'File is required' });
//     }

//     // Generate a signed URL for the file upload
//     const bucketName = 'crestwood-file';
//     const objectKey = `path/to/${req.file.originalname}`;
//     const signedUrl = await generateSignedUrl(bucketName, objectKey);

//     // Upload the file to S3 using the signed URL
//     await uploadFile(signedUrl, req.file.path);

//     // Return a success response
//     res.status(200).json({ message: 'File uploaded successfully' });
// } catch (err) {
//     console.error('Error uploading file:', err);
//     res.status(500).json({ error: 'Failed to upload file' });
// }

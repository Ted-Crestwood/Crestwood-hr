const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:process.env.AWS_REGION
})
const s3 = new AWS.S3();

const generateSignedUrl = async(fileName,expirationTimeInSeconds,fileStream,type)=>{
    const params = {
        Bucket:process.env.BUCKET_NAME,
        Key:fileName,
        Body:fileStream,
        Expires:expirationTimeInSeconds
    }
    try {
        const url = await s3.getSignedUrl(type, params)
        return url;
    } catch (error) {
        console.error(error.message)
    }

}
module.exports = generateSignedUrl;
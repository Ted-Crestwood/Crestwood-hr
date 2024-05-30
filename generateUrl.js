const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId:process.env.AWS_ACCESS_KEY,
    secretAccessKey:process.env.AWS_SECRET_KEY,
    region:process.env.AWS_REGION
})
const s3 = new AWS.S3();

const generateSignedUrl = (fileName,expirationTimeInSeconds)=>{
    const params = {
        Bucket:process.env.BUCKET_NAME,
        Key:fileName,
        Expires:expirationTimeInSeconds
    }
    return new Promise((resolve,reject)=>{
        s3.getSignedUrl('putObject', params,(err,url)=>{
            if(err){
                reject(err)
            }else{
                resolve(url)
            }
        })
    })
}
module.exports = generateSignedUrl;
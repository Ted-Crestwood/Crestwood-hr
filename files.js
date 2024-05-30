const AWS = require('aws-sdk')

AWS.config.update({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    }
});
// const bucketName = `cover-letter-${Date.now()}`;
const s3 = new AWS.S3();
async function main() {
    try {
        const url = await s3.getSignedUrlPromise('getObject',{
            Bucket:process.env.BUCKET_NAME,
            Key:'logo.png',
            Expires:60
        })
        console.log('url :',url)
    } catch (error) {

    }
}
main()
module.exports = { main };
//   await s3Client.send(
//     new CreateBucketCommand({
//       Bucket: bucketName,
//     })
//   );

//   await s3Client.send(
//     new PutObjectCommand({
//       Bucket: bucketName,
//       Key: "new.pdf",
//       Body: data,
//     })
//   );


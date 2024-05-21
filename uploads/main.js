const { S3Client, CreateBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

async function main() {
    const s3Client = new S3Client({
        region:"eu-north-1",
        credentials:{
            accessKeyId:process.env.AWS_ACCESS_KEY,
            secretAccessKey:process.env.AWS_SECRET_KEY,
        }
    });
    const bucketName = `main-bucket-${Date.now()}`;
    await s3Client.send(
      new CreateBucketCommand({
        Bucket: bucketName,
      })
    );
  
    // Put an object into an Amazon S3 bucket.
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: "my-main-object.txt",
        Body: "Hello JavaScript SDK!",
      })
    );
  }
  module.exports = { main };
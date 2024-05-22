const { S3Client, CreateBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');
// const { S3 } = require('aws-sdk');
// const { Upload } = require("@aws-sdk/lib-storage");

async function main(data) {
  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    }
  });
  const bucketName = `wed-bucket-${Date.now()}`;
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
      Body: data,
    })
  );
}
module.exports = { main };



  // try {
  //   const parallelUploads3 = new Upload({
  //     client: s3Client,
  //     params: { Bucket:'bucketName', Key:"my.pdf", Body:data },
  //   });

  //   parallelUploads3.on("httpUploadProgress", (progress) => {
  //     console.log(progress);
  //   });

  //   await parallelUploads3.done();
  //   console.log('Upload complete')
  // } catch (e) {
  //   console.log('Error',e);
  // }
const { S3Client, CreateBucketCommand, PutObjectCommand } = require('@aws-sdk/client-s3');


async function main(data) {
  const s3Client = new S3Client({
    region: "eu-north-1",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    }
  });
  const bucketName = `cover-letter-${Date.now()}`;
  await s3Client.send(
    new CreateBucketCommand({
      Bucket: bucketName,
    })
  );

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: "new.pdf",
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
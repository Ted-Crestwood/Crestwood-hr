

const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const configs = require("../config/index");

const s3 = new S3Client({
    region: configs.AWS.Region,
    credentials: {
        accessKeyId: configs.AWS.AccessKeyId,
        secretAccessKey: configs.AWS.AWSSecretKey
    }
});

const BUCKET_NAME = configs.AWS.BucketName;

async function createPresignedPost({ key, contentType }) {

    const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        ContentType: contentType,
    });

    const fileLink = `https://${BUCKET_NAME}.s3.${configs.AWS.Region}.amazonaws.com/${key}`

    const signedUrl = await getSignedUrl(s3, command, {
        expiresIn: 5 * 60, // 5 minutes - default is 15 mins
    });

    return { fileLink, signedUrl };
}

module.exports = { createPresignedPost };

// const generateSignedUrl = require("../generateUrl");

// const uploadFileToS3 = async (req, res) => {
//   const file = req.file;
//   const fileName = req.body;
//   if (!file) {
//     return res.status(400).json({ message: 'No file uploaded' })
//   }
//   const fileStream = fs.createReadStream(file.path);
//   const expirationTimeInSeconds = 30 * 6;
//   const type = req.query.type === "get" ? "getObject" : "putObject";
//  const url = await generateSignedUrl(fileStream, expirationTimeInSeconds, fileName, type)
//  res.send(url)
//  console.log('url :',url)
// };

// module.exports = { uploadFileToS3 };

const { PutObjectCommand, GetObjectCommand, S3Client } = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-providers');
const { HttpRequest } = require('@smithy/protocol-http');
const { getSignedUrl, S3RequestPresigner } = require('@aws-sdk/s3-request-presigner');
const { parseUrl } = require('@smithy/url-parser');
const { formatUrl } = require('@aws-sdk/util-format-url');
const { Hash } = require('@smithy/hash-node');

const REGION = process.env.AWS_REGION;
const BUCKET = process.env.BUCKET_NAME;

const createPresignedUrlWithoutClient = async ({ region, bucket, key, method }) => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region,
    sha256: Hash.bind(null, 'sha256'),
  });

  const signedUrlObject = await presigner.presign(new HttpRequest({ ...url, method }));
  return formatUrl(signedUrlObject);
};

const createPresignedUrlWithClient = ({ region, bucket, key, commandType }) => {
  const client = new S3Client({ region });
  const command = commandType === 'put'
    ? new PutObjectCommand({ Bucket: bucket, Key: key })
    : new GetObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};

// Endpoint to generate presigned URL for PUT using S3 client
const generateUrl= async (req, res) => {
  const { key } = req.query;
  console.log("bucket :", BUCKET)

  try {
    const url = await createPresignedUrlWithClient({
      region: REGION,
      bucket: process.env.BUCKET_NAME,
      key,
      commandType: 'put',
    });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to generate presigned URL for PUT without using S3 client
const generateUrlNoClient= async (req, res) => {
  const { key } = req.query;

  try {
    const url = await createPresignedUrlWithoutClient({
      region: REGION,
      bucket: BUCKET,
      key,
      method: 'PUT',
    });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to generate presigned URL for GET using S3 client
const generateUrlForGetWithS3 = async (req, res) => {
  const { key } = req.query;

  try {
    const url = await createPresignedUrlWithClient({
      region: REGION,
      bucket: BUCKET,
      key,
      commandType: 'get',
    });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Endpoint to generate presigned URL for GET without using S3 client
const generateUrlForGetWithoutS3= async (req, res) => {
  const { key } = req.query;

  try {
    const url = await createPresignedUrlWithoutClient({
      region: REGION,
      bucket: BUCKET,
      key,
      method: 'GET',
    });
    res.json({ url });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports ={generateUrl,generateUrlNoClient,generateUrlForGetWithS3,generateUrlForGetWithoutS3}
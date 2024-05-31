const https = require("https");
const { PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const { fromIni } = require("@aws-sdk/credential-providers");
const { HttpRequest } = require("@smithy/protocol-http");
const {
  getSignedUrl,
  S3RequestPresigner,
} = require("@aws-sdk/s3-request-presigner");
const { parseUrl } = require("@smithy/url-parser");
const { formatUrl } = require("@aws-sdk/util-format-url");
const { Hash } = require("@smithy/hash-node");

const createPresignedUrlWithoutClient = async ({ region, bucket, key }) => {
  const url = parseUrl(`https://${bucket}.s3.${region}.amazonaws.com/${key}`);
  const presigner = new S3RequestPresigner({
    credentials: fromIni(),
    region,
    sha256: Hash.bind(null, "sha256"),
  });

  const signedUrlObject = await presigner.presign(
    new HttpRequest({ ...url, method: "PUT" })
  );
  return formatUrl(signedUrlObject);
};

function put(url, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      { method: "PUT", headers: { "Content-Length": Buffer.byteLength(data) } },
      (res) => {
        let responseBody = "";
        res.on("data", (chunk) => {
          responseBody += chunk;
        });
        res.on("end", () => {
          resolve(responseBody);
        });
      }
    );
    req.on("error", (err) => {
      reject(err);
    });
    req.write(data);
    req.end();
  });
}

const main = async (req, res) => {
  const { KEY } = req.params;
  const REGION = "us-east-1";
  const BUCKET = process.env.BUCKET_NAME;

  try {
    console.log(`Generating presigned URL for bucket: ${BUCKET}, key: ${KEY}`);
    const noClientUrl = await createPresignedUrlWithoutClient({
      region: REGION,
      bucket: BUCKET,
      key: KEY,
    });
    // console.log(`Generated presigned URL: ${noClientUrl}`);

    // console.log(`Calling PUT using presigned URL without client`);
    const putResponse = await put(noClientUrl, "Hello World");
    // console.log(`PUT response: ${putResponse}`);

    res.send({ presignedUrl: noClientUrl });
    return 
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);
    res.status(500).send({ error: err.message });
  }
};

module.exports = { main };

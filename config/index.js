
const  loadConfig = require('load-config-file');

loadConfig({
    path: '.env.local'
})

const configs = {
    PORT: parseInt(process.env.PORT, 10) || 3010,
    AWS: {
        AccessKeyId: process.env.AWS_ACCESS_KEY,
        AWSSecretKey: process.env.AWS_SECRET_KEY,
        BucketName: process.env.BUCKET_NAME,
        Region: 'us-west-2',
    }
}

module.exports = configs
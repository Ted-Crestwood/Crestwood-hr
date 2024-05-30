
const uploadFileToS3 = (req,res) => {
const file = req.file;
if(!file){
  return res.status(400).json({message:'No file uploaded'})
}
const fileStream = fs.crrea
};

module.exports = { uploadFileToS3 };

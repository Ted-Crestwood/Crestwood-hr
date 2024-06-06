const { validateTurnstile } = require("../util/validateTurnstile");

const handleTurnstile =async(req,res)=>{
    const token = req.body['cf-turnstile-response'];

    const validationResult = await validateTurnstile(token);
  
    if (validationResult) {
    return  res.send('Validation successful!');
    } else {
      res.send('Validation failed!');
    }
}
module.exports = {handleTurnstile}
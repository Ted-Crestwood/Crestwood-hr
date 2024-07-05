// const { validateTurnstile } = require("../util/validateTurnstile");
// const axios = require('axios');
// const SECRET = process.env.TURNSTILE_SECRET_KEY
// const crypto = require('crypto');

// const handleTurnstile = async (req, res) => {
//   const {token} = req.body;

//   const validationResult = await validateTurnstile(token);

//   if (validationResult) {
//     return res.send('Validation successful!');
//   } else {
//     res.send('Validation failed!');
//   }
// }

// const handleTurnstilePost = async (req, res) => {
//   const {token} = req.body;
//   if (!token) {
//     return res.status(400).json({ message: 'Token is required' });
//   }
//   let formData = new FormData();
//   formData.append('secret', SECRET)
//   formData.append('response', token)
//   const idempotencyKey = crypto.randomUUID();
//   formData.append('idempotency_key', idempotencyKey);
//   const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
//   try {
//     const result = await axios.post(url, formData)
//     if (result.success) {
//       res.status(201).json({ message: 'First verification successfully' })
//     } else {
//       res.status(404).json({ message: 'First verification failed' })
//     }
//     const secondResult = await axios.post(url, formData)
//     if (secondResult.success) {
//       res.status(201).json({ message: 'Second verification successful' })
//     } else {
//       res.status(404).json({ message: 'Second verification failed' })
//     }
//   } catch (error) {
//      res.status(500).json({ message: error.message })
//   }
// }


// module.exports = { handleTurnstile ,handleTurnstilePost}

const { validateTurnstile } = require("../util/validateTurnstile");
const axios = require('axios');
const SECRET = process.env.TURNSTILE_SECRET_KEY;
const crypto = require('crypto');
const FormData = require('form-data');

const handleTurnstile = async (req, res) => {
  const { token } = req.body;
console.log(token, "token")
  if (!token && token === null) {
    return res.status(400).send('Token is required');
  }

  const validationResult = await validateTurnstile(token);
  const validationStatus = validationResult.success;
// console.log("validate", validationResult)
  if (validationStatus) {
    return res.status(201).json({message:'Validation successful!'});
  } else {
    res.status(500).json({message:'Validation failed!'});
  }
}

const handleTurnstilePost = async (req, res) => {
  const { token } = req.body;

  if (!token && token === null) {
    return res.status(400).json({ message: 'Token is required' });
  }
  let formData = new FormData();
  formData.append('secret', SECRET);
  formData.append('response', token);
  const idempotencyKey = crypto.randomUUID();
  formData.append('idempotency_key', idempotencyKey);
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  
  try {
    const result = await axios.post(url, formData, { headers: formData.getHeaders() });
    // console.log("result:", result)
    if (result.data.success) {
      res.status(201).json({ message: 'First verification successful' });
    } else {
      res.status(404).json({ message: 'First verification failed' });
    }
    const secondResult = await axios.post(url, formData, { headers: formData.getHeaders() });
    if (secondResult.data.success) {
      res.status(201).json({ message: 'Second verification successful' });
    } else {
      res.status(404).json({ message: 'Second verification failed' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { handleTurnstile, handleTurnstilePost };

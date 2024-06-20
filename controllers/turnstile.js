const { validateTurnstile } = require("../util/validateTurnstile");
const axios = require('axios');
const SECRET = process.env.TURNSTILE_SECRET_KEY
const crypto = require('crypto');

const handleTurnstile = async (req, res) => {
  const {token} = req.body;

  const validationResult = await validateTurnstile(token);

  if (validationResult) {
    return res.send('Validation successful!');
  } else {
    res.send('Validation failed!');
  }
}

const handleTurnstilePost = async (req, res) => {
  const {token} = req.body;
  let formData = new FormData();
  formData.append('secret', SECRET)
  formData.append('response', token)
  const idempotencyKey = crypto.randomUUID();
  formData.append('idempotency_key', idempotencyKey);
  const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  try {
    const result = await axios.post(url, formData)
    if (result.success) {
      res.status(201).json({ message: 'First verification successfully' })
    } else {
      res.status(404).json({ message: 'First verification failed' })
    }
    const secondResult = await axios.post(url, formData)
    if (secondResult.success) {
      res.status(201).json({ message: 'Second verification successful' })
    } else {
      res.status(404).json({ message: 'Second verification failed' })
    }
  } catch (error) {
     res.status(500).json({ message: error.message })
  }
}


module.exports = { handleTurnstile ,handleTurnstilePost}



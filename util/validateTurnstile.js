const axios = require('axios');

const validateTurnstile = async (token) => {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  try {
    const response = await axios.post('https://challenges.cloudflare.com/turnstile/v0/siteverify', null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error validating Turnstile token:', error);
    return { success: false, error: 'Validation failed' };
  }
};

module.exports = {validateTurnstile};

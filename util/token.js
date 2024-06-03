const jwt = require('jsonwebtoken');

const Token =({id})=>{
    const token = jwt.sign(
        { id: id },
        process.env.JWTSECRET,
        {
            expiresIn: "2h"
        }
    )
    return token;
}

module.exports = Token;
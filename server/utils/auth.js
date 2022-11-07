const jwt = require('jsonwebtoken');
const secret = "secretsauce";
const expiration = 60*60*24;

module.exports = {
    // create token (aka 'sign' token)
    signToken: function ({ username, email, _id }) {
        const payload = { username, email, _id };
        return jwt.sign({ data: payload, exp:Math.floor(Date.now() / 1000) + expiration }, secret);
    },
    // authenticate token
    authMiddleware: function ({ req }) {
        // find the token
        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }
        if (!token) {
            return req;
        }
        // verify that the token matches a user
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        return req;
    }
}
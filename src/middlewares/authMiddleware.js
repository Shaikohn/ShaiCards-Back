const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const isLocalAuth = token.length < 500

        let decodedData

        if(token && isLocalAuth) {
            decodedData = jwt.verify(token, 'test')

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token)

            req.userId = decodedData?.sub
        }
        next()
    } catch(error) {

    }
}

module.exports = auth
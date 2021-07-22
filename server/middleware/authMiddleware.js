const jwt = require('jsonwebtoken')

module.exports = function(req, res, next){
    if (req.method === 'OPTIONS'){
        next()
    }

    try {
        
        let token = req.headers.authorization.split(' ')[1] //type token
        
        if(!token){
            return res.status(401).json({message: "Не авторизован"})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()

    } catch (error) {
        return res.status(401).json({message: "Ошибка"})
    }
}
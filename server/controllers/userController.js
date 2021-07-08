const ApiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


class UserController{
    async registration(req, res,next){
        const {username, email, password, role} = req.body
        if (!username || !password || !email){
            return next(ApiError.badRequest('Неправильные данные при регистрации'))
        }

        let candidate = await User.findOne({where:{email}})
        
        if (candidate){
            return next(ApiError.badRequest('Такой Email уже есть в системе'))
        }
        candidate = await User.findOne({where:{username}})
        if (candidate){
            return next(ApiError.badRequest('Такой username уже есть в системе'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = await User.create({username,password:hashPassword,email,role})

        const token = jwt.sign(

            {id:newUser.id, username:newUser.username, role:newUser.role}, 
            process.env.SECRET_KEY,
            {expiresIn: '24h'}

        )

        return res.json({token})

        
    }

    async login(req, res,next){

        const {username, password} = req.body

        let candidate = await User.findOne({where:{username}})
        
        let cmpPass = bcrypt.compareSync(password,candidate.password)
        if(!cmpPass){
            return next(ApiError.badRequest("Неправильный пароль"))
        }

        const token = jwt.sign(

            {id: candidate.id, username, role: candidate.role}, 
            process.env.SECRET_KEY,
            {expiresIn: '24h'}

        )

        return res.json({token})

    }

    async check(req, res, next){
        const token = jwt.sign(

            {id: req.user.id, username: req.user.username, role: req.user.role}, 
            process.env.SECRET_KEY,
            {expiresIn: '24h'}

        )
        return res.json({token})
    }

}

module.exports = new UserController()
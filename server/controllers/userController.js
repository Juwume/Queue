const ApiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

class UserController{
    async registration(req, res){
        const {username, email, password, role} = req.body
        if (!username || !password || !email || !role){
            return next(ApiError.badRequest('Неправильные данные при регистрации'))
        }

        var candidate = User.findOne({where:{email}})
        if (candidate){
            return next(ApiError.badRequest('Такой Email уже есть в системе'))
        }
        candidate = User.findOne({where:{username}})
        if (candidate){
            return next(ApiError.badRequest('Такой Email уже есть в системе'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const newUser = User.create({username,hashPassword,email,role})

        const token = jwt.sign(

            {id:newUser.id, email:newUser.username, role:newUser.role}, 
            process.env.SEKRET_KEY,
            {expiresIn: '24h'}

        )

        return res.json({token})

        
    }

    async login(req, res){

    }

    async check(req, res, next){
        const {id} = req.query
        if (!id){
            return next(ApiError.badRequest('Ошибка'))
        }
        res.json(id)
    }

}

module.exports = new UserController()
const ApiError = require("../error/apiError")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Queue} = require('../models/models')



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
        if(!candidate){
            return next(ApiError.internal("Пользователь не найден"))
        }
        
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

    async check(req, res){
        const token = jwt.sign(

            {id: req.user.id, username: req.user.username, role: req.user.role}, 
            process.env.SECRET_KEY,
            {expiresIn: '24h'}

        )
        return res.json({token})
    }

    async getAllQs(req, res, next){
        try {
            const {id} = req.query

            let query = await User.findAll({
                attributes: ['id','username'], 
                where:{
                    id
                }
                ,
                include: [{
                    model: Queue,
                    attributes: ['id','name', 'description'],
                    required: true
                }]
            })
            if(query.length == 0){
                res.json({message:"Очередей нет"})
            }
            return res.json(query)

        } catch (error) {
            return next(ApiError.internal('Не удалось выполнить запрос'))
        }
        
    }
    async getUser(req, res, next){
        try {
            const {id} = req.query
            let query = await User.findOne({
                attributes: ['id','username'], 
                where:{
                    id
            }})
            if(!query)
                return res.json({message:"Такого пользователя нет"})
            return res.json(query) 
        } catch (error) {
            return next(ApiError.internal('Не удалось выполнить запрос'))
        }
        
    }


}

module.exports = new UserController()
const ApiError = require('../error/apiError')
const {Queue, User, QueueUser} = require('../models/models')
const {Op} = require('sequelize')

class queueController{
    async getUsers(req, res,next){
        try {
            const {id} = req.query

            let query = await Queue.findAll({
                
                where:{
                    id
                }
                ,
                include: [{
                    model: User,
                    attributes: ['id','username'],
                    required: true
                }]
            })

            if(query.length == 0){
                query = await Queue.findOne({
                    where:{
                        id
                    }
                })
                return res.json({message: "В очереди никого нет", queueName: query.name, queueDesc: query.description})
            }
            return res.json(query)

        } catch (error) {
            return next(ApiError.internal('Не удалось выполнить запрос'))
        }
        
    }
    
   async addToQueue(req,res){
       try {
            const {userId, queueId} = req.body
            const adding = await QueueUser.create({
                queueId, 
                userId,
            })
            res.json(adding)
        
       } catch (error) {
           return res.json({message:"Ошибка"})
       }
   }

   async leaveQueue(req,res){
        try {
            const {userId, queueId} = req.body
            await QueueUser.destroy({
                where:{
                    [Op.and]:[
                        {userId:userId},
                        {queueId:queueId}
                    ]
            }})
            res.json({message: "Запись удалена"})
        
            } catch (error) {
            return res.json({message:"Ошибка"})
        }
   }

   async searchByName(req, res,next){
       try {
            const {name} = req.query
            let candidate = await Queue.findAll({
                where:{
                    name:{
                        [Op.substring]: name
                    }
                }
            })
            if(candidate.length == 0){
                return res.json({message: "Ничего не найдено"})
            }
            
            return res.json(candidate)

        } catch (error) {
            return next(ApiError.internal('Не удалось выполнить запрос'))
        }
        
    }

    async searchById(req, res,next){
        try {
            const {id} = req.query
            let candidate = await Queue.findAll({
                where:{
                    id
                }
            })
            if(!candidate){
                return res.json({message: "Ничего не найдено"})
            }
            
            return res.json(candidate)

        } catch (error) {
                return next(ApiError.internal('Не удалось выполнить запрос'))
            }
            


    }

    async createQueue(req, res){
        try {
            const {name,description} = req.body
            const created = await Queue.create({name, description})
            return res.json(created)
        } catch (error) {
            return res.json({message:'Ошибка'})
        }
    }

    async deleteQueue(req, res){
        try {
            const {id} = req.body
            const deleted = await Queue.destroy({
                where:{
                    id
                }
            })
            return res.json(deleted)
        } catch (error) {
            return res.json({message:'Ошибка'})
        }
    }

}

module.exports = new queueController()
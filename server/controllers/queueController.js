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
                return res.json({message: "В очереди никого нет"})
            }
            return res.json(query)

        } catch (error) {
            return next(ApiError.internal('Не удалось выполнить запрос'))
        }
        
    }
    
   async addToQueue(req,res){
       try {
            const {userId, queueId} = req.body
            const adding = await QueueUser.create({userId, queueId})
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
        let candidate = await Queue.findOne({
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

}

module.exports = new queueController()
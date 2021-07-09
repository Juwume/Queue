const ApiError = require('../error/apiError')
const {Queues, User} = require('../models/models')

class queueController{
    async getUsers(req, res){
        const {id} = req.query

        let query = await Queues.findAll({
            where:{
                id
            },
            include: [{
                model: User,
                required: true
            }]
        })

        if(query.length == 0){
            return res.json({message: "В очереди никого нет"})
        }
        return res.json(query)
    }
    
   async addToQueue(req,res,next){
       try {
            const userId = req.user.id
            
        
       } catch (error) {
           
       }
   }

}

module.exports = new queueController()
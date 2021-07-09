const {Queues} = require('../models/models')
const {Op} = require('sequelize')

class findQController{
    async searchByName(req, res){
        const {name} = req.query
        let candidate = await Queues.findAll({
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

    }

    async searchById(req, res){
        const {id} = req.query
        let candidate = await Queues.findOne({
            where:{
                id
            }
        })
        if(!candidate){
            return res.json({message: "Ничего не найдено"})
        }
        
        return res.json(candidate)

    
    }


}

module.exports = new findQController()
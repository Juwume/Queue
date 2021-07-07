const {Queues} = require('../models/models')

class createQController{
    async create(req, res){
        const name = req.body.name
        const description = req.body.description

        const queue = await Queues.create({name, description})
        return res.json(queue)
    }

    
}

module.exports = new createQController()
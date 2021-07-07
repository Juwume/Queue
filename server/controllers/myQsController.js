const { Sequelize } = require('sequelize/types')
const {queues} = require('../models/models')

class myQsController{
    async getAll(req, res){
        const joinQuery = await Sequelize.query('SELECT name, description, userid FROM (queues INNER JOIN queue_users AS queue_users.queueid = queues.id)')
        const user_id = 1
        const query = await joinQuery.getAll({where: {user_id}})
        return res.json(query)
    }

    async delete(req, res){

    }

}

module.exports = new myQsController()
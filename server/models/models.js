const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const Queues = sequelize.define('queues',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true},
    description: {type: DataTypes.STRING}
})

const User = sequelize.define('user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true},
    role: {type: DataTypes.STRING, defaultValue: 'USER'}
})

const QueueUser = sequelize.define('queue_user',{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    
})

Queues.belongsToMany(User, {through: QueueUser})
User.belongsToMany(Queues, {through: QueueUser})

module.exports = {
    Queues,
    User,
    QueueUser
}
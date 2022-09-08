const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    process.env.POSTGRES_DB,
    process.env.POSTGRES_USER,
    process.env.POSTGRES_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.POSTGRES_HOST || "localhost",
        port: process.env.POSTGRES_PORT || "5432"
    }
)
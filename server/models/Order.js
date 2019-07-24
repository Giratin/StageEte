const Sequelize = require("sequelize")
const db = require("../database/db")

Order = db.sequelize.define(
    'order',
    {
        id: {
            type : Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        product_id : {
            type : Sequelize.INTEGER
        },
        customer_id : {
            type : Sequelize.INTEGER
        },
        quantity : {
            type : Sequelize.INTEGER
        },
        creation_date :{
            type : Sequelize.INTEGER
        },
        state : {
            type : Sequelize.BOOLEAN
        }
    },
    {
        timestamps: false
    }
)

module.exports = Order;


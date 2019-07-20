const Sequelize = require("sequelize")
const db = require("../database/db")

Product = db.sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        wording: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        fabDate: {
            type: Sequelize.STRING
        },
        expDate: {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        entreprise_id: {
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    }
)

module.exports = Product;


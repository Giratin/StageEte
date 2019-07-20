const Sequelize = require("sequelize")
const db = require("../database/db")



const Entrprise = require('../models/Entreprise')

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING

        },
       lname: {
            type: Sequelize.STRING

        },
        phone: {
             type: Sequelize.STRING
 
         },
         adress: {
              type: Sequelize.STRING
  
          },
        email: {
            type: Sequelize.STRING

        },
        role: {
             type: Sequelize.STRING
 
         },
         country :{
             type : Sequelize.STRING
         },
         city : {
             type: Sequelize.STRING
         },
        password: {
            type: Sequelize.STRING
        },
        registration: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
        entreprise_id: {
            type : Sequelize.INTEGER,
            refrences: {
                model : Entrprise,
                key: Entrprise.id
            }
        }
    },
    {
        timestamps: false
    }
)


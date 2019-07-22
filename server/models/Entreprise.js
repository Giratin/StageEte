const Sequelize = require("sequelize")
const db = require("../database/db")

Entrprise = db.sequelize.define(
    'entreprise',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING

        },
       Opening: {
            type: Sequelize.TIME

        },
        Closure: {
             type: Sequelize.TIME
 
         },
         longitude: {
              type: Sequelize.STRING
  
          },
          latitude: {
            type: Sequelize.STRING
        },
        city : {
            type : Sequelize.STRING
        }
    },
    {
        timestamps: false
    }
)

module.exports = Entrprise;


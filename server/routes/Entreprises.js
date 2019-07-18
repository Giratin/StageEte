const express = require('express')
const entrerpises = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const cookieParser  = require('cookie-parser');

const User = require('../models/User')
const Entreprise = require('../models/Entreprise')
entrerpises.use(cors())


process.env.SECRET_KEY = 'secret'



entrerpises.get('/find/:id', (req,res)=>{
    console.log("here i am")

    var id = req.params.id;
    console.log('id  ' , id)
    Entreprise.findAll()
    .then((entreprise)=>{
       // console.log(entreprise)
        res.send(entreprise)
    })  
})


entrerpises.get('/findteam/:id', (req,res)=>{
    console.log("here i am")

    var requestId = req.params.id;
    console.log('id looking for from url is : ' , requestId)
    Entreprise.findOne({
        where : {
            id : requestId
        }
    })
    .then((entreprise)=>{
       //console.log(entreprise)

       if(entreprise){
            User.findAll({
                where : {
                    entreprise_id : entreprise.id
                }
            }).then((users)=>{
                if(users){
                    res.send(users)
                    console.log(users.dataValues)
                }
            })
       }
    })  
})

entrerpises.post('/create' , (req,res)=>{

    console
    var entrepriseData = {
        name : req.body.name,
        Opening : req.body.opening,
        Closure : req.body.closure,
        longitude : req.body.longitude,
        latitude : req.body.latitude,
    }

    var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)


    
    Entreprise.findOne({
        where : 
            [
                {name : req.body.name},
                {longitude : req.body.longitude},
                {latitude : req.body.latitude}
            ]
    }).then((entreprise)=>{
        if(!entreprise){
            Entreprise.create(entrepriseData)
            .then((createdEntreprise) =>{
                var entrepriseId = createdEntreprise.id;
                var userId = decoded.id;
                
                User.findOne({
                    where : {
                        id : userId
                    }
                }).then((user) =>{
                    if(user){
                        user.update(
                            { entreprise_id : entrepriseId }
                        )
                        console.log("execution kemlet w mrigla")
                        res.json({
                            'userId' : userId,
                            'entreprise' : entrepriseId,
                            'affected' : 'success' ,
                            status : 200
                        })
                    }else{
                        console.log("user mafammech")
                        res.json({
                            'userId' : 'not found',
                            'entreprise' : entrepriseId,
                            'affected' : 'error' ,
                            status : 400
                        })
                    }
                }).catch((err)=>{
                    console.log("mal9itech il user")
                    res.json({
                        'userId' : 'not found',
                        'entreprise' : 'not found',
                        'affected' : 'error' ,
                        status : 400
                    })
                    console.log("error finding user "  +err)
                })
            }).catch((err)=>{
                console.log("keeertha saret" + err)
                res.json({
                    'userId' : 'error',
                    'entreprise' : 'error',
                    'affected' : 'error',
                    'status' : 500 
                })
            })
        }else{
            console.log("entreprise deaj mawjouda -_-")
            res.json({
                'userId' : 'error',
                'entreprise' : 'exits',
                'affected' : 'error',
                'status' : 400 
            })
        }
    })
})


module.exports = entrerpises
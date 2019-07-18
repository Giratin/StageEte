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
                        res.json({
                            'userId' : userId,
                            'entreprise' : entrepriseId,
                            'affected' : 'success' ,
                            status : 200
                        })
                    }else{
                        res.json({
                            'userId' : 'not found',
                            'entreprise' : entrepriseId,
                            'affected' : 'error' ,
                            status : 400
                        })
                    }
                }).catch((err)=>{
                    res.json({
                        'userId' : 'not found',
                        'entreprise' : 'not found',
                        'affected' : 'error' ,
                        status : 400
                    })
                    console.log("error finding user "  +err)
                })
            }).catch((err)=>{
                res.json({
                    'userId' : 'error',
                    'entreprise' : 'error',
                    'affected' : 'error',
                    'status' : 500 
                })
            })
        }else{
            res.json({
                'userId' : 'error',
                'entreprise' : 'exits',
                'affected' : 'error',
                'status' : 400 
            })
        }
    })
})


entrerpises.get('/show/:id', (req,res)=>{
    Entreprise.findOne({
        where : {
            id : req.params.id
        }
    }).then((entreprise)=>{
        if(entreprise){
            res.json(entreprise)
        }else{
            res.json({
                'id' : '0',
                'status' : '404'
            })
        }
    }).catch((err)=>{
        res.json({
            'id' : '0',
            'status' : '500'
        })
    })
})

entrerpises.get('/delete/:id', (req,res)=>{


    Entreprise.findOne({
        where : {
            id : req.params.id
        }
    }).then((entreprise)=>{
        if(entreprise){

            //cascade on delete
            User.findAll({
                where : {
                    entreprise_id : entreprise.id
                }
            }).then((users)=>{
                if(users){
                    users.destroy();
                }
            }).catch((err)=>{
                res.json({
                    'id' : '0',
                    'entreprise' : entreprise.id,
                    'issus' : 'error while deleting users',
                    'status' : 'internal server error'
                })
            })

            entreprise.destroy();
            //res.json(entreprise)
            res.json({
                'id' : req.params.id,
                'job' : 'entreprise deleted successfully',
                'status' : '200'
            })
        }else{
            res.json({
                'id' : '0',
                'job' : 'unable to find entreprise with id : ' +req.params.id ,
                'status' : '404'
            })
        }
    }).catch((err)=>{
        res.json({
            'id' : '0',
            'job' : 'fatal error on deleting entrprise on id : ' +req.params.id ,
            'errorMessage' : err ,
            'status' : '500'
        })
    })
})

module.exports = entrerpises
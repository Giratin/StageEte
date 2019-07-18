const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const cookieParser  = require('cookie-parser');

const User = require('../models/User')
const uniqueUsername = require('../models/User')
users.use(cors())


process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
  console.log(req.body)
  const userData = {
    name: req.body.name,
    lname: req.body.lname,
    password: req.body.password,
    phone: req.body.phone,
    adress : req.body.adress,
    email : req.body.email,
    role : req.body.role
  }

  User.findOne({
    where: {
      [Op.or]: {
          email: { [Op.eq]:  req.body.email  },
          phone: { [Op.eq]:  req.body.phone },
        }
      }
    })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10 , (err,hash)=>{
          userData.password = hash
          User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
            console.log("success");
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
            console.log('"error' + err);
          })
        })
      } else {


        
        res.send(user);
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      console.log("here")
      if (user) {
        console.log("username correct")
        if(bcrypt.compareSync(req.body.password, user.password)){
          let token = jwt.sign(user.dataValues, process.env.SECRET_KEY)
          console.log("connected")
          res.json({ token: token })
        }else{
          console.log("password incorrect")
          const userData2 = {
            email: "",
            password: "password"
          } 
          res.send(userData2)
        }
      } else {
        const userData2 = {
          email: "email",
          password: ""
        }
        console.log("user does not exist")
        res.send(userData2)
      }
    })
    .catch(err => {
      console.log("catching")
      res.send('error: ' + err)
    })
})


users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        
        res.json(user)
       // console.log(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


users.post('/update', (req, res)=>{
  
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  if(bcrypt.compareSync(req.body.password, decoded.password)){
    User.findOne({
      where: {
        id: decoded.id
      }
    })
      .then(user => {
        uniqueUsername.findOne({
          where : {
            username: req.body.username
          }
        }).then( (us)=>{

          if(us)
          {
            if( us.dataValues.id === user.dataValues.id)
            {
              user.update(
                { username : req.body.username } ,
                { name : req.body.name } ,
                { lname : req.body.lname } ,
                { where : {id : decoded.id}}
              )
              res.json(user)

            }else{
              console.log("username duplicated")
              res.json("username")
            }
          }else{
            user.update(
              { username : req.body.username } ,
              { name : req.body.name } ,
              { lname : req.body.lname } ,
              { where : {id : decoded.id}}
              
            )
            res.json(user)
            console.log("update success")
          }
        })   
      })
      .catch(err => {
        console.log(' catching error: ' + err)
      })
  }else{
    
    console.log("passowrd incorrect")
    res.json("password")
    
  }
})


users.post('/addstaff', (req, res) => {

    var userReq = req.body;

    const userData = {
      name: userReq.name,
      lname: userReq.lname,
      password: userReq.password,
      phone: userReq.phone,
      adress : userReq.adress,
      email : userReq.email,
      role : userReq.role,
      entreprise_id : userReq.entreprise_id
    }

    User.findOne({
      where: {
          email: userReq.email  
        }
      })
      .then(user => {
        if (!user) {
          bcrypt.hash(userReq.password, 10 , (err,hash)=>{
            userData.password = hash
            User.create(userData)
            
            res.send({
              'email' : userReq.email,
              'status' : 'success'
            })

          })
        } else {
          res.send({
            'email' : userReq.email,
            'status' : 'duplicated email'
          })

        }
      })
      .catch(err => {
        res.send({
          'email' : userReq.email,
          'status' : 'unhundled error'
        })
      })
  
})

users.get('/list', (req , res)=>{
  /* var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  if(decoded.role != 'user')
    res.sendStatus(403)
  else{*/
    User.findAll({
      where : {
        role : "livreur"
      }
    }).then((user)=>{
      if(user){
        
        //console.log(res.body)

        res.json(user)

       // res.json("success");
       // res.sendStatus(200)
      }
    }).catch(err =>{
      res.json(err)
      console.log("fatal error " + err)
    })
// }
})

module.exports = users

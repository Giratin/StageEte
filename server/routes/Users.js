const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
const cookieParser  = require('cookie-parser');

const User = require('../models/User')
const Entreprise = require('../models/Entreprise')
const uniqueUsername = require('../models/User')
users.use(cors())


process.env.SECRET_KEY = 'secret'

users.post('/register', (req, res) => {
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
        console.log(user.dataValues)
        console.log("nothing")
        
        res.send(user);
      }
    })
    .catch(err => {
      console.log("catcinh " + err)
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

  console.log("profile id : " + decoded.id)
  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        console.log(" found ",user.entreprise_id)
        res.json(user)
       // console.log(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      console.log("fatal error : " +err)
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
      entreprise_id : userReq.entreprise_id,
      registration : userReq.password,
    }

    User.findOne({
      where: {
          [Op.or]: {
            email: { [Op.eq]:  userReq.email  },
            phone: { [Op.eq]:  userReq.phone },
          }
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
          if(user.dataValues.email === userReq.email){
            res.send({
              'email' : userReq.email,
              'status' : 'email'
            })
          }else if(user.dataValues.phone === userReq.phone){
            res.send({
              'email' : userReq.email,
              'status' : 'phone'
            })
          }
        }
      })
      .catch(err => {
        res.send({
          'email' : userReq.email,
          'status' : 'unhundled error'
        })
      })
})

users.post('/list', (req , res)=>{
  console.log(req.body)
    User.findAll({
      where : [
        {role : "livreur"},
        {entreprise_id : req.body.entreprise_id}
      ]
    }).then((user)=>{
      if(user){
        res.json(user)
      }
    }).catch(err =>{
      res.json(err)
      console.log("fatal error " + err)
    })
})

users.post('/createIdentifier', (req,res)=>{

  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
  Entreprise.findOne({
    where : {
      id : req.body.id
    }
  }).then((entreprise) =>{
    if(entreprise){
      var year = new Date().getYear();
      var entrepriseName = entreprise.name.toUpperCase();
      var looking =  entreprise.name.toUpperCase().substring(0,3);
      //console.log("entreprise majouda")
      User.findOne({
        where :  {
          registration : {
            [Op.like] : '%'+looking+'%'
          } 
        } , order : [['id', 'DESC']]
      }).then((user)=>{
        if(user){
           //console.log("user mawjoud")
            var number = user.registration.substring(6, user.registration.length);
            var next = parseInt(number)+1 ;
            var newToken;
          if(next<9){
            newToken = year + looking+ '00' + next;
          }else if(next<99){
            newToken =  year + looking+ '0' + next;
          }else{
            newToken =  year + looking + next;
          }
          res.json(newToken)
        }else{
         // console.log("user mahuch mawjoud")
          var newToken = year + entreprise.name.toUpperCase().substring(0,3)+"001";
          console.log(newToken)
          res.json(newToken)
        }
      }).catch((err)=>{
        console.log("catch : " + err)
        res.json(err)
      }) 
    }
  })
})

const paginate = ({ page, pageSize }) => {
  const offset = parseInt(page) * parseInt(pageSize)
  const limit =  parseInt(pageSize)
 
  return {
    offset,
    limit,
  }
 }


 
 users.post('/count/:id', (req,res)=>{
  console.log("mochma fel count")
  console.log(req.params)

    User.findAll({
      attributes: ['id', [Sequelize.fn('count', Sequelize.col('id')), 'count']],
      where : { entreprise_id : req.params.id }
    }).then((count)=>{
      if(count){
		  console.log("count for id  :: " + req.params.id + " is : "  + count.dataValues );
        res.json(count)
      }
    })
 })

 users.post('/all' , (req,res)=>{
  console.log("le mochkla moush fel count")
   console.log(req.body)
  var page = req.body.page;
  var pageSize = req.body.number;
  User.findAll(
    paginate({ page, pageSize })
  ).then((users)=>{
    if(users){
      res.json(users)
    }
  })

 })

module.exports = users

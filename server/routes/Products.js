const express = require('express')
const products = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const User = require('../models/User')
const Entreprise = require('../models/Entreprise')
const Product = require('../models/Product')
products.use(cors())


process.env.SECRET_KEY = 'secret'

products.post('/create', (req,res)=>{
    var product ={
        wording : req.body.wording,
        price : req.body.price,
        description : req.body.description,
        quantity : req.body.quantity,
        fabDate : req.body.fabDate,
        expDate : req.body.expDate,
        category : req.body.category,
        entreprise_id : req.body.entreprise_id
    }

    Product.create(product).then((product)=>{
        if(product){
            res.json(product)
        }else{
            res.json({
                'id' : 0,
                'status' : 'error',
                'message' : 'could not be created'
            })
        }        
    }).catch((err)=>{
        res.json({
            'id' : 0,
            'status' : 'error',
            'message' : err
        })
    })
})

products.post('/update/:id', (req,res)=>{
    var product ={
        id : req.params.id,
        wording : req.body.wording,
        price : req.body.price,
        description : req.body.description,
        quantity : req.body.quantity,
        fabDate : req.body.fabDate,
        expDate : req.body.expDate,
        category : req.body.category,
        entreprise_id : req.body.entreprise_id
    }

    Product.findOne({
        where : {
            id : product.id
        }
    }).then((produit)=>{
        if(produit){
            produit.update(product).then((product)=>{
                if(product){
                    res.json(product)
                }else{
                    res.json({
                        'id' : 0,
                        'status' : 'error',
                        'message' : 'could not be updated'
                    })
                }        
            }).catch((err)=>{
                res.json({
                    'id' : 0,
                    'status' : 'error',
                    'message' : err
                })
            })
        }else{
            res.json({
                'id' : product.id,
                'status' : 'error finding product',
                'message' : err
            })
        }
    }).catch((err)=>{
        res.json({
            'id' : product.id,
            'status' : 'error',
            'message' : err
        })
    }) 
})

products.post('/delete/:id' , (req,res)=>{
    var id = req.params.id;
    Product.findOne({
        where : {
            id : id
        }
    }).then((product)=>{
        if(product){
            product.destroy();
            res.send({
                'id' : id,
                'status' : 200,
                'message' : 'deleted'
            })
        }else{
            res.json({
                'id' : 0,
                'status': 400,
                'message' : 'could not be found'
            })
        }
    }).catch((err)=>{
        res.json({
            'id' : '0',
            'status' : 'fatal',
            'message' : err 
        })
    })
})

products.post('/list' , (req,res)=>{
    var entreprise_id = req.body.entreprise_id;
    Product.findAll({
        where : {
            entreprise_id : entreprise_id
        }
    }).then((products)=>{
        if(products){
            res.json(products)
        }else{
            res.json({
                'id' : 0,
                'status' : "empty",
                'message' : 'empty'
            })
        }
    }).catch((err)=>{
        res.json({
            'id' : 0,
            'status' : "fatal",
            'message' : err
        })
    })
})

module.exports = products
const express = require('express')
const orders = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const User = require('../models/User')
const Entreprise = require('../models/Entreprise')
const Product = require('../models/Product')
const Order = require('../models/Order')
orders.use(cors())


process.env.SECRET_KEY = 'secret'

function updateQuantity(product_id, quantity ,object){

    console.log("product_id");
    console.log(product_id);
    console.log(quantity);
    console.log(object);

    Product.findOne({
        where : {
            id: product_id
        }
    }).then((produit)=>{
        produit.update({
            quantity : parseInt(produit.quantity) - parseInt(quantity)
        })
        Order.create(object).then((result)=>{
            if(result)
                return true;
            return false;
        })
    })
}

// --- Start --- Create new Order
orders.post('/create' , (req,res)=>{

    var data = JSON.parse(JSON.stringify(req.body));
    var t = [];
    for(var i =0; i < data.length ; i++){
        t.push(data[i].product_id)
    }

    console.log(t.id)
    Product.findAll({
        where : {
            id : {
                [Op.in] : t
            }
        }
    }).then((products)=>{
        
        produits = JSON.parse(JSON.stringify(products))
        
        var rejected = []
        var accepted = []

        for(var i =0; i< data.length; i++){
            for(var j =0; j< produits.length; j++){
                if(produits[j].id === data[i].product_id){
                    if(produits[j].quantity >= data[i].quantity){
                        accepted.push(data[i])
                    }else{
                        rejected.push(data[i])
                    }
                }
            }
        }
        return {
            accepted,
            rejected
        }
    }).then((products)=>{

        var table = JSON.parse(JSON.stringify(products.accepted))

        for(var i=0; i<table.length; i++){
            updateQuantity(table[i].product_id, table[i].quantity , table[i])
        }

        res.json({
            'prod' : products
        })
       
    }).catch((err)=>{
        res.json({'fatal' : err})
    })




})
// --- END --- Create new Order

// --- START --- Cancel an order
orders.post('/delete/:id', (req,res)=>{
    var id = req.params.id
    console.log(id)

    Order.findOne({
        where : {
            id : id
        }
    }).then((order)=>{
        if(order){
            var quantity = order.quantity;
            var product_id = order.product_id;
            order.destroy();
            return {
                quantity,
                product_id
            }
        }
    }).then((result)=>{
        console.log(result)
        Product.findOne({
            where :{
                id : result.product_id
            }
        }).then((product)=>{
            product.update({
                quantity : parseInt(product.quantity) + parseInt(result.quantity)
            }).then((last)=>{
                if(last)
                    res.json(last)
            })
        })
    })

})
// --- END --- Cancel an order



module.exports =orders;
const express = require('express')
const products = express.Router()
const cors = require('cors')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

const fs = require('fs')

const User = require('../models/User')
const Entreprise = require('../models/Entreprise')
const Product = require('../models/Product')
products.use(cors())

const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser')

const DIR = './uploads';

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + '.' + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

process.env.SECRET_KEY = 'secret'


products.post('/upload',upload.single('photo'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        return res.send({
          success: true,
          'name' : req.file
        })
      }
});

products.post('/create', (req,res)=>{
    console.log("here i am create product ")
    var product ={
        wording : req.body.wording,
        price : req.body.price,
        description : req.body.description,
        quantity : req.body.quantity,
        fabDate : req.body.fabDate,
        expDate : req.body.expDate,
        category : req.body.category,
        image : req.body.image,
        entreprise_id : req.body.entreprise_id,
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
        image : req.body.image,
        entreprise_id : req.body.entreprise_id
    }

    Product.findOne({
        where : {
            id : product.id
        }
    }).then((produit)=>{
        if(produit){

            if(produit.image != product.image){
                fs.unlink( DIR + "/"+ produit.image , function (err) {
                    if (err) throw err;
                });
            }

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
            'status' : 'error database',
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
            fs.unlink( DIR + "/"+ product.image , function (err) {
                if (err) throw err;
                // if no error, file has been deleted successfully
                console.log('File deleted!');
            });
            console.log("unlincked")
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
        console.log(err)
        res.json({
            'id' : '0',
            'status' : 'fatal',
            'message' : err 
        })
    })
})

products.post('/list/myproducts' , (req,res)=>{
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


const searchParams = ({ id, category, search, limit , offset }) => {

    if(category === 'all'){
        return {
            limit,
            offset,
            where : [
                { wording : {
                        [Op.like] : '%'+search+'%'
                    }
                },
                { entreprise_id : {
                        [Op.in] : id
                    }
                }
            ]
        }
    }

    return {
        limit,
        offset,
        where :[
            { category : category },
            { wording : {
                    [Op.like] : '%'+search+'%'
                }
            },
            { entreprise_id : {
                    [Op.in] : id
                }
            }
        ]
    }
}


const cityEntreprise = ({city}) =>{
    if(city === 'all'){
        console.log("all here")
        return {
            where : true
        }
    }
    return {
        where : {
            city : city
        }
    }
}




products.post('/searchAll', (req,res)=>{


    console.log(req.body)
    var page = req.body.page;
    var pageSize = req.body.number;

    console.log(page)
    var off = (parseInt(page) * parseInt(pageSize)) -pageSize
    var lim =  parseInt(pageSize)

    var city = req.body.city;
    var category = req.body.category;
    var keyWord = req.body.search;

    if(keyWord === undefined)
        keyWord = ""

    Entreprise.findAll(cityEntreprise({city}))
    .then((e)=>{
        if(e){
            var en = JSON.parse(JSON.stringify(e));
            var t = []
            
            for(var i =0; i<en.length; i++){
                var id = parseInt(en[i].id)
                t.push(en[i].id.toString())               
            }
                        
            return{
                t,
                category,
                keyWord
            }
        }else{
            res.send({
                'entreprise' : 'error',
                'status' : 404
            })
            console.log("404 entreprises")
        }
    }).then((r)=>{
        
        Product.findAndCountAll(searchParams({ id : r.t , category : r.category  , search : r.keyWord, limit : lim, offset : off }))
            .then((p)=>{
                if(p){
                    console.log(p)
                    res.json(p)
                }else{
                    res.send({
                        'product' : 'error',
                        'status' : 404
                    })
                    console.log("404 products")
                }
            }).catch((err)=>{
                res.send(err)
                console.log("eeeee",err)
            })
    })
})

/*
products.post('/search/ent' , (req,res)=>{
    //var entreprise_id = req.body.entreprise_id;
    //var entreprise_id = ["1","2","3","4","5"];
    var entreprise_id = ["5"];
    var looking = req.body.search
    var category = req.body.category

    var cat = "category";

    var city2 = "Tunis"
     var city = req.body.city

     if (city=='all'){
         city=""
     }
     console.log(city)
    Entreprise.findAll({
        where : {
            city : {
                [Op.or]:[
                    { [Op.eq] : [city] },
                    { [Op.eq]:[null]}
                ]
            }
        }
    }).then((entreprises)=>{
        if(entreprises){
          //  console.log()
                    var e = JSON.parse(JSON.stringify(entreprises))
                    var t = []
            for(var i=0; i< e.length; i++){
                var id = e[i].id
                console.log(id)
                t.push(id)
            }
            Product.findAll({
                where:{
                  
                        entreprise_id:{
                            [Op.or]:{
                             [Op.in]:t,
                             [Op.ne]:[null]
                            }
                        },

                    
                    
                }
            }).then((p)=>{
                if(p){
                    //console.log(p)
                    res.json(p)
                }else{
                    console.log("nothing to show")
                }
            }).catch((err)=>{
                console.log(err)
            })
        }
        //{
            
            else{
                console.log("nothing to show")
            }
            Product.findAll({
                where : [
                            { entreprise_id :
                                   { [Op.and]: [
                                       { [Op.ne] : [ null ] } ,
                                       { [Op.in] : [entreprises.entreprise_id] }
                                    ] }                        
                            },
                            {
                                category : {
                                    [Op.or]: [
                                        { [Op.ne] : [ '' ] } , 
                                        { [Op.eq] : [category] }
                                     ] 
                                }
                            },
                            {
                                    wording : {
                                        [Op.like] : '%'+looking+'%'
                                    }
                                
                            }
                        ],
                order : [['expDate', 'ASC']]
            }).then((products)=>{
                if(products){
                    console.log(products)
                    res.json(products)
                }else{
                    console.log("nothing")
                    res.json({
                        'id' : 0,
                        'status' : "empty",
                        'message' : 'empty'
                    })
                }
            }).catch((err)=>{
                console.log(err)
                res.json({
                    'id' : 0,
                    'status' : "fatal",
                    'message' : err
                })
            })
        }
    })

/*
    if(req.body.entreprise_id === ''){
        entreprise_id_con = null
    }else{
        console.log(req.body.entreprise_id)
    }

    console.log(req.body)
    Product.findAll({
        where : [
                    { entreprise_id :
                           { [Op.and]: [
                               { [Op.ne] : [ null ] } ,
                               { [Op.in] : [entreprise_id] }
                            ] }                        
                    },
                    {
                        category : {
                            [Op.or]: [
                                { [Op.ne] : [ '' ] } , 
                                { [Op.eq] : [category] }
                             ] 
                        }
                    },
                    {
                            wording : {
                                [Op.like] : '%'+looking+'%'
                            }
                        
                    }
                ],
        order : [['expDate', 'ASC']]
    }).then((products)=>{
        if(products){
            console.log(products)
            res.json(products)
        }else{
            console.log("nothing")
            res.json({
                'id' : 0,
                'status' : "empty",
                'message' : 'empty'
            })
        }
    }).catch((err)=>{
        console.log(err)
        res.json({
            'id' : 0,
            'status' : "fatal",
            'message' : err
        })
    })
})*/

products.post('/getAll', (req,res)=>{
    Product.findAll().then((products)=>{
        res.json(products)
    })
})

module.exports = products
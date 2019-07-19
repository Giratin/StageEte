/*
Clé publique pk_test_5Qevn1K2rKGMYkOsGxzyGFbq006nFbYRMZ
Clé secrète sk_test_nUIxWxTbeBGkHayRATCdiYD200cA2J8Gm0
*/

var stripe = require("stripe")("sk_test_nUIxWxTbeBGkHayRATCdiYD200cA2J8Gm0")
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 5000


app.use(cors())

app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/Users')
var Entrprises = require('./routes/Entreprises')
var Products = require('./routes/Products')


app.use('/user', Users)
app.use('/entre', Entrprises)
app.use('/product', Products)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})


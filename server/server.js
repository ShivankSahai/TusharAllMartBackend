let express = require('express')
let bodyParser = require('body-parser')
let { ObjectID } = require('mongodb')

let { mongoose } = require('./db/mongoose.js')

let { Customer } = require('./models/customer.js')
let { Order } = require('./models/order.js')
let { Product } = require('./models/product.js')
let { Seller } = require('./models/seller.js')

let app = express()
let port = process.env.PORT || 3000

app.use(bodyParser.json())

app.get('/products',(req,res)=>{
    Product.find().then((products)=>{
        res.send({products})
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.get('/customers',(req,res)=>{
    Customer.find().then((customers)=>{
        res.send({customers})
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.get('/sellers',(req,res)=>{
    Seller.find().then((sellers)=>{
        res.send({sellers})
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.get('/orders',(req,res)=>{
    Order.find().then((orders)=>{
        res.send({orders})
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

app.post('/products', (req, res) => {
    let product = new Product({
        name: req.body.name,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity,
        reviews: req.body.reviews
    })

    product.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/sellers', (req, res) => {
    let seller = new Seller({
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating,
        reviews: req.body.reviews,
        contact: req.body.contact
    })

    seller.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/customer', (req, res) => {
    let customer = new Customer({
        name: req.body.name,
        city: req.body.city,
        zip_code: req.body.zip_code,
        contact: req.body.contact
    })

    customer.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.post('/orders', (req, res) => {
    let order = new Order({
        cust_name: req.body.cust_name,
        ship_date: req.body.ship_date,
        price: req.body.price,
        quantity: req.body.quantity
    })

    order.save().then((doc) => {
        res.send(doc)
    }).catch((err) => {
        res.status(400).send(err)
    })
})

app.listen(port)
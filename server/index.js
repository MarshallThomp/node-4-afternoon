const express = require('express')
const session = require('express-session')
const checkForSession = require('./middlewares/checkForSession')
const swagCtrl = require('../server/controllers/swagController')
const authCtrl = require('../server/controllers/authController')
const cartCtrl = require('../server/controllers/cartController')
const searchCtrl = require('../server/controllers/searchController')

require('dotenv').config()
const app = express()

const { SERVER_PORT, SESSION_SECRET } = process.env

app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(checkForSession)
app.use(express.static(`${__dirname}/../build`))

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/signout', authCtrl.signout)
app.get('/api/user', authCtrl.signout)

app.get('/api/swag', swagCtrl.read)

app.post('/api/cart/checkout', cartCtrl.checkout)
app.post('/api/cart/:id', cartCtrl.add)
app.delete('/api/cart/:id', cartCtrl.delete)

app.get('/api/search', searchCtrl.search)

app.listen(SERVER_PORT, () => {
    console.log('listening on port', SERVER_PORT)
})
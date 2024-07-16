const express = require('express')
const admin_route = express()
const session = require('express-session')

admin_route.use(session({
    secret:process.env.secretkey,
    resave:false,
    saveUninitalized:false
}))

admin_route.get('/admin',)
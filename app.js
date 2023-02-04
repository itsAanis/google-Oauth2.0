const express = require('express')
const passport = require('passport')
require('./auth')
const session = require('express-session')
require('dotenv').config()

const app = express()

const isLoggedIn = (req, res, next) => {
    if (req.user) {   
        next() } 
    else { res.sendStatus(401) }
}

app.use(session({       // as from passport.js documentation
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true }
  }))
  // Passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.get('/', (req, res) => {
    res.send('<a href="/auth/google">authenticate with google </a>')
})

app.get('/auth/google',
passport.authenticate('google', {scope: ['email', 'profile']}))  //return user email , profile
 

app.get('/google/callback',
        passport.authenticate('google',{successRedirect: '/protected',
            failureRedirect: '/auth/failure'})
             )   
            
 app.get('/auth/failure', (req, res) => {
    res.status(401).send('Unauthorized')

 }) 


app.get('/protected', isLoggedIn, (req,res) => {
 res.send(`hello! ${req.user.displayName}`)  // display only when loged in
})

app.get('/logout', (req, res, next) => {
    req.logout( err => {
        if(err)  {
            return next(err);
          }
    })
    req.session.destroy()
    res.send('bye')
})


app.listen(3300)
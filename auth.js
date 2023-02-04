const passport = require('passport')
require('dotenv').config()
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID =  process.env.GOOGLE_CLIENT_IDs
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRETs
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID ,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/callback",//redirect when successful log in
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {
      return done(null, profile); // using null as not connected to db
  }
));

passport.serializeUser((user, done) =>  {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
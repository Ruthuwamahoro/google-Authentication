import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import secretKey from '../keys'
import UserInfo from '../database/models/userModel'
import { access } from 'fs'

//storing model in db variable
const db = UserInfo


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//defining options
const options = {
    callbackURL: "/api/auth/google/redirect",
    clientID: secretKey.google.clientID,
    clientSecret: secretKey.google.clientSecret,
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


export default passport.use(new GoogleStrategy(options, async(accessToken, refreshToken,profile:any, done) => {
    //take call back functions
    console.log("connected to google data")


    // console.log("\naccesstoken-------------------------", accessToken)
    const googleData = {
        userName: profile.displayName,
        email: profile.emails[0].value,
        profilePicture: profile.photos[0].value

    }
    

    // sending google data to database
    
    db.create(googleData).then((value) => {
            console.log("user created", value.toJSON())
    }).catch(() => {
        console.log("some thing wrong")
    })


   
}))
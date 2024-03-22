import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/google', passport.authenticate("google", {
    scope:["profile", "email"]
}))

router.get('/google/redirect',passport.authenticate("google", {failureRedirect:"/login"}), (req,res) => {
    // The request will be redirected to the callback URL.
    console.log("\n\n\n--------google authentication\n\n\n")
    res.redirect("google redirect")

})

router.get('/login', (req, res) => {
    res.send("login")
})

router.get('/message', (req,res) => {
    res.send("welcome user")
})



export default router



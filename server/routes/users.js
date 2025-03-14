const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { users } = require("../models");
const Validation = require("../services/Validation")
const { sign } = require("jsonwebtoken")
require('dotenv').config()
const {validateToken} = require("../middlewares/Authentication")

router.post('/', async (req, res) => {
    const {email, password, username} = req.body;
        
    if(!email || !Validation.isValidEmail(email)){
        return res.json({ error: "Invalid Email"});
    };
    
    if(!password || !Validation.isValidPassword(password)) {
        return res.json({ error: "Invalid Password"});
    }
    
    if(!username || !Validation.isValidUsername(username)){
        return res.json({error: "invalid Username"});
    }

    let user = await users.findOne({
        where: {
            email: email,
            username: username
        }
    })

    try {
        bcrypt.hash(password, 10).then(async (hash) => {
            try {
            await users.create({
                email: email,
                password: hash,
                username: username
            });
            return res.json({message: "User has been CREATED"});
            }catch(e) {
                return res.json({ error: e})
            };
        })

    } catch(e) {
        return res.json({ error: e});
    }
})


router.post("/login", async (req, res)=>{
    const {username, password} = req.body;

    if(!username || !password) {
        return res.json({error:"invalid Input"})
    }

    if(username && !Validation.isValidUsername(username)){
        return res.json({error:"invalid Username"})
    }

let user = await users.findOne({where: {username:username}})

if(!user) {
    return res.json({error: "Account does not exist."})
}
bcrypt.compare(password, user.password).then((match) => {
    if(!match) {
        return res.json({ error:"password sbagliata"})
    }
    const authToken = sign(
        {
            email: user.email,
            username: user.username,
            id: user.id,
            status: true,
        }
    , process.env.AUTH_SECRET)
    return res.json({
        authToken: authToken,
        email: user.email,
        username:user.username,
        id: user.id,
        status:true
    });
})


})

router.get("/auth", validateToken, async (req, res) => {

    if(req.user) {
        return res.json({user:req.user});
    }
})
module.exports = router;
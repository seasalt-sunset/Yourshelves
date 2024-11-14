const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { users } = require("../models");
const Validation = require("../services/Validation")

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

module.exports = router;
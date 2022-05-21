const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
require('dotenv').config()
const User = require('../models/user')

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email, password: req.body.password});
        !user && res.status(404).send("User not found")
        const accessToken = jwt.sign({user}, process.env.TOKEN_SECRET, {
            expiresIn: "30 days"
        });
        res.status(200).send({
            user: user,
            accessToken: accessToken
        })
    }catch (err){
        res.status(404)
    }

});

module.exports = router;

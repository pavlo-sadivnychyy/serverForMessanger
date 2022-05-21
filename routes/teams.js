const router = require('express').Router();
const Team = require('../models/Team');
const Conversation = require("../models/Conversation");


router.post('/', async(req, res) => {

    const newTeam = new Team({
        conversations: req.body.conversationId,
        name: req.body.name,
        userId: req.body.userId
    })

    try{
        const savedTeam = await newTeam.save();
        res.status(200).json(savedTeam);
    }catch (err){
        if(err) throw err
    }
})

router.get('/:userId', async (req, res) =>{
    try{
        const teams = await Team.find({
            userId:{$in: [req.params.userId]}
        });
        res.status(200).json(teams)
    }
    catch (err){
        console.log(err)
    }
})


module.exports = router;
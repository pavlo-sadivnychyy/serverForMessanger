 const router = require('express').Router();
const Conversation = require('../models/Conversation')
const mongoose = require('mongoose');


router.post('/', async (req,res) => {
    await Conversation.find({'members': { $all: [req.body.senderId, req.body.receiverId]}}, async (err, obj) => {
        if(obj.length === 0){
            const newConversation = new Conversation({
                members:[req.body.senderId, req.body.receiverId],
                important: false,
                _id: new mongoose.Types.ObjectId().toString(),
            })
            try{
                const savedConversation = await newConversation.save();
                res.status(200).json(savedConversation);
            }catch (err){
                if(err) throw err
            }
        }else{
            try {
                res.status(200).json(obj[0])
            }catch (err){
                if(err) throw err
            }
        }
    }).clone().catch(function(err){ console.log(err)})
})

router.post('/updateConv/:conversationId', async (req,res) => {
    const conversation = await Conversation.findOneAndUpdate({_id: req.params.conversationId}, {important: true}, {new: true})

    try{
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    }catch (err){
        if(err) throw err
    }
})

router.post('/unmarkFromImportant/:conversationId', async (req,res) => {
    const conversation = await Conversation.findOneAndUpdate({_id: req.params.conversationId}, {important: false}, {new: true})

    try{
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    }catch (err){
        if(err) throw err
    }
})

router.get('/important/:userId', async (req,res) => {

    try{
        const conversation = await Conversation.aggregate([
            { $match: { $and: [ { members: { $in: [req.params.userId] } }, { important: true } ] } },
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "conversationId",
                    as: "message"
                }
            }
        ])
        res.status(200).json(conversation);
    }catch (err){
        if(err) throw err
    }
})




router.get('/:userId', async (req, res) =>{
    try{
        const conversation = await Conversation.aggregate([
            {$match: { members: { $in: [req.params.userId] }}},
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "conversationId",
                    as: "message"
                }
            }
        ])
        res.status(200).json(conversation)
    }
    catch (err){
        console.log(err)
    }
})

router.get('/byId/:conversationId', async (req, res) =>{
    try{
        const conversation = await Conversation.aggregate([
            {$match: { _id:{$in: [req.params.conversationId]}}},
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            {
                $lookup: {
                    from: "messages",
                    localField: "_id",
                    foreignField: "conversationId",
                    as: "message"
                }
            }
        ])
        res.status(200).json(conversation)
    }
    catch (err){
        console.log(err)
    }
})

router.delete('/:conversationId', async (req,res) => {
    await Conversation.findByIdAndRemove({_id: req.params.conversationId}, (err, docs) => {
        if (!err){
            res.sendStatus(200)
        }
    }).clone().catch(function(err){ console.log(err)})
})


module.exports = router;

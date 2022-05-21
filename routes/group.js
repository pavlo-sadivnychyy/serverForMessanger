const router = require('express').Router();
const Group = require('../models/Group')

router.post('/', async (req,res) => {
console.log(req.body)
    const newGroup = new Group({
        members: req.body.members,
        name: req.body.name
    })
    try{
        const savedGroup = await newGroup.save();
        res.status(200).json(savedGroup);
    }catch (err){
        if(err) throw err
    }
})

router.get('/:userId', async (req, res) =>{
    try{
        const group = await Group.aggregate([
            {$match: { members: { $in: [req.params.userId] }}},
            {
                $lookup: {
                    from: "users",
                    localField: "members",
                    foreignField: "_id",
                    as: "user_info"
                }
            }
        ])
        res.status(200).json(group)
    }
    catch (err){
        console.log(err)
    }
})

module.exports = router;

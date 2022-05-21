const router = require('express').Router();
const Message = require('../models/Message')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
});


router.post('/', upload.single('file'), async (req,res) => {

    const newMessage = new Message({
        conversationId: req.body.conversationId,
        sender: req.body.sender,
        text: req.body.text,
        type: req.body.type,
        file: req.file?.path
    });

    try{
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    }catch (err){
        if(err) throw err
    }
})
router.get('/:conversationId', async (req, res) =>{
    const page = req.query.page;
    const limit = req.query.limit;
    const startIndex = (page * limit) - 10;
    try{
        const messages = await Message.aggregate([
        { $match : { conversationId : req.params.conversationId } },
            {
                $lookup : {
                    from: "users",
                    localField: "sender",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            {
                $sort : {createdAt : -1}
            },
            {
                $skip: parseInt(startIndex)
            },
            {
                $limit:
                  parseInt(limit)
            }
        ])
        res.status(200).json(messages)
    }catch (err){
        if(err) throw err
    }
})

module.exports = router;

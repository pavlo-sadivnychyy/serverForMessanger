const { Router } = require('express');
const User = require("../models/user");
const router = Router();
const multer = require('multer');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/')
    },
    filename: function (req, file, cb){
        cb(null, new Date().toISOString() + file.originalname)
    }
})
const upload = multer({
    storage: storage,
    limits: {
        filesize: 1024 * 1024 * 5
    },
});

router.get('/all', async function (req, res, next) {
       User.find({}).then((result) => {
           res.status(200).json(result)
        }).catch((err) => console.log(err))
});

router.get('/:id', async function (req, res, next) {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch (err){
        if(err) throw err
    }
});

router.post('/', upload.single('file'), async function (req, res,next) {

    try{
        const newUser = await new User(
            {
                _id: new mongoose.Types.ObjectId().toString(),
                name: req.body.name,
                surname: req.body.surname,
                nickname: req.body.nickname,
                email: req.body.email,
                password: req.body.password,
                phone_number: req.body.phone_number,
                dob: req.body.dob,
                gender: req.body.gender,
                languages: req.body.languages,
                file: req.file.path
            }
        );
        const result = await newUser.save();
        res.status(200).json(result)
    }catch (err){
        if(err) throw err
    }

});

module.exports = router;

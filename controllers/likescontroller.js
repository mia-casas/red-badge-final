const router = require('express').Router();
const {LikesModel} = require('../models');
const validateJWT = require("../middleware/validate-jwt")

router.get('/test', async (req, res) => {
    res.send("Fourth Test")
})

router.post('/create', validateJWT, async (req, res) => {
    const {like, rating, comment, postId} = req.body.like;

    try {
        await LikesModel.create({
            like, 
            rating, 
            comment,
            postId,
            userId: req.user.id

        });
        res.status(201).json({
                  message: 'Success'
              });  
    } catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
})

module.exports = router
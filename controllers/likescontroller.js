const router = require('express').Router();
const {LikesModel} = require('../models');
const validateJWT = require("../middleware/validate-jwt");
const Likes = require('../models/likes');

router.get('/test', async (req, res) => {
    res.send("Fourth Test")
})


// Create
router.post('/create', validateJWT, async (req, res) => {
    const {like, rating, comment, postId} = req.body.like;

    try {
       const newLike = await LikesModel.create({
            like, 
            rating, 
            comment,
            postId,
            userId: req.user.id

        });
        res.status(201).json({
                  newLike, 
                  message: 'Success'
              });  
    } catch(err){
        console.log(err)
        res.status(500).json({error:err})
    }
})


// Delete
router.delete("/delete/:id", validateJWT, async (req, res) => {
    
    try {
        const query = {
            where: {
                id: req.params.id,  //may want to update this
            }
        };
        await LikesModel.destroy(query);
        res.status(200).json({message: "Deleted"})
    } catch (err){
        res.status(500).json({error: err});
    }
})

// Update
router.put("/update/:id", validateJWT, async (req, res) => {
    const {like, rating, comment} = req.body.like;

    const query = {
        where: {
            id: req.params.id,
            userId: req.user.id
        }
    };
    const updatedLike = {
            like, 
            rating, 
            comment,
    };
    try {
        const update = await LikesModel.update(updatedLike, query);
        res.status(200).json({update, message:("Post Successfully Update")});
    } catch(err){
        res.status(500).json({error: err});
    }
});

module.exports = router
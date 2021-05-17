const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt")
const {PostModel} = require('../models');


// ADMIN ROUTES ONLY    --  HOW DO I AUTHENTICATE "ADMIN:TRUE"

//Test
router.get('/test', (req, res) => {
    res.send("Third Test")
})

// Create
router.post('/create', validateJWT, async (req, res) => {
    const {date, time, location, title, content, category, imageURL} = req.body.post;
    const {id} = req.user
    const newPost = {
        date,
        time,
        location,
        title,
        content,
        category,
        imageURL,
        owner: id
    }
    try {
        const event = await PostModel.create(newPost);
        res.status(200).json(event);
    } catch(err){
        res.status(500).json({error:err})
    }
});

//Delete
router.delete("/delete/:id", validateJWT, async (req, res) => {
    
    try {
        const query = {
            where: {
                id: req.params.id,  //may want to update this
                owner: req.user.id
            }
        };
        await PostModel.destroy(query);
        res.status(200).json({message: "Post deleted"})
    } catch (err){
        res.status(500).json({error: err});
    }
})

// Update
router.put("/update/:postId", validateJWT, async (req, res) => {
    const {date, time, location, title, content, category, imageURL} = req.body.post;

    const query = {
        where: {
            id: req.params.postId,
            owner: req.user.id
        }
    };
    const updatedPost = {
        date: date,
        time: time,
        location: location,
        title: title,
        content: content,
        category: category,
        imageURL: imageURL,
    };
    try {
        const update = await PostModel.update(updatedPost, query);
        res.status(200).json({update, message:("Post Successfully Update")});
    } catch(err){
        res.status(500).json({error: err});
    }
});


// View Mine
router.get('/my-posts', validateJWT, async (req, res) => {

    try{
        const userPosts = await PostModel.findAll({
            where: {
                owner: req.user
            }
        });
        res.status(200).json(userPosts)
    } catch(err){
        res.status(500).json({error:err})
    }
});

// View All
router.get('/all', validateJWT, async (req, res) => {

    try{
        const allPosts = await PostModel.findAll();
        res.status(200).json(allPosts)
    } catch(err){
        res.status(500).json({error:err})
    }
});

module.exports = router;

// let topic = await Topics.findByPk(req.params.id);
//     topic.destroy();
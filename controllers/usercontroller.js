const Express = require("express");
const router = Express.Router();
const {UserModel} = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UniqueConstraintError } = require("sequelize/lib/errors");
const validateJWT = require('../middleware/validate-jwt');

//Test
router.get('/test', (req, res) => {
    res.send("Second Test")
})

// Sign Up
router.post("/register", async (req, res) => {
    const {firstName, lastName, email, password, imageURL} = req.body.user ;

    try {
        const newUser = await UserModel.create({
            firstName,
            lastName, 
            email,
            password: bcrypt.hashSync(password, 10),
            admin: false,
            imageURL
        
        });

        //token does not include email
        const token = jwt.sign(
            {
                id: newUser.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24
            }
        )
        //sessionToken not defined
        res.status(201).json({
            message: "User registered",
            user: newUser,
            token
        })
    } catch(err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                message: "Email already in use."
            })
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            })
        }
    }
})

module.exports = router;
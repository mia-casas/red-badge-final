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
    const {firstName, lastName, email, password, imageURL} = req.body ;

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
                id: newUser.id,
                isAdmin: newUser.admin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 60 * 60 * 24
            }
        );
        
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
        };
    }
});

//Login
router.post("/login", async (req, res) => {
    let {email, password} = req.body;

    try {
        const loginUser = await UserModel.findOne({
            where: {
                email
            }
        });

        if(loginUser){
            const passwordComparison = await bcrypt.compare(password, loginUser.password);

            if(passwordComparison){
                const token = jwt.sign(
                    {id: loginUser.id, isAdmin: loginUser.admin},
                    process.env.JWT_SECRET,
                    {expiresIn: 60 * 60 * 24}
                );

                res.status(200).json({
                    message: "Successful login",
                    user: loginUser,
                    token
                });
            } else {
                res.status(401).json({
                    message: "Incorrect email or password"
                });
            }
        } else {
            res.status(401).json({
                message: "Incorrect email or password"
            });
        };
    } catch(err){
        res.status(500).json({
            message: "Error logging in"
        });
    };
});

// Delete
router.delete("/delete/:id", validateJWT, async (req, res) => {

    try{
        const query = {
            where: {
                id: req.user.id
            }
        };
        await UserModel.destroy(query);
        res.status(200).json({message: "User deleted"})
    } catch(err){
        res.status(500).json({error:err});
    }
});

module.exports = router;
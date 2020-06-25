const express = require("express");
const {check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage: storage
});

const User = require("../model/User");

/**
 * @method - POST
 * @param - /signup
 * @description - User SignUp
 */

router.post(
    "/signup",
    [
        check("username", "Please Enter a Valid Username")
            .not()
            .isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            email,
            password,
        } = req.body;
        const {
            photo,
            phone,
            city,
            desc
        } = {
            photo: "",
            phone: "",
            city: "",
            desc: ""
        };
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User({
                username,
                email,
                password,
                photo,
                phone,
                city,
                desc
            });

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString",
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.post(
    "/login",
    [
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Please enter a valid password").isLength({
            min: 6
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {email, password} = req.body;
        try {
            let user = await User.findOne({
                email
            });
            if (!user)
                return res.status(400).json({
                    message: "User Not Exist"
                });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch)
                return res.status(400).json({
                    message: "Incorrect Password !"
                });

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "secret",
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        } catch (e) {
            console.error(e);
            res.status(500).json({
                message: "Server Error"
            });
        }
    }
);

router.get("/user-animal", async (req, res) => {
    try {
        const user = await User.findById(req.header("master_id"));
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Fetching pet"});
    }
});

router.get("/all-users", async (req, res) => {
    try {
        const animal = await User.find();
        res.json(animal);
    } catch (e) {
        res.send({message: "Error in Fetching users"});
    }
});

router.put("/update-user", upload.single('photo'), async (req, res) => {
    try {
        let myQuery = {_id: req.header("id")};
        if (req.file) {
            req.body.photo = req.file.path;
        }
        let newValues = {$set: req.body};
        const user = await User.updateOne(myQuery, newValues);
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Update user"});
    }
});

router.delete("/delete-user", async (req, res) => {
    try {
        let myQuery = req.header.id;
        const user = await User.deleteOne(myQuery);
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Delete user"});
    }
});

router.get("/me", auth, async (req, res) => {
    try {

        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({message: "Error in Fetching user"});
    }
});

module.exports = router;

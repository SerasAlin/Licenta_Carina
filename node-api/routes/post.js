const express = require("express");
const {check, validationResult} = require("express-validator");
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    }
});

const Post = require("../model/Post");

router.post(
    "/add-post",
    upload.single('photo'),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        const {user_id, type, content, details} = req.body;
        let photo = "";
        if (req.file) {
            photo = req.file.path;
        }
        let post;
        try {
            post = new Post({
                user_id,
                type,
                content,
                photo,
                details,
            });
            await post.save();
            res.status(200).json({
                post,
            });
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.get("/my-posts", async (req, res) => {
    try {
        const post = await Post.find({user_id: req.header("user_id")});
        res.json(post);
    } catch (e) {
        res.send({message: "Error in Fetching posts"});
    }
});

router.get("/all-posts", async (req, res) => {
    try {
        const post = await Post.find();
        res.json(post);
    } catch (e) {
        res.send({message: "Error in Fetching posts"});
    }
});

router.put("/update-post", async (req, res) => {
    try {
        let myQuery = req.header.user_id;
        let newValues = {$set: req.body};
        if (req.file) {
            req.body.photo = req.file.path;
        }
        const post = await Post.updateOne(myQuery, newValues);
        res.json(post);
    } catch (e) {
        res.send({message: "Error in Update post"});
    }
});

router.delete("/delete-post", async (req, res) => {
    try {
        let myQuery = req.header.user_id;
        const post = await Post.deleteOne(myQuery);
        res.json(post);
    } catch (e) {
        res.send({message: "Error in Delete post"});
    }
});

module.exports = router;

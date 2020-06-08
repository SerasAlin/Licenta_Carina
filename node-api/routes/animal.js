const express = require("express");
const { check, validationResult} = require("express-validator");
const router = express.Router();

const Animal = require("../model/Animal");

router.post(
    "/register-animal",
    [
        check("name", "Please Enter a name")
            .not()
            .isEmpty(),
        check("type", "Please Enter a type")
            .not()
            .isEmpty(),
        check("status", "Please Enter a status")
            .not()
            .isEmpty(),
        check("age", "Please Enter age")
            .not()
            .isEmpty(),
        check("tag", "Please Enter tag")
            .not()
            .isEmpty(),
        check("master_id", "Please Enter master id")
            .not()
            .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }
        const {
            name,
            type,
            status,
            age,
            photo,
            tag,
            master_id,
            story
        } = req.body;
        try {
            let animal = await Animal.findOne({
                tag
            });
            if (animal) {
                return res.status(400).json({
                    msg: "Animal Already Exists"
                });
            }
            animal = new Animal({
                name,
                type,
                status,
                age,
                photo,
                tag,
                master_id,
                story
            });
            await animal.save();
            res.status(200).json({
                animal
            });

        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }
    }
);

router.get("/my-animals", async (req, res) => {
    try {
        const animal = await Animal.find({ master_id: req.header("master_id") });
        res.json(animal);
    } catch (e) {
        res.send({ message: "Error in Fetching animals" });
    }
});

router.get("/pet-page", async (req, res) => {
    try {
        const animal = await Animal.findOne({ tag: req.header("tag") });
        res.json(animal);
    } catch (e) {
        res.send({ message: "Error in Fetching pet" });
    }
});

router.get("/all-animals", async (req, res) => {
    try {
        const animal = await Animal.find();
        res.json(animal);
    } catch (e) {
        res.send({ message: "Error in Fetching animals" });
    }
});

router.put("/update-animal", async (req, res) => {
    try {
        let myQuery = req.header.tag;
        let newValues = { $set: req.body};
        const animal = await Animal.updateOne(myQuery, newValues);
        res.json(animal);
    } catch (e) {
        res.send({ message: "Error in Update animals" });
    }
});

router.delete("/delete-animal", async (req, res) => {
    try {
        let myQuery = req.header.tag;
        const animal = await Animal.deleteOne(myQuery);
        res.json(animal);
    } catch (e) {
        res.send({ message: "Error in Delete animal" });
    }
});

module.exports = router;

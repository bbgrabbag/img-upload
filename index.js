const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs");
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

const config = require("./config");
const ImageModel = require("./models/images");

const upload = multer({
    dest: "./tmp/",
    limits: { fileSize: 1000000 }
});
const app = express();
app.use(bodyParser.json());

app.get("/api/images", (req, res) => {
    ImageModel.find((err, images) => {
        if (err)
            res.status(500).send(err);
        else
            res.send(images);
    })
})

app.post("/api/images", upload.single("file"), (req, res) => {
    console.log("uploaded to multer");
    cloudinary.uploader.upload(req.file.path, (cloudReq, cloudRes) => {
        console.log("uploaded to cloudinary");
        let imgUrl = cloudReq.url;
        let newImage = new ImageModel(Object.assign(req.body, { imgUrl }));
        newImage.save((err, savedImage) => {
            if (err) {
                res.status(500).send(err);
            } else {
                console.log("saved to mongodb");
                res.status(201).send(savedImage);
            }
        });
    });
});

cloudinary.config(config.cloudinaryCredentials);
mongoose.connect("mongodb://localhost:27017/img-upload", (err) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(`Connected to DB`);
        app.listen(config.port, () => {
            console.log(`Connected to port ${config.port}`);
        });
    }
});

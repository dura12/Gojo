import express from "express";
const postroute = express.Router();
postroute.get("/test", (req, res) => {
    console.log("router works!");
    res.send("Test route is working!"); // You need to send a response
});

export default postroute;

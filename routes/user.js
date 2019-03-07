const express = require('express');
const router = express.Router();
const {userList, userPages} = require('../views');
const { Page } = require("../models");
const { User } = require("../models");


router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(userList(users));
    } catch (error) {next(error)}
    
});



module.exports = router;

const express = require("express");
const router = express.Router();
const { videogames } = require("../models");

router.get("/", async (req, res) => {

    let games = await videogames.findAll();
    return res.json(games)

})

module.exports = router;
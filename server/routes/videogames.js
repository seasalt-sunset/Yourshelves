
const express = require("express");
const router = express.Router();
const { videogames } = require("../models");

router.get("/", async (req, res) => {

    let games = await videogames.findAll();
    return res.json(games)

})

router.get("/:name", async (req, res) => {
    const {name} = req.params;
    let games = await videogames.findAll();
    let filteredGames= games.filter((game) => {
        return game.name.toLowerCase().includes(name.toLowerCase())
    })
    return res.json(filteredGames)

})
module.exports = router;
const express = require("express");
const router = express.Router();
const { giochi_inCorso, videogames } = require("../models");
const {validateToken} = require("../middlewares/Authentication");

router.post("/", async (req, res) => {

    const {userId, gameId} = req.body;

    let gioco_InCorso_Creato = await giochi_inCorso.create({
        userId: userId,
        gameId: gameId,
        status: true,
    })

    return res.json(gioco_InCorso_Creato)
})

router.get("/", validateToken, async (req, res) => {
    let giochiUtente = await giochi_inCorso.findAll({where: {userId:req.user.id},
    include: [{model: videogames}]})
    return res.json(giochiUtente)
});

module.exports = router;
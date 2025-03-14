const express = require("express");
const router = express.Router();
const { giochi_inCorso, videogames } = require("../models");
const {validateToken} = require("../middlewares/Authentication");

router.post("/", async (req, res) => {

    const {userId, gameId} = req.body;

    let gioco_InCorso_Esistente = await giochi_inCorso.findOne({where: {userId: userId, gameId:gameId}})
    if(gioco_InCorso_Esistente){
        return res.json({error: "Gioco già tra i preferiti!"})
    }

    console.log("gfhgjhfhj", userId)
    let gioco_InCorso_Creato = await giochi_inCorso.create({
        userId: userId,
        gameId: gameId,
        status: true,
    })

    return res.json(gioco_InCorso_Creato)
})

router.get("/", validateToken, async (req, res) => {
    let giochiUtente = await giochi_inCorso.findAll({where: {userId:req.user.id, status: true},
    include: [{model: videogames}]})
    return res.json(giochiUtente)
});


router.delete("/:id", validateToken, async (req, res) => {
    let removeGame = await giochi_inCorso.update({status: false}, {where: {id:req.params.id}})

    return res.json(removeGame)
})

module.exports = router;
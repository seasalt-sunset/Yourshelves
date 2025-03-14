const express = require("express");
const router = express.Router();
const { giochi_inCorso, videogames } = require("../models");
const {validateToken} = require("../middlewares/Authentication");

router.post("/", validateToken, async (req, res) => {
    try {
        const {userId, gameId} = req.body;

        // Verify the user is adding a game for themselves
        if (userId !== req.user.id) {
            return res.status(403).json({error: "Non puoi aggiungere giochi per altri utenti"});
        }

        let gioco_InCorso_Esistente = await giochi_inCorso.findOne({where: {userId: userId, gameId: gameId, status:true}});
        if(gioco_InCorso_Esistente) {
            return res.json({error: "Gioco già tra i preferiti!"});
        }

        let gioco_InCorso_Creato = await giochi_inCorso.create({
            userId: userId,
            gameId: gameId,
            status: true,
        });

        return res.json(gioco_InCorso_Creato);
    } catch (error) {
        console.error("Error in POST /giochi_inCorso:", error);
        return res.status(500).json({error: "Errore del server"});
    }
});

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
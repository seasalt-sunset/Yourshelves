const express = require("express")
const server = express();
const cors = require("cors")
const database = require("./models")

server.use(cors())
server.use(express.json())

const usersRouter= require("./routes/users")
server.use("/users", usersRouter)
const videogamesRouter= require("./routes/videogames.js")
server.use("/videogames", videogamesRouter)
database.sequelize.sync().then(() =>{
    server.listen(5555, () => {
        console.log("Attivo sul port 5555")
    }) 
})
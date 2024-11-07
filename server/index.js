const express = require("express")
const server = express();
const cors = require("cors")
const database = require("/models")

server.use(cors())
server.use(express.json())

database.sequelize.sync().then(() =>{
    server.listen(5555, () => {
        console.log("Porca madonna.js sul port 5555, fanculo a dio.json")
    })
})
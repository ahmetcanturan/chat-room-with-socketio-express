const express = require("express")
const socket = require("socket.io")

const app = express()

const server = app.listen(3000, () => { console.log("3000. port is Activated") })

app.use(express.static("public"))

const io = socket(server)


io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("chat", data => {
        //? Burda datadan gelen verileri tüm browserlara göndericez
        io.sockets.emit("chat", data)
    })

    //? yazıyor.. bilgisi
    socket.on("yaziyor", data => {
        io.sockets.emit("yaziyor", data)
    })

})

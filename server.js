const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const path = require('path')
const PORT = process.env.PORT || 3001

const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors:{
        // origin:'http://localhost:3000',
        origin:'https://socket-io-chat-app-jqec.onrender.com/',
        methods:["GET", "POST", "PUT", "PATCH"]
    }
})

app.use(cors())
app.use(express.static(path.join(__dirname,'./public/build')))
app.get('/', (req, res)=>{
    res.json({succes:true})
})

io.on('connection', (socket)=>{
    console.log(`${socket.id} conncted.`)
    socket.on('disconnect', (reason)=>{
        socket.removeAllListeners
        console.log(`${socket.id} disconnected.`)
    })

    socket.on('join_chat', (data)=>{
        console.log(data)
    })

    socket.on('send_message', (data)=>{
        socket.broadcast.emit('received_message', data)
    })

})


httpServer.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}...`)
})

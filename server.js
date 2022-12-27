const express = require('express')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const path = require('path')
const app = express()

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors:{
        origin:'http://localhost:3000',
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


httpServer.listen(3001, ()=>{
    console.log('servers is listening on port 3001...')
})

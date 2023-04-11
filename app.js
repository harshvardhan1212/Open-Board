const express = require('express');//Access
const socket =  require('socket.io');

const app =express();//Initailized and server redy

app.use(express.static("public"));

let port = 3000;
let server = app.listen(port, () => {
    console.log("Listeing to port"+ port);
})

let io = socket(server);

io.on("connection",(socket)=>{
    console.log("Made socket connection");
})

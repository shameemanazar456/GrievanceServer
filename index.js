// file that runs in the backend

//1) import  dotenv

require('dotenv').config() // add environments variable to prcess.env

//2)import express

const express = require('express')

//3) import cors
const cors = require('cors')

//import router
const router = require('./router')

//import mongodb connection
const connection = require('./dataBase/connection')


//const connection = require('./db/connection')

//4) create server - express method used to create server

 const ProjectHelpMeServer = express()

 //5) use cors to connect with frontend
 ProjectHelpMeServer.use(cors())

 //6) json() - middleware - to convert json format to normal format
 ProjectHelpMeServer.use(express.json())

 //server use router
 ProjectHelpMeServer.use(router)

 //7)customize port for the server

 const PORT = 4000|| process.env.PORT

 //8) Run the server
ProjectHelpMeServer.listen(PORT,()=>{
    console.log(`HelpMe server running successfully at portnumber : ${PORT}`);
})


//get

ProjectHelpMeServer.get('/',(req,res)=>{
    res.send('get request recieved')
})


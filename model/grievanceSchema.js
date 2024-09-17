const mongoose = require('mongoose')
const grievanceSchema = new mongoose.Schema({
    userName:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String
    },
    complaint:{
        required:true,
        type:String
    },
    status:{
        type:String
    }


})

const grivances = mongoose.model('grivances', grievanceSchema)
module.exports = grivances
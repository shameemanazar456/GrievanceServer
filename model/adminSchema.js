const mongoose = require('mongoose')
const adminSchema = new mongoose.Schema({
    userName:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }


})

const users = mongoose.model('users', adminSchema)
module.exports = users
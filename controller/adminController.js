const users = require('../model/adminSchema')

exports.adminLogin = async(req,res)=>{
    console.log('inside admin login');
    const {userName, password} = req.body
    try{
    const admin = await users.findOne({userName,password})
    if(admin){
        res.status(200).json('Login Successfull ')
    }
    else{
        res.status(400).json('Invalid User Name or Password')
 
    }
    }
    catch(error){
        res.status(401).json('Internal Error')
    }
    

}
exports.getProfile = async(req,res)=>{
    try{
    const admin = await users.find()
    if(admin){
        res.status(200).json(admin)
    }
    else{
        res.status(400).json('Error')
 
    }
    }
    catch(error){
        res.status(401).json('Internal Error')
    }
    

}
exports.updateProfile = async(req,res)=>{
    const {_id, userName,password} = req.body
    //console.log(_id, userName,password);
    
    try{
    const admin = await users.findByIdAndUpdate({_id},{userName,password})
    if(admin){
        res.status(200).json(admin)
    }
    else{
        res.status(400).json('Error')
 
    }
    }
    catch(error){
        res.status(401).json('Internal Error')
    }
    

}


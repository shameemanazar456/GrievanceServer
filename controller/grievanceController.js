const nodemailer = require('nodemailer');

const grievances = require('../model/grievanceSchema')



//Complaint Registration controller function
exports.registerComplaint = async(req,res)=>{
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "henchman078@gmail.com",
      pass: "lbslalmglquvcnob",
    },
    });
    const {userName, email, complaint} = req.body
    try{
        const existingComplaint = await grievances.findOne({complaint})
        if(existingComplaint){
            console.log('inside existing');
            console.log(existingComplaint);
            
            res.status(406).json('Complaint Already Exist')
        }
        else{
            //object for the model
            const newComplaint = new grievances({
                userName,
                email,
                complaint,
                status:'pending'
            })
            await newComplaint.save() //to save the data in the mongodb
            try {
                await transporter.sendMail({
                  from: {
                    name:'Henchman Empire ',
                    address:'henchman078@gmail.com'},
                  //you can add your mailid here
                  to: 'henchman078@gmail.com',
                  subject: 'New Complaint Registration',
                  text:`User Name: ${userName} \n Email:${email} \n Complaint:${complaint}`,
                });
                res.status(200).json('Registration successful');
              } catch (error) {
                console.error('Error sending email:', error);
                res.status(403).json('Failed to send confirmation email');
              }
        }
    }
    catch(error){
        res.status(401).json('Internal Error')
    }
    

    
}

//function to get  grievances

exports.getGrievances = async(req,res)=>{
  //console.log('inside');
  const searchkey = req.query.search
  console.log(searchkey);
  
  
  try{
    const query = {
      status:{
          $regex:searchkey,$options:'i'//options: to remove case sensitivity
      }
  }
    const result = await grievances.find(query)
    //console.log(result);
    
    res.status(200).json(result);

  }
  catch (error) {
    res.status(400).json('Error in loading');
  }


}

exports.getSearchGrievances = async(req,res)=>{
  //console.log('inside');
  const searchkey = req.query.search
  console.log(searchkey);
  
  
  try{
    const query = {
      complaint:{
          $regex:searchkey,$options:'i'//options: to remove case sensitivity
      }
  }
    const result = await grievances.find(query)
    //console.log(result);
    
    res.status(200).json(result);

  }
  catch (error) {
    res.status(400).json('Error in loading');
  }


}


exports.updateGrievances = async(req,res)=>{
  const {_id, userName, email, complaint,status} = req.body
  console.log(_id, userName, email, complaint,status);
  
  try{
    const grievance = await grievances.findByIdAndUpdate({_id},{userName,email,complaint,status})
    await grievance.save()
    res.status(200).json('Updated Successfully')
  }
  catch (error) {
    res.status(400).json('Server Error');
  }

}

exports.deleteGrievances = async(req,res)=>{
  console.log('inside ');
  
  const {_id} = req.body
  console.log(_id);
  

  try{
    const grievance = await grievances.findByIdAndDelete({_id})
    res.status(200).json('Deleted Successfully')
  }
  catch (error) {
    res.status(400).json(`Request Failed due to ${error}`);
  }

}

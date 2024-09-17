//import express
const express = require('express')
//import grievance controller
const grievanceController = require('./controller/grievanceController')
//import admincontroller
const admincontroller = require('./controller/adminController')


//create  router using Router class in express library
const router = new express.Router()

//set path for grievance filing
router.post('/grievancefileing', grievanceController.registerComplaint)

//set path for admin login
router.post('/adminlogin', admincontroller.adminLogin)

//set path for get profile details
router.get('/getProfile', admincontroller.getProfile)

//set path for get profile details
router.put('/updateProfile', admincontroller.updateProfile)


//set path to get grievances
router.get('/getgrievances', grievanceController.getGrievances)

//set path to get searched grievances
router.get('/getSearchgrievances', grievanceController.getSearchGrievances)

//set path to update grievance
router.put('/grievanceUpdate', grievanceController.updateGrievances)

//set path to delete grievance
router.delete('/grievanceDelete', grievanceController.deleteGrievances)

//export router
module.exports = router
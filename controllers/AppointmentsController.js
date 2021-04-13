const router = require('express').Router()
const User = require('../models/User.js')
const Appointment = require('../models/Appointment.js')
const authLockedRoute = require('./authLockedRoute.js')

//show appointments
router.get('/:userId/appointments', async (req, res) => {
    try{
        const id = req.params.userId
        console.log(id)
        const user = await User.findById(id).populate('appointments')
        res.json(user.appointments)
    } catch(err) {
        console.log(err)
    }
})

//create an appointment
router.post('/:userId/appointments', async (req, res) => {
    try{
        const user = await User.findById(req.params.userId)
        if(user){
            const newAppointment = await Appointment.create({
                date: req.body.date,
                start: req.body.start,
                end: req.body.end,
                title: req.body.title
            })
            user.appointments.push(newAppointment)
            await user.save()
            res.json(newAppointment)
        }
    } catch(err) {
        console.log(err)

    }
})

//show one appointm
router.get('/:userId/appointments/:appointmentId', async (req, res) => {
    try{
        const user= await User.findById(req.params.userId)
        if(user){
            const appointment = await Appointment.findById(req.params.appointmentId)
            res.json(appointment)
        }
    } catch(err) {
        console.log(err)
    }
})


//delete appointm
router.delete('/:userId/appointments/:appointmentId', async (req, res) =>{
    try{
        const user= await User.findById(req.params.userId)
        if(user){
            const appointment = await Appointment.findByIdAndDelete(req.params.appointmentId)
            res.json({ msg: "Appointment Deleted!"})
        }
    } catch(err) {
        console.log(err)
    }
})


module.exports = router
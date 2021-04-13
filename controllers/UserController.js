const router = require('express').Router()
const User = require('../models/User.js')
const Appointment = require('../models/Appointment.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authLockedRoute = require('./authLockedRoute')


router.get('/', async (req, res) => {
    res.json({ msg:'hello from users!'})
})

//create user
router.post('/register', async (req, res) =>{
    try{
        const findUser = await User.findOne({
            email: req.body.email
        })
        if(findUser) return res.status(400).json({ msg: 'email already exists'})
        if(req.body.username === '') return res.status(400).json({ msg: 'Please enter username'})
        if(req.body.email === '') return res.status(400).json({ msg: 'Please enter email'})
        if(req.body.password === '') return res.status(400).json({ msg: 'Please enter password'})
    
        const password = req.body.password
        const saltRounds = 12
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username: req.body.username, 
            email: req.body.email, 
            password: hashedPassword,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            img: req.body.img,
            appointments: req.body.appointments
        })
        await newUser.save()

        const payload = {
            username: newUser.username,
            email: newUser.email, 
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            phone: newUser.phone,
            img: newUser.img,
            appointments: newUser.appointments
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 60 * 60})

        res.json({ token })
        
    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: 'Server Error'})
    }
})

//log in user
router.post('/login', async (req, res) =>{
    try{
        const foundUser = await User.findOne({
            email: req.body.email
        })
        const noLoginMessage = 'Incorrect username or password'
        if(!foundUser) return res.status(400).json({ msg: noLoginMessage })
        const matchPassword = await bcrypt.compare(req.body.password, foundUser.password)
        if(!matchPassword) return res.status(400).json({ msg: noLoginMessage })
        const payload = {
            username: foundUser.username,
            email: foundUser.email, 
            id: foundUser.id,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            phone: foundUser.phone,
            img: foundUser.img,
            appointments: foundUser.appointments,
            isBarber: foundUser.isBarber
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 60 * 60 })
        res.json({ token })
    } catch(err) {
        console.log(err)
        res.status(500).json({ msg: 'server error'})
    }
})

//show user 
router.get('/:userId/profile', async (req, res) =>{
    try{
        const id = req.params.userId
        const user = await User.findById(id) 
        res.json(user)
    } catch(err) {
        console.log(err)
    }
})

//update user
router.put('/:userId/profile', authLockedRoute, async (req, res) =>{
    try{
        const updatedUser = await User.findByIdAndUpdate({
            _id: req.params.userId
        }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            phone: req.body.phone,
            img: req.body.img,
            barber: req.body.barber 
        })
        res.json(updatedUser)
    } catch(err) {
        console.log(err)
    }
})

//delete user
router.delete('/:userId/profile', authLockedRoute, async (req, res) =>{
    try{
        const deletedUser = await User.findByIdAndDelete({
            _id: req.params.userId
        })
        res.json({ msg:'profile has been deleted'})
    } catch(err) {
        console.log(err)
    }
})

module.exports = router
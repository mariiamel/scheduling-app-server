const mongoose = require('mongoose')
const Appointment = require('./Appointment')

let availabilitySchema = new mongoose.Schema({
	monday: [],
	tuesday: [],
	wednesday: [],
	thursday: [],
	friday: [],
	saturday: [],
	sunday: []
})

const UserSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    phone: {
        type: String
    },
    img: {
        type: String
    },
    isBarber: {
        type: Boolean,
        required: true,
        default: false,
    },
    isClient: {
        type: Boolean,
        required: true,
        default: false,
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    }],
    favBarbers:[{
        name: String
    }],
    availability: availabilitySchema
}, {
    timestamps: true
})

const User = mongoose.model('user', UserSchema)
const Availability = mongoose.model('availability', availabilitySchema)

module.exports = { User, Availability }
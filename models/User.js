const mongoose = require('mongoose')

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
    barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barber',
    },
    isClient: {
        type: Boolean,
        required: true,
        default: false,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
    },
    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    }],
}, {
    timestamps: true
})

module.exports = User = mongoose.model('user', UserSchema)
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
    barber: {
        type: Boolean,
        required: true,
        default: false
    },
    client: {
        type: Boolean,
        required: true,
        default: false
    }
})

module.exports = User = mongoose.model('users', UserSchema)
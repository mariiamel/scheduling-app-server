let mongoose = require('mongoose')

let clientSchema = new mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	barber:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Barber'
	},
	appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    }],
})

module.exports = mongoose.model('Client', clientSchema)
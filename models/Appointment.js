let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	date: {
		type: String
	},
	time:{
		type: String
	},
	service: {
		type: String
	},
	barber: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
	client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

module.exports = Appointment = mongoose.model('Appointment', appointmentSchema)
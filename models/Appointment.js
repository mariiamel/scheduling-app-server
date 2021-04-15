let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	date: {
		type: String
	},
	time:{
		type: String
	},
	title:{
		type: String
	},
	service: {
		type: String
	},
	barber:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	},
	client:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Barber'
	}
})

module.exports = Appointment = mongoose.model('Appointment', appointmentSchema)
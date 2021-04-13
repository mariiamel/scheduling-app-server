let mongoose = require('mongoose')

let appointmentSchema = new mongoose.Schema({
	date: {
		type: String
	},
	start:{
		type: String
	},
	end: {
		type: String
	},
	title:{
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
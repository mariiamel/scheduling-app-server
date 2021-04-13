let mongoose = require('mongoose')

let availabilitySchema = new mongoose.Schema({
	0: [],
	1: [],
	2: [],
	3: [],
	4: [],
	5: [],
	6: [],
})

let stylistSchema = new mongoose.Schema({
	user:{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	client:[{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Client'
	}],
	appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
        required: false
    }],
	availability: availabilitySchema,
})

module.exports = mongoose.model('Stylist', stylistSchema)
module.exports = mongoose.model('Availability', availabilitySchema)
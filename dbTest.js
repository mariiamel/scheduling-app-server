const db = require('./models')
const {User, Availability } = require('./models/User.js')

const createUser = async () => {
    const createAvail = await Availability.create({
        monday: ['09:00', '10:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
    })
    const createUser = await User.create({
        userName: "mariiam",
        email: 'emailTest@gmail.com',
        password: '1212',
        isBarber: true,
        availability: createAvail
    })
    await createUser.save()
    console.log(createUser, '🆎')
}

createUser()
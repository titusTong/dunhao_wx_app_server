const {User} = require('./UserModel');
const {Trip} = require('./TripModel');



const InitDB = async () => {
    await User.sync({ alter: true });
    await Trip.sync({ alter: true })
}



module.exports = InitDB;
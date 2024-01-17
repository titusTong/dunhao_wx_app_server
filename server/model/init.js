const {User} = require('./UserModel')





const InitDB = async () => {
    await User.sync({ alter: true });
}



module.exports = InitDB;
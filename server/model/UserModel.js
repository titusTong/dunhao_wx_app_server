
const sequelize = require('../../db');

const Sequelize = require('sequelize');


const User = sequelize.define('User', {
    id:{
        type:Sequelize.BIGINT,
        primaryKey: true, //主键
        autoIncrement:true,
    },
    name:Sequelize.STRING(100),
    userType:Sequelize.INTEGER, // 0或者1,0是普通用户（导游），1是管理员；
    area:Sequelize.STRING(10), //导游所在地区
    telNumber:Sequelize.STRING(20), // 导游电话
})




const GetUser = async (options) => {
    // 一般通过电话号查询。微信获取到电话号后，通过电话号查询已经注册的用户。
    console.log(options);
    return await User.findOne({ where: {telNumber: options.telNumber}})
}

const findOrCreateUser = async (options) => {
    return await User.findOrCreate({
        where:{telNumber:options.telNumber},
        defaults:options,
    })
}

module.exports = { GetUser, findOrCreateUser, User}

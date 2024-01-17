
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
    openId:Sequelize.STRING(50), // 用户的openid
})




const GetUser = async (options) => {
    // 一般通过电话号查询。微信获取到电话号后，通过电话号查询已经注册的用户。
    console.log(options);
    return await User.findOne({ where: {openId: options.openId}})
}

const findOrCreateUser = async (options) => {
    return await User.findOrCreate({
        where:{openId:options.openId},
        defaults:options,
    })
}

module.exports = { GetUser, findOrCreateUser, User}

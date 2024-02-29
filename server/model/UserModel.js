
const sequelize = require('../../db');

const Sequelize = require('sequelize');
const { Op } = require("sequelize");


const User = sequelize.define('User', {
    id:{
        type:Sequelize.BIGINT,
        primaryKey: true, //主键
        autoIncrement:true,
    },
    name:Sequelize.STRING(100),
    userType:Sequelize.INTEGER, // 1或者2,2是普通用户（导游），1是管理员；
    area:Sequelize.STRING(100), //导游所在地区
    openId:Sequelize.STRING(50), // 用户的openid
})




const GetUser = async (options) => {
    // 通过openid查询用户
    console.log(options);
    return await User.findOne({ where: {openId: options.openId}})
}

const findOrCreateUser = async (options) => {
    return await User.findOrCreate({
        where:{openId:options.openId},
        defaults:options,
    })
}

const findUserByParams = async (search) => {
    return await User.findAll({
        where:{
            userType:2,
            [Op.or]: [
            {name: {[Op.like]: `%${search || ''}%`}},
            {area: {[Op.like]: `%${search || ''}%`}},
        ]},
    })
}

module.exports = { GetUser, findOrCreateUser, findUserByParams, User}

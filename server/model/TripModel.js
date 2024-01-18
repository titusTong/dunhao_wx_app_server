const sequelize = require('../../db');

const Sequelize = require('sequelize');


const Trip = sequelize.define('Trip', {
    id:{
        type:Sequelize.BIGINT,
        primaryKey: true, //主键
        autoIncrement:true,
    },
    operator:Sequelize.STRING, // 操作人
    date:Sequelize.STRING, // 团期
    createPersonOpId:Sequelize.STRING, // 创建人的openId
    inArea:Sequelize.STRING, // 入境点
    outArea:Sequelize.STRING, // 出境点
    remark:Sequelize.STRING, // 备注
    guideType:Sequelize.STRING, // 司兼导or司导分
    guide:Sequelize.STRING, // 导游姓名
    guideOpenId:Sequelize.STRING, // 导游的openId
})



const findOrCreateTrip = async (options) => {
    return await Trip.findeOrCreate({
        where : {
            date:options.date,
            guideOpenId:options.guideOpenId,
        },
        defaults:options
    })
}

const findAllTrip = async (options) => {
    return await Trip.findAll({
        where:{
            options
        }
    })
}

module.exports = {findOrCreateTrip, findAllTrip, Trip}



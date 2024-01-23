const sequelize = require('../../db');

const Sequelize = require('sequelize');


const Trip = sequelize.define('Trip', {
    id:{
        type:Sequelize.BIGINT,
        primaryKey: true, //主键
        autoIncrement:true,
    },
    tripName:Sequelize.STRING, // 团名
    operator:Sequelize.STRING, // 操作人
    date:Sequelize.STRING, // 团期,
    color:Sequelize.STRING, // 日历上显示的颜色
    createPersonOpId:Sequelize.STRING, // 创建人的openId
    inArea:Sequelize.STRING, // 入境点
    outArea:Sequelize.STRING, // 出境点
    remark:Sequelize.STRING, // 备注
    guideType:Sequelize.STRING, // 司兼导or司导分

    guideOpenId:Sequelize.STRING, // 导游的openId，
    monthDate:Sequelize.STRING, // 用于查询的字段。无业务逻辑
})



const findOrCreateTrip = async (options) => {
    return await Trip.findOrCreate({
        order: [[ 'createTime', 'DESC' ]],
        where : {
            date:options.date,
            guideOpenId:options.guideOpenId,
        },
        defaults:options
    })
}

const findAllTrip = async (options) => {
    return await Trip.findAll({
        where:options
    })
}

const getTripById = async (id) => {
    return await Trip.findOne({
        where:{id}
    })
}

const updateTrip = async (options) => {
    return await Trip.update(options, {
        where: {
            id: options.id
        }
    })
}

const delTrip = async (options) => {
    return await Trip.destroy ({
        where:{id:options.id}
    })
}

module.exports = {findOrCreateTrip, findAllTrip, updateTrip, delTrip, getTripById, Trip}



const {findAllTrip} = require('../../model/TripModel');
const { Op } = require("sequelize");

// const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');


// 获取行程列表的接口：/api/trip/findAllTripByOperator
// 请求方式：post
// 参数：content: 导游名或者团名


module.exports = async (ctx, next) => {

    let params = methodBody(ctx);

    let res = await findAllTrip({
        createPersonOpId:ctx.header['x-wx-openid'],
        [Op.or]: [
            {guideName: {[Op.like]: `%${params.content || ''}%`}},
            {tripName: {[Op.like]: `%${params.content || ''}%`}},
        ]
    })

    let datalist = res.map(item => {
        let dateArr = item.dataValues.date.split(',');
        item.dataValues.dateString = `${dateArr[0]} 至 ${dateArr[dateArr.length-1]}`;
        return item;
    })

    return {
        code:1,
        data:datalist,
        msg:'成功'
    }

}
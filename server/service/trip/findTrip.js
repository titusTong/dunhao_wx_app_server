const {findAllTrip} = require('../../model/TripModel');
const { Op } = require("sequelize");

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 获取行程列表的接口：/api/trip/findTrip
// 请求方式：post
// 参数：
// openId-导游的openid
// monthDate-年月。例如：2024-03

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    if(!params.openId) {
        params.openId = ctx.header['x-wx-openid'];
    }

    let rules={
        openId:'required|string', // 导游的openId
        monthDate:'required|string', // 月份， 例如：2024-03
    }

    paramsCheck(params, rules);

    // 获取前一个月和后一个月

    const addMonth = (date, offset) => {
        let newDate = new Date(date);
        if (newDate instanceof Date && !isNaN(offset)) {
            let givenMonth = newDate.getMonth();
            let newMonth = givenMonth + offset;
            newDate.setMonth(newMonth);
            return `${newDate.getFullYear()}-${newDate.getMonth()+1 <= 9 ? `0${newDate.getMonth()+1}` : newDate.getMonth()+1}`;
        }
    }
    
    let options = {
        guideOpenId:params.openId,
        monthDate:{
            [Op.or]:[
                {[Op.like]: `%${addMonth(params.monthDate, -1) || ''}%`},
                {[Op.like]: `%${params.monthDate || ''}%`},
                {[Op.like]: `%${addMonth(params.monthDate, +1) || ''}%`}
            ]
        },
    }

    let res = await findAllTrip(options)

    let datalist = res.map(item => {
        let dateArr = item.date.split(',');
        item.dateString = `${dateArr[0]} 至 ${dateArr[dateArr.length-1]}`;
        return item;
    })

    
    return {
        code:1,
        data:datalist,
        msg:'成功'
    }
}
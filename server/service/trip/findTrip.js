const {findAllTrip} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 获取行程列表的接口：/api/trip/findTrip
// 请求方式：post
// 参数：
// openId-导游的openid
// monthDate-年月。例如：2024-03

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules={
        openId:'required|string', // 导游的openId
        monthDate:'required|string', // 月份， 例如：2024-03
    }

    paramsCheck(params, rules);

    let options = {
        guideOpenId:params.openId,
        monthDate:{
            [Op.like]: `%${params.monthDate || ''}%`
        }
    }

    let res = await findAllTrip(options)

    
    return {
        code:1,
        data:res,
        msg:'成功'
    }
}
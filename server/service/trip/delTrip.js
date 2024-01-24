const {delTrip} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 删除行程接口：/api/trip/delTrip
// 请求方式：post
// 参数：id-行程的id


module.exports = async (ctx, next) => {
    let params = methodBody(ctx);
    
    let rules = {
        id:'required|string'
    }

    paramsCheck(params, rules);

    let res = await delTrip(params)

    return {
        code:0,
        data:res,
        msg:'成功'
    }

}
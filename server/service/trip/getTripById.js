const {getTripById} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 编辑行程的时候，获取行程详情接口：/api/trip/getTripById
// 请求方式：post
// 参数：id-行程id

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules={
        id:'required|string', // 行程id
    }

    paramsCheck(params, rules);

    let res = await getTripById(params.id)

    return {
        code:1,
        data:res,
        msg:"成功"
    }
}
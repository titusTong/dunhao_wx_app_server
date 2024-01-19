const {updateTrip} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');


module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules = {
        id:'required|string', // 行程id
        operator:'required|string', // 操作人
        date:'required|string', // 团期
        inArea:'required|string', // 入境点
        outArea:'required|string', // 出境点
        guideType:'required|number', // 司兼导or司导分, 1是司兼导2是司导分
        remark:'required|string', // 备注

        guide:'required|string', // 导游姓名
        guideOpenId:'required|string', // 导游的openId

        createPersonOpId:'required|string', // 创建人的openId
    }

    paramsCheck(params, rules);

    let res = await updateTrip(params);

    return {
        code:1,
        data:res,
        msg:'成功'
    }
}
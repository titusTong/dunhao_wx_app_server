const {updateTrip} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 修改更新行程接口：/api/trip/updateTrip
// 请求方式：post
// 参数：如下rules


module.exports = async (ctx, next) => {
    let params = methodBody(ctx);
    let userType = ctx.header.userType;

    let rules = {};

    if(userType == '1') {
        // 管理员
        rules = {
            id:'required|string', // 行程id
            tripName:'required|string', // 团名称
            operator:'required|string', // 操作人
            date:'required|string', // 团期
            inArea:'required|string', // 入境点
            outArea:'required|string', // 出境点
            guideType:'required|string', // 司兼导or司导分, 1是司兼导2是司导分
            remark:'string', // 备注
    
            guideOpenId:'required|string', // 导游的openId
            color:'required|string', // 创建时候的颜色
    
            createPersonOpId:'required|string', // 创建人的openId
        }
    } else {
        rules = {
            id:'required|string', // 行程id
            tripName:'string',
            date:'required|string', // 团期
            remark:'string', // 备注

            guideOpenId:'required|string', // 导游的openId
            color:'required|string', // 创建时候的颜色
    
            createPersonOpId:'required|string', // 创建人的openId
        }
    }

    paramsCheck(params, rules);

    // 为了查询用，设置字段monthDate；
    let date = params.date.split(',');
    let start = date[0];
    let end = date[date.length-1]

    startMonth = start.slice(0, start.length - 3)
    endMonth = end.slice(0, end.length-3);

    if(startMonth == endMonth) {
        params.monthDate = startMonth
    } else {
        params.monthDate = `${startMonth}, ${endMonth}`
    }

    let res = await updateTrip(params);

    return {
        code:1,
        data:res,
        msg:'成功'
    }
}
const {findOrCreateTrip} = require('../../model/TripModel');

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 添加行程接口：/api/trip/createTrip
// 请求类型：post
// 参数：如下rules


const rdmRgbColor = () => {
    //随机生成RGB颜色
    const arr = [];
    for (let i = 0; i < 3; i++) {
      // 暖色
      // arr.push(Math.floor(Math.random() * 128 + 64));
      // 亮色
      arr.push(Math.floor(Math.random() * 128 + 128));
    }
    const [r, g, b] = arr;
    // rgb颜色
    // var color=`rgb(${r},${g},${b})`;
    // 16进制颜色
    const color = `#${
      r.toString(16).length > 1 ? r.toString(16) : "0" + r.toString(16)
    }${g.toString(16).length > 1 ? g.toString(16) : "0" + g.toString(16)}${
      b.toString(16).length > 1 ? b.toString(16) : "0" + b.toString(16)
    }`;
    return color;
}

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);
    params.createPersonOpId = ctx.header['x-wx-openid'];

    // 判断下是否是管理员创建的团。拿到openid查询用户

    let userType = ctx.header.userType;
    let rules = {}
    if(userType == '1') {
        rules = {
            tripName:'required|string', // 团名称
            operator:'required|string', // 操作人
            date:'required|string', // 团期
            inArea:'required|string', // 入境点
            outArea:'required|string', // 出境点
            guideType:'required|number', // 司兼导or司导分, 1是司兼导2是司导分
            remark:'string', // 备注
    
            guide:'required|string', // 导游姓名
            guideOpenId:'required|string', // 导游的openId
    
            createPersonOpId:'required|string', // 创建人的openId
        }
    } else if(userType == '2') {
        rules = {
            tripName:'string',
            date:'required|string', // 团期
            remark:'string', // 备注

            guide:'required|string', // 导游姓名
            guideOpenId:'required|string', // 导游的openId
    
            createPersonOpId:'required|string', // 创建人的openId
        }
    }

    paramsCheck(params, rules);

    // 创建一个随机颜色；
    params.color = rdmRgbColor();

    let [trip, created] = await findOrCreateTrip(params);

    if(created) {
        return {
            code:1,
            data:trip,
            msg:'成功'
        }
    } else {
        return {
            code:0,
            data:{},
            msg:"导游在该日期行程已经创建，请选择其他日期创建行程。"
        }
    }
}

const {findOrCreateUser} = require('../../model/UserModel');
const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');


// 注册接口地址：/api/author/register
// 请求方式：post
// 参数：
// name-用户名
// telNumber-用户手机号
// area-地区

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules = {
        name:'required|string',
        userType:'required|number', // 1或者2 ,2是普通用户（导游），1是管理员；
        area:'required|string', //导游所在地区
    }

    params.userType = 2; //写死所有人注册都是0；后台改管理员
    paramsCheck(params, rules);

    params.openId = ctx.header.X-WX-OPENID;

    let [user, created] = await findOrCreateUser(params);
    console.log(user, created);
    if(created) {
        return {
            code:1,
            data:res,
            msg:'成功'
        }
    } else {
        return {
            code:0,
            data:{},
            msg:`用户已存在，无需注册，请用手机号为${user.dataValues.telNumber}的微信登录`
        }
    }
    
}
const {GetUser} = require('../../model/UserModel');
// const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 查询用户：/api/author/GetUser
// 请求方式：post
// 参数：
// telNumber-从微信获取的手机号


module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    // let rules = {
    //     telNumber:'required|string',
    // }

    // paramsCheck(params, rules);

    console.log(ctx.header);

    let openId = ctx.header.X-WX-OPENID;


    let userInfo = await GetUser({openId})
    
    if(userInfo) {
        return {
            code:1,
            data:userInfo,
            msg:'成功'
        }
    
    } else {
        return {
            code:0,
            data:{},
            msg:'用户不存在，请注册'
        }
    }
    
}
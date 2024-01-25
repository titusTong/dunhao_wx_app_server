const {findOrCreateUser} = require('../../model/UserModel');
const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');


// 注册接口地址：/api/author/register
// 请求方式：post
// 参数：
// name-用户名
// area-地区
// inviteCode-邀请注册码；

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);
    params.openId = ctx.header['x-wx-openid'];

    let rules = {
        name:'required|string',
        userType:'required|number', // 1或者2 ,2是普通用户（导游），1是管理员；
        area:'required|string', //导游所在地区
        openId:'required|string',
        inviteCode:'required|string'
    }

    paramsCheck(params, rules);

    if((params.userType == 1 && params.inviteCode.trim() == 'dunhao789') || (params.userType == 2 && params.inviteCode.trim() == 'dunhaopaiqi')) {
        let [user, created] = await findOrCreateUser(params);
        console.log(user, created);
        if(created) {
            return {
                code:1,
                data:user,
                msg:'成功'
            }
        } else {
            return {
                code:0,
                data:{},
                msg:`用户已存在，无需注册，请用${user.dataValues.name}的微信登录`
            }
        }
    } else {
        return {
            code:0,
            data:{},
            msg:'邀请码不正确，请联系管理员索要正确的邀请码'
        }
    }
    
}
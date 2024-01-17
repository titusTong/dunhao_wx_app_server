// 因为用微信云托管，本接口废弃。

const {GetUser} = require('../../model/UserModel');
const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');
const sendFetch = require('../../../utils/fetch');

// 通过code获取用户信息接口: /api/author/code2User
// 请求方式：post
// 参数：
// code-微信给的code

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules = {
        code:'required|string',
    }

    paramsCheck(params, rules);

    let url = 'https://api.weixin.qq.com/wxa/business/getuserphonenumber';// 微信获取手机号接口；

    let telNumberRes = await sendFetch(url, {code:params.code});
    console.log(telNumberRes);
    if(telNumberRes.errcode == 0) {
        // 成功；
        let telNumber = telNumberRes.phone_info.phoneNumber;
        // 查询用户信息；
        let userInfo = await GetUser({telNumber});
        if(userInfo) {
            return {
                code:1,
                data:userInfo,
                msg:'成功'
            }
        } else {
            return {
                code:0,
                data:{telNumber},
                msg:'用户不存在，请注册'
            }
        }
    } else {
        return {
            code:-1,
            data:{},
            msg:`失败,${telNumberRes.errmsg}`,
        }
    }
    
}



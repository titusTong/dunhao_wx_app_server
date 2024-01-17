const {GetUser} = require('../../model/UserModel');
// const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');

// 查询用户：/api/author/getUser
// 请求方式：get


module.exports = async (ctx, next) => {
    let openId = ctx.header['x-wx-openid'];

    let userInfo = await GetUser({openId})
    
    return {
        code:1,
        data:userInfo,
        msg:'成功'
    }
}
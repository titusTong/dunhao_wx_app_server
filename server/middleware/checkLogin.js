
const {GetUser} = require('../model/UserModel');


module.exports = async (ctx,next) => {
    let openId = ctx.heder['x-wx-openid'];
    // 白名单；
    let api = ctx.request.url.split('/')[3];
    let apiArr = ['register',];
    if(apiArr.indexOf(api) !== -1) return true;


    if(session.account) {
        let res = await GetUser({openId});
        if(res && res.id) return true;
    }
    return false
}
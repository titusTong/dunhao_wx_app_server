
const {GetUser} = require('../model/UserModel');


module.exports = async (ctx,next) => {
    let openId = ctx.header['x-wx-openid'];
    // 白名单；
    let api = ctx.request.url.split('/')[3];
    console.log(api)
    let apiArr = ['register',];
    if(apiArr.indexOf(api) !== -1) return true;


    if(openId) {
        let res = await GetUser({openId});
        if(res && res.id) {
            ctx.header.userType = res.userType;
            return true;
        }
    }
    return false
}
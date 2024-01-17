
const {GetUser} = require('../model/UserModel');


module.exports = async (ctx,next) => {
    let session = ctx.session;
    // 白名单；
    let api = ctx.request.url.split('/')[2];
    let apiArr = ['author', 'chat', 'apikey', 'payment', 'program', 'copilot'];
    if(apiArr.indexOf(api) !== -1) return true;


    if(session.account) {
        let res = await GetUser({tel:session.account});
        if((res.length === 1) && (res[0].account.length === 11)) return true;
    }
    return false
}
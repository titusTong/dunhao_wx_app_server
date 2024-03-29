
const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');
const fetch = require('node-fetch');


module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    let rules = {fileName: 'required|string'} // 文件名

    paramsCheck(params, rules);

    let url = 'https://api.weixin.qq.com/tcb/uploadfile';
    let body = {env:'prod-5gaf0xgg89478f9e', path:params.fileName}

    let wxRes = await fetch(url, {
        method:'POST',
        body:JSON.stringify(body),
    })

    jsonResa = await wxRes.json()

    return jsonResa;
}
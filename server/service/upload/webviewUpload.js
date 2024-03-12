

const paramsCheck = require('../../../utils/paramsCheck');
const methodBody = require('../../../utils/methodBody');
const fetch = require('node-fetch');


module.exports = async (ctx, next) => {

    let url = 'https://api.weixin.qq.com/tcb/uploadfile';
    let body = {env:'prod-5gaf0xgg89478f9e', path:'cloud://prod-5gaf0xgg89478f9e.7072-prod-5gaf0xgg89478f9e-1323848466/'}

    let wxRes = await fetch(url, {
        method:'POST',
        body:JSON.stringify(body),
    })

    jsonResa = await wxRes.json()

    return jsonResa;
}
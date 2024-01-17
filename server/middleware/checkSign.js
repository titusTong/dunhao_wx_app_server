const NodeRSA = require('node-rsa');
const crypto = require('crypto');
const publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCv2zz8gZaAhm/8izIildla1hMJtcKpuso0rw39fPzoiPE5DowPu33T0wvU97h4ROiY1m3YIs8iXmwGE55LNoi2eHPO5eT/APx5Ps7K2WZ5t46I8ZhYv8YrgPtRHHSlsoRi2if+p3NS2xm8hBm+aASzp1/Db9fiRtBr1Ez7tJPntQIDAQAB-----END PUBLIC KEY-----';

const privateKey = '-----BEGIN PRIVATE KEY-----MIICeAIBADANBgkqhkiG9w0BAQEFAASCAmIwggJeAgEAAoGBAK/bPPyBloCGb/yLMiKV2VrWEwm1wqm6yjSvDf18/OiI8TkOjA+7fdPTC9T3uHhE6JjWbdgizyJebAYTnks2iLZ4c87l5P8A/Hk+zsrZZnm3jojxmFi/xiuA+1EcdKWyhGLaJ/6nc1LbGbyEGb5oBLOnX8Nv1+JG0GvUTPu0k+e1AgMBAAECgYBLp/OF4q6AHtZg/PWVwYggN0c7fzH/WXgS0FkhfDtGQ1wcIvEI9627iullNynqvCKhVmctfFRGwf6RYrFQRGbt+wQKaSv2WIMpwC+KUwgxb1KSzJyjUyt45FEGf8/dDf4dabKD/VSgbKIzqH+d3isVAlDk1wm7ExfVdeAOUw+dpQJBAN4ivl48boTjGCvcvFmSxm1uv/3J91aW7Ehe3FLdXqUTB1a4XDEjMj+AswnsJ2isx7yq32oa7mDCsrY94rfbN/MCQQDKqlvaQJ28mJ5gX7mLj+0BCHn54rOHW6VQeSEJ2mwuLrDx/9JnarSmEeuk8x9wW6SAgMyrlNHcWSt1syx2QLO3AkEAiUz4Vc8MkN69Rf89/C+YrnNSAFAhrUfD7EeV7zIdGfNVCekSMt0KZe3qvCtXgH+rRZZoWXEj/nLZe4Ns6y94uQJBAIJvACzId3yA8TVvhlg3Kj8G+JIGAKt2JUBUpRnVVNioPkOR9RWQDHHxiKqhurMyl/4IZzFq12IslZbr2QrGe6MCQQCM1hU3vr0FDoga7JplkVt2QNvIXc63KqNNosYlRF5jMntEpWzl4Twj6HPGsQCCLDhefuWWCn0Vc6572xn9j9oU-----END PRIVATE KEY-----';

const methodBody = require('../../utils/methodBody');

const key = new NodeRSA(publicKey, 'public')

module.exports = async (ctx,next) => {
    if (ctx.method === 'OPTIONS') return true;

    // 设置验签白名单；
    let api = ctx.request.url;
    let path = api.match(/^\/api\/([^?]*)/)[1];

    let witeArr = ['payment/payRes', 'author/createUserAdmin', 'apikey/setApiKey'];
    if(witeArr.indexOf(path) !== -1) return true;

    const params = methodBody(ctx);
    const headers = ctx.headers;

    const hash = crypto.createHash('sha256').update(JSON.stringify(params)).digest('hex');
    return key.verify(hash, headers.sign || '', 'utf8', 'base64')
}
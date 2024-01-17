const fetch = require('node-fetch');



module.exports = async (api, params, type="post") => {
    
    if(typeof api !== 'string') {
        throw Error('api参数应为字符串')
    }
    if(typeof params !== 'object') {
        throw Error('params参数应为对象')
    }
    if(typeof type !== 'string') {
        throw Error('type参数应为字符串')
    }

    let apiUrl = api;
    let options = {};
    if(type === 'post') {
        options = {
            method:'POST',
            body:JSON.stringify(params),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
    } else {
        let paramsArray = [];
        Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
        if(apiUrl.search(/\?/)===-1) {
            apiUrl += '?' + paramsArray.join('&')
        } else {
            apiUrl += '&' + paramsArray.join('&')
        }
    }
    let res = await fetch(apiUrl, options)
    return await res.json();
}
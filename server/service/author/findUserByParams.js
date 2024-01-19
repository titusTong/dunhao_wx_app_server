const {findUserByParams} = require('../../model/UserModel');
const methodBody = require('../../../utils/methodBody');

// 获取所有导游的接口：/api/author/findUserByParams
// 请求方式：post
// 参数：
// name-导游姓名
// area-导游区域

module.exports = async (ctx, next) => {
    let params = methodBody(ctx);

    

    let res = await findUserByParams(params={})

    console.log(res);
}
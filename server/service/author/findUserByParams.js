const {findUserByParams} = require('../../model/UserModel');
const methodBody = require('../../../utils/methodBody');

// 获取所有导游的接口：/api/author/findUserByParams
// 请求方式：post
// 参数：
// content:需要查找的内容

module.exports = async (ctx, next) => {
    let params = methodBody(ctx)||{};

    let res = await findUserByParams(params.content)
    return {
        code:1, 
        data:res,
        msg:'成功'
    }
}
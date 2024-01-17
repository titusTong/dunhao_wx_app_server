// 处理参数工具，目前不支持form-data；
module.exports = methodBody = (ctx, next) => ctx.request.method === 'GET' ? ctx.request.query : ctx.request.body;
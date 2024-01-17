const Router = require('koa-router');
const router = new Router();


const routerUtils = (outerCtx) => {
    let method = outerCtx.request.method.toLowerCase();

    let apiPath = outerCtx.request.url.split('?')[0];
    router[method](apiPath, async (ctx, next)=> {
        // 路由中间件, 所有路由都走这里；
        // ......
        
        // 验签中间件；
        // const checkSign = await require('../middleware/checkSign')(ctx, next);
        // if(!checkSign) return ctx.body = {code:-1001, data:{}, msg:'参数验签不通过'}


        // 验证登录状态中间件；
        // await require('...')(ctx,next);
        
        let isLogin = await require('../middleware/checkLogin')(ctx, next);
        if(!isLogin) return ctx.body = {code:-100, data:{}, msg:'非注册用户，请注册'}


        // 业务路由
        // if(ctx.request.url.split('/')[1] !== 'api') {
        //     // 只要不是api接口地址路由，都返回前端页面；
        //     ctx.type='html'
        //     ctx.body = fs.createReadStream("dist/index.html");
        // };

        try {
            let path = '';
            method === 'get' && ctx.request.url.indexOf('?') !== -1 ?
            path = ctx.request.url.match(/\/api(\S*)\?/)[1] : 
            path = ctx.request.url.match(/\/api(\S*)/)[1]
            ctx.body = await require(`.${path}`)(ctx, next);
        }
        catch (err) {
            ctx.body = {
                code:-1,
                data:{},
                msg:err.toString().split('Error: ')[1]
            };
        }
    })

    return router;
}

module.exports = routerUtils;

const Koa = require('koa2');
const convert = require('koa-convert');
const koaBody = require('koa-body');
const static = require('koa-static');
const logger = require('koa-logger');
const router = require('./server/service/routers');
const InitDB = require('./server/model/init.js');

// const session = require('koa-session');

const path = require('path');

const app = new Koa();
// 为了获取真实ip
app.proxy=true;

const UTCtoLocalSecond = (utc) => new Date(+new Date(utc)+8*3600*1000).toISOString().replace("T", ' ').replace("Z", '').slice(0, -4);

app.use(logger((str) => {
    console.log(str + ' ' + UTCtoLocalSecond(new Date()))
}));



app.use(koaBody({multipart: true}));


// app.keys = ['secret']
// const CONFIG = {
//     key: 'koa:sess',
//     maxAge: 7*24*60*60*1000,
//     overwrite: true,
//     httpOnly: true,
//     signed: true,
//     rolling: false,
//     sameSite: 'none'
// };

// app.use(session(CONFIG, app));

app.use(static(path.join(__dirname, 'dist')));

// 设置跨域
app.use(async (ctx, next) => {

    ctx.set("Access-Control-Allow-Origin", ctx.headers.origin);
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, sign');
    ctx.set("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    ctx.set("Access-Control-Allow-Credentials", "true");
    ctx.set('Access-Control-Max-Age', 60 * 60 * 24 * 7) // 缓存预检时间
    ctx.set("Content-Type", "application/json;charset=utf-8");
    await next();
})


app.use(async (ctx, next) => {
    app.use(router(ctx).routes())
    .use(router(ctx).allowedMethods())
    await next()
})

const initmysql = async () => {
    await InitDB();
}

initmysql();

module.exports = app;

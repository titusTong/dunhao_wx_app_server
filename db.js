const { Sequelize } = require("sequelize");

// // 从环境变量中读取数据库配置, 线上
// const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

// const [host, port] = MYSQL_ADDRESS.split(":");

// const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
//   host,
//   port,
//   dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
// });



// 测试开发环境

let config = {
    database:'admin',
    username:'root',
    password:'tong1ling..',
    host:'titustong.asuscomm.com',
    port:'49154'
}




const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port:config.port,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

// 定义数据模型
// const Counter = sequelize.define("Counter", {
//   count: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 1,
//   },
// });

// // 数据库初始化方法
// async function init() {
//   await Counter.sync({ alter: true });
// }

// 导出初始化方法和模型
module.exports = sequelize;

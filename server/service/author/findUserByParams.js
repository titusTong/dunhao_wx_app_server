const {findUserByParams} = require('../../model/UserModel');
const methodBody = require('../../../utils/methodBody');
const {isTimeOverlap} = require('../../../utils/tools');
const { findAllTrip } = require('../../model/TripModel');
const { Op } = require("sequelize");

// 获取所有导游的接口：/api/author/findUserByParams
// 请求方式：post
// 参数：
// content:需要查找的内容

module.exports = async (ctx, next) => {
    let params = methodBody(ctx)||{};

    let res = await findUserByParams(params.content)

    if(params.startTime && params.endTime) {
    
        // 根据行程找出没有时间的导游id；然后剔除掉；
        let options = {
            monthDate:{
                [Op.or]:[
                    {[Op.like]: `%${ params.startTime.slice(0, 6) }%`},
                    {[Op.like]: `%${ params.endTime.slice(0, 6) }%`},
                ]
            },
        }
        // 获取满足月份的行程
        let tripRes = await findAllTrip(options)

        let unavailableGuideIdArr = [];
        let availableGuides = [];
        // 再仔细对比时间；
        tripRes.map(item => {
            let dateArr = item.dataValues.date.split(',');
            let index = dateArr.length-1;
            let checkTime = isTimeOverlap(params.startTime, params.endTime, dateArr[0], dateArr[index])
            if(checkTime) {
                unavailableGuideIdArr.push(item.dataValues.guideOpenId);
            }
        })

        res.map(item => {
            if(unavailableGuideIdArr.indexOf(item.dataValues.openId) === -1) {
                availableGuides.push(item);
            }
        })
        
        res = availableGuides;
    }

    return {
        code:1, 
        data:res,
        msg:'成功'
    }
}
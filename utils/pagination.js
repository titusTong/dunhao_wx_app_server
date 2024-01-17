
/**
 * 分页组件
 *
 * @param {*} Obj 表名称
 * @param {*} query 查询参数
 */
module.exports = async (Obj, query) => {
    let pageParams = {pageSize:parseInt(query.pageSize || 50, 10), current:parseInt(query.current || 1, 10)};
    delete query.pageSize;
    delete query.current;

    let total = await Obj.find(query).countDocuments((err, count)=> count);
    let result = await Obj.find(query).sort({'updatedAt':-1})
    .limit(pageParams.pageSize)
    .skip((pageParams.current -1) * pageParams.pageSize)
    .exec()
    return {
        code:1,
        data:{
            list:result,
            total:total
        }
    }
}
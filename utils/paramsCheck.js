/**
 * 
 * Created by tongshuo at 2021/01/22
 * 
 * let rules = {
 *     'uid': 'required|min:1',
 *     'filter': 'in:1,2,3',
 *     'category': 'array'
 * }
 * 
 * 选填，自定义异常信息
 * let message = {
 *     'uid.required': 'uid 是必须的',
 *     'uid.numeric': 'uid 必须是数字',
 *     'filter.in': 'filter 必须在(1,2,3)范围内',  
 *     'category.array': 'category 必须为数组'
 * }
 * 
 * paramsCheck(params, rules, message)
 * 
 */


const paramsCheck = (input, rules, message={}) => {
    
    let msgKey;

    for (let field in rules) {
        rules[field].split('|').forEach(rule => {
            // message key name
            msgKey = `${field}.${rule}`;
            // is required
            if(rule === 'required') {
                if(!!input[field] === false) {
                    let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 不能为空`;
                    throw new Error(msg);
                }
                return true;
            };
            // is not required
            if(!!input[field] === false) return true;
            // special rule
            if(rule.indexOf(':') > 0) {
                let checkRule = rule.split(':');
                msgKey = `${field}.${checkRule[0]}`;
                switch(checkRule[0]) {
                    case 'in':
                        let ruleData = checkRule[1].split(',');
                        // Array
                        if(ruleData instanceof Array === true) {
                            field = field.toString();
                            input[field] = input[field].toString();
                            if(ruleData.indexOf(input[field]) === -1) {
                                let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 非法`;
                                throw new Error(msg);
                            }
                        } else {
                            let msg = '规则设置错误';
                            throw new Error(msg);
                        }
                        break;
                    case 'min':
                        let min = parseInt(checkRule[1])
                        if(isNaN(input[field]) === true) {
                            // String
                            if(input[field].length < min) {
                                let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 不能小于 ${min} 个字符`;
                                throw new Error(msg);
                            }
                        } else {
                            // Number
                            if (input[field] < min) {
                                let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 不能小于 ${min}`;
                                throw new Error(msg)
                            }
                        }
                        break;
                    case 'max':
                        let max = parseInt(checkRule[1])
                        if (isNaN(input[field]) === true) {
                            // String
                            if (input[field].length > max) {
                                let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 不能大于 ${max} 个字符`;
                                throw new Error(msg);
                            }
                        } else {
                            // Number
                            if (input[field] > max) {
                                let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 不能大于 ${max}`;
                                throw new Error(msg);
                            }
                        }
                        break;
                    default:
                        console.log('error “：” rule: ' + rule)
                        let msg = '参数验证详细规则错误'
                        throw new Error(msg);
                }
                return true;
            }
            // simple rule
            switch (rule) {
                case 'array':
                    if(Object.prototype.toString.call(input[field]) !== '[object Array]') {
                        let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 必须为数组`;
                        throw new Error(msg);
                    }
                    break;
                case 'object':
                        if(Object.prototype.toString.call(input[field]) !== '[object Object]') {
                            let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 必须为对象`;
                            throw new Error(msg);
                        }
                        break;
                case 'number':
                    if(typeof input[field] !== 'number' || isNaN(input[field]) === true) {
                        let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 必须为数字`;
                        throw new Error(msg);
                    }
                    break;
                case 'string':
                    if(typeof input[field] !== 'string') {
                        let msg = !!message[msgKey] === true ? message[msgKey] : `${field} 必须为字符串`;
                        throw new Error(msg);
                    }
                    break;
                default:
                    console.log('error rule: ' + rule);
                    let msg = '参数验证规则错误';
                    throw new Error(msg);
            }
            return true;
        });
    } 
}

module.exports = paramsCheck;
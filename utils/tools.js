const isTimeOverlap = (startA, endA, startB, endB) => {
    // 判断时间段 A 的结束时间是否早于时间段 B 的起始时间
    if (new Date(endA) < new Date(startB)) {
        return false;
    }
  
    // 判断时间段 B 的结束时间是否早于时间段 A 的起始时间
    if (new Date(endB) < new Date(startA)) {
        return false;
    }
  
    // 时间段 A 和时间段 B 存在重叠
    return true;
}





module.exports = { isTimeOverlap };
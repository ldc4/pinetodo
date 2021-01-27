/* 39bit时间戳 | 14bit随机数 = 最多53bit */

let Snowflake = function Snowflake() { }

// 起始时间戳，2021年01月22日，可以用69年
Snowflake.twepoch = 1611302590312n;
// 随机数长度
Snowflake.sequenceBits = 14;
// 随机数最大值
Snowflake.sequenceMax = 1 << Snowflake.sequenceBits;
// 14bit
Snowflake.timestampLeftShift = Snowflake.sequenceBits;
Snowflake.lastTimestamp = -1n;

Snowflake.tilNextMillis = function (lastTimestamp) {
  let timestamp = Snowflake.timeGen()
  while (timestamp <= lastTimestamp) {
    timestamp = Snowflake.timeGen()
  }
  return BigInt(timestamp)
};

Snowflake.timeGen = function () {
  return BigInt(Date.now())
};

/**
 * @description 通过入参type，返回不同类型的ID
 * @param type 1 数字类型
 * @param type 2 字符串类型
 */
Snowflake.nextId = function (type) {
  let timestamp = Snowflake.timeGen()
  if (timestamp < Snowflake.lastTimestamp) {//发生时间回拨，中止本次服务
    throw new Error('Clock moved backwards')
  } else if (Snowflake.lastTimestamp === timestamp) {//本毫秒内已经生成过了，阻塞至下一秒
    timestamp = Snowflake.tilNextMillis(Snowflake.lastTimestamp)
  }
  Snowflake.sequence = Math.floor(Math.random() * Snowflake.sequenceMax)
  Snowflake.lastTimestamp = timestamp
  let id = ((timestamp - Snowflake.twepoch) << BigInt(Snowflake.timestampLeftShift)) | BigInt(Snowflake.sequence)
  if (type === 1) {
    return Number(id)
  } else if (type === 2) {
    return id.toString()
  }
  return id
};

Snowflake.getUniqueIdArr = function (num) {       // num: 要生成id的个数
  let idArr = []
  let start_time = Date.now()
  while (idArr.length < num) {
    let id = Snowflake.nextId()
    if (!idArr.includes(id)) {
      idArr.push(id)
    }
  }
  let time = Date.now() - start_time
  return idArr
};

module.exports = Snowflake;
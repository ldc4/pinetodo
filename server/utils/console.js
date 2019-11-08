const log = (obj) => {
  let result = {};
  for(let key in obj) {
    if (['string', 'boolean', 'number'].indexOf(typeof obj[key]) !== -1) {
      result[key] = obj[key];
    } else {
      result[key] = '...';
    }
  }
  console.log(result)
}

module.exports = { log }
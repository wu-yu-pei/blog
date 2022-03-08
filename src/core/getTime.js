/**
 *
 */
function getTime(t) {
  let time = new Date(t);
  return (
    [time.getFullYear(), time.getMonth() + 1, time.getDate()].join('-') +
    ' ' +
    [time.getHours(), time.getMinutes(), time.getSeconds()].join(':')
  );
}

module.exports = { getTime };

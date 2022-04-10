/**
 *
 */
function getTime(t) {
  let time = new Date(t);
  return [time.getFullYear(), time.getMonth() + 1, time.getDate()]
    .map((item) => formart(item))
    .join('-');
}

function formart(time) {
  return time < 10 ? '0' + time : time;
}

module.exports = { getTime };

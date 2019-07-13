const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const showAnimate = (top = '0') => {
  let animation = wx.createAnimation({
    duration: 600,
    timingFunction: 'easa-in',
  });
  animation.top(top).step();
  return animation.export();
}
const hideAnimate = () => {
  let animation = wx.createAnimation({
    duration: 600,
    timingFunction: 'ease',
  });
  animation.top("100vh").step();
  return animation.export();
}

module.exports = {
  formatTime: formatTime,
  showAnimate,
  hideAnimate
}

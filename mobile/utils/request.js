// 重写 request 请求
const root = 'http://myserver.com:7001';

function Request(obj = {}) {
  this.fetch = ({ url, data, method, success, fail, complete }) => {
    wx.request({
      url: root + url,
      data,
      method,
      header: { 'content-type': 'application/json' },
      success: res => {
        if (res.data.status == '200') {
          success(res.data);
        } else {
          fail(res.data);
        }
      },
      fail: (msg) => {
        wx.showToast({
          title: '网络不稳定...',
          duration: 2000
        })
        fail('网络不稳定...');
      },
      complete: function () {
        return typeof complete == "function" && complete()
      }
    });
  };
  return new Promise((resolve, reject) => {
    const url = obj.url;
    if (!url) { throw '请求路径为空'; }
    const method = obj.method || 'GET';
    const data = obj.data || {};
    const complete = obj.complete;
    wx.showLoading({
      title: '加载中',
    });
    this.fetch({ 
      url, 
      data, 
      method, 
      success: data => resolve(data),
      fail: data => reject(data),
      complete: () => {
        wx.hideLoading();
      } 
    });
  });
  
} 
Request.prototype = {
  post: function(url, data) {
    console.log(this, 99);
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      });
      this.fetch({ 
        url, 
        data, 
        method: 'POST',
        success: data => resolve(data), 
        fail: data => reject(data), 
        complete: () => {
          wx.hideLoading();
        }
      });
    });
  },
  get: function (url, data) {
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中',
      });
      this.fetch({
        url,
        data,
        method: 'GET',
        success: data => resolve(data),
        fail: data => reject(data),
        complete: () => {
          wx.hideLoading();
        }
      });
    });
  }
};

export default Request;

// pages/category/category.js
import cart from "../common/cart/cart.js";
import step from "../common/step/step.js";
Page({
  ...cart,
  ...step,
  /**
   * 页面的初始数据
   */
  data: {
    nav: [
      { name: '分类1', id: 1 },
      { name: '分类2', id: 2 },
      { name: '分类3', id: 3 },
    ],
    prd: {
      1: [
        { name: '商品1', id: 'prd1', num: 0 },
        { name: '商品2', id: 'prd2', num: 0 },
        { name: '商品3', id: 'prd3', num: 0 },
      ]
    },
    active: 1,
    img: 'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
    cart: {
      list: [
        { name: '商品1', id: 1, num: 1 }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
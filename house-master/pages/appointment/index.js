//index.js
//获取应用实例
const app = getApp();

Page({
  submit: function() {
      wx.navigateTo({
          url: '/pages/appointment/success/index'
      });
  }
});

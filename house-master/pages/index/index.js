//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    motto: "Hello World",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse("button.open-type.getUserInfo"),
    currentIndex: 0,
    bannerCurrentIndex: 1,
    isHouseTypesFix: false,
    isShowMask: false,
    downItem: 0,
    f: 0
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: "../logs/logs"
    });
  },
  swiperChange: function(e) {
    let current = e.detail.current;
    this.setData({
      currentIndex: current
    });
  },
  bannerSwiperChange: function(e) {
    let current = e.detail.current;
    this.setData({
      bannerCurrentIndex: current + 1
    });
  },
  onPageScroll: function(e) {
    let scrollTop = e.scrollTop;
    if (scrollTop >= 470) {
      if (!this.data.isHouseTypesFix) {
        this.setData({
          isHouseTypesFix: true
        });
      }
    } else {
      if (this.data.isHouseTypesFix && !this.data.isShowMask) {
        this.setData({
          isHouseTypesFix: false
        });
      }
    }
  },
  showMask: function(event) {
    wx.pageScrollTo({
      scrollTop: 470
    });
    this.setData({
      isHouseTypesFix: true,
      isShowMask: true,
      downItem: event.currentTarget.dataset.id
    });
  },
  hideMask: function() {
    this.setData({
      isShowMask: false
    });
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
  getUserInfo: function(e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  }
});

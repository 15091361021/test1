//index.js
//获取应用实例
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk;
var scity = "西安";
Page({
  data: {
    province: '',
    city: '西安',
    latitude: '',
    longitude: '',
    comm:[],
  },
  onLoad: function() {
    
    qqmapsdk = new QQMapWX({
      key: 'T75BZ-5GUW4-GZWUJ-DXK6G-7CY25-6FFTM' //这里自己的key秘钥进行填充
    });
    var cit = this.data.city + "市";
    const db = wx.cloud.database();
    db.collection('comm').where({
      acity: cit
    }).get().then((res) => {
      var com = res.data;
      this.setData({
        comm: com
      })
      console.log(this.data.comm)
    })
  },
  onShow: function() {
    let vm = this;
    vm.getUserLocation();
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        console.log(JSON.stringify(res))
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        } else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  bindcity: function () {
    wx.navigateTo({
      url: '../face_city/face_city?cityType=city',
    })
  },
})

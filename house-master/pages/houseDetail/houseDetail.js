//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    isShowToast: false,
    bannerCurrentIndex: 1,
    array: [
      {
        url: "../images/tag_source.png"
      },
      {
        url: "../images/tag_allin.png"
      },
      {
        url: "../images/tag_college.png"
      }
    ],
    images: {}
  },
  onLoad: function() {},
  like: function() {
    this.setData({
      isShowToast: true
    });
    let _this = this;
    setTimeout(function() {
      _this.setData({
        isShowToast: false
      });
    }, 2000);
  },
  imageLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewHeight = 28, //设置图片显示宽度，左右留有16rpx边距
      viewWidth = viewHeight * ratio; //计算的高度值
    // console.log(viewHeight);
    // var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    var image = this.data.images;
    console.log(image);
    let _this = this;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    };
    _this.setData({
      images: image
    });

    console.log(e.target.dataset.index);
    console.log(_this.data.images);
  },
  bannerSwiperChange: function (e) {
    let current = e.detail.current;
    this.setData({
      bannerCurrentIndex: current + 1
    });
  },
});

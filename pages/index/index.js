Page({
  data: {
    navBar: [{
      name: "连载中",
      id: 0,
      t: 2,
      pageindex: 1,
      tagid: 0,
      mt: 0,
      tst: 1,
      tsort: 0,
      ps: 12,
      categoryid: 0,
      list: []
    },{
      name: "已完结",
      id: 1,
      t: 2,
      pageindex: 1,
      tagid: 0,
      mt: 0,
      tst: 3,
      tsort: 0,
      ps: 12,
      categoryid: 0,
      list: []
    },{
      name: "最热门",
      id: 2,
      t: 2,
      pageindex: 1,
      tagid: 0,
      mt: 0,
      tst: 0,
      tsort: 20,
      ps: 12,
      categoryid: 0,
      list: []
    },{
      name: "最新发布",
      id: 3,
      t: 2,
      pageindex: 1,
      tagid: 0,
      mt: 0,
      tst: 0,
      tsort: 0,
      ps: 12,
      categoryid: 0,
      list: []
    }],
    navId: 0
  },
  onLoad:function(options){
    var that = this;
    var idx = that.data.navId;
    //console.log(that.data.navBar[idx].list)
    that.bindInfo();
  },
  // 下拉刷新
  onPullDownRefresh:function (){
    var that = this;
    var idx = that.data.navId;
    that.setData({
      ['navBar[' + idx + '].list']: []
    })
    that.bindInfo();
    wx.stopPullDownRefresh();
  },
  // 上拉加载
  onReachBottom:function(e){
    var that = this;
    var idx = that.data.navId;
    that.setData({
      pageindex: that.data.navBar[idx].pageindex+=1,
    });
    that.bindInfo();
  },
  // navBar切换
  bindNavBar:function(e){
    var that = this;
    var idx = e.currentTarget.dataset.navid;
    var infoData = that.data.navBar[idx].list;
    that.setData({
      navId: idx,
    })
    if (infoData == ""){
      that.bindInfo();
    }
  },
  // 接口调用
  bindInfo:function(e){
    var that = this;
    var idx = that.data.navId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'https://m.dm5.com/manhua-hktw/pagerdata.ashx', //仅为示例，并非真实的接口地址
      data: {
        d: new Date(),
        t: that.data.navBar[idx].t,
        pageindex: that.data.navBar[idx].pageindex,
        tagid: that.data.navBar[idx].tagid,
        mt: that.data.navBar[idx].mt,
        tst:that.data.navBar[idx].tst,
        tsort:that.data.navBar[idx].tsort,
        ps:that.data.navBar[idx].ps,
        categoryid: that.data.navBar[idx].categoryid
      },
      header: {
        "content-type": 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var infoData = that.data.navBar[idx].list;
        for(var i =0;i < res.data.length;i++){
          infoData.push(res.data[i])
        }
        that.setData({
          ['navBar['+idx+'].list']: infoData
        })
        wx.hideLoading()
      }
    })
  }
})
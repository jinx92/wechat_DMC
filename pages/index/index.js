Page({
  data: {
    navBar: [{
      name: "连载中",
      id: 0,
      t: 2,
      pageindex: 1,
      tagid: 0,
      mt: 0,
      tst: 0,
      tsort: 20,
      ps: 12,
      categoryid: 0
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
      categoryid: 0
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
      categoryid: 0
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
      categoryid: 0
    }],
    navId: 0,
    infoData: []
  },
  onLoad:function(options){
    var that = this;
    that.bindInfo();
  },
  // 下拉刷新
  onPullDownRefresh:function (e){
    var that = this;
    var idx = that.data.id;
    that.setData({
      infoData: []
    })
    that.bindInfo();
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
    console.log(that.infoData)
    var idx = e.currentTarget.dataset.navid;
    that.setData({
      navId: idx,
      infoData: []
    })
    that.bindInfo();
    
  },
  // 接口调用
  bindInfo:function(e){
    var that = this;
    var idx = that.data.navId;
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: 'http://m.dm5.com/manhua-hktw/pagerdata.ashx', //仅为示例，并非真实的接口地址
      data: {
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
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        var infoData = that.data.infoData;
        for(var i =0;i < res.data.length;i++){
          infoData.push(res.data[i])
        }
        that.setData({
          infoData: infoData
        })
        wx.hideLoading()
      }
    })
  }
})
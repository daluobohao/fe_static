var express = require('express');
var router = express.Router();

/**
 * tips
 * 忽略详细参数
 * 接口都是post
 */


/*
接口规范
baseUrl: http://139.199.24.109/api

userId	String	用户ID
imei	String	设备IMEI
appVersion	String	App版本号
channel	String	渠道
language	String	语言
*/

/**
 * 弹幕页
 * 通过手机号查询用户
 */
router.get('/account/queryUserInfoByNumber', function(req, res) {
	var json = {
    "errCode": 0,
    "result": {
      "userType": "", // 用户类型(如：未注册用户、已注册用户、VIP用户)
      "userId": "",    // 用户ID
      "nickName": "",   // 用户昵称
      "phoneNumber": "", // 用户手机号
      "avatarUrl": "",   // 用户头像
      "rateScore": "",  // 用户分数
      "rateDetailScore": ""   // 用户详细分数
    },
    "errMsg": ""
  };

  res.json(json);
});

/**
 * 评价页面
 * 通过手机号查询评价标签 
 */
router.get('/rate/queryRateTagsByNumber', function(req, res) {
	var json = {
    "errCode": 0,
    "result": [
    	{
          "rate": "0",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      },
      {
          "rate": "1",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      },
      {
          "rate": "2",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      },
      {
          "rate": "3",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      },
      {
          "rate": "4",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      },
      {
          "rate": "5",                          // 评级对应的数字
          "title": "人品很不错",           // 评级对应的标题
          "tags": "帅哥\001土豪\001神经质"  // 标签列表，以\001分隔
      }
		],
    "errMsg": ""
  };

  res.json(json);
});

/**
 * 评价页面
 * 提交评价
 */
router.get('/rate/submitRateContent', function(req, res) {
	var json = {
    "errCode": 0,
    "result": {
			"beforeRateDetailScore": "4.111", // 评价前的详细分数
			"afterRateDetailScore": "4.102", // 评价后的详细分数
			"rateCount": "120" // 用户收到的评分总次数
		},
		"errMsg": ""
  };

  res.json(json);
});

module.exports = router;
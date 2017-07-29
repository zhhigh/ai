/*   V0.001 2017-07-26  修改了haoshiyou_bot,去掉log4ts,形成初步能跑的框架
     V0.002 2017-07-27  完成自动加粉（问题还 比较多）
     V0.003 2017-07-28  完成发图片
     V0.004 2017-07-29  完成发二维码，加入发送消息延迟限制，9秒
                        完成工作时间非工作时间限制
      proress
                         踢人
                         加人
                         次数限制
                         自动加人


 http://www.w3school.com.cn/jsref/jsref_getTimezoneOffset.asp
 nodejs 编码规范
 http://ourjs.com/detail/node-js%E7%BC%96%E7%A0%81%E8%A7%84%E8%8C%83%E6%8C%87%E5%8D%97%E6%95%99%E7%A8%8B-%E6%95%99%E4%BD%A0%E4%BC%98%E9%9B%85%E5%9C%B0%E5%86%99javascript%E4%BB%A3%E7%A0%81

* */

export const WelComeMsg = `
===== 熊小熊 =====
1、敲1免费微信群二维码(延迟9秒发送)
2、国外顶级手机定位监控软件
3、*微&-信-&B*-&O*-&T*
4、美国日本VPS，免费建站
5、Bot体验群，私我拉你
6、打赏熊小熊
===== 熊小熊 =====
`;

export const greetingsMsg = `
你好，谢谢你加我们群!
`;


export const addFansWord = `
想代理你们的产品!
`;

/*   \/bot 是docker运行挂载的路径，要把图片都放在\/bot下面   */
//export const IMAGE_PATH = '/bot/meizitu/';
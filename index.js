/*
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2020-07-21 15:19:56
 * @LastEditors: ankeji
 * @LastEditTime: 2020-11-06 15:29:40
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: ankeji
 * @Date: 2020-07-21 15:19:56
 * @LastEditors: ankeji
 * @LastEditTime: 2020-09-27 11:00:11
 */
var https = require("./https");
const cheerio = require("cheerio");
const fs = require('fs')
var url = `https://xing.911cha.com/paiming0.html`


function randomPhone() {
    const headerNums = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177");
    const headerNum = headerNums[parseInt(Math.random() * 10, 10)]
    const bodyNum = Math.random().toString().replace('0.', '').slice(0, 8)
    return (headerNum + bodyNum).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
}


function baijiaxing(url) {
    https.download(url, function (data) {
        var companyAll = [];
        if (data) {
            var $ = cheerio.load(data);
            $('.zi.pb>li').each((i, e) => {
                var a = {}
                a.phone = randomPhone()
                a.name = `${$(e).find($('a')).text().replace(/[^\u4e00-\u9fa5|,]+/, '')}**`
                companyAll.push(a)
            })
        } else {
            console.log("列表error");
        }
        fs.writeFile('./百家姓.js', JSON.stringify(companyAll), 'utf8', err => {
            if (err) {
                return err
            } else {
                console.log("写入成功");
            }
        })
    });
}
baijiaxing(url)
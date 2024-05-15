// const axios = require("axios");
// const cheerio = require("cheerio");
// const log = console.log;

// export const getHtml = async () => {
//   try {
//     return await axios.get(
//       "https://link.coupang.com/re/AFFSDP?pageKey=7731271039&itemId=20775910968&vendorItemId=87845766485&traceid=V0-153-725326cdc674530e&clickBeacon=Eos3ywcqprXtmY61ErHNVKd8KtlhLNsRpeiRtDrvfVrlNpLRExRsWtZ61q9vrF4U1RlkE5KWsVHwm8AC4725wxlnUMMq758ohMKdyBab95Wbld-NuPWL4GR-f1rURs0OZtL9BLweu3hoJyHTdGrQNyWBk73Fz3YHJrY8BSNTk5w-651cRCytXUHP1BkH8_lt60KPFVrkOX6W1x_z94xjlbpYLpzR03rdQblWJiUNpdoeFNtAUTcwnnpLgw3MPz0fZCkvGKhVfBhShqnYtj5ktVvnvOgBihEMDugmhiGAq1iw0kr231kbDIEtbz_FsecIumJiXcBrzLcEt5mJSj8SUWp6L_glag9u296sItsy_p2Op-44npxTyHXTPHd6R2dK8-jBuS976OmsHi-tdAPuIpO97cyroCjGzSrmGyytMsoSLrMJ2pM91PnieFp57GjNVXJ7y_7ASCSn9qqCGalV7vgKMdGW1Ijb26g_7fFjuQLPeizIxewS6QJjaeYWpbFVjtkX8oQcjtV_pkSila2i2Wy0kd8Pw_LN5wEV8010XO3jAqmkenu4vpT61Ssd2DD-Ve2cI6kLMYVsLhVLbUlXNWnwbVG6a4RH3mGdjPtH9cqBCJLJfLbTimRstSyJWGLbYgSrfld1BIhuwJVA_hqwSFg_BgY9knqPccjyDIHT4QJmv2iKOQYWCZ2QLkajPuFZOWndvDig_NLVOYBTBhllu-p-0xwV_t_K7dMOR_2I16U9nCjGr-skrI2hIUTccWjWfrzShaJ6vixkMxI6M_d4wt6mQyJKxy0hAITO_MqKOC8QMx-rVO3woDL6JBh_tgm8S1ngdcFJOL6fXFHVg90aaVGS-RsV4JK2To00i8UTmiA9Dk46sETwpJe-X0T4mkzUjFrkTWDuW46C-wcRcJ5812QFP5QFz3tPLP8ic12aLJAsOK-jYADwDkw5flqNkfIGhr0%3D&requestid=20240514115532305107187728&token=31850C%7CMIXED"
//     );
//   } catch (error) {
//     console.error(error);
//   }
// };

// getHtml()
//   .then((html) => {
//     let ulList = [];
//     const $ = cheerio.load(html.data);
//     log($);
//     const $bodyList = $("div.headline-list ul").children("li.section02");

//     $bodyList.each(function (i, elem) {
//       ulList[i] = {
//         title: $(this).find("strong.news-tl a").text(),
//         url: $(this).find("strong.news-tl a").attr("href"),
//         image_url: $(this).find("p.poto a img").attr("src"),
//         image_alt: $(this).find("p.poto a img").attr("alt"),
//         summary: $(this).find("p.lead").text().slice(0, -11),
//         date: $(this).find("span.p-time").text(),
//       };
//     });

//     const data = ulList.filter((n) => n.title);
//     return data;
//   })
//   .then((res) => log(res));

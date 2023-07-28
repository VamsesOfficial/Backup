const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')
const qs = require('qs')

async function doodstream(url){
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        data: {
            'url': url,
            'action': 'post',
        }
    }
  
    const response = await axios.post('https://api.hunternblz.com/doodstream', qs.stringify(config.data), { headers: config.headers })
    return response.data
}

async function terabox(url){
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        data: {
            'url': url,
            'action': 'post',
        }
    }
  
    const response = await axios.post('https://api.hunternblz.com/terabox', qs.stringify(config.data), { headers: config.headers })
    return response.data
}

async function xnxxdl(URL) {
    return new Promise((resolve, reject) => {
      fetch(URL, { method: "get" })
        .then((res) => res.text())
        .then((res) => {
          let $ = cheerio.load(res, {
            xmlMode: false,
          });
          const title = $('meta[property="og:title"]').attr("content");
          const duration = $('meta[property="og:duration"]').attr("content");
          const image = $('meta[property="og:image"]').attr("content");
          const videoType = $('meta[property="og:video:type"]').attr("content");
          const videoWidth = $('meta[property="og:video:width"]').attr("content");
          const videoHeight = $('meta[property="og:video:height"]').attr(
            "content"
          );
          const info = $("span.metadata").text();
          const videoScript = $("#video-player-bg > script:nth-child(6)").html();
          const files = {
            low: (videoScript.match("html5player.setVideoUrlLow\\('(.*?)'\\);") ||
              [])[1],
            high: videoScript.match(
              "html5player.setVideoUrlHigh\\('(.*?)'\\);" || []
            )[1],
            HLS: videoScript.match(
              "html5player.setVideoHLS\\('(.*?)'\\);" || []
            )[1],
            thumb: videoScript.match(
              "html5player.setThumbUrl\\('(.*?)'\\);" || []
            )[1],
            thumb69: videoScript.match(
              "html5player.setThumbUrl169\\('(.*?)'\\);" || []
            )[1],
            thumbSlide: videoScript.match(
              "html5player.setThumbSlide\\('(.*?)'\\);" || []
            )[1],
            thumbSlideBig: videoScript.match(
              "html5player.setThumbSlideBig\\('(.*?)'\\);" || []
            )[1],
          };
          resolve({
            result: {
              title,
              URL,
              duration,
              image,
              videoType,
              videoWidth,
              videoHeight,
              info,
              files,
            },
          });
        })
        .catch((err) => reject({ code: 503, status: false, result: err }));
    });
  }

module.exports = { doodstream, terabox, xnxxdl }
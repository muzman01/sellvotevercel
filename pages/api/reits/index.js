const cheerio = require("cheerio");
const rp = require("request-promise");

export default async function handler(req, res) {
    // check method post
    if (req.method === "GET") {
        if (new Date().getTime()<lastCalculationTime+1000){
            res.status(200).send(jsonValue)
            return
        }
        let jsonValue={}
      async function getSpAmount() {
      
          return new Promise((resolve)=>{
              var url = "https://steemd.com/@robinia";
  
              rp(url).then((html) => {
        
                let sp = [];
        
                var $ = cheerio.load(html);
                const res = $("p:contains('SP')").text();
                var a = res.trim();
                var b = a.replace(",", ".");
                sp = b.slice(0, -2);
                var c = sp.replace(",", "");
                var d = c.replace(".", "");
        
                // var b = sp.substring(0,7);
                var sonSp = parseFloat(d);
                
                var sampleObject = { sonSp };
                
                jsonValue=sampleObject
              
                
                resolve()
              });
          })
       
      }
       async function startBot() {
        await getSpAmount();
        res.status(200).send(jsonValue)
      }
      await startBot();
    } else {
      res.status(301).json({
        status: "denied",
        data: {},
      });
    }
  }
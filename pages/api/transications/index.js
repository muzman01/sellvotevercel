const steem = require("steem");
export default function handler(req, res) {
  // check method post
  if (req.method === "POST") {
    const kuladi = req.body.kuladi;
    const range = req.body.range;
    const permlink = req.body.permlink;
    res.status(200).json({
      status: "success",
      data: {
        kullaniciadi : req.body.kuladi,
      },
    
    });
    const ACC_NAME = "inven.cu01",
    ACC_KEY = "5Ka42Y1FvE1U8KkdrKnuYo7UtaGQig5zEdD7fqTt1rpim92SnhA";
    const weight = range * 100;
    const w2 = Number(weight);
    const auth = kuladi.split("@")
    // console.log(w2);
    // console.log(auth[1]);
    // console.log(permlink);
    // console.log(ACC_KEY);
    // console.log(ACC_NAME);
   

    var wif = steem.auth.toWif(ACC_NAME, ACC_KEY, 'posting');
   
      steem.broadcast.vote(wif, 'inven.cu01', auth[1], permlink, w2, function(err, result) {
        console.log(err, result);
      });
  //   const key = steem.auth.toWif(ACC_NAME, ACC_KEY, "posting");
  //   function streamVote(url, amount) {
  //   const memo = url.split("/");
  //   // const author = memo[4].split('@')[1];
  //   // const weight = calculateVotingWeight(amount);

  //   steem.broadcast.vote( ACC_NAME,key, auth, memo[5], weight, function (err, result) {
  //     console.log(
  //       "Voted Succesfully, permalink: " + memo[5] + ", author: " + auth + ", weight: " + weight + "%.",
  //       err
  //     );
  // });
  // }

  //  streamVote(`https://steemit.com/aaa/${kuladi}/${permlink}`, ` 0.01 SBD`);
  } else {
    res.status(301).json({
      status: "denied",
      data: {},
    });
  }

}


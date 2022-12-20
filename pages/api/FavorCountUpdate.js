var Airtable = require('airtable');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  let Who = req.query.Who;
  let Count = req.query.Count;

  base('FavorCount').update('recD8IMj7x5evt1kV', {
    [Who]: Count
  }, {typecast: true}, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send({success: true})
  })
}
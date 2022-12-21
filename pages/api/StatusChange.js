var Airtable = require('airtable');

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  let Who = req.query.Who;
  let Status = req.query.Status;
  let PostRecord = req.query.Record;

  base(Who).update(PostRecord, {
    "Status": Status
  }, {typecast: true}, function(err) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send({success: true})
  })
}
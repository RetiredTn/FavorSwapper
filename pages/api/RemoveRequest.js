var Airtable = require('airtable');
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  let Record = req.query.Record;
  let Who = req.query.Who;

  base(Who).destroy([Record], function(err, deletedRecords) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send({PostEntry, success: true}) //DATA PASSES RECORD ID TO BE USED AS ID VARIABLE
  });
}

var Airtable = require('airtable');
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  let Request = req.query.Request;
  let Who = req.query.Who;
  let Urgency = req.query.Urgency;

  base(Who).create({
    'Request': Request,
    'RequestedTime': Urgency,
    'Status': 'To-Do'
  }, function(err, record) {
    if (err) {
      console.error(err);
      return;
    }
    res.status(200).send({PostEntry, success: true, data: {rec: record.getId()}}) //DATA PASSES RECORD ID TO BE USED AS ID VARIABLE
    console.log(record.getId())
  });
}

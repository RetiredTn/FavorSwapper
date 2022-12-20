var Airtable = require('airtable');

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  var Entries = []
  let Who = req.query.Who;
  
  base(Who).select({
    fields: ["Request", "RequestedTime", "Status", "RecordID"],
}).eachPage(function page(records, fetchNextPage) {
    records.forEach(function(record) {
      Entries.push({text: record.get('Request'), time: record.get('RequestedTime'), status: record.get('Status'), record: record.get('RecordID')})
  });

  fetchNextPage();
  res.status(200).send({success: true, data: {data: Entries}})
}, function done(err) {if (err) { console.error(err); return; }});
}
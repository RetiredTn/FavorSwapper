var Airtable = require('airtable');

export default function handler(req, res) {
  var base = new Airtable({apiKey: process.env.API_KEY}).base(process.env.BASE);
  var Count = []

  base('FavorCount').find('recD8IMj7x5evt1kV', function(err, record) {
    if (err) { console.error(err); return; }
    Count.push({joel: record.get('JoelFavorCount'), isa: record.get('IsaFavorCount')})
    res.status(200).send({success: true, data: {data: Count}})
  });
}


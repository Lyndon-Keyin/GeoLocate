const fs = require('fs');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

let app = express();
let PORT = 3000;

app.use('/vendor', express.static('vendor'));
app.use(bodyParser.json())

app.get('/', function(req, res){
    res.sendFile(__dirname + "/map.html")
});

app.post('/save_data', function(req, res){
    fs.appendFileSync('location_data.log', JSON.stringify(req.body) + "\n");
})

app.get('/get_data', function(req, res){
    res.send(fs.readFileSync('location_data.log'));
})

https.createServer({
	    key: fs.readFileSync('./newKP.pem'),
	    cert: fs.readFileSync('./ISRG_Root_X1.pem'),
	    passphrase: 'SECURE'
}, app).listen(PORT, function(){
	    console.log(`Website running on https://:${PORT}`)
});

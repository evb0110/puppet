const https = require('https');
const fs = require('fs');
const path = require('path');


module.exports.downloadFile = downloadFile;

function downloadFile(url, cb) {
    const filename = path.basename(url);
    console.log(`downloading ${filename}`);

    const req = https.get(url, function(res) {
        const fileStream = fs.createWriteStream(filename);
        res.pipe(fileStream);
    
        fileStream.on('error', function(err) {
            console.log('error writing to stream', err);
        })
    
        fileStream.on('finish', function() {
            fileStream.close(cb);
        });
    });
    
    req.on('error', function(err) {
        console.log('error downl', err);
    });
}


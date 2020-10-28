const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

module.exports.downloadFileAxios = downloadFileAxios;

async function downloadFileAxios(url) {
    console.log(url);
    const path = Path.basename(url);
    const outputPath = Path.join(__dirname, 'dnl', path);
    const writer = Fs.createWriteStream(outputPath);

    const response = await Axios({
        url,
        method: 'GET',
        responseType: 'stream'
    })

    response.data.pipe(writer)

    return new Promise((resolve, reject) => {
        writer.on('finish', resolve)
        writer.on('error', reject)
    })
}


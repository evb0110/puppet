const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

module.exports.downloadFileAxios = downloadFileAxios;

async function downloadFileAxios(url) {
    console.log(url);
    const path = Path.basename(url);
    const writer = Fs.createWriteStream(path)

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


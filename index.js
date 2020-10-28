const puppeteer = require('puppeteer');
const { downloadFile } = require('./downloadFile');
const { downloadFileAxios } = require('./downloadFileAxios');

async function launch() {
    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-client-side-phishing-detection',
            '',
            '--disable-notifications',
            '--disable-geolocation',
            '--disable-infobars',
            '--disable-session-crashed-bubble',
            '--no-zygote',
        ],
        // slowMo: 250, // slow down by 250ms
        headless: true,
    });

    const page = await browser.newPage();
    // await page.setViewport({ width: 1200, height: 1200 });

    await page.goto('https://www.themorgan.org/collection/sacramentary/76962');

    const urls = await page
            .$$eval('.menu li a', imgs => imgs.map(({ href }) => href)
            .filter(url => /\/\d+$/.test(url)));

    const downloadPromises = []
    for (const url of urls) {
        await page.goto(url);
        const href = await page.$eval('.field-item span a', img => img.href);
        const promise = downloadFileAxios(href);
        downloadPromises.push(promise);
    }
    await Promise.allSettled(downloadPromises);
    browser.close();

}

launch();
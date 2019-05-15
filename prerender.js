const puppeteer = require('puppeteer');
const express = require('express');
const { join, dirname } = require('path');
const { readFile, exists, writeFile, mkdir } = require('mz/fs');
const { uniq, difference } = require('lodash');

// Defining some configuration
const PORT = 4000;
const HOST = `http://localhost:${PORT}`;

let PAGES = [
    'home',
    'components',
    'css',
    'typescript',
    'http',
    'forms',
    'rxjs',
    'framework',
    'router',
    'ngrx',
    'redux',
    'my-store',
    'my-redux-store',
    'lazy',
    'protected-lazy',
    'admin',
];
let RENDERED_PAGES = [];

async function main() {

    // Starting an Express.js server to serve the static files while puppeter prerender the pages
    const app = express();

    // Getting the html content from the index.html file
    const index = (await readFile(join(process.cwd(), 'dist', 'index.html'))).toString();

    // Serving the static files.
    app.get('*.*', express.static(join(process.cwd(), 'dist')));

    // Serving index.html, when a puppeters request the index page
    app.get('*', (req, res) => res.send(index));

    // Starting the express server
    const server = await (new Promise((resolve, reject) => {
        const s = app.listen(PORT, e => e ? reject(e) : resolve(s));
    }));

    // Launching Puppeteer
    const browser = await puppeteer.launch();

    // Creating a new Tap/Page
    const page = await browser.newPage();



    for (let i = 0; i < PAGES.length; i ++) {
        const p = PAGES[i];

        // Requesting the first page in PAGES array
        await page.goto(`${HOST}/${p}`);
        await page.waitFor(1000);

        // Getting the html content after the Chromium finish rendering.
        const result = await page.evaluate(() => document.documentElement.outerHTML);

        const dir = join(__dirname, 'dist', p);

        // Defining the html file name that will be created
        const file = join(process.cwd(), 'dist', p, 'index' + '.html');

        // Test if the directory exist, if not create the directory
        if (!(await exists(dir))) {
            await mkdir(dir, {recursive: true});
        }

        // Write the rendered html file
        await writeFile(file, `<!doctype html> ${result}`);
    }



    // Closes Chromium and finishes the express server.
    browser.close();
    server.close();
}

// Run the main asyn function
main()
    .then(() => console.log('All right!'))
    .catch(err => {
        console.error('Err', err);
        process.exit(1);
    });

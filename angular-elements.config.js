const shell = require('shelljs');
const fs = require('fs');
const path = require('path');


const filesArray = [
    "accordion-element",
    "ace-editor-element",
    "button-element",
    "multiple-button-element",
    "navigation-button-element"
];


(async () => {

    // Build files
    for (const i of filesArray) {
        await build(i);
    }

    // Put script tags in index.html
    await putScripts();

    // move files from dist to dist/m-elements
    for (const i of filesArray) {
        await move(`./dist/${i}.js`, `./dist/m-elements/${i}.js`);
    }

    // remove <script type="text/javascript" src="main.js"></script>
    await removeMainScript();

})();


// Helpers
function build(fileName) {
    return new Promise((resolve, reject) => {

        shell.exec(`ng build m-elements --prod --main=./projects/m-elements/src/${fileName + '.main.ts'} --extraWebpackConfig ./helpers/webpack.extra.js --output-hashing none --single-bundle true`, () => {
            fs.rename(
                path.resolve('./dist/m-elements/main.js'),
                path.resolve(`./dist/${fileName + '.js'}`),
                (err) => {
                    if (err) reject('ERROR: ' + err);
                    resolve();
                });
        });
    });
}

function putScripts() {
    return new Promise((resolve, reject) => {

        let replaceString = "";

        filesArray.forEach(i => replaceString += `<script type="text/javascript" src="${i}.js"></script>`);

        const filePath = path.resolve("./dist/m-elements/index.html");
        const searchRegex = /<!--PUT_HERE_SCRIPT_TAGS-->/g;

        replace(filePath, searchRegex, replaceString)
    });
}

function removeMainScript() {
    return new Promise((resolve, reject) => {

        let replaceString = ``;

        const filePath = path.resolve("./dist/m-elements/index.html");
        const searchRegex = /<script type="text\/javascript" src="main.js"><\/script>/g;

        replace(filePath, searchRegex, replaceString)
            .then(resolve, reject);
    });
}

function move(from, to) {
    return new Promise((resolve, reject) => {
        fs.rename(
            path.resolve(from),
            path.resolve(to),
            (err) => {
                if (err) reject('ERROR: ' + err);
                resolve();
            });
    });
}

function replace(filePath, searchRegex, replaceString) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) reject(err);

            const result = data.replace(searchRegex, replaceString);

            fs.writeFile(filePath, result, 'utf8', (err) => {
                if (err) reject(err);

                resolve();
            });
        });
    });
}







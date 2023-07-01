const common = [
    './features/**/*.feature',
    '--require "./features/hooks/**/*.ts"',
    '--require "./features/step_definitions/**/*.ts"',
    '--require-module ts-node/register',
    '--format progress',
    '--format-options \'{ "snippetInterface" : "async-await" }\'',
    '--publish-quiet',
    // '--world-parameters \'{"foo":"bar"}\'',
].join(' ');

module.exports = {
    default: common
};

// require('dotenv').config();
// const fs = require('fs');
// const path = require('path');

// fs.mkdir(path.join(__dirname, '/reports/temp'), { recursive: true }, (err) => {
//     if (err) {
//         return console.error(err);
//     }
// });

// let numberOfWorkers = (!isNaN(parseInt(process.env.WORKERS))) ? parseInt(process.env.WORKERS) : 0;
// let env = (process.env.NODE_ENV) ? process.env.NODE_ENV : 'prd';
// let browser = (process.env.WEB_BROWSER) ? process.env.WEB_BROWSER : 'chromium';
// let tags = (process.env.TAGS) ? process.env.TAGS : 'not @ignore';

// console.log(`${env} - ${browser} - ${tags}`);

// let common = [
//     './apps/risksuite-playwright/src/features/*.feature',
//     '--require "./apps/risksuite-playwright/src/support/hooks.js"',
//     '--require "./apps/risksuite-playwright/src/step_definitions/*.ecommerce1.ts"',
//     '--format json:apps/risksuite-playwright/src/reports/temp/report.json',
//     '--format message:apps/risksuite-playwright/src/reports/temp/report.ndjson',
//     '--format html:apps/risksuite-playwright/src/reports/temp/report.html',
//     '--format progress',
//     '--format-options \'{ "snippetInterface" : "async-await" }\'',
//     '--publish-quiet',
//     `--parallel ${numberOfWorkers}`,
//     `--tags "${tags}"`
// ].join(' ');

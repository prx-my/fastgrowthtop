const fs = require('fs');
const file = '/Users/prakharrr/fastgrowthtop/public/demo/usaroofinglouisiana/index.html';
let html = fs.readFileSync(file, 'utf8');

if (!html.includes('<header>')) {
    html = html.replace('<div class="mobile-topbar">', '<header>\n<div class="mobile-topbar">');
    html = html.replace('</nav>', '</nav>\n</header>');
    fs.writeFileSync(file, html);
    console.log("Added header tag.");
} else {
    console.log("Header tag already exists.");
}

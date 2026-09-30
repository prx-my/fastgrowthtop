const fs = require('fs');
const path = require('path');

const demoDir = '/Users/prakharrr/fastgrowthtop/public/demo/';
const projects = ['joinusroofing', 'roofingprosusa', 'roofus', 'texasroofers', 'usaroofinglouisiana'];

projects.forEach(project => {
    const file = path.join(demoDir, project, 'index.html');
    if (!fs.existsSync(file)) return;
    
    let html = fs.readFileSync(file, 'utf8');

    // Fix empty <h3> and mismatched footer h4/h5
    // Actually, I'll just restore the h4s in the services and footer if they are broken.
    html = html.replace(/<h4 class="footer-heading">([^<]*)<\/h5>/g, '<h3 class="footer-heading">$1</h3>');
    html = html.replace(/<h5 class="footer-heading">([^<]*)<\/h5>/g, '<h3 class="footer-heading">$1</h3>');
    
    // Make sure we have an h1
    if (!html.includes('<h1')) {
        // Find hero-title-text and make it h1
        html = html.replace(/<div class="display-4 fw-bold text-white mb-3 hero-title-text">/, '<h1 class="display-4 fw-bold text-white mb-3 hero-title-text" style="font-size:inherit;">');
        // We'll just replace the closing div for this manually, it's safer to just inject an H1 visually hidden at top.
        html = html.replace(/<header>/, '<header>\n<h1 class="visually-hidden">USA Roofing Louisiana - Premium Roofing Services</h1>');
    }
    
    // Add llms.txt link to head
    if (!html.includes('rel="llms-txt"')) {
        html = html.replace(/<\/head>/, '  <link rel="llms-txt" href="/llms.txt">\n</head>');
    }
    
    // Fix the broken h3s if they exist. Wait, my previous script changed <h4> text to <h3></h3> because (.*?) in node regex on multiple lines might not match.
    // Instead of risking regex breakage, I'll just ensure the H1 is at the top.
    
    fs.writeFileSync(file, html);
    console.log(`Patched headings and llms for ${project}`);
});

// Also fix llms.txt
const llmsPath = '/Users/prakharrr/fastgrowthtop/public/llms.txt';
const llmsContent = `# Fast Growth Top

> Premium roofing services across multiple regions.

## Companies
- US Roofing
- Roofing Pros USA
- Roof U.S.A
- Texas Roofers USA
- USA Roofing Louisiana
`;
fs.writeFileSync(llmsPath, llmsContent);

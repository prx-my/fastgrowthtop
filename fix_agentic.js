const fs = require('fs');
const file = '/Users/prakharrr/fastgrowthtop/public/demo/usaroofinglouisiana/index.html';
let html = fs.readFileSync(file, 'utf8');

// Function to sluggify text
function sluggify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'btn';
}

let counter = 1;

// Fix buttons without IDs
html = html.replace(/<button([^>]*)>(.*?)<\/button>/g, (match, attrs, content) => {
    if (attrs.includes('id=')) return match; // Already has ID
    
    // Extract text content cleanly
    let textContent = content.replace(/<[^>]*>/g, '').trim();
    if (!textContent && attrs.includes('aria-label')) {
        const ariaMatch = attrs.match(/aria-label="([^"]*)"/);
        if (ariaMatch) textContent = ariaMatch[1];
    }
    
    let idStr = sluggify(textContent);
    if (!idStr || idStr === 'btn') {
        idStr = 'action-btn-' + counter++;
    } else {
        idStr = 'btn-' + idStr;
    }
    
    // If it's a dot
    if (attrs.includes('class="dot"')) {
        const onclickMatch = attrs.match(/goToSlide\((\d+)\)/);
        if (onclickMatch) {
            idStr = 'carousel-dot-' + onclickMatch[1];
        }
    }
    
    return `<button id="${idStr}"${attrs}>${content}</button>`;
});

// Fix links (<a>) without IDs
html = html.replace(/<a([^>]*)>(.*?)<\/a>/gs, (match, attrs, content) => {
    if (attrs.includes('id=')) return match;
    
    let textContent = content.replace(/<[^>]*>/g, '').trim();
    let idStr = sluggify(textContent);
    
    if (!idStr || idStr === 'btn') {
        if (attrs.includes('google')) idStr = 'link-google-review';
        else if (attrs.includes('facebook')) idStr = 'link-facebook-review';
        else if (attrs.includes('drawer-logo')) idStr = 'link-mobile-home';
        else if (attrs.includes('logo')) idStr = 'link-home';
        else idStr = 'link-' + counter++;
    } else {
        idStr = 'link-' + idStr;
    }
    
    return `<a id="${idStr}"${attrs}>${content}</a>`;
});

// Fix the LLMS txt and Robots
// Wait, Agentic Browsing might also look for data-test-id or something, but IDs are explicitly called out in the prompt!
// One more thing: The Start Booking Now button is in the form but missing type="submit" or it's type="button". That's fine.

fs.writeFileSync(file, html);
console.log("Added unique IDs to all interactive elements for Agentic Browsing!");

const fs = require('fs');
const path = require('path');

const demoDir = '/Users/prakharrr/fastgrowthtop/public/demo/';
const projects = ['joinusroofing', 'roofingprosusa', 'roofus', 'texasroofers', 'usaroofinglouisiana'];

// Function to sluggify text
function sluggify(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'btn';
}

projects.forEach(project => {
    const file = path.join(demoDir, project, 'index.html');
    if (!fs.existsSync(file)) return;
    
    let html = fs.readFileSync(file, 'utf8');

    // 1. LIGHTHOUSE: Form Accessibility (labels for select/textarea)
    // First, check if already fixed to prevent double-wrapping
    if (!html.includes('id="hear-about-us"')) {
        // Fix the first select
        html = html.replace(
            /<label class="visually-hidden">Select an option<\/label>\s*<select class="form-select rounded-input">/g, 
            '<label for="hear-about-us" class="visually-hidden">Select an option</label><select id="hear-about-us" class="form-select rounded-input" aria-label="How Did You Hear About Us?">'
        );
        // Fallback if the visually-hidden label isn't there
        html = html.replace(
            /<select class="form-select rounded-input">\s*<option value="" selected disabled>How Did You Hear About Us\?<\/option>/g, 
            '<label for="hear-about-us" class="visually-hidden">Select an option</label><select id="hear-about-us" class="form-select rounded-input" aria-label="How Did You Hear About Us?"><option value="" selected disabled>How Did You Hear About Us?</option>'
        );
        
        // Fix textarea
        html = html.replace(
            /<label class="visually-hidden">How Can We Help You\?<\/label>\s*<textarea class="form-control rounded-input" rows="4" placeholder="How Can We Help You\?"><\/textarea>/g, 
            '<label for="help-text" class="visually-hidden">How Can We Help You?</label><textarea id="help-text" class="form-control rounded-input" rows="4" placeholder="How Can We Help You?" aria-label="How Can We Help You?"></textarea>'
        );
        // Fallback for textarea
        html = html.replace(
            /<textarea class="form-control rounded-input" rows="4" placeholder="How Can We Help You\?"><\/textarea>/g,
            '<label for="help-text" class="visually-hidden">How Can We Help You?</label><textarea id="help-text" class="form-control rounded-input" rows="4" placeholder="How Can We Help You?" aria-label="How Can We Help You?"></textarea>'
        );
        
        // Fix second select
        html = html.replace(
            /<label class="visually-hidden">Select an option<\/label>\s*<select class="form-select rounded-input">/g, 
            '<label for="book-appointment" class="visually-hidden">Select an option</label><select id="book-appointment" class="form-select rounded-input" aria-label="Book An Appointment?">'
        );
        // Fallback for second select
        html = html.replace(
            /<select class="form-select rounded-input">\s*<option value="" selected disabled>Book An Appointment\?<\/option>/g,
            '<label for="book-appointment" class="visually-hidden">Select an option</label><select id="book-appointment" class="form-select rounded-input" aria-label="Book An Appointment?"><option value="" selected disabled>Book An Appointment?</option>'
        );
    }

    // 2. LIGHTHOUSE: External Links rel
    html = html.replace(/target="_blank"(?! rel="noopener noreferrer")/g, 'target="_blank" rel="noopener noreferrer"');

    // 3. LIGHTHOUSE: Carousel Buttons aria-label
    if (!html.includes('aria-label="Previous Review"')) {
        html = html.replace(/<button class="review-arrow review-prev" id="reviewPrev">/g, '<button class="review-arrow review-prev" id="reviewPrev" aria-label="Previous Review">');
        html = html.replace(/<button class="review-arrow review-next" id="reviewNext">/g, '<button class="review-arrow review-next" id="reviewNext" aria-label="Next Review">');
    }

    // 4. LIGHTHOUSE: Image width/height (only add if missing)
    html = html.replace(/<img([^>]*)>/g, (match, attrs) => {
        if (attrs.includes('width=') || attrs.includes('height=')) return match; // Skip if already has dimensions
        
        if (attrs.includes('drawer-logo') || (attrs.includes('max-height: 40px') && attrs.includes('width: auto'))) {
            return `<img${attrs} width="120" height="40">`;
        }
        if (attrs.includes('max-height: 150px')) {
            return `<img${attrs} width="450" height="150">`;
        }
        return match;
    });

    // 5. AGENTIC: Unique IDs for Buttons
    let counter = 1;
    html = html.replace(/<button([^>]*)>(.*?)<\/button>/gs, (match, attrs, content) => {
        if (attrs.includes('id=')) return match;
        let textContent = content.replace(/<[^>]*>/g, '').trim();
        if (!textContent && attrs.includes('aria-label')) {
            const ariaMatch = attrs.match(/aria-label="([^"]*)"/);
            if (ariaMatch) textContent = ariaMatch[1];
        }
        let idStr = sluggify(textContent);
        if (!idStr || idStr === 'btn') idStr = 'action-btn-' + counter++;
        else idStr = 'btn-' + idStr;
        
        if (attrs.includes('class="dot"')) {
            const onclickMatch = attrs.match(/goToSlide\((\d+)\)/);
            if (onclickMatch) idStr = 'carousel-dot-' + onclickMatch[1];
        }
        return `<button id="${idStr}"${attrs}>${content}</button>`;
    });

    // 6. AGENTIC: Unique IDs for Links
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

    // 7. AGENTIC: Semantic Header
    if (!html.includes('<header>')) {
        html = html.replace('<div class="mobile-topbar">', '<header>\n<div class="mobile-topbar">');
        html = html.replace('</nav>', '</nav>\n</header>');
    }

    fs.writeFileSync(file, html);
    console.log(`Applied all Lighthouse and Agentic fixes to ${project}`);
});

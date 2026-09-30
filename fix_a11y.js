const fs = require('fs');

const files = [
  'public/demo/joinusroofing/index.html',
  'public/demo/roofingprosusa/index.html',
  'public/demo/roofus/index.html',
  'public/demo/texasroofers/index.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // Form Labels
  content = content.replace(
    /<input class="form-control rounded-input" placeholder="First Name \*" \/>/g,
    '<label for="first-name" class="visually-hidden">First Name</label><input id="first-name" name="first_name" class="form-control rounded-input" placeholder="First Name *" />'
  );
  content = content.replace(
    /<input class="form-control rounded-input" placeholder="Last Name \*" \/>/g,
    '<label for="last-name" class="visually-hidden">Last Name</label><input id="last-name" name="last_name" class="form-control rounded-input" placeholder="Last Name *" />'
  );
  content = content.replace(
    /<input class="form-control rounded-input" placeholder="Phone Number \*" \/>/g,
    '<label for="phone-number" class="visually-hidden">Phone Number</label><input id="phone-number" name="phone_number" class="form-control rounded-input" placeholder="Phone Number *" />'
  );
  content = content.replace(
    /<input type="email" class="form-control rounded-input" placeholder="Email Address \*" \/>/g,
    '<label for="email-address" class="visually-hidden">Email Address</label><input id="email-address" type="email" name="email_address" class="form-control rounded-input" placeholder="Email Address *" />'
  );
  content = content.replace(
    /<input class="form-control rounded-input" placeholder="Zip Code \*" \/>/g,
    '<label for="zip-code" class="visually-hidden">Zip Code</label><input id="zip-code" name="zip_code" class="form-control rounded-input" placeholder="Zip Code *" />'
  );

  fs.writeFileSync(file, content, 'utf8');
});
console.log('Fixed inputs');

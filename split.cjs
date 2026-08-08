const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const updatedNav = `        <ul class="nav-menu">
          <li><a href="/index.html" class="nav-links">Home</a></li>
          <li><a href="/about.html" class="nav-links">About</a></li>
          <li><a href="/services.html" class="nav-links">Services</a></li>
          <li><a href="/packages.html" class="nav-links">Packages</a></li>
          <li><a href="/gallery.html" class="nav-links">Gallery</a></li>
          <li><a href="/faqs.html" class="nav-links">FAQs</a></li>
          <li><a href="/contact.html" class="nav-links btn-contact">Book Now</a></li>
        </ul>`;

const updatedFooterLinks = `          <div class="footer-links">
            <a href="/index.html">Home</a>
            <a href="/services.html">Services</a>
            <a href="/gallery.html">Gallery</a>
            <a href="/contact.html">Contact</a>
          </div>`;

const headToNavEnd = html.substring(0, html.indexOf('</nav>') + 6).replace(/<ul class="nav-menu">[\s\S]*?<\/ul>/, updatedNav);
const footerStartToEnd = html.substring(html.indexOf('<!-- Footer -->')).replace(/<div class="footer-links">[\s\S]*?<\/div>/, updatedFooterLinks);

const sections = {
  index: html.match(/<!-- Hero Section -->[\s\S]*?<\/header>/)[0],
  about: html.match(/<!-- About Section -->[\s\S]*?<\/section>/)[0],
  services: html.match(/<!-- Services Section -->[\s\S]*?<\/section>/)[0],
  packages: html.match(/<!-- Packages Section -->[\s\S]*?<\/section>/)[0],
  gallery: html.match(/<!-- Gallery Section -->[\s\S]*?<\/section>/)[0],
  faqs: html.match(/<!-- FAQ Section -->[\s\S]*?<\/section>/)[0],
  contact: html.match(/<!-- Contact Section -->[\s\S]*?<\/section>/)[0]
};

for (const [name, content] of Object.entries(sections)) {
  const fileContent = `${headToNavEnd}\n\n${content}\n\n${footerStartToEnd}`;
  fs.writeFileSync(`${name}.html`, fileContent, 'utf8');
}

console.log("Pages generated successfully.");

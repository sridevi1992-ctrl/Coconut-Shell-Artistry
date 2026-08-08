const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

const replacements = [
  // Nav
  ['<a href="/index.html" class="nav-links">Home</a>', '<a href="/index.html" class="nav-links" data-i18n="nav_home">Home</a>'],
  ['<a href="/about.html" class="nav-links">About</a>', '<a href="/about.html" class="nav-links" data-i18n="nav_about">About</a>'],
  ['<a href="/services.html" class="nav-links">Services</a>', '<a href="/services.html" class="nav-links" data-i18n="nav_services">Services</a>'],
  ['<a href="/packages.html" class="nav-links">Packages</a>', '<a href="/packages.html" class="nav-links" data-i18n="nav_packages">Packages</a>'],
  ['<a href="/gallery.html" class="nav-links">Gallery</a>', '<a href="/gallery.html" class="nav-links" data-i18n="nav_gallery">Gallery</a>'],
  ['<a href="/faqs.html" class="nav-links">FAQs</a>', '<a href="/faqs.html" class="nav-links" data-i18n="nav_faqs">FAQs</a>'],
  ['<a href="/contact.html" class="nav-links btn-contact">Book Now</a>', '<li><select id="lang-switcher" class="lang-switcher"><option value="en">English</option><option value="hi">हिन्दी</option><option value="kn">ಕನ್ನಡ</option></select></li>\n          <li><a href="/contact.html" class="nav-links btn-contact" data-i18n="nav_book">Book Now</a>'],
  
  // Hero
  ['<h1>Exquisite Carvings for Your Sacred Vows</h1>', '<h1 data-i18n="hero_title">Exquisite Carvings for Your Sacred Vows</h1>'],
  ['<p>Elevate your wedding rituals with our premium, custom-carved coconuts. A perfect blend of tradition and artistry.</p>', '<p data-i18n="hero_desc">Elevate your wedding rituals with our premium, custom-carved coconuts. A perfect blend of tradition and artistry.</p>'],

  // About
  ['<h2 class="section-title">Our Heritage & Craft</h2>', '<h2 class="section-title" data-i18n="about_title">Our Heritage & Craft</h2>'],
  ['<p>At Coconut Shell Artistry, we honor the sacred traditions of Indian weddings by creating breathtaking, intricately carved coconuts. The coconut (Shreefal) symbolizes prosperity, fertility, and divine blessing.</p>', '<p data-i18n="about_p1">At Coconut Shell Artistry, we honor the sacred traditions of Indian weddings by creating breathtaking, intricately carved coconuts. The coconut (Shreefal) symbolizes prosperity, fertility, and divine blessing.</p>'],
  ['<p>Our master artisans spend hours hand-carving each piece, turning a simple offering into a cherished keepsake of your union. Whether you desire traditional motifs of Ganesha, elegant floral patterns, or custom couple portraits, we bring your vision to life with precision and devotion.</p>', '<p data-i18n="about_p2">Our master artisans spend hours hand-carving each piece, turning a simple offering into a cherished keepsake of your union. Whether you desire traditional motifs of Ganesha, elegant floral patterns, or custom couple portraits, we bring your vision to life with precision and devotion.</p>'],

  // Services
  ['<h2 class="section-title">Featured Services</h2>', '<h2 class="section-title" data-i18n="services_title">Featured Services</h2>'],
  ['<h3>Traditional Motifs</h3>', '<h3 data-i18n="serv_1_title">Traditional Motifs</h3>'],
  ['<p>Intricate carvings of deities like Lord Ganesha, Lakshmi, or traditional Swastika and Kalash symbols for auspicious beginnings.</p>', '<p data-i18n="serv_1_desc">Intricate carvings of deities like Lord Ganesha, Lakshmi, or traditional Swastika and Kalash symbols for auspicious beginnings.</p>'],
  ['<h3>Floral Elegance</h3>', '<h3 data-i18n="serv_2_title">Floral Elegance</h3>'],
  ['<p>Delicate mandalas, lotus motifs, and floral intertwines that add a touch of modern elegance to traditional rituals.</p>', '<p data-i18n="serv_2_desc">Delicate mandalas, lotus motifs, and floral intertwines that add a touch of modern elegance to traditional rituals.</p>'],
  ['<h3>Couple Portraits</h3>', '<h3 data-i18n="serv_3_title">Couple Portraits</h3>'],
  ['<p>Highly detailed silhouette carvings of the bride and groom, personalized with names and wedding dates.</p>', '<p data-i18n="serv_3_desc">Highly detailed silhouette carvings of the bride and groom, personalized with names and wedding dates.</p>'],

  // Packages
  ['<h2 class="section-title">Wedding Packages</h2>', '<h2 class="section-title" data-i18n="packages_title">Wedding Packages</h2>'],
  ['<h3>The Shubh Package</h3>', '<h3 data-i18n="pack_shubh_title">The Shubh Package</h3>'],
  ['<li>3 Custom carved coconuts</li>', '<li data-i18n="pack_shubh_feat1">3 Custom carved coconuts</li>'],
  ['<li>Choice of Traditional Motif</li>', '<li data-i18n="pack_shubh_feat2">Choice of Traditional Motif</li>'],
  ['<li>Standard Packaging</li>', '<li data-i18n="pack_shubh_feat3">Standard Packaging</li>'],
  ['<a href="#contact" class="btn-secondary">Inquire Now</a>', '<a href="#contact" class="btn-secondary" data-i18n="pack_inquire">Inquire Now</a>'],
  ['<div class="badge">Most Popular</div>', '<div class="badge" data-i18n="pack_popular">Most Popular</div>'],
  ['<h3>The Vivah Package</h3>', '<h3 data-i18n="pack_vivah_title">The Vivah Package</h3>'],
  ['<li>5 Custom carved coconuts</li>', '<li data-i18n="pack_vivah_feat1">5 Custom carved coconuts</li>'],
  ['<li>4 designed dry coconuts</li>', '<li data-i18n="pack_vivah_feat2">4 designed dry coconuts</li>'],
  ['<li>Haldi kumkum packets</li>', '<li data-i18n="pack_vivah_feat3">Haldi kumkum packets</li>'],
  ['<li>10 carved half coconuts</li>', '<li data-i18n="pack_vivah_feat4">10 carved half coconuts</li>'],
  ['<li>Cotton garland</li>', '<li data-i18n="pack_vivah_feat5">Cotton garland</li>'],
  ['<a href="#contact" class="btn-primary">Book Now</a>', '<a href="#contact" class="btn-primary" data-i18n="nav_book">Book Now</a>'],

  // Gallery
  ['<h2 class="section-title">Our Masterpieces</h2>', '<h2 class="section-title" data-i18n="gallery_title">Our Masterpieces</h2>'],

  // FAQs
  ['<h2 class="section-title">Frequently Asked Questions</h2>', '<h2 class="section-title" data-i18n="faq_title">Frequently Asked Questions</h2>'],
  ['How far in advance should I book?', '<span data-i18n="faq_q1">How far in advance should I book?</span>'],
  ['<div class="faq-answer"><p>We recommend booking at least 4-6 weeks in advance, especially during peak wedding seasons, to ensure ample time for custom design and delicate carving.</p></div>', '<div class="faq-answer"><p data-i18n="faq_a1">We recommend booking at least 4-6 weeks in advance, especially during peak wedding seasons, to ensure ample time for custom design and delicate carving.</p></div>'],
  ['Do you ship across India/Internationally?', '<span data-i18n="faq_q2">Do you ship across India/Internationally?</span>'],
  ['<div class="faq-answer"><p>Yes! We carefully package our coconuts in custom shock-proof boxes. We ship pan-India and offer international shipping for select destinations.</p></div>', '<div class="faq-answer"><p data-i18n="faq_a2">Yes! We carefully package our coconuts in custom shock-proof boxes. We ship pan-India and offer international shipping for select destinations.</p></div>'],
  ['Can the coconut be preserved?', '<span data-i18n="faq_q3">Can the coconut be preserved?</span>'],
  ['<div class="faq-answer"><p>Yes, we treat the outer shell to ensure longevity. While the inside will naturally dry out over years, the carved exterior remains a beautiful keepsake for decades.</p></div>', '<div class="faq-answer"><p data-i18n="faq_a3">Yes, we treat the outer shell to ensure longevity. While the inside will naturally dry out over years, the carved exterior remains a beautiful keepsake for decades.</p></div>'],

  // Contact
  ['<h2>Let\'s Create Magic</h2>', '<h2 data-i18n="contact_title">Let\'s Create Magic</h2>'],
  ['<p>Ready to commission your custom wedding coconut? Fill out the form, and our artisan team will get back to you with a consultation.</p>', '<p data-i18n="contact_desc">Ready to commission your custom wedding coconut? Fill out the form, and our artisan team will get back to you with a consultation.</p>'],
  ['<input type="text" id="name" required placeholder="Your Name">', '<input type="text" id="name" required placeholder="Your Name" data-i18n-placeholder="contact_name">'],
  ['<input type="email" id="email" required placeholder="Email Address">', '<input type="email" id="email" required placeholder="Email Address" data-i18n-placeholder="contact_email">'],
  ['<input type="date" id="date" required placeholder="Wedding Date">', '<input type="date" id="date" required placeholder="Wedding Date" data-i18n-placeholder="contact_date">'],
  ['<option value="" disabled selected>Select Package</option>', '<option value="" disabled selected data-i18n="contact_select">Select Package</option>'],
  ['<textarea id="message" rows="4" placeholder="Tell us about your vision..."></textarea>', '<textarea id="message" rows="4" placeholder="Tell us about your vision..." data-i18n-placeholder="contact_msg"></textarea>'],
  ['<button type="submit" class="btn-primary w-100">Send Inquiry</button>', '<button type="submit" class="btn-primary w-100" data-i18n="contact_btn">Send Inquiry</button>'],

  // Footer
  ['<p>Preserving tradition through art.</p>', '<p data-i18n="footer_slogan">Preserving tradition through art.</p>'],
  ['<p>&copy; 2026 Coconut Shell Artistry. All rights reserved.</p>', '<p data-i18n="footer_rights">&copy; 2026 Coconut Shell Artistry. All rights reserved.</p>']
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  replacements.forEach(([search, replace]) => {
    // Only replace if it hasn't been replaced already (naive check)
    if (content.includes(search)) {
      content = content.replace(search, replace);
    }
  });

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Applied i18n to ${file}`);
});

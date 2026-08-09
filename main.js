import { translations } from './translations.js';

document.addEventListener('DOMContentLoaded', () => {
  // Sticky Navbar
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu Toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close all other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current item
      item.classList.toggle('active');
    });
  });

  // Form Submission Handler (WhatsApp Integration)
  const bookingForm = document.getElementById('bookingForm');
  if(bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      
      // Get selected package text instead of value for better reading
      const serviceSelect = document.getElementById('service');
      const pkg = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      const message = document.getElementById('message').value;

      // Construct the message
      const waMessage = `*New Inquiry for Coconut Shell Artistry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Contact Number:* ${phone}\n*Delivery Address:* ${address}\n*Selected Package:* ${pkg}\n*Message:* ${message}`;
      
      // Format phone number to WhatsApp URL format
      const targetPhone = '916362115958';
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form
      bookingForm.reset();
    });
  }
  // Language Switcher Logic
  const langSwitcher = document.getElementById('lang-switcher');
  const savedLang = localStorage.getItem('site_lang') || 'en';
  
  if (langSwitcher) {
    langSwitcher.value = savedLang;
    langSwitcher.addEventListener('change', (e) => {
      const newLang = e.target.value;
      localStorage.setItem('site_lang', newLang);
      applyTranslations(newLang);
    });
  }
  
  applyTranslations(savedLang);
});

function applyTranslations(lang) {
  const dict = translations[lang];
  if (!dict) return;
  
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });
  
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (dict[key]) {
      el.placeholder = dict[key];
    }
  });
}

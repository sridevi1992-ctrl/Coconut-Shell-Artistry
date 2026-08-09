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
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const phoneInput = document.getElementById('phone');
      const addressInput = document.getElementById('address');
      const messageInput = document.getElementById('message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();
      const address = addressInput.value.trim();
      const message = messageInput.value.trim();

      // Validation
      if (!name || !email || !phone || !address) {
        alert('Please fill out all required fields with valid text (no blank spaces).');
        return;
      }

      // Prevent just hyphens or invalid strings
      if (/^[- ]+$/.test(name) || /^[- ]+$/.test(phone) || /^[- ]+$/.test(address)) {
        alert('Please enter valid information without just hyphens or spaces.');
        return;
      }

      // Show loading state on button
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;
      
      // Get selected package text instead of value for better reading
      const serviceSelect = document.getElementById('service');
      const pkg = serviceSelect.options[serviceSelect.selectedIndex].text;
      
      const message = document.getElementById('message').value;

      // Send data to Google Sheets
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx83IsErGI2zvE55vXLD3LWQPdgE6gM7JoOXKTe4q3Q5ul2bPPBou3RaIUcz1UByaVi/exec';
      
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('pkg', pkg);
      formData.append('message', message);

      try {
        await fetch(scriptURL, {
          method: 'POST',
          body: formData
        });
      } catch (error) {
        console.error('Error saving to Google Sheets:', error);
      }

      // Construct the WhatsApp message
      const waMessage = `*New Inquiry for Coconut Shell Artistry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Contact Number:* ${phone}\n*Delivery Address:* ${address}\n*Selected Package:* ${pkg}\n*Message:* ${message}`;
      
      // Format phone number to WhatsApp URL format
      const targetPhone = '916362115958';
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(waMessage)}`;
      
      // Open WhatsApp in a new tab
      window.open(whatsappUrl, '_blank');
      
      // Reset form and button
      bookingForm.reset();
      submitBtn.innerText = originalBtnText;
      submitBtn.disabled = false;
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

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

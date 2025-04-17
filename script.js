let translations = {};
let currentLang = localStorage.getItem("lang") || "ar";

fetch("/assets/translations/translations.json")
  .then((response) => response.json())
  .then((data) => {
    translations = data;
    setLanguage(currentLang);
  });

const toggleLangBtn = document.querySelectorAll(".toggleLangBtn");

toggleLangBtn.forEach((e) => {
  e.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "ar" : "en";
    localStorage.setItem("lang", currentLang);
    setLanguage(currentLang);
  });
});

function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.body.style.direction = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = translations[lang][key];
  });

  toggleLangBtn.forEach((e) => {
    e.innerHTML =
      lang === "en"
        ? `<div> Arabic </div>
  <div> <img src="/assets/images/logos/arabic-logo.png" /> </div>
  `
        : `<div>English </div>
  <div> <img src="/assets/images/logos/english-logo.png" /> </div>
  `;
  });
}

// Menubar toggle

const toggleNav = () =>
  document.querySelector(".mobile-nav").classList.toggle("closed");
document.querySelector(".menu-bar").addEventListener("click", toggleNav);
document.querySelector(".close-btn").addEventListener("click", toggleNav);
document
  .querySelectorAll(".mobile-nav a, .mobile-nav button")
  .forEach((element) => {
    element.addEventListener("click", () => {
      document.querySelector(".mobile-nav").classList.add("closed");
    });
  });

// Animations

// Add this to your script.js file

// Function to check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <=
      (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
    rect.bottom >= 0
  );
}

// Function to handle scroll animations
function handleScrollAnimations() {
  // Get all elements that need to be animated
  const animatedElements = document.querySelectorAll(
    ".rent-without-limits-box, .how-it-works-card, .benefit-card, .testimonial-card, .contact-img, .contact-text, .partners-section h2, .partners-section .gradient-btn, .partners img"
  );

  // Check each element
  animatedElements.forEach((element) => {
    if (isInViewport(element) && !element.classList.contains("in-view")) {
      element.classList.add("in-view");
    }
  });
}

// Sequential animation for cards with delay
function setupSequentialAnimations() {
  // How it works cards
  const howItWorksCards = document.querySelectorAll(".how-it-works-card");
  howItWorksCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 150}ms`;
  });

  // Benefit cards
  const benefitCards = document.querySelectorAll(".benefit-card");
  benefitCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 150}ms`;
  });

  // Testimonial cards
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 150}ms`;
  });

  // Partner logos
  const partnerLogos = document.querySelectorAll(".partners img");
  partnerLogos.forEach((logo, index) => {
    logo.style.animationDelay = `${index * 100}ms`;
  });
}

// Initialize animations
document.addEventListener("DOMContentLoaded", function () {
  setupSequentialAnimations();

  // Run once on load to animate elements already in view
  handleScrollAnimations();

  // Add scroll event listener
  window.addEventListener("scroll", handleScrollAnimations);
});

// Mobile menu animation
document.addEventListener("DOMContentLoaded", function () {
  const menuBar = document.querySelector(".menu-bar");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeBtn = document.querySelector(".close-btn");

  if (menuBar && mobileNav && closeBtn) {
    menuBar.addEventListener("click", function () {
      mobileNav.classList.remove("closed");
      mobileNav.style.animation = "fadeIn 0.3s ease forwards";
    });

    closeBtn.addEventListener("click", function () {
      mobileNav.style.animation = "fadeIn 0.3s ease-out reverse forwards";
      setTimeout(() => {
        mobileNav.classList.add("closed");
      }, 300);
    });
  }
});

// Smooth scroll for navigation links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Only if the link has a hash
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          });

          // Close mobile nav if open
          const mobileNav = document.querySelector(".mobile-nav");
          if (mobileNav && !mobileNav.classList.contains("closed")) {
            mobileNav.classList.add("closed");
          }
        }
      }
    });
  });
});


/* =========================================================
   DUCES CONSULTANCY SERVICES
   Website JavaScript - V3
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  // 1. MOBILE NAVIGATION

  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {

    function closeMenu() {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    }

    function openMenu() {
      navLinks.classList.add("open");
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation");
    }

    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.contains("open");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu after selecting a navigation link.

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    // Close menu when Escape is pressed.

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    // Close menu when clicking outside the navigation.

    document.addEventListener("click", function (event) {
      const clickedInsideMenu = navLinks.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle) {
        closeMenu();
      }
    });

    // Close menu when switching to desktop width.

    window.addEventListener("resize", function () {
      if (window.innerWidth > 850) {
        closeMenu();
      }
    });
  }


  // 2. AUTOMATIC COPYRIGHT YEAR

  const yearElement = document.getElementById("current-year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }


  // 3. CONTACT FORM BASIC VALIDATION

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
        return;
      }

      const submitButton = contactForm.querySelector(
        'button[type="submit"]'
      );

      if (submitButton) {
        submitButton.textContent = "Submitting...";
        submitButton.disabled = true;
      }

    });

  }


  // 4. SMOOTH INTERNAL NAVIGATION

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, "", targetId);
        }
      }

    });

  });

});


/* =========================================================
   DUCES CONSULTANCY SERVICES
   Website JavaScript
   Version: 3.1
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  /* 01. MOBILE NAVIGATION */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const navigationLinks = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {
      const expanded =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (expanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (
        !navigation.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1000) {
        closeMenu();
      }
    });
  }

  /* 02. AUTOMATIC COPYRIGHT YEAR */

  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* 03. CONTACT FORM VALIDATION */

  const contactForm = document.querySelector(".contact-form");

  if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
        return;
      }

      const emailField =
        contactForm.querySelector("#email");

      if (emailField && !emailField.validity.valid) {
        event.preventDefault();
        emailField.focus();
        emailField.reportValidity();
      }

    });
  }

  /* 04. PREVENT EMPTY ANCHOR NAVIGATION */

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
    });
  });

});

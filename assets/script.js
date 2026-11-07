
/* =========================================================
   DUCES CONSULTANCY SERVICES
   Website JavaScript
   Version: 3.0
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

  /* 01. MOBILE NAVIGATION */

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const navigationLinks = document.querySelectorAll(".nav-links a");

  function closeMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;

    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation");
  }

  if (menuToggle && navigation) {

    menuToggle.addEventListener("click", function () {
      const isOpen =
        menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    navigationLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      const clickedInsideNavigation =
        navigation.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

      if (!clickedInsideNavigation && !clickedMenuButton) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 850) {
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
        contactForm.querySelector('input[name="email"]');

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

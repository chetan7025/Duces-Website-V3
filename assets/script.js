/* DUCES Consultancy Services — one shared navigation system for all content pages */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();

  if (!navigation) return;

  const navItems = [
    { label: "Home", href: "index.html", pages: ["index.html"] },
    { label: "About Us", href: "about.html", pages: ["about.html"] },
    { label: "Business Setup", href: "business-setup.html", pages: ["business-setup.html"] },
    {
      label: "Banking & Finance",
      href: "business-bank-account.html",
      pages: ["business-bank-account.html", "business-loan.html", "mortgage-loan.html"],
      children: [
        ["Business Bank Account", "business-bank-account.html"],
        ["Business Finance", "business-loan.html"],
        ["Mortgage Finance", "mortgage-loan.html"]
      ]
    },
    {
      label: "Accounting & Tax",
      href: "accounting-bookkeeping.html",
      pages: ["accounting-bookkeeping.html", "vat-corporate-tax.html"],
      children: [
        ["Accounting & Bookkeeping", "accounting-bookkeeping.html"],
        ["VAT & Corporate Tax", "vat-corporate-tax.html"]
      ]
    },
    { label: "PRO & Visa Services", href: "pro-visa-services.html", pages: ["pro-visa-services.html"] },
    { label: "Contact Us", href: "contact.html", pages: ["contact.html"] }
  ];

  navigation.id = navigation.id || "duces-main-navigation";
  navigation.setAttribute("aria-label", "Main navigation");

  navigation.innerHTML = navItems.map(function (item) {
    const active = item.pages.includes(currentPage);
    if (item.children) {
      const childLinks = item.children.map(function (child) {
        const childActive = currentPage === child[1];
        return '<a href="' + child[1] + '"' +
          (childActive ? ' class="active" aria-current="page"' : '') +
          '>' + child[0] + '</a>';
      }).join("");
      return '<details class="nav-dropdown"' + (active ? ' open data-current="true"' : '') + '>' +
        '<summary' + (active ? ' class="active" aria-current="page"' : '') + '>' +
        item.label + '</summary><div class="dropdown-menu">' + childLinks + '</div></details>';
    }
    return '<a href="' + item.href + '"' +
      (active ? ' class="active" aria-current="page"' : '') +
      '>' + item.label + '</a>';
  }).join("") +
  '<a class="wa-nav" href="https://wa.me/971505356966" target="_blank" rel="noopener">WhatsApp Us</a>';

  function closeMenu() {
    if (!menuToggle || !navigation) return;
    navigation.classList.remove("is-open", "open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  function openMenu() {
    if (!menuToggle || !navigation) return;
    navigation.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  }

  if (menuToggle) {
    menuToggle.setAttribute("aria-controls", navigation.id);
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.addEventListener("click", function () {
      menuToggle.getAttribute("aria-expanded") === "true" ? closeMenu() : openMenu();
    });
  }

  navigation.querySelectorAll(".nav-dropdown").forEach(function (dropdown) {
    const summary = dropdown.querySelector("summary");
    if (summary) summary.setAttribute("aria-haspopup", "true");

    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > 780) dropdown.setAttribute("open", "");
    });
    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth > 780 && !dropdown.contains(document.activeElement)) {
        dropdown.removeAttribute("open");
      }
    });
    dropdown.addEventListener("focusin", function () {
      if (window.innerWidth > 780) dropdown.setAttribute("open", "");
    });
    dropdown.addEventListener("focusout", function (event) {
      if (!dropdown.contains(event.relatedTarget) && window.innerWidth > 780) {
        dropdown.removeAttribute("open");
      }
    });
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("click", function (event) {
    if (navigation && menuToggle &&
        !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      navigation.querySelectorAll("details[open]").forEach(function (item) {
        item.removeAttribute("open");
      });
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 780) closeMenu();
  });

  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      if (!contactForm.checkValidity()) {
        event.preventDefault();
        contactForm.reportValidity();
      }
    });
  }

  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) { event.preventDefault(); });
  });
});
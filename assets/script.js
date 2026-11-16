/* DUCES Consultancy Services — shared navigation for every content page */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".nav-links");
  const currentPage = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  if (!navigation) return;

  const navItems = [
    { label: "Home", href: "index.html", pages: ["index.html"] },
    { label: "About Us", href: "about.html", pages: ["about.html"] },
    { label: "Business Setup", pages: ["business-setup.html", "calculator.html"], children: [["Business Setup Overview", "business-setup.html"], ["Setup Cost Calculator", "calculator.html"]] },
    {
      label: "Bank Account",
      pages: ["business-bank-account.html", "personal-bank-account.html", "offshore-bank-account.html"],
      children: [
        ["Business Bank Account", "business-bank-account.html"],
        ["Personal Bank Account", "personal-bank-account.html"],
        ["Offshore Bank Account", "offshore-bank-account.html"]
      ]
    },
    { label: "Business Finance", href: "business-loan.html", pages: ["business-loan.html"] },
    { label: "Mortgage Finance", href: "mortgage-loan.html", pages: ["mortgage-loan.html"] },
    {
      label: "Accounting & Tax",
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
      const children = item.children.map(function (child) {
        const childActive = currentPage === child[1];
        return '<a href="' + child[1] + '"' +
          (childActive ? ' class="active" aria-current="page"' : '') + '>' + child[0] + '</a>';
      }).join("");
      return '<details class="nav-dropdown"' + (active ? ' open data-current="true"' : '') + '>' +
        '<summary' + (active ? ' class="active" aria-current="page"' : '') + '>' +
        item.label + '</summary><div class="dropdown-menu">' + children + '</div></details>';
    }
    return '<a href="' + item.href + '"' +
      (active ? ' class="active" aria-current="page"' : '') + '>' + item.label + '</a>';
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
    summary.addEventListener("click", function () {
      navigation.querySelectorAll(".nav-dropdown").forEach(function (other) {
        if (other !== dropdown) other.removeAttribute("open");
      });
    });
    dropdown.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1000) {
        navigation.querySelectorAll(".nav-dropdown").forEach(function (other) {
          if (other !== dropdown) other.removeAttribute("open");
        });
        dropdown.setAttribute("open", "");
      }
    });
    dropdown.addEventListener("mouseleave", function () {
      if (window.innerWidth > 1000 && !dropdown.contains(document.activeElement)) dropdown.removeAttribute("open");
    });
    dropdown.addEventListener("focusin", function () {
      if (window.innerWidth > 1000) dropdown.setAttribute("open", "");
    });
    dropdown.addEventListener("focusout", function (event) {
      if (window.innerWidth > 1000 && !dropdown.contains(event.relatedTarget)) dropdown.removeAttribute("open");
    });
  });

  navigation.addEventListener("click", function (event) {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", function (event) {
    if (!navigation.contains(event.target) && !event.target.closest(".menu-toggle")) {
      navigation.querySelectorAll(".nav-dropdown[open]").forEach(function (item) { item.removeAttribute("open"); });
      closeMenu();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      navigation.querySelectorAll(".nav-dropdown[open]").forEach(function (item) { item.removeAttribute("open"); });
      closeMenu();
      if (menuToggle) menuToggle.focus();
    }
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1000) closeMenu();
  });

  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) contactForm.addEventListener("submit", function (event) {
    if (!contactForm.checkValidity()) {
      event.preventDefault();
      contactForm.reportValidity();
    }
  });
  document.querySelectorAll('a[href="#"]').forEach(function (link) {
    link.addEventListener("click", function (event) { event.preventDefault(); });
  });
  /* Setup estimator prefill and live indicative package reference */
  const query = new URLSearchParams(window.location.search);
  const productField = document.querySelector('.contact-form [name="Product"]');
  const descriptionField = document.querySelector('.contact-form [name="Description"]');
  if (query.get("product") && productField) productField.value = query.get("product");
  if (query.get("message") && descriptionField) descriptionField.value = query.get("message");
  const estimator = document.getElementById("setup-estimator");
  if (estimator) {
    const get = id => document.getElementById(id);
    const jurisdiction=get("jurisdiction"), packageField=get("package"), visas=get("visa-count"), duration=get("duration"), activities=get("activity-count"), shareholders=get("shareholder-count");
    const total=get("estimate-total"), basis=get("estimate-basis"), rows=get("estimate-breakdown"), enquire=get("estimate-enquire");
    const money=value=>new Intl.NumberFormat("en-AE",{style:"currency",currency:"AED",maximumFractionDigits:0}).format(value);
    function updateEstimate(){
      const route=jurisdiction.value; packageField.disabled=route!=="freezone";
      if(route!=="freezone") packageField.value="quote"; else if(packageField.value==="quote") packageField.value="basic";
      const authority=get("authority"), workspace=get("workspace");
      authority.disabled=route!=="freezone";
      const visaCount=Number(visas.value), included=packageField.value==="visa"?1:0;
      const extras=Array.from(estimator.querySelectorAll('input[name="extras"]:checked')).map(item=>item.value);
      const amount=route==="freezone"&&packageField.value!=="quote"?(packageField.value==="visa"?10800:4888):null;
      const quoteRequired=route!=="freezone"||packageField.value==="quote"||duration.value!=="1"||visaCount>included||authority.value!=="recommend"||workspace.value!=="undecided"||extras.length>0;
      total.textContent=amount===null?"Custom quote":(quoteRequired?"From ":"")+money(amount);
      basis.textContent=amount===null?"Pricing depends on jurisdiction, authority, activity and operating requirements.":"DUCES published starting-package reference. A tailored quote is required for selected extras or specific authority requirements.";
      const authorityLabel=route!=="freezone"?"Not applicable":authority.options[authority.selectedIndex].text;
      const values=[["Setup route",route==="freezone"?"Free Zone":route==="mainland"?"Mainland":"Offshore"],["Preferred authority",authorityLabel],["Package reference",amount===null?"On quotation":money(amount)],["Licence duration",duration.options[duration.selectedIndex].text],["Business activities",activities.value],["Shareholders",shareholders.value],["Visas requested",visaCount+" visa(s)"],["Workspace",workspace.options[workspace.selectedIndex].text]];
      rows.innerHTML=values.map(item=>"<div><span>"+item[0]+"</span><strong>"+item[1]+"</strong></div>").join("");
      get("visa-note").textContent=visaCount>included?(visaCount-included)+" additional visa(s) need separate pricing and eligibility confirmation.":"Visa eligibility and allocation depend on the selected authority and package.";
      get("quote-note").hidden=!quoteRequired;
      const message="Business setup enquiry: "+(route==="freezone"?"Free Zone":route==="mainland"?"Mainland":"Offshore")+"; preferred authority: "+authorityLabel+"; package: "+(amount===null?"Custom quotation":money(amount))+"; duration: "+duration.value+" year(s); activities: "+activities.value+"; shareholders: "+shareholders.value+"; visas requested: "+visaCount+"; workspace: "+workspace.value+"; additional services: "+(extras.join(", ")||"None selected")+". Please confirm current authority fees, package inclusions and additional charges.";
      enquire.href="contact.html?product="+encodeURIComponent("Business Setup")+"&message="+encodeURIComponent(message);
    }
    estimator.addEventListener("input",updateEstimate); estimator.addEventListener("change",updateEstimate); updateEstimate();
  }
});
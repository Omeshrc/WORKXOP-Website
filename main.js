let lastScrollPos = 0;
const header = document.querySelector(".header");
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

document.querySelectorAll(".hamburger").addEventListener("click", toggleNavbar);

document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  })
);

// Function to handle scroll behavior
window.addEventListener("scroll", () => {
  const currentScrollPos = window.scrollY;
  header.style.transform =
    currentScrollPos > lastScrollPos ? "translateY(-100%)" : "translateY(0)";
  lastScrollPos = currentScrollPos;
});

// Function to handle clickable divs
const clickableDivs = document.querySelectorAll(".clickable-div");
clickableDivs.forEach((div) => {
  div.addEventListener("click", function () {
    const url = this.getAttribute("data-url");
    window.location.href = url;
  });
});

// Function to construct email body
function constructEmailBody(event) {
  event.preventDefault();
  const rating = document.querySelector('input[name="rating"]:checked').value;
  const reason = document.getElementById("reason").value;
  const reccomend = document.querySelector(
    'input[name="reccomend"]:checked'
  ).value;
  const visit = document.getElementById("visit").value;
  const preference = document.getElementById("preference").value;

  const emailBody = `Rating: ${rating}\nReason: ${reason}\nRecommendation: ${reccomend}\nWebsite visit: ${visit}\nPreference: ${preference}\n`;
  const form = document.querySelector("form");
  form.action = `mailto:minoshanj@gmail.com?subject=User%20Details&body=${encodeURIComponent(
    emailBody
  )}`;

  openPopup();
  form.submit();
}

// Popup functions
let popup = document.getElementById("popup");
let overlay = document.getElementById("overlay");

function openPopup() {
  popup.classList.add("open-popup");
  overlay.style.visibility = "visible";
}

function closePopup() {
  popup.classList.remove("open-popup");
  overlay.style.visibility = "hidden";
}

// Form validation
function validateForm(event) {
  event.preventDefault();
  document.getElementById("ratingError").style.display = "none";
  document.getElementById("reccomendError").style.display = "none";
  document.getElementById("reasonError").style.display = "none";

  const rating = document.querySelector('input[name="rating"]:checked');
  if (!rating) {
    document.getElementById("ratingError").style.display = "flex";
    document
      .getElementById("commentForm")
      .scrollIntoView({ behavior: "smooth" });
    return;
  }

  const reason = document.getElementById("reason").value.trim();
  if (reason === "") {
    document.getElementById("reasonError").style.display = "flex";
    document
      .getElementById("commentForm")
      .scrollIntoView({ behavior: "smooth" });
    return;
  }

  const reccomend = document.querySelector('input[name="reccomend"]:checked');
  if (!reccomend) {
    document.getElementById("reccomendError").style.display = "flex";
    document.getElementById("reason").scrollIntoView({ behavior: "smooth" });
    return;
  }

  constructEmailBody(event);
}

// Scroll to top function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Set active link in side navbar
const links = document.querySelectorAll(".side-navbar a");

function setActiveLink() {
  const currentLink = window.location.hash;
  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === currentLink);
  });
}

setActiveLink();

links.forEach((link) => {
  link.addEventListener("click", () => {
    setTimeout(setActiveLink, 10);
  });
});

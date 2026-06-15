const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("[data-form-status]");

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  nav.classList.toggle("is-visible", !isOpen);
  header.classList.toggle("is-open", !isOpen);
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    menuToggle?.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-visible");
    header.classList.remove("is-open");
  }
});

form?.addEventListener("submit", (event) => {
  if (!form.checkValidity()) {
    return;
  }

  const data = new FormData(form);
  const email = String(data.get("email") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const replyTo = form.querySelector('input[name="_replyto"]');
  const subject = form.querySelector('input[name="_subject"]');
  const next = form.querySelector('input[name="_next"]');

  if (replyTo) {
    replyTo.value = email;
  }

  if (subject) {
    subject.value = topic
      ? `Zapytanie o szkolenie: ${topic}`
      : "Nowe zapytanie o szkolenie ze strony Krzysztofa Węgrzyna";
  }

  if (next && ["http:", "https:"].includes(window.location.protocol)) {
    next.value = new URL("dziekuje.html", window.location.href).href;
  }

  if (formStatus) {
    formStatus.textContent = "Wysyłam formularz...";
  }
});

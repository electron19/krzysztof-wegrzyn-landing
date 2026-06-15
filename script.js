const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("[data-form-status]");
const formStartedAt = form?.querySelector('input[name="form_started_at"]');

function updateHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 16);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (formStartedAt) {
  formStartedAt.value = String(Math.floor(Date.now() / 1000));
}

if (formStatus) {
  const contactStatus = new URLSearchParams(window.location.search).get("kontakt");

  if (contactStatus === "blad") {
    formStatus.textContent = "Nie udało się wysłać wiadomości. Spróbuj ponownie albo napisz bezpośrednio na e-mail.";
  }
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

  if (formStartedAt && !formStartedAt.value) {
    formStartedAt.value = String(Math.floor(Date.now() / 1000));
  }

  if (formStatus) {
    formStatus.textContent = "Wysyłam formularz...";
  }
});

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const year = document.querySelector("[data-year]");
const form = document.querySelector("#contact-form");
const formStatus = document.querySelector("[data-form-status]");
const contactEmail = "kontakt@krzysztofwegrzyn.pl";

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
  event.preventDefault();
  const data = new FormData(form);
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const topic = String(data.get("topic") || "").trim();
  const message = String(data.get("message") || "").trim();

  const subject = encodeURIComponent(`Zapytanie o szkolenie: ${topic}`);
  const body = encodeURIComponent(
    [
      `Imię i firma: ${name}`,
      `E-mail: ${email}`,
      `Obszar szkolenia: ${topic}`,
      "",
      "Opis potrzeby:",
      message
    ].join("\n")
  );

  window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

  if (formStatus) {
    formStatus.textContent = "Przygotowano wiadomość w domyślnym programie pocztowym.";
  }
});

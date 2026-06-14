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

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Zmiana statusu na czas wysyłania
  if (formStatus) {
    formStatus.textContent = "Wysyłanie wiadomości...";
    formStatus.style.color = "inherit"; // Reset koloru, jeśli używasz stylów
  }

  // Pobranie danych z formularza
  const data = new FormData(form);

  try {
    // TUTAJ PODMIENIASZ URL NA TEN, KTÓRY OTRZYMASZ OD FORMSPREE / WEB3FORMS
    const response = await fetch("https://formspree.io/f/TWOJ_UNIKALNY_KOD_Z_FORMSPREE", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      if (formStatus) {
        formStatus.textContent = "Dziękuję! Twoja wiadomość została wysłana.";
        formStatus.style.color = "green";
      }
      form.reset(); // Czyszczenie pól formularza po sukcesie
    } else {
      if (formStatus) {
        formStatus.textContent = "Ups! Wystąpił problem z wysłaniem formularza.";
        formStatus.style.color = "red";
      }
    }
  } catch (error) {
    if (formStatus) {
      formStatus.textContent = "Błąd połączenia. Sprawdź swój internet i spróbuj ponownie.";
      formStatus.style.color = "red";
    }
  }
});

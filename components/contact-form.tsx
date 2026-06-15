"use client";

import { FormEvent, useState } from "react";

import type { ContactRequest, ContactResponse } from "@/types/contact";

type FormState = "idle" | "submitting" | "success" | "error";

const initialMessage = "";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState(initialMessage);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload: ContactRequest = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      company: String(formData.get("company") ?? ""),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      website: String(formData.get("website") ?? ""),
    };

    setState("submitting");
    setStatusMessage("Wysyłam formularz...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as ContactResponse;

      if (!response.ok || !result.success) {
        setState("error");
        setStatusMessage(
          result.message ??
            "Nie udało się wysłać formularza. Spróbuj ponownie albo napisz bezpośrednio na e-mail.",
        );
        return;
      }

      form.reset();
      setState("success");
      setStatusMessage(
        "Dziękuję. Zgłoszenie zostało zapisane, odezwę się z rekomendacją programu.",
      );
    } catch (error: unknown) {
      console.error("Contact form request failed.", error);
      setState("error");
      setStatusMessage(
        "Nie udało się wysłać formularza. Spróbuj ponownie albo napisz bezpośrednio na e-mail.",
      );
    }
  }

  return (
    <form
      className="contact-form"
      id="contact-form"
      onSubmit={handleSubmit}
      aria-busy={state === "submitting"}
    >
      <label className="form-honeypot" aria-hidden="true">
        Strona www
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Imię i nazwisko
        <input
          name="name"
          autoComplete="name"
          required
          placeholder="np. Anna Kowalska"
        />
      </label>
      <label>
        E-mail
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="anna@firma.pl"
        />
      </label>
      <label>
        Telefon
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="+48 600 000 000"
        />
      </label>
      <label>
        Firma
        <input
          name="company"
          autoComplete="organization"
          placeholder="Nazwa firmy"
        />
      </label>
      <label>
        Krótki opis potrzeby
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Np. miesięczny raport sprzedaży zajmuje 2 dni i wymaga kopiowania danych z kilku plików."
        />
      </label>
      <label className="consent-field">
        <input name="consent" type="checkbox" />
        <span>Wyrażam zgodę na kontakt w sprawie zapytania szkoleniowego.</span>
      </label>
      <button
        className="button button-primary"
        type="submit"
        disabled={state === "submitting"}
      >
        {state === "submitting" ? "Wysyłam..." : "Umów konsultację"}
      </button>
      <p className={`form-status is-${state}`} role="status" aria-live="polite">
        {statusMessage}
      </p>
    </form>
  );
}

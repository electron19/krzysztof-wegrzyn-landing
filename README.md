# Krzysztof Węgrzyn - Landing Page

Landing page marki osobistej Krzysztof Węgrzyn dla szkoleń Microsoft Excel, Power Query i Power BI.

Projekt jest przebudowany na Next.js App Router, TypeScript, Vercel Functions i Supabase PostgreSQL. Formularz kontaktowy zapisuje zgłoszenia w bazie danych jako źródle prawdy. E-mail może zostać dodany później tylko jako powiadomienie, bez ryzyka utraty leadów.

## Stack

- Next.js
- React
- TypeScript
- Vercel
- Supabase PostgreSQL
- Zod

## Struktura

```text
.
├── app/
│   ├── api/contact/route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
├── components/
│   ├── contact-form.tsx
│   └── site-header.tsx
├── lib/
│   ├── contact-schema.ts
│   ├── rate-limit.ts
│   ├── request.ts
│   └── supabase.ts
├── public/
│   ├── assets/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── supabase/migrations/
├── types/
│   ├── contact.ts
│   └── database.ts
└── .github/workflows/ci.yml
```

## Formularz Kontaktowy

Endpoint:

```text
POST /api/contact
```

Pola:

- `name`
- `email`
- `phone`
- `company`
- `message`
- `consent`
- `website` jako honeypot antyspamowy

Zabezpieczenia:

- walidacja serwerowa Zod
- honeypot
- limit 5 zgłoszeń na 10 minut z jednego hasha IP
- brak zapisu surowego IP
- RLS w Supabase
- brak dostępu `anon` i `authenticated` do tabel formularza
- logowanie błędów bez ujawniania stack trace użytkownikowi

## Supabase

Migracje znajdują się w:

```text
supabase/migrations/
```

Utworzone obiekty:

- `public.leads`
- `public.contact_rate_limits`
- `public.check_contact_rate_limit(...)`

Tabela `leads` ma pola przygotowane pod CRM:

- `status`
- `crm_provider`
- `crm_external_id`
- `crm_synced_at`
- `metadata`

## Zmienne Środowiskowe

Skopiuj `.env.example` do lokalnego `.env.local` i ustaw:

```bash
SUPABASE_URL=https://uquxzswczoytqlocsxyx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=
CONTACT_IP_HASH_SECRET=
```

Na Vercel dodaj te same zmienne w ustawieniach projektu. `SUPABASE_SERVICE_ROLE_KEY` musi pozostać wyłącznie po stronie serwera.

## Lokalny Start

```bash
npm install
npm run dev
```

Adres lokalny:

```text
http://localhost:3000
```

## Weryfikacja

```bash
npm run lint
npm run typecheck
npm run build
```

## SEO

Projekt zawiera:

- metadata Next.js
- Open Graph
- Twitter Card
- JSON-LD
- `robots.txt`
- `sitemap.xml`
- manifest
- treści pod frazy: szkolenia Excel dla firm, Power Query, Power BI, automatyzacja raportów Excel, analiza danych Excel

## Deploy

Docelowy hosting: Vercel.

Po podłączeniu repozytorium do Vercel każdy push do `main` może uruchamiać automatyczny deploy. CI w GitHub Actions uruchamia lint, TypeScript i build.

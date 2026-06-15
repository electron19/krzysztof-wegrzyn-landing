import type { CSSProperties } from "react";

import { ContactForm } from "@/components/contact-form";
import { SiteHeader } from "@/components/site-header";

const problems = [
  {
    title: "Raport miesięczny zajmuje kilka godzin",
    copy: "Osoby odpowiedzialne za dane tracą czas na ręczne kroki, zamiast analizować wynik i odchylenia.",
  },
  {
    title: "Dane trzeba kopiować między plikami",
    copy: "Każde kopiowanie zwiększa ryzyko błędu, nadpisania formuły lub pracy na nieaktualnej wersji.",
  },
  {
    title: "Różne osoby liczą KPI inaczej",
    copy: "Spotkania schodzą na wyjaśnianie liczb, bo zespół nie ma wspólnych definicji i jednego źródła prawdy.",
  },
  {
    title: "Raporty zawierają błędy",
    copy: "Brak kontroli jakości danych sprawia, że menedżerowie zaczynają kwestionować całe raportowanie.",
  },
  {
    title: "Analizy blokują pracę zespołu",
    copy: "Gdy tylko jedna osoba rozumie plik, każda zmiana, urlop lub nowy wymiar danych tworzy wąskie gardło.",
  },
];

const solutions = [
  {
    label: "Excel",
    title: "Usprawnienie codziennej pracy",
    copy: "Excel dla finansów, kontrolingu i zespołów operacyjnych, które chcą szybciej przygotowywać analizy, uporządkować pliki i ograniczyć ręczne poprawki.",
    points: [
      "czytelne tabele i modele raportowe",
      "funkcje biznesowe dopasowane do pracy zespołu",
      "analiza danych Excel bez chaosu w arkuszach",
    ],
  },
  {
    label: "Power Query",
    title: "Automatyzacja przetwarzania danych",
    copy: "Szkolenie Power Query pokazuje, jak zamienić powtarzalne kopiowanie, czyszczenie i łączenie danych w odświeżalny proces.",
    points: [
      "import danych z plików, folderów i systemów",
      "czyszczenie danych według jasnych reguł",
      "automatyzacja raportów Excel przed etapem analizy",
    ],
    className: "accent-query",
  },
  {
    label: "Power BI",
    title: "Raportowanie, które wspiera decyzje",
    copy: "Szkolenie Power BI pomaga zbudować model danych, KPI i dashboardy Power BI, które menedżerowie mogą czytać bez zgadywania.",
    points: [
      "model danych i miary DAX pod realne KPI",
      "dashboardy dla zarządu, sprzedaży i operacji",
      "kurs Power BI dla firm nastawiony na wdrożenie",
    ],
    className: "accent-bi",
  },
];

const outcomes = [
  [
    "Krótszy czas przygotowania raportów",
    "powtarzalne kroki można odświeżać zamiast odtwarzać ręcznie.",
  ],
  [
    "Mniej błędów w danych",
    "zespół stosuje walidacje, jasne definicje i kontrolę jakości.",
  ],
  [
    "Szybszy dostęp do informacji",
    "menedżerowie widzą KPI w układzie, który wspiera rozmowę o decyzjach.",
  ],
  [
    "Wiedza zostaje w zespole",
    "uczestnicy rozumieją logikę raportu, a nie tylko kolejność kliknięć.",
  ],
];

const offers = [
  {
    label: "Szkolenie Excel dla firm",
    title: "Excel dla finansów, kontrolingu i raportowania",
    copy: "Dla zespołów, które pracują na wielu arkuszach, przygotowują raporty okresowe i chcą szybciej analizować dane bez ręcznych obejść.",
    scope: [
      "tabele przestawne i struktury danych",
      "funkcje biznesowe i analiza danych Excel",
      "raportowanie, kontrola błędów i standaryzacja plików",
    ],
    solves:
      "Długi czas raportu, nieczytelne skoroszyty, błędy w formułach i różne wersje tego samego pliku.",
    cta: "Zapytaj o program Excel",
  },
  {
    label: "Szkolenie Power Query",
    title: "Automatyzacja danych przed raportem",
    copy: "Dla osób, które co tydzień lub co miesiąc importują pliki, czyszczą kolumny, łączą źródła i powtarzają te same kroki.",
    scope: [
      "import danych z plików, folderów i systemów",
      "czyszczenie danych i transformacje",
      "automatyzacja procesów raportowych",
    ],
    solves:
      "Kopiowanie między plikami, ręczne poprawianie danych, niepewność źródeł i raporty budowane od nowa.",
    cta: "Zapytaj o Power Query",
  },
  {
    label: "Szkolenie Power BI dla firm",
    title: "Dashboardy Power BI i wspólne KPI",
    copy: "Dla menedżerów, analityków i działów, które chcą przejść od statycznych plików do raportów czytelnych dla całej organizacji.",
    scope: [
      "model danych, relacje i dobre praktyki",
      "DAX, KPI i miary wspierające decyzje",
      "projektowanie dashboardów Power BI",
    ],
    solves:
      "Brak spójnych KPI, trudne wdrożenie Power BI, raporty bez kontekstu i zbyt wolne decyzje.",
    cta: "Zapytaj o Power BI",
  },
];

const trustAreas = [
  [
    "Finanse i kontroling",
    "Excel dla kontrolingu, budżety, odchylenia, konsolidacje i raporty cykliczne.",
  ],
  [
    "Sprzedaż i zarządzanie",
    "KPI handlowe, lejki sprzedaży, plany, wyniki zespołów i dashboardy menedżerskie.",
  ],
  [
    "Operacje i HR",
    "Dane z wielu źródeł, harmonogramy, absencje, listy kontrolne i raporty procesowe.",
  ],
  [
    "Małe i średnie firmy",
    "Raportowanie właścicielskie, automatyzacja powtarzalnych plików i większa kontrola nad liczbami.",
  ],
];

const processSteps = [
  [
    "Krótka konsultacja",
    "Rozmawiamy o tym, gdzie raportowanie zabiera najwięcej czasu i kto korzysta z danych.",
  ],
  [
    "Analiza potrzeb",
    "Ustalamy poziom zespołu, typowe pliki, źródła danych i oczekiwany efekt biznesowy.",
  ],
  [
    "Program pod cel",
    "Dobieram moduły, przykłady i tempo pracy do ról uczestników oraz priorytetów firmy.",
  ],
  [
    "Realizacja szkolenia",
    "Warsztat opiera się na zadaniach podobnych do codziennych problemów raportowych.",
  ],
  [
    "Materiały i wsparcie",
    "Zespół otrzymuje pliki, materiały i rekomendacje, które pomagają utrzymać zmianę.",
  ],
];

const faqs = [
  [
    "Czy szkolenie może być online lub stacjonarnie?",
    "Tak. Możliwe jest szkolenie Excel online, warsztat stacjonarny albo forma hybrydowa. Zakres i tempo dobieramy do zespołu.",
  ],
  [
    "Jaka jest minimalna liczba uczestników?",
    "Najlepiej ustalić to podczas konsultacji, bo inny format sprawdza się przy kameralnym warsztacie, a inny przy większej grupie.",
  ],
  [
    "Ile trwa szkolenie?",
    "Program może mieć formę krótkiego warsztatu, szkolenia jednodniowego albo ścieżki kilku spotkań. Czas zależy od celu i poziomu uczestników.",
  ],
  [
    "Czy uczestnicy muszą znać zaawansowane funkcje?",
    "Nie. Szkolenie można zacząć od podstaw uporządkowanej pracy w Excelu albo od zaawansowanych tematów Power Query, DAX i Power BI.",
  ],
  [
    "Czy program można spersonalizować?",
    "Tak. Największą wartość daje dopasowanie do typowych raportów, źródeł danych, ról uczestników i decyzji podejmowanych na podstawie KPI.",
  ],
  [
    "Czy są materiały szkoleniowe?",
    "Tak. Uczestnicy otrzymują materiały i pliki ćwiczeniowe, które pomagają wrócić do najważniejszych kroków po szkoleniu.",
  ],
  [
    "Czy uczestnicy otrzymują certyfikat?",
    "Certyfikat uczestnictwa można przygotować, jeżeli firma chce potwierdzić udział zespołu w szkoleniu.",
  ],
  [
    "Czy wystawiana jest faktura?",
    "Tak. Warunki rozliczenia i dane do faktury można ustalić po doprecyzowaniu zakresu szkolenia.",
  ],
];

const chartColumns = [
  { label: "Źródła", step: "1", value: "44%" },
  { label: "Walidacja", step: "2", value: "58%" },
  { label: "Model", step: "3", value: "72%" },
  { label: "KPI", step: "4", value: "84%" },
  { label: "Decyzje", step: "5", value: "92%" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://krzysztofwegrzyn.pl/#person",
      name: "Krzysztof Węgrzyn",
      url: "https://krzysztofwegrzyn.pl/",
      jobTitle: "Trener Excel, Power Query i Power BI dla firm",
      email: "mailto:krzywegrz@gmail.com",
      knowsAbout: [
        "Microsoft Excel",
        "Power Query",
        "Power BI",
        "analiza danych Excel",
        "automatyzacja raportów Excel",
        "dashboardy Power BI",
        "Excel dla finansów",
        "Excel dla kontrolingu",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://krzysztofwegrzyn.pl/#service",
      name: "Szkolenia Excel, Power Query i Power BI dla firm",
      url: "https://krzysztofwegrzyn.pl/",
      provider: {
        "@id": "https://krzysztofwegrzyn.pl/#person",
      },
      areaServed: ["Polska", "Online"],
      description:
        "Praktyczne szkolenia, które pomagają firmom ograniczać ręczne raportowanie, automatyzować pracę z danymi i budować zaufane raporty.",
    },
  ],
};

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <a className="skip-link" href="#main">
        Przejdź do treści
      </a>
      <SiteHeader />

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">
              Szkolenia Excel dla firm | Power Query | Power BI
            </p>
            <h1 id="hero-title">
              Szkolenia Excel, Power Query i Power BI dla firm
            </h1>
            <p className="hero-lede">
              Pomagam zespołom ograniczać ręczne raportowanie, automatyzować
              pracę z danymi i tworzyć raporty, którym można ufać.
            </p>
            <ul className="hero-benefits" aria-label="Najważniejsze korzyści">
              <li>mniej ręcznej pracy</li>
              <li>szybsze raportowanie</li>
              <li>automatyzacja procesów</li>
              <li>lepsza analiza danych</li>
            </ul>
            <div className="hero-actions" aria-label="Główne działania">
              <a className="button button-primary" href="#kontakt">
                Umów bezpłatną konsultację
              </a>
              <a className="button button-secondary" href="#oferta">
                Zobacz programy szkoleń
              </a>
            </div>
            <dl className="hero-proof" aria-label="Dla kogo są szkolenia">
              <div>
                <dt>Dla firm</dt>
                <dd>finanse, kontroling, sprzedaż, operacje i MŚP</dd>
              </div>
              <div>
                <dt>Pod realne procesy</dt>
                <dd>raporty, KPI, źródła danych i cykle decyzyjne</dd>
              </div>
              <div>
                <dt>Online lub stacjonarnie</dt>
                <dd>program dopasowany do poziomu zespołu</dd>
              </div>
            </dl>
          </div>
        </section>

        <section
          className="section section-band"
          id="problemy"
          aria-labelledby="problems-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-kicker">Problemy, które kosztują czas</p>
              <h2 id="problems-title">
                Czy któryś z tych problemów brzmi znajomo?
              </h2>
              <p className="section-copy">
                Najczęściej nie brakuje danych. Brakuje powtarzalnego sposobu
                pracy, który pozwala szybko przejść od pliku źródłowego do
                decyzji.
              </p>
            </div>
            <div className="problem-grid">
              {problems.map((problem, index) => (
                <article className="problem-card" key={problem.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{problem.title}</h3>
                  <p>{problem.copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section"
          id="rozwiazanie"
          aria-labelledby="solution-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-kicker">Jak pomagam</p>
              <h2 id="solution-title">
                Jak uporządkować pracę z danymi bez kolejnego teoretycznego
                kursu.
              </h2>
              <p className="section-copy">
                Szkolenie zaczyna się od celu biznesowego: krótszy cykl
                raportowy, mniej błędów, lepsza kontrola nad danymi i raporty,
                które da się utrzymać po szkoleniu.
              </p>
            </div>
            <div className="training-grid">
              {solutions.map((solution) => (
                <article
                  className={`training-card ${solution.className ?? ""}`.trim()}
                  key={solution.label}
                >
                  <span className="module-label">{solution.label}</span>
                  <h3>{solution.title}</h3>
                  <p>{solution.copy}</p>
                  <ul>
                    {solution.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section section-muted"
          id="efekty"
          aria-labelledby="results-title"
        >
          <div className="section-inner split-results">
            <div>
              <p className="section-kicker">Efekty biznesowe</p>
              <h2 id="results-title">
                Jakie efekty osiągają zespoły po uporządkowaniu raportowania.
              </h2>
              <p className="section-copy">
                Nie obiecuję uniwersalnych procentów. Najpierw sprawdzamy, gdzie
                w procesie powstaje strata czasu, ryzyko błędu lub brak
                spójności danych.
              </p>
              <div className="outcome-list">
                {outcomes.map(([title, copy]) => (
                  <div key={title}>
                    <strong>{title}</strong>
                    <span>{copy}</span>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="dashboard-preview"
              aria-label="Przykładowy układ raportu w stylu Excel"
            >
              <div className="preview-toolbar">
                <span />
                <span />
                <span />
              </div>
              <div className="preview-grid">
                <div className="preview-cell metric">
                  <small>Status procesu</small>
                  <strong>pod kontrolą</strong>
                </div>
                <div className="preview-cell metric green">
                  <small>Cel szkolenia</small>
                  <strong>mniej ręcznie</strong>
                </div>
                <div className="preview-cell chart">
                  <figure
                    className="excel-chart"
                    aria-label="Poglądowy wykres z raportu szkoleniowego"
                  >
                    <figcaption className="chart-head">
                      <span>Przykładowy pulpit kontroli raportu</span>
                      <small>wizualizacja poglądowa</small>
                    </figcaption>
                    <div className="chart-plot">
                      <div className="chart-axis" aria-hidden="true">
                        <span>100%</span>
                        <span>75%</span>
                        <span>50%</span>
                        <span>25%</span>
                        <span>0%</span>
                      </div>
                      <div className="chart-area">
                        <svg
                          className="chart-line"
                          viewBox="0 0 420 180"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <polyline points="20,132 115,108 210,76 305,58 400,38" />
                          <circle cx="20" cy="132" r="5" />
                          <circle cx="115" cy="108" r="5" />
                          <circle cx="210" cy="76" r="5" />
                          <circle cx="305" cy="58" r="5" />
                          <circle cx="400" cy="38" r="5" />
                        </svg>
                        <div className="chart-bars" aria-hidden="true">
                          {chartColumns.map((column) => (
                            <div
                              className="chart-column"
                              key={column.label}
                              style={
                                { "--value": column.value } as CSSProperties
                              }
                            >
                              <b>{column.label}</b>
                              <span />
                              <em>{column.step}</em>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div
                        className="chart-axis chart-axis-secondary"
                        aria-hidden="true"
                      >
                        <span>dobrze</span>
                        <span />
                        <span>ryzyko</span>
                        <span />
                        <span>brak</span>
                      </div>
                    </div>
                    <div className="chart-legend" aria-hidden="true">
                      <span>
                        <i />
                        Dojrzałość raportu
                      </span>
                      <span>
                        <i className="legend-line" />
                        Kontrola procesu
                      </span>
                    </div>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="oferta" aria-labelledby="offer-title">
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-kicker">Programy szkoleń</p>
              <h2 id="offer-title">
                Oferta dla firm, które chcą widzieć efekt w codziennej pracy.
              </h2>
              <p className="section-copy">
                Każdy program można przeprowadzić jako szkolenie Excel online,
                warsztat stacjonarny albo ścieżkę łączącą Excel, Power Query i
                Power BI.
              </p>
            </div>
            <div className="offer-grid">
              {offers.map((offer) => (
                <article className="offer-card" key={offer.label}>
                  <span className="module-label">{offer.label}</span>
                  <h3>{offer.title}</h3>
                  <p>{offer.copy}</p>
                  <div className="offer-block">
                    <strong>Zakres</strong>
                    <ul>
                      {offer.scope.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="offer-block">
                    <strong>Rozwiązuje</strong>
                    <p>{offer.solves}</p>
                  </div>
                  <a className="inline-cta" href="#kontakt">
                    {offer.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section section-muted"
          id="o-mnie"
          aria-labelledby="about-title"
        >
          <div className="section-inner about-layout">
            <div>
              <p className="section-kicker">O mnie</p>
              <h2 id="about-title">
                Szkolenie zaczyna się od zrozumienia pracy zespołu, nie od listy
                funkcji.
              </h2>
              <p className="section-copy">
                Nazywam się Krzysztof Węgrzyn i specjalizuję się w praktycznych
                szkoleniach z Excela, Power Query i Power BI dla osób, które na
                co dzień odpowiadają za raportowanie, kontrolę danych i analizę
                wyników.
              </p>
              <p className="section-copy">
                Moje podejście jest proste: najpierw rozmawiamy o procesie,
                problemach i odbiorcach raportu. Dopiero potem dobieramy
                narzędzia, ćwiczenia i poziom szczegółowości.
              </p>
            </div>
            <div className="about-card">
              <h3>Co dostaje zespół</h3>
              <ul>
                <li>program dopasowany do ról i poziomu uczestników</li>
                <li>ćwiczenia na przykładach zbliżonych do realnej pracy</li>
                <li>język biznesowy zamiast technicznej teorii</li>
                <li>materiały i pliki, do których można wrócić po szkoleniu</li>
              </ul>
            </div>
          </div>
        </section>

        <section
          className="section"
          id="zaufanie"
          aria-labelledby="trust-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-kicker">Zaufanie</p>
              <h2 id="trust-title">
                Firmy zgłaszają się wtedy, gdy raportowanie zaczyna spowalniać
                decyzje.
              </h2>
              <p className="section-copy">
                Referencje i logotypy klientów publikuję wyłącznie za zgodą. Gdy
                nie ma takiej zgody, najuczciwiej mówić o branżach i typach
                problemów bez ujawniania poufnych danych.
              </p>
            </div>
            <div className="trust-grid">
              {trustAreas.map(([title, copy]) => (
                <article className="trust-card" key={title}>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="section section-process"
          id="proces"
          aria-labelledby="process-title"
        >
          <div className="section-inner">
            <div className="section-heading">
              <p className="section-kicker">Proces współpracy</p>
              <h2 id="process-title">Jak wygląda współpraca.</h2>
              <p className="process-copy">
                Każdy krok ma zmniejszyć ryzyko nietrafionego szkolenia i
                upewnić się, że program odpowiada na realne problemy zespołu.
              </p>
            </div>
            <ol className="process-list">
              {processSteps.map(([title, copy], index) => (
                <li key={title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className="section section-muted"
          id="faq"
          aria-labelledby="faq-title"
        >
          <div className="section-inner faq-layout">
            <div>
              <p className="section-kicker">FAQ</p>
              <h2 id="faq-title">Najczęstsze pytania przed szkoleniem.</h2>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section
          className="contact-section"
          id="kontakt"
          aria-labelledby="contact-title"
        >
          <div className="section-inner contact-layout">
            <div>
              <p className="section-kicker">Bezpłatna konsultacja</p>
              <h2 id="contact-title">
                Porozmawiajmy o tym, jak usprawnić raportowanie w Twojej firmie.
              </h2>
              <p>
                Opisz obecny proces raportowania, a przygotuję rekomendację
                szkolenia dopasowaną do potrzeb zespołu.
              </p>
              <ul
                className="final-benefits"
                aria-label="Co otrzymasz po kontakcie"
              >
                <li>rekomendacja programu</li>
                <li>sugerowany poziom</li>
                <li>zakres tematyczny</li>
                <li>orientacyjna wycena</li>
              </ul>
              <a className="contact-email" href="mailto:krzywegrz@gmail.com">
                krzywegrz@gmail.com
              </a>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-inner footer-inner">
          <p>
            &copy; {currentYear} Krzysztof Węgrzyn. Szkolenia Excel, Power Query
            i Power BI dla firm.
          </p>
          <p>
            Microsoft Excel, Power Query i Power BI są znakami towarowymi
            należącymi do Microsoft.
          </p>
        </div>
      </footer>
    </>
  );
}

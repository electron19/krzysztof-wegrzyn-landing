import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://krzysztofwegrzyn.pl"),
  title:
    "Szkolenia Excel dla firm | Power Query i Power BI | Krzysztof Węgrzyn",
  description:
    "Szkolenia Excel dla firm, szkolenie Power Query i szkolenie Power BI nastawione na krótszy czas raportowania, automatyzację raportów Excel i lepszą kontrolę danych.",
  keywords: [
    "Krzysztof Węgrzyn",
    "szkolenia Excel dla firm",
    "szkolenie Excel online",
    "szkolenie Power Query",
    "szkolenie Power BI",
    "kurs Power BI dla firm",
    "automatyzacja raportów Excel",
    "analiza danych Excel",
    "dashboardy Power BI",
    "Excel dla finansów",
    "Excel dla kontrolingu",
  ],
  authors: [{ name: "Krzysztof Węgrzyn" }],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/assets/favicon.svg",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    locale: "pl_PL",
    type: "website",
    title:
      "Szkolenia Excel, Power Query i Power BI dla firm | Krzysztof Węgrzyn",
    description:
      "Pomagam zespołom ograniczać ręczne raportowanie, automatyzować pracę z danymi i tworzyć raporty, którym można ufać.",
    url: "/",
    images: [
      {
        url: "/assets/krzysztof-wegrzyn-excel-power-bi-training.png",
        width: 1200,
        height: 630,
        alt: "Szkolenia Excel, Power Query i Power BI dla firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Szkolenia Excel, Power Query i Power BI dla firm",
    description:
      "Praktyczne szkolenia dla firm, które chcą skrócić raportowanie, uporządkować KPI i wdrożyć automatyzację w Excelu, Power Query oraz Power BI.",
    images: ["/assets/krzysztof-wegrzyn-excel-power-bi-training.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}

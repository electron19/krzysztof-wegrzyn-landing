# Krzysztof Węgrzyn - Landing Page

Statyczna strona marki osobistej Krzysztof Węgrzyn: szkolenia Microsoft Excel, Power Query i Power BI.

## Struktura

```text
.
├── .github/workflows/deploy-pages.yml
├── assets/
│   ├── favicon.svg
│   └── krzysztof-wegrzyn-excel-power-bi-training.png
├── 404.html
├── CNAME
├── index.html
├── robots.txt
├── script.js
├── sitemap.xml
├── site.webmanifest
└── styles.css
```

## Publikacja na GitHub Pages

1. Utwórz repozytorium na GitHubie, np. `electron19/krzysztof-wegrzyn-landing`.
2. Wrzuć zawartość tego katalogu do głównego katalogu repozytorium.
3. W ustawieniach repozytorium przejdź do `Settings -> Pages`.
4. Jako source wybierz `GitHub Actions`.
5. Po pushu workflow `Deploy static site to GitHub Pages` opublikuje stronę.

## Domena

Plik `CNAME` ustawia domenę:

```text
krzysztofwegrzyn.pl
```

Jeśli strona ma działać tylko pod adresem GitHub Pages, usuń `CNAME` i zaktualizuj adresy canonical, Open Graph, `robots.txt` oraz `sitemap.xml`.

## Lokalny podgląd

```bash
python3 -m http.server 4173
```

Następnie otwórz:

```text
http://localhost:4173/
```

## Pliki SEO

Strona zawiera:

- meta title i description
- Open Graph i Twitter Card
- dane strukturalne JSON-LD
- `robots.txt`
- `sitemap.xml`
- manifest PWA


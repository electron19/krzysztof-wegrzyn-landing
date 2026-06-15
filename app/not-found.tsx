import Link from "next/link";

export default function NotFound() {
  return (
    <main className="thanks-page">
      <div className="thanks-view">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            KW
          </span>
          <span>
            <strong>Krzysztof Węgrzyn</strong>
            <small>Excel | Power Query | Power BI</small>
          </span>
        </div>
        <section className="thanks-panel">
          <p className="section-kicker">404</p>
          <h1>Nie znaleziono strony.</h1>
          <p>Ta podstrona nie istnieje albo została przeniesiona.</p>
          <Link className="button button-primary" href="/">
            Wróć na stronę główną
          </Link>
        </section>
      </div>
    </main>
  );
}

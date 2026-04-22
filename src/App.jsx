import React, { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "roteiro-eua-app-v1";

const initialItems = [
  {
    id: 1,
    date: "18/05",
    city: "Tampa",
    activity: "Chegada",
    stay: "Sarasota",
    notes: "Airbnb glamping",
    cost: 322,
    roteiro: ["Chegada", "Descanso"],
    done: false,
  },
  {
    id: 2,
    date: "19/05",
    city: "Miami",
    activity: "Viagem + passeio",
    stay: "Vive Zen",
    notes: "Booking",
    cost: 916,
    roteiro: ["Viagem", "South Beach", "Bar"],
    done: false,
  },
  {
    id: 3,
    date: "20/05",
    city: "Miami",
    activity: "Turismo",
    stay: "Vive Zen",
    notes: "MLB",
    cost: null,
    roteiro: ["Praia", "Wynwood", "Jogo MLB"],
    done: false,
  },
  {
    id: 4,
    date: "21/05",
    city: "Miami → Sarasota",
    activity: "Deslocamento",
    stay: "Bradenton",
    notes: "Quality Inn",
    cost: 1350,
    roteiro: ["Bayside", "Deslocamento"],
    done: false,
  },
  {
    id: 5,
    date: "22/05",
    city: "Sarasota",
    activity: "Formatura",
    stay: "Bradenton",
    notes: "Evento principal",
    cost: null,
    roteiro: ["Formatura"],
    done: false,
  },
  {
    id: 6,
    date: "23/05",
    city: "Sarasota",
    activity: "Praia / descanso",
    stay: "Bradenton",
    notes: "Quality Inn",
    cost: null,
    roteiro: ["Siesta Key", "Jantar leve"],
    done: false,
  },
  {
    id: 7,
    date: "24/05",
    city: "Sarasota → Orlando",
    activity: "Deslocamento",
    stay: "Orlando",
    notes: "Nobile Hotel",
    cost: 773,
    roteiro: ["Deslocamento", "Outlet (reconhecimento)", "International Drive"],
    done: false,
  },
  {
    id: 8,
    date: "25/05",
    city: "Orlando",
    activity: "Compras / lazer",
    stay: "Orlando",
    notes: "Nobile Hotel",
    cost: null,
    roteiro: ["Outlet (principal)", "Vineland", "Disney Springs"],
    done: false,
  },
  {
    id: 9,
    date: "26/05",
    city: "Orlando → Tampa",
    activity: "Retorno",
    stay: "—",
    notes: "Voo de volta",
    cost: null,
    roteiro: ["Saída"],
    done: false,
  },
];

const initialChecklist = [
  { id: 1, label: "Passaportes / documentos", done: false },
  { id: 2, label: "Reservas salvas", done: false },
  { id: 3, label: "Seguro / cartão / câmbio", done: false },
  { id: 4, label: "Mala pronta", done: false },
  { id: 5, label: "Compras Orlando definidas", done: false },
];

const reservationLinks = [
  { label: "Seq 1 – Airbnb Sarasota", url: "https://www.airbnb.com.br/rooms/1629196636951537458" },
  { label: "Seq 2 e 3 – Miami Vive Zen", url: "https://www.booking.com/Share-zGovQK" },
  { label: "Seq 4, 5 e 6 – Quality Inn Bradenton", url: "https://www.booking.com/hotel/us/quality-inn-north-bradenton.html" },
  { label: "Seq 7, 8 e 9 – Nobile Hotel Orlando", url: "https://www.booking.com/Share-DZbiSyI" },
];

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function currencyBRL(value) {
  if (value == null) return "—";
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function App() {
  const saved = loadState();

  const [tab, setTab] = useState(saved?.tab ?? "roteiro");
  const [items, setItems] = useState(saved?.items ?? initialItems);
  const [checklist, setChecklist] = useState(saved?.checklist ?? initialChecklist);
  const [notes, setNotes] = useState(saved?.notes ?? "");
  const [shopping, setShopping] = useState(
    saved?.shopping ?? [
      { id: 1, label: "Nike", done: false },
      { id: 2, label: "Adidas", done: false },
      { id: 3, label: "Tommy", done: false },
      { id: 4, label: "Polo", done: false },
    ]
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ tab, items, checklist, notes, shopping })
    );
  }, [tab, items, checklist, notes, shopping]);

  const toggleTripItem = (id) => {
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const toggleChecklist = (id) => {
    setChecklist((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const toggleShopping = (id) => {
    setShopping((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const progress = useMemo(() => {
    const total = items.length;
    const done = items.filter((item) => item.done).length;
    return total ? Math.round((done / total) * 100) : 0;
  }, [items]);

  const totalCost = useMemo(
    () => items.reduce((acc, item) => acc + (item.cost ?? 0), 0),
    [items]
  );

  return (
    <div className="app-shell">
      <div className="overlay" />
      <div className="content">
        <header className="hero">
          <div className="hero-badge">🇺🇸</div>
          <div>
            <h1>Roteiro EUA</h1>
            <p>App da viagem • Tampa • Miami • Sarasota • Orlando</p>
          </div>
        </header>

        <section className="summary-grid">
          <div className="summary-card">
            <span className="label">Período</span>
            <strong>18 a 26/05</strong>
          </div>
          <div className="summary-card">
            <span className="label">Progresso</span>
            <strong>{progress}%</strong>
          </div>
          <div className="summary-card">
            <span className="label">Total hospedagem</span>
            <strong>{currencyBRL(totalCost)}</strong>
          </div>
        </section>

        <section className="progress-card">
          <div className="progress-header">
            <span>Progresso da viagem</span>
            <strong>{progress}%</strong>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <nav className="tabs">
          {[
            ["roteiro", "Roteiro"],
            ["financeiro", "Financeiro"],
            ["checklist", "Checklist"],
            ["compras", "Compras"],
            ["anotacoes", "Anotações"],
          ].map(([value, label]) => (
            <button
              key={value}
              className={tab === value ? "tab active" : "tab"}
              onClick={() => setTab(value)}
            >
              {label}
            </button>
          ))}
        </nav>

        {tab === "roteiro" && (
          <section className="panel">
            {items.map((item) => (
              <article key={item.id} className={item.done ? "trip-card done" : "trip-card"}>
                <div className="trip-left">
                  <div className="seq">{item.id}</div>
                  <div>
                    <div className="trip-topline">{item.date} • {item.city}</div>
                    <h3>{item.activity}</h3>
                    <p>Estadia: {item.stay}</p>
                    <p>Obs: {item.notes}</p>
                    <div className="tags">
                      {item.roteiro.map((step) => (
                        <span key={step} className="tag">{step}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button className="action-btn" onClick={() => toggleTripItem(item.id)}>
                  {item.done ? "Concluído" : "Marcar"}
                </button>
              </article>
            ))}
          </section>
        )}

        {tab === "financeiro" && (
          <section className="panel">
            <div className="finance-total">
              <span>Total geral</span>
              <strong>{currencyBRL(totalCost)}</strong>
            </div>
            {items.filter((item) => item.cost != null).map((item) => (
              <article key={item.id} className="simple-card">
                <div>
                  <h3>Seq {item.id} • {item.activity}</h3>
                  <p>{item.stay}</p>
                </div>
                <strong>{currencyBRL(item.cost)}</strong>
              </article>
            ))}

            <div className="links-block">
              <h3>Reservas</h3>
              {reservationLinks.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="link-item">
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        )}

        {tab === "checklist" && (
          <section className="panel">
            {checklist.map((item) => (
              <article key={item.id} className="check-row">
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleChecklist(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              </article>
            ))}
          </section>
        )}

        {tab === "compras" && (
          <section className="panel">
            <div className="links-block">
              <h3>Plano Orlando</h3>
              <p>Outlet principal • Vineland • Disney Springs</p>
            </div>
            {shopping.map((item) => (
              <article key={item.id} className="check-row">
                <label>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleShopping(item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              </article>
            ))}
          </section>
        )}

        {tab === "anotacoes" && (
          <section className="panel">
            <textarea
              className="notes-area"
              placeholder="Anotações rápidas da viagem..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </section>
        )}
      </div>
    </div>
  );
}

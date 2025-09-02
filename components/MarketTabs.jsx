export default function MarketTabs({ value, onChange }) {
  const items = ['crypto', 'stocks', 'brands', 'politics', 'entertainment'];
  return (
    <div className="tabs">
      {items.map((m) => (
        <button
          key={m}
          className={`tab ${value === m ? 'is-active' : ''}`}
          onClick={() => onChange(m)}
        >
          {m.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

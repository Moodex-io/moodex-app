export default function MarketTabs({ value, onChange }) {
  const items = [
    { id:'crypto', label:'Crypto' },
    { id:'stocks', label:'Stocks' },
    { id:'brands', label:'Brands' },
    { id:'politics', label:'Politics' },
    { id:'entertainment', label:'Entertainment' },
  ];
  return (
    <div className="tabs">
      {items.map(t => (
        <button
          key={t.id}
          className={`tab ${value === t.id ? 'is-active' : ''}`}
          onClick={() => onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

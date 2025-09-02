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
      {items.map(({id,label}) => (
        <button
          key={id}
          className={`tab ${value === id ? 'is-active' : ''}`}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

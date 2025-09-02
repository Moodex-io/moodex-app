'use client';
type Tab = 'crypto'|'stocks'|'brands'|'politics'|'entertainment';

export default function MarketTabs({
  value, onChange,
}: { value: Tab; onChange: (v: Tab)=>void }) {
  const tabs: {id: Tab; label: string}[] = [
    { id:'crypto', label:'Crypto' },
    { id:'stocks', label:'Stocks' },
    { id:'brands', label:'Brands' },
    { id:'politics', label:'Politics' },
    { id:'entertainment', label:'Entertainment' },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {tabs.map(t => (
        <button
          key={t.id}
          className={`pill ${value===t.id ? 'pill-active' : ''}`}
          onClick={()=>onChange(t.id)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

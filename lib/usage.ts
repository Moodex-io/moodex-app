// lib/usage.ts
const KEY = 'moodex_uses_v1';

function todayKey() {
  const d = new Date();
  return `${d.getUTCFullYear()}-${d.getUTCMonth()+1}-${d.getUTCDate()}`;
}

export function getUses() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    const tk = todayKey();
    return Number(raw[tk] || 0);
  } catch {
    return 0;
  }
}

export function addUse() {
  const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
  const tk = todayKey();
  raw[tk] = Number(raw[tk] || 0) + 1;
  localStorage.setItem(KEY, JSON.stringify(raw));
}

export function remaining(limit = 5) {
  return Math.max(0, limit - getUses());
}

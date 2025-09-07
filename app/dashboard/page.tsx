'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    // Check current session
    supabase.auth.getSession().then(({ data }) => {
      const session = data?.session ?? null;
      if (!session) {
        router.replace('/login');
      } else {
        setEmail(session.user.email ?? null);
      }
      setLoading(false);
    });
  }, [router]);

  async function signOut() {
    const supabase = getSupabase();
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace('/login');
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <p className="text-slate-300">Loading…</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
      <p className="text-slate-300 mt-2">Signed in as {email}</p>

      <div className="mt-8">
        <button className="btn" onClick={signOut}>Sign out</button>
      </div>
    </main>
  );
}

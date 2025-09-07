'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';

/**
 * 🔑 This page assumes these envs are already set on Vercel:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 *
 * It sends magic links and supports Google OAuth.
 * After auth, users land on /dashboard.
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export default function AuthPage() {
  const supabase = useMemo(() => {
    if (!supabaseUrl || !supabaseAnonKey) return null;
    return createClient(supabaseUrl, supabaseAnonKey);
  }, []);

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState<string>('');

  // Build a safe redirect URL for OAuth/magic-link callbacks
  const redirectTo = useMemo(() => {
    // Prefer the public site URL if set; otherwise use the current origin
    if (typeof window === 'undefined') return undefined;
    const origin =
      process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.startsWith('http')
        ? process.env.NEXT_PUBLIC_SITE_URL
        : window.location.origin;
    return `${origin.replace(/\/+$/, '')}/dashboard`;
  }, []);

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setStatus('error');
      setErrorMsg('Supabase is not configured.');
      return;
    }
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMsg('Please enter a valid email.');
      return;
    }
    try {
      setStatus('sending');
      setErrorMsg('');
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: redirectTo,
        },
      });
      if (error) throw error;
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message ?? 'Could not send magic link.');
    }
  }

  async function handleGoogle() {
    if (!supabase) {
      setStatus('error');
      setErrorMsg('Supabase is not configured.');
      return;
    }
    try {
      setStatus('sending');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          // If you want a popup instead of full redirect:
          // skipBrowserRedirect: true,
        },
      });
      if (error) throw error;
      // On success, browser will redirect to Google; then back to /dashboard
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err?.message ?? 'Google sign-in failed.');
    }
  }

  // If a user is already signed in, you *could* bounce them to /dashboard.
  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        window.location.href = '/dashboard';
      }
    });
  }, [supabase]);

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      {/* Header / logo */}
      <nav className="wrap py-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center">
            <Image
              src="/brand/moodexlogo.png"
              alt="Moodex"
              width={250}
              height={80}
              priority
              className="h-12 w-auto"
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6 text-slate-300">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#pricing" className="hover:text-white">Pricing</a>
          <a href="#feed" className="hover:text-white">Feed</a>
        </div>
      </nav>

      {/* Auth card */}
      <section className="mx-auto max-w-xl my-10">
        <div className="card p-6" style={{ borderRadius: 16 }}>
          <div className="text-center mb-6">
            <h1 className="h2">Sign in to Moodex</h1>
            <p className="muted">Use a magic link or continue with Google.</p>
          </div>

          {/* Google */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogle}
              className="btn w-full"
              disabled={status === 'sending'}
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
              }}
            >
              Continue with Google
            </button>

            <div className="flex items-center my-2">
              <div className="flex-1 h-px bg-white/10" />
              <span className="px-3 text-xs text-white/50">OR</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Magic link form */}
            <form onSubmit={handleMagicLink} className="flex flex-col gap-3">
              <input
                type="email"
                className="input"
                placeholder="YOU@COMPANY.COM"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <button
                className="btn btn-primary"
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'SENDING…' : 'EMAIL ME A MAGIC LINK'}
              </button>
            </form>

            {/* Status / errors */}
            {status === 'sent' && (
              <div className="mt-2 text-center text-emerald-300 text-sm">
                ✅ Check your inbox for a sign-in link.
              </div>
            )}
            {status === 'error' && errorMsg && (
              <div className="mt-2 text-center text-red-300 text-sm">
                {errorMsg}
              </div>
            )}

            <p className="muted text-center mt-4 text-xs">
              By continuing you agree to our{' '}
              <a className="underline" href="/terms" target="_blank" rel="noreferrer">
                Terms
              </a>{' '}
              and{' '}
              <a className="underline" href="/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

'use client';

import { useState, type FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="mt-8 max-w-md mx-auto text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/20 mb-4">
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <p className="text-lg font-semibold text-white">You&apos;re in!</p>
        <p className="mt-2 text-sm text-indigo-200/80">
          Check your inbox for a confirmation email. Welcome to the AI Future
          Ready community.
        </p>
      </div>
    );
  }

  return (
    <form
      className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="w-full sm:flex-1 rounded-xl border-2 border-white/20 bg-white/10 px-5 py-3.5 text-white placeholder-indigo-200/60 backdrop-blur-sm focus:outline-none focus:border-white/40 focus:bg-white/15 transition"
        aria-label="Email address"
      />
      <button
        type="submit"
        className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 font-semibold text-indigo-600 shadow-lg transition hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5"
      >
        Subscribe
      </button>
    </form>
  );
}

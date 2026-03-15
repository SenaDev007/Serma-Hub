"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/dashboard";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await signIn("credentials", { email, password, redirect: false });
      if (res?.error) {
        setError("Email ou mot de passe incorrect.");
        setLoading(false);
        return;
      }
      // Redirection complète pour que le cookie de session soit bien pris en compte
      window.location.href = callbackUrl;
    } catch {
      setError("Une erreur est survenue.");
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 space-y-6"
    >
      {error && (
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-serma-navy mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange focus:border-transparent"
          placeholder="admin@sermahub.com"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-serma-navy mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg border border-serma-navy/20 focus:ring-2 focus:ring-serma-orange focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-serma-orange text-serma-navy font-display font-bold py-3 rounded-lg hover:bg-serma-orange/90 disabled:opacity-50 transition-opacity"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}

function LoginFormFallback() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 animate-pulse">
      <div className="h-10 bg-serma-light rounded" />
      <div className="h-12 bg-serma-light rounded" />
      <div className="h-12 bg-serma-light rounded" />
      <div className="h-12 bg-serma-orange/30 rounded" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-serma-navy px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display font-bold text-2xl text-white">
            <span className="text-serma-orange">SERMA</span> HUB
          </Link>
          <p className="text-white/70 mt-2">Connexion au backoffice</p>
        </div>
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm />
        </Suspense>
        <p className="text-center text-white/70 text-sm mt-6">
          <Link href="/" className="hover:text-serma-orange transition-colors">
            Retour au site
          </Link>
        </p>
      </div>
    </div>
  );
}

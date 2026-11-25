"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark, EyeIcon, ShieldIcon } from "./components/AuthVisuals";
export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    router.push("/dashboard/dashboard");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="flex min-h-screen flex-col px-6 py-7 sm:px-10 lg:px-14 xl:px-24">
        <div className="lg:hidden">
          <BrandMark />
        </div>
        <div className="mx-auto my-auto w-full max-w-[410px] py-12">
          <div className="mb-9 inline-grid size-12 place-items-center rounded-2xl bg-teal-50 text-teal-700 lg:hidden">
            <ShieldIcon />
          </div>
          <p className="text-sm font-semibold text-teal-700">WELCOME BACK</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
            Sign in to your account
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Good to see you again. Enter your details to continue.
          </p>
          <form onSubmit={handleSubmit} className="mt-9 space-y-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@yourclinic.com"
                className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
              />
            </label>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
              <span className="relative mt-2 block">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-4 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute inset-y-0 right-0 grid w-12 place-items-center text-slate-400 transition hover:text-slate-700"
                >
                  <EyeIcon visible={showPassword} />
                </button>
              </span>
            </label>
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
            >
              Sign in <span aria-hidden="true">→</span>
            </button>
          </form>
        </div>
        <div className="flex items-center justify-center gap-2 pb-2 text-[11px] text-slate-400 lg:justify-between">
          <span>© 2026 RKB</span>
        </div>
      </section>
    </main>
  );
}

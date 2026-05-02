"use client"

import { logout } from "../services/auth.service";
import { Button } from "./button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-around px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <p className="text-xl font-bold tracking-tight text-slate-900">
            Task <span className="text-indigo-600">Manager</span>
          </p>
        </div>
        <nav className="flex items-center gap-4">
          <Button className="bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100 hover:text-red-600 shadow-none"
          onClick={logout}>
            Logout
          </Button>
        </nav>
      </div>
    </header>
  );
}

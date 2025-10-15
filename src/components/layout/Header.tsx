'use client';

import { Logo } from '@/components/Logo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/90 backdrop-blur-md">
      <div className="container flex h-16 items-center px-4">
        <Logo />
      </div>
    </header>
  );
}

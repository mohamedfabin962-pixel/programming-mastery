'use client';

import Link from 'next/link';
import { Bell, GraduationCap, Menu, Search, User } from 'lucide-react';
import { useState } from 'react';

import { MobileSidebar } from '@/components/layout/app/MobileSidebar';
import { Button } from '@/components/ui/button';

export function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 md:px-6">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open navigation menu"
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu aria-hidden="true" />
        </Button>

        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-foreground transition-opacity hover:opacity-80"
        >
          <GraduationCap aria-hidden="true" className="size-6 shrink-0 text-primary" />
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Programming Mastery
          </span>
        </Link>

        <div className="ml-auto flex items-center gap-2">
          <div
            aria-hidden="true"
            className="hidden items-center gap-2 rounded-lg border border-border bg-muted/50 px-3 py-1.5 text-sm text-muted-foreground sm:flex"
          >
            <Search className="size-4 shrink-0" />
            <span>Search...</span>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Notifications (coming soon)"
            disabled
          >
            <Bell aria-hidden="true" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Profile (coming soon)"
            disabled
          >
            <User aria-hidden="true" />
          </Button>
        </div>
      </header>

      <MobileSidebar open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
    </>
  );
}

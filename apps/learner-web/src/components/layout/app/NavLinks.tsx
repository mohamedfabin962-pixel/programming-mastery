'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { navigation } from '@/config/navigation';
import { cn } from '@/lib/utils';

type NavLinksProps = {
  onNavigate?: () => void;
};

const navItemClassName =
  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors';

export function NavLinks({ onNavigate }: NavLinksProps) {
  const pathname = usePathname();

  return (
    <ul className="flex flex-col gap-1">
      {navigation.map((item) => {
        const Icon = item.icon;
        const isActive = item.implemented && pathname === item.href;

        if (!item.implemented) {
          return (
            <li key={item.href}>
              <span
                aria-disabled="true"
                title="Coming soon"
                className={cn(navItemClassName, 'cursor-not-allowed text-sidebar-foreground/40')}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                <span>{item.title}</span>
                <span className="sr-only">(coming soon)</span>
              </span>
            </li>
          );
        }

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                navItemClassName,
                isActive
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
              )}
            >
              <Icon aria-hidden="true" className="size-4 shrink-0" />
              <span>{item.title}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

import { NavLinks } from '@/components/layout/app/NavLinks';

export function Sidebar() {
  return (
    <aside
      data-collapsible
      className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 md:flex"
    >
      <nav aria-label="Main navigation" className="flex flex-1 flex-col p-4">
        <NavLinks />
      </nav>
    </aside>
  );
}

'use client';

import { NavLinks } from '@/components/layout/app/NavLinks';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

type MobileSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileSidebar({ open, onOpenChange }: MobileSidebarProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        id="mobile-navigation"
        side="left"
        className="w-64 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground"
      >
        <SheetHeader className="border-b border-sidebar-border">
          <SheetTitle className="text-sidebar-foreground">Navigation</SheetTitle>
          <SheetDescription className="sr-only">Main application navigation menu</SheetDescription>
        </SheetHeader>
        <nav aria-label="Main navigation" className="p-4">
          <NavLinks onNavigate={() => onOpenChange(false)} />
        </nav>
      </SheetContent>
    </Sheet>
  );
}

import {
  BookOpen,
  FolderKanban,
  LayoutDashboard,
  Route,
  Settings,
  StickyNote,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react';

export type NavigationItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  /** When false, the item is shown but not navigable until its feature ships. */
  implemented: boolean;
};

export const navigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    implemented: true,
  },
  {
    title: 'Learning Paths',
    href: '/learning-paths',
    icon: Route,
    implemented: false,
  },
  {
    title: 'Topics',
    href: '/topics',
    icon: BookOpen,
    implemented: false,
  },
  {
    title: 'Challenges',
    href: '/challenges',
    icon: Trophy,
    implemented: false,
  },
  {
    title: 'Notes',
    href: '/notes',
    icon: StickyNote,
    implemented: false,
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FolderKanban,
    implemented: false,
  },
  {
    title: 'Profile',
    href: '/profile',
    icon: User,
    implemented: false,
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    implemented: false,
  },
];

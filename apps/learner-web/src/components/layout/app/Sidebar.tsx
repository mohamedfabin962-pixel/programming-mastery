import Link from 'next/link';

const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Roadmaps', href: '#' },
  { name: 'Challenges', href: '#' },
  { name: 'Projects', href: '#' },
  { name: 'Progress', href: '#' },
  { name: 'Settings', href: '#' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r bg-background">
      <nav className="flex flex-col gap-2 p-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

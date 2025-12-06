'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, MessageCircle, TrendingUp, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/home', icon: Home, label: 'Home' },
  { href: '/coach', icon: MessageCircle, label: 'Coach' },
  { href: '/trends', icon: TrendingUp, label: 'Trends' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-16">
          {navItems?.map((item) => {
            const isActive = pathname?.startsWith(item?.href);
            const Icon = item?.icon;
            return (
              <Link
                key={item?.href}
                href={item?.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-lg transition-colors',
                  isActive
                    ? 'text-teal-600'
                    : 'text-gray-600 hover:text-teal-600'
                )}
              >
                <Icon className={cn('w-6 h-6', isActive && 'stroke-[2.5]')} />
                <span className={cn('text-xs', isActive && 'font-semibold')}>
                  {item?.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

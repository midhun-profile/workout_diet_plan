import { Rocket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        'flex items-center gap-2 text-foreground transition-colors hover:text-primary',
        className
      )}
    >
      <Rocket className="h-6 w-6" />
      <span className="text-xl font-semibold">
        NextPlate
      </span>
    </Link>
  );
}

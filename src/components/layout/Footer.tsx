import { Logo } from '@/components/Logo';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Logo />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} NextPlate.
        </p>
      </div>
    </footer>
  );
}

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Component, Layers3, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-16">
      <div className="flex flex-col items-center text-center gap-16">
        <section>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-4 font-headline">
            Welcome to NextPlate
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            Your starting point for building beautiful, responsive, and
            performant Next.js applications with ease.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/about">Get Started</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </Button>
          </div>
        </section>

        <section className="w-full max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Layers3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Page Routing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Effortless client-side routing with Next.js's App Router.
                  Navigate between pages seamlessly.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Component className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Component Library</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Powered by shadcn/ui. A set of reusable, accessible, and
                  beautifully designed components.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="text-left">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Modern Styling</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Styled with Tailwind CSS for a consistent and modern look,
                  easily customizable via CSS variables.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}

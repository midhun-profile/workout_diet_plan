import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function About() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-headline">
            About NextPlate
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            NextPlate is a starter template designed to accelerate your Next.js
            development workflow. We provide the foundation so you can focus on
            building your product.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Rocket className="text-primary" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              Our mission is to provide developers with a clean, modern, and
              highly-customizable starting point for their Next.js projects. By
              integrating best practices for routing, component structure, and
              styling, NextPlate eliminates the boilerplate and lets you dive
              straight into creating unique features.
            </p>
            <p>
              We believe that a good developer experience leads to better
              products. That's why we've chosen a stack that is both powerful
              and easy to work with, including Tailwind CSS for utility-first
              styling and shadcn/ui for a beautiful, accessible component
              library.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Contact() {
  return (
    <div className="container mx-auto flex justify-center px-4 py-8 md:py-16">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Contact Us</CardTitle>
          <CardDescription>
            Have a question or want to work with us? Fill out the form below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your Name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Your message..."
                className="min-h-32"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Send Message</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

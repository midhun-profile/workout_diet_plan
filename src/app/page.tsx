import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Dumbbell, Apple } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 font-headline">
          Ascend Wellness Planner
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Your personal space to build workout routines and diet plans for a
          healthier lifestyle.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Dumbbell className="text-primary" />
              Workout Plan Creator
            </CardTitle>
            <CardDescription>
              Design a personalized workout schedule to achieve your fitness
              goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Track your exercises, sets, reps, and rest periods to build a
              comprehensive weekly routine.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/workout">Create Workout Plan</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Apple className="text-primary" />
              Diet Plan Creator
            </CardTitle>
            <CardDescription>
              Create a balanced diet plan to complement your fitness journey.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">
              Plan your daily meals, track calories, and manage macronutrients
              to stay on top of your nutrition.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href="/diet">Create Diet Plan</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

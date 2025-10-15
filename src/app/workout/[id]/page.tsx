'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import type { Plan } from '@/components/wellness/WellnessPlanner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function WorkoutDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const firestore = useFirestore();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  // Using a static user ID for this single-user experience
  const userId = 'anonymous-user';
  const appId = 'wellness-planner-app'; // A static ID for the app

  const docPath = useMemo(() => {
    if (!id) return null;
    return `artifacts/${appId}/users/${userId}/wellness_plans/${id}`;
  }, [appId, userId, id]);


  useEffect(() => {
    if (!firestore || !docPath) return;

    setLoading(true);
    const unsubscribe = onSnapshot(
      doc(firestore, docPath),
      (docSnap) => {
        if (docSnap.exists()) {
          setPlan({ id: docSnap.id, ...docSnap.data() } as Plan);
        } else {
          console.error('No such document!');
          setPlan(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching document:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [firestore, docPath]);

  if (loading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="container mx-auto max-w-4xl py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Workout Not Found</h1>
        <p className="text-muted-foreground mb-8">The requested workout routine could not be found.</p>
        <Button onClick={() => router.push('/workout')}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workouts
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8 animate-fade-in-up">
        <Button variant="outline" onClick={() => router.push('/workout')} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Routines
        </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold font-headline text-primary">{plan.dayName}</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="w-[40%]">Exercise</TableHead>
                    <TableHead>Sets</TableHead>
                    <TableHead>Reps/Duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {plan.exercises && plan.exercises.map((exercise, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{exercise.exerciseName}</TableCell>
                            <TableCell>{exercise.sets}</TableCell>
                            <TableCell>{exercise.repsDuration}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {(!plan.exercises || plan.exercises.length === 0) && (
                <p className="text-center text-muted-foreground py-8">No exercises in this routine yet.</p>
            )}
        </CardContent>
      </Card>
    </div>
  );
}

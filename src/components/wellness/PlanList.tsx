'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import type { Plan } from './WellnessPlanner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export function PlanList({
  title,
  plans,
  onDelete,
  planType,
}: {
  title: string;
  plans: Plan[];
  onDelete: (id: string) => void;
  planType: 'workout' | 'diet';
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {plans.length === 0 ? (
          <p className="text-muted-foreground">No plans yet. Add one to get started!</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {planType === 'workout' ? plan.exerciseName : `${plan.day} - ${plan.mealTime}`}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow space-y-2 text-sm">
                  {planType === 'workout' ? (
                    <>
                      <p>
                        <span className="font-semibold">Sets:</span> {plan.sets}
                      </p>
                      <p>
                        <span className="font-semibold">Reps/Duration:</span>{' '}
                        {plan.repsDuration}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <span className="font-semibold">Description:</span>{' '}
                        {plan.description}
                      </p>
                      <p>
                        <span className="font-semibold">Calories/Macros:</span>{' '}
                        {plan.caloriesMacros}
                      </p>
                    </>
                  )}
                </CardContent>
                <div className="flex justify-end p-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete this plan.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => onDelete(plan.id)}>Delete</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

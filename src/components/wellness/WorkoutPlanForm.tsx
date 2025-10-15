'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import type { Plan } from './WellnessPlanner';


export function WorkoutPlanForm({
  plan,
  onSubmit,
  onClose,
}: {
  plan?: Plan | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const [exerciseName, setExerciseName] = useState('');
  const [sets, setSets] = useState('');
  const [repsDuration, setRepsDuration] = useState('');

  useEffect(() => {
    if (plan) {
      setExerciseName(plan.exerciseName || '');
      setSets(plan.sets || '');
      setRepsDuration(plan.repsDuration || '');
    }
  }, [plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      exerciseName,
      sets: Number(sets),
      repsDuration,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit' : 'Create'} Workout Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="exerciseName">Exercise Name</Label>
            <Input
              id="exerciseName"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="sets">Sets</Label>
            <Input
              id="sets"
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="repsDuration">Reps/Duration</Label>
            <Input
              id="repsDuration"
              value={repsDuration}
              onChange={(e) => setRepsDuration(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

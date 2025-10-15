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
import { PlusCircle, Trash2 } from 'lucide-react';

export type Exercise = {
  exerciseName: string;
  sets: number | string;
  repsDuration: string;
};

export function WorkoutPlanForm({
  plan,
  onSubmit,
  onClose,
}: {
  plan?: Plan | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const [dayName, setDayName] = useState('');
  const [exercises, setExercises] = useState<Partial<Exercise>[]>([
    { exerciseName: '', sets: '', repsDuration: '' },
  ]);

  useEffect(() => {
    if (plan) {
      setDayName(plan.dayName || '');
      setExercises(plan.exercises?.length ? plan.exercises : [{ exerciseName: '', sets: '', repsDuration: '' }]);
    }
  }, [plan]);

  const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
    const newExercises = [...exercises];
    newExercises[index] = { ...newExercises[index], [field]: value };
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { exerciseName: '', sets: '', repsDuration: '' }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedExercises = exercises.map(ex => ({
        ...ex,
        sets: Number(ex.sets),
    }));
    onSubmit({
      dayName,
      exercises: formattedExercises,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit' : 'Create'} Workout Routine</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="dayName">Routine Name (e.g., Push Day, Monday)</Label>
            <Input
              id="dayName"
              value={dayName}
              onChange={(e) => setDayName(e.target.value)}
              required
              placeholder="Push Day"
            />
          </div>

          <div className='space-y-4'>
            <Label>Exercises</Label>
            {exercises.map((exercise, index) => (
              <div key={index} className="space-y-2 border p-3 rounded-lg relative">
                 {exercises.length > 1 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeExercise(index)}
                    >
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                )}
                <div className="grid grid-cols-1 gap-2">
                    <Label htmlFor={`exerciseName-${index}`} className='text-xs'>Exercise Name</Label>
                    <Input
                        id={`exerciseName-${index}`}
                        value={exercise.exerciseName || ''}
                        onChange={(e) => handleExerciseChange(index, 'exerciseName', e.target.value)}
                        required
                        placeholder='Bench Press'
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor={`sets-${index}`} className='text-xs'>Sets</Label>
                        <Input
                            id={`sets-${index}`}
                            type="number"
                            value={exercise.sets || ''}
                            onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                            required
                            placeholder='3'
                        />
                    </div>
                    <div>
                        <Label htmlFor={`repsDuration-${index}`} className='text-xs'>Reps/Duration</Label>
                        <Input
                            id={`repsDuration-${index}`}
                            value={exercise.repsDuration || ''}
                            onChange={(e) => handleExerciseChange(index, 'repsDuration', e.target.value)}
                            required
                            placeholder='10-12 reps'
                        />
                    </div>
                </div>
              </div>
            ))}
             <Button type="button" variant="outline" size="sm" onClick={addExercise} className='w-full'>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Another Exercise
              </Button>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Routine</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

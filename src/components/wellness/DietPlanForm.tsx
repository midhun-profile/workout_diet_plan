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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Plan } from './WellnessPlanner';

export function DietPlanForm({
  plan,
  onSubmit,
  onClose,
}: {
  plan?: Plan | null;
  onSubmit: (data: any) => void;
  onClose: () => void;
}) {
  const [day, setDay] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [description, setDescription] = useState('');
  const [caloriesMacros, setCaloriesMacros] = useState('');

  useEffect(() => {
    if (plan) {
      setDay(plan.day || '');
      setMealTime(plan.mealTime || '');
      setDescription(plan.description || '');
      setCaloriesMacros(plan.caloriesMacros || '');
    }
  }, [plan]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      day,
      mealTime,
      description,
      caloriesMacros,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit' : 'Create'} Diet Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="day">Day</Label>
            <Select onValueChange={setDay} value={day}>
              <SelectTrigger>
                <SelectValue placeholder="Select a day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monday">Monday</SelectItem>
                <SelectItem value="Tuesday">Tuesday</SelectItem>
                <SelectItem value="Wednesday">Wednesday</SelectItem>
                <SelectItem value="Thursday">Thursday</SelectItem>
                <SelectItem value="Friday">Friday</SelectItem>
                <SelectItem value="Saturday">Saturday</SelectItem>
                <SelectItem value="Sunday">Sunday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="mealTime">Meal Time</Label>
            <Select onValueChange={setMealTime} value={mealTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select a meal time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Breakfast">Breakfast</SelectItem>
                <SelectItem value="Lunch">Lunch</SelectItem>
                <SelectItem value="Dinner">Dinner</SelectItem>
                <SelectItem value="Snack">Snack</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="caloriesMacros">Calories/Macros</Label>
            <Input
              id="caloriesMacros"
              value={caloriesMacros}
              onChange={(e) => setCaloriesMacros(e.target.value)}
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

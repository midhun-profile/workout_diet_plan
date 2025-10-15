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
import { PlusCircle, Trash2 } from 'lucide-react';

export type Meal = {
  mealTime: string;
  description: string;
  caloriesMacros: string;
};

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
  const [meals, setMeals] = useState<Partial<Meal>[]>([
    { mealTime: 'Breakfast', description: '', caloriesMacros: '' },
  ]);

  useEffect(() => {
    if (plan) {
      setDay(plan.day || '');
      setMeals(plan.meals?.length ? plan.meals : [{ mealTime: 'Breakfast', description: '', caloriesMacros: '' }]);
    }
  }, [plan]);

  const handleMealChange = (index: number, field: keyof Meal, value: string) => {
    const newMeals = [...meals];
    newMeals[index] = { ...newMeals[index], [field]: value };
    setMeals(newMeals);
  };

  const addMeal = () => {
    setMeals([...meals, { mealTime: 'Lunch', description: '', caloriesMacros: '' }]);
  };

  const removeMeal = (index: number) => {
    const newMeals = meals.filter((_, i) => i !== index);
    setMeals(newMeals);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      day,
      meals,
    });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{plan ? 'Edit' : 'Create'} Daily Diet Plan</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="day">Day of the Week</Label>
            <Select onValueChange={setDay} value={day} required>
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

          <div className="space-y-4">
            <Label>Meals</Label>
            {meals.map((meal, index) => (
              <div key={index} className="space-y-3 border p-4 rounded-lg relative">
                {meals.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-7 w-7"
                    onClick={() => removeMeal(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
                <div>
                  <Label htmlFor={`mealTime-${index}`} className="text-xs">Meal Time</Label>
                   <Select onValueChange={(value) => handleMealChange(index, 'mealTime', value)} value={meal.mealTime}>
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
                  <Label htmlFor={`description-${index}`} className="text-xs">Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={meal.description || ''}
                    onChange={(e) => handleMealChange(index, 'description', e.target.value)}
                    required
                    placeholder="e.g., Oatmeal with berries"
                  />
                </div>
                <div>
                  <Label htmlFor={`caloriesMacros-${index}`} className="text-xs">Calories/Macros</Label>
                  <Input
                    id={`caloriesMacros-${index}`}
                    value={meal.caloriesMacros || ''}
                    onChange={(e) => handleMealChange(index, 'caloriesMacros', e.target.value)}
                    required
                    placeholder="e.g., 350kcal, 40g C, 20g P, 10g F"
                  />
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" size="sm" onClick={addMeal} className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Another Meal
            </Button>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Day Plan</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

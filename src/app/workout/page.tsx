'use client';
import { WellnessPlanner } from '@/components/wellness/WellnessPlanner';

export default function WorkoutPage() {
    return (
        <div className="animate-fade-in-up">
            <WellnessPlanner initialTab="workout" />
        </div>
    );
}

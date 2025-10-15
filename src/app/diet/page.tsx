'use client';
import { WellnessPlanner } from '@/components/wellness/WellnessPlanner';

export default function DietPage() {
    return (
        <div className="animate-fade-in-up">
            <WellnessPlanner initialTab="diet" />
        </div>
    );
}

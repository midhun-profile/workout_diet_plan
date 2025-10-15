'use client';

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useUser, useFirestore, useFirebase } from '@/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  type DocumentData,
  query,
} from 'firebase/firestore';
import { PlusCircle } from 'lucide-react';
import { WorkoutPlanForm } from './WorkoutPlanForm';
import { DietPlanForm } from './DietPlanForm';
import { PlanList } from './PlanList';

export type Plan = {
  id: string;
  type: 'workout' | 'diet';
  [key: string]: any;
};

export function WellnessPlanner({ initialTab }: { initialTab: 'workout' | 'diet' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const { user, loading: userLoading } = useUser();
  const firestore = useFirestore();
  const { firebaseApp } = useFirebase();
  const appId = firebaseApp?.options.appId;

  const collectionPath = useMemo(() => {
    if (!user || !appId) return null;
    return `artifacts/${appId}/users/${user.uid}/wellness_plans`;
  }, [user, appId]);

  useEffect(() => {
    if (!collectionPath || !firestore) return;

    const q = query(collection(firestore, collectionPath));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const plansData: Plan[] = [];
        querySnapshot.forEach((doc) => {
          plansData.push({ id: doc.id, ...doc.data() } as Plan);
        });
        setPlans(plansData);
      },
      (error) => {
        console.error('Error fetching plans: ', error);
      }
    );

    return () => unsubscribe();
  }, [collectionPath, firestore]);

  const handleAddPlan = async (planData: DocumentData) => {
    if (!collectionPath || !firestore) return;
    try {
      await addDoc(collection(firestore, collectionPath), {
        ...planData,
        type: activeTab,
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleDeletePlan = async (planId: string) => {
    if (!collectionPath || !firestore) return;
    try {
      await deleteDoc(doc(firestore, collectionPath, planId));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const workoutPlans = plans.filter((p) => p.type === 'workout');
  const dietPlans = plans.filter((p) => p.type === 'diet');

  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Please sign in to use the wellness planner.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary font-headline">
        Ascend Wellness Planner
      </h1>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'workout' | 'diet')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="workout">
            <PlanList
                title="Your Workout Routines"
                plans={workoutPlans}
                onDelete={handleDeletePlan}
                planType="workout"
            />
        </TabsContent>
        <TabsContent value="diet">
            <PlanList
                title="Your Diet Plans"
                plans={dietPlans}
                onDelete={handleDeletePlan}
                planType="diet"
            />
        </TabsContent>
      </Tabs>
      <div className="fixed bottom-8 right-8">
        <Button size="lg" className="rounded-full h-16 w-16" onClick={() => setIsModalOpen(true)}>
            <PlusCircle size={32} />
        </Button>
      </div>

      {isModalOpen && (
        activeTab === 'workout' 
            ? <WorkoutPlanForm onSubmit={handleAddPlan} onClose={() => setIsModalOpen(false)} />
            : <DietPlanForm onSubmit={handleAddPlan} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

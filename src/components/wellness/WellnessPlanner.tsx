'use client';

import { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useFirestore, useFirebase } from '@/firebase';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  type DocumentData,
  query,
} from 'firebase/firestore';
import { PlusCircle, Download } from 'lucide-react';
import { WorkoutPlanForm } from './WorkoutPlanForm';
import { DietPlanForm } from './DietPlanForm';
import { PlanList } from './PlanList';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export type Plan = {
  id: string;
  type: 'workout' | 'diet';
  [key: string]: any;
};

export function WellnessPlanner({ initialTab }: { initialTab: 'workout' | 'diet' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const [plans, setPlans] = useState<Plan[]>([]);
  const firestore = useFirestore();
  const { firebaseApp } = useFirebase();
  const appId = firebaseApp?.options.appId;

  const collectionPath = useMemo(() => {
    // Since there's no login, we'll use a static path for a single-user experience.
    if (!appId) return null;
    return `artifacts/${appId}/users/anonymous-user/wellness_plans`;
  }, [appId]);

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

  const handleUpdatePlan = async (planData: DocumentData) => {
    if (!collectionPath || !firestore || !editingPlan) return;
    try {
      const planDoc = doc(firestore, collectionPath, editingPlan.id);
      await updateDoc(planDoc, planData);
      setEditingPlan(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  
  const handleEditPlan = (plan: Plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleDeletePlan = async (planId: string) => {
    if (!collectionPath || !firestore) return;
    try {
      await deleteDoc(doc(firestore, collectionPath, planId));
    } catch (error) {
      console.error('Error deleting document: ', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingPlan(null);
  };

  const downloadPDF = (plan: Plan) => {
    const doc = new jsPDF();
    doc.text(`${plan.type === 'workout' ? 'Workout' : 'Diet'} Plan`, 14, 16);
    if (plan.type === 'workout') {
      (doc as any).autoTable({
        startY: 20,
        head: [['Exercise', 'Sets', 'Reps/Duration']],
        body: [[plan.exerciseName, plan.sets, plan.repsDuration]],
      });
    } else {
      (doc as any).autoTable({
        startY: 20,
        head: [['Day', 'Meal Time', 'Description', 'Calories/Macros']],
        body: [[plan.day, plan.mealTime, plan.description, plan.caloriesMacros]],
      });
    }
    doc.save(`${plan.type}-plan-${plan.id}.pdf`);
  };

  const downloadAllPDFs = () => {
    const doc = new jsPDF();
    doc.text('All Wellness Plans', 14, 16);
    
    const workoutPlans = plans.filter(p => p.type === 'workout');
    if (workoutPlans.length > 0) {
      doc.text('Workout Plans', 14, 25);
      (doc as any).autoTable({
        startY: 30,
        head: [['Exercise', 'Sets', 'Reps/Duration']],
        body: workoutPlans.map(p => [p.exerciseName, p.sets, p.repsDuration]),
      });
    }

    const dietPlans = plans.filter(p => p.type === 'diet');
    if (dietPlans.length > 0) {
      const workoutTableHeight = workoutPlans.length > 0 ? (doc as any).lastAutoTable.finalY : 20;
      doc.text('Diet Plans', 14, workoutTableHeight + 10);
      (doc as any).autoTable({
        startY: workoutTableHeight + 15,
        head: [['Day', 'Meal Time', 'Description', 'Calories/Macros']],
        body: dietPlans.map(p => [p.day, p.mealTime, p.description, p.caloriesMacros]),
      });
    }

    doc.save('all-wellness-plans.pdf');
  };

  const workoutPlans = plans.filter((p) => p.type === 'workout');
  const dietPlans = plans.filter((p) => p.type === 'diet');

  return (
    <div className="container mx-auto max-w-6xl p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-center text-primary font-headline">
          Ascend Wellness Planner
        </h1>
        <Button onClick={downloadAllPDFs}>
          <Download className="mr-2 h-4 w-4" />
          Download All
        </Button>
      </div>
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'workout' | 'diet')} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          <TabsTrigger value="diet">Diet Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="workout">
            <PlanList
                title="Your Workout Routines"
                plans={workoutPlans}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
                onDownload={downloadPDF}
                planType="workout"
            />
        </TabsContent>
        <TabsContent value="diet">
            <PlanList
                title="Your Diet Plans"
                plans={dietPlans}
                onEdit={handleEditPlan}
                onDelete={handleDeletePlan}
                onDownload={downloadPDF}
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
            ? <WorkoutPlanForm plan={editingPlan} onSubmit={editingPlan ? handleUpdatePlan : handleAddPlan} onClose={closeModal} />
            : <DietPlanForm plan={editingPlan} onSubmit={editingPlan ? handleUpdatePlan : handleAddPlan} onClose={closeModal} />
      )}
    </div>
  );
}

# Ascend Wellness Planner

## App Overview

The Ascend Wellness Planner is a modern, single-page fitness and nutrition management application built with Next.js, React, and Firebase. It helps users organize their wellness journey through structured, real-time planning tools for both workout routines and diet plans.

---

## Core Features

The application is designed to be intuitive, responsive, and powerful, providing a seamless user experience for wellness management.

### Dual Planning System

The planner is split into two main sections, allowing for focused and organized planning.

-   **Workout Plans**: Create detailed weekly workout routines.
    -   **Fields**: Routine Name (e.g., "Push Day"), Exercise Name, Sets, and Reps/Duration.
    -   **Structure**: Group multiple exercises under a single named routine (e.g., "Monday Chest Day").
-   **Diet Plans**: Design daily meal plans to track nutrition.
    -   **Fields**: Day of the Week, Meal Time (Breakfast, Lunch, etc.), Description, and Calories/Macros.
    -   **Structure**: Add multiple meals to a single day's plan.

### Complete Plan Management

Full CRUD (Create, Read, Update, Delete) functionality is available for both workout and diet plans.

-   **Create**: Add new workout routines or daily diet plans through user-friendly modals.
-   **Read**: View all created plans in a clean, organized card layout. Click any card to see a detailed view of the plan.
-   **Edit**: Modify existing plans with pre-filled forms to easily make adjustments.
-   **Delete**: Remove plans with a confirmation prompt to prevent accidental deletion.

### PDF Downloads

-   **Download Individual Plans**: Export any single workout or diet plan as a professionally formatted PDF.
-   **Download All Plans**: Generate a single PDF containing all of your created wellness plans, neatly organized by type.

### Real-Time Data Storage

-   **Firebase Firestore Integration**: All plans are saved instantly to a Firestore database, ensuring no data is lost.
-   **Real-Time Updates**: Changes are reflected in real-time across all sessions and devices thanks to Firestore's `onSnapshot` listener.
-   **Data Scope**: For this demonstration, plans are saved to a static path (`/artifacts/wellness-planner-app/users/anonymous-user/wellness_plans`), effectively providing a single-user experience.

---

## Technical Stack

-   **Framework**: [Next.js](https://nextjs.org/) 15 (App Router)
-   **Frontend Library**: [React](https://react.dev/) 18
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [Firebase Firestore](https://firebase.google.com/docs/firestore) for real-time data persistence.
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom dark theme.
-   **UI Components**: [ShadCN UI](https://ui.shadcn.com/) for accessible and reusable components.
-   **PDF Generation**: `jspdf` and `jspdf-autotable`.
-   **Icons**: [Lucide React](https://lucide.dev/guide/packages/lucide-react).

---

## Design & User Experience

-   **Aesthetic**: A modern dark theme with a vibrant pink/magenta accent color creates a high-energy, fitness-focused look.
-   **Responsiveness**: The application is fully responsive and optimized for a seamless experience on both desktop and mobile devices.
-   **User Flow**: An intuitive, tab-based navigation system makes it easy to switch between workout and diet planning. Plans are displayed in clear card layouts, and modals simplify the creation and editing process.
-   **Feedback**: The UI provides instant visual feedback for all actions, including loading states and confirmation dialogs.

---

## Project Structure

The application follows the standard Next.js App Router structure.

-   `src/app/` - Contains the core routing and pages.
    -   `src/app/page.tsx` - The main landing page.
    -   `src/app/workout/` - The workout planner page and detailed view.
    -   `src/app/diet/` - The diet planner page and detailed view.
-   `src/components/` - Contains all React components.
    -   `src/components/wellness/` - The core logic and UI for the planner.
    -   `src/components/ui/` - ShadCN UI components.
-   `src/firebase/` - Configuration and hooks for connecting to Firebase services.

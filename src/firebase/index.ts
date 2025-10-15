'use client';

import {
  useAuth,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  FirebaseProvider,
  FirebaseClientProvider,
} from './provider';

import { useUser } from './auth/use-user';

// Note: This is a barrel file (https://flaviocopes.com/typescript-barrel-files/),
// re-exporting modules from other files. It's a common pattern in TypeScript projects
// to simplify imports.
//
// You can import any of these from '@/firebase' in your components.
//
// For example:
//
// import { useUser, useAuth } from '@/firebase';
//
// const { user, loading } = useUser();
// const { auth } = useAuth();

export {
  useAuth,
  useUser,
  useFirebase,
  useFirebaseApp,
  useFirestore,
  FirebaseProvider,
  FirebaseClientProvider,
};

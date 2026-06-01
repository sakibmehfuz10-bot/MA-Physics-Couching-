import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  setPersistence,
  browserLocalPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  userRole: 'student' | 'teacher' | 'admin' | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  hasProfile: boolean | null;
  checkProfileExists: (uid: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<'student' | 'teacher' | 'admin' | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe = () => {};

    const initAuth = async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (err) {
        console.error("Auth persistence error:", err);
      }
      
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        try {
          // Check/create user document
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (!userDoc.exists()) {
            const defaultRole = currentUser.email === 'mehfuzsakib10@gmail.com' ? 'admin' : 'student';
            await setDoc(userDocRef, {
              uid: currentUser.uid,
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              role: defaultRole,
              createdAt: serverTimestamp(),
              lastLoginAt: serverTimestamp()
            });
            setUserRole(defaultRole);
          } else {
            const data = userDoc.data();
            let role = data.role || 'student';
            if (currentUser.email === 'mehfuzsakib10@gmail.com' && role !== 'admin') {
              role = 'admin';
              await setDoc(userDocRef, { role: 'admin' }, { merge: true });
            }
            setUserRole(role);
            await setDoc(userDocRef, { lastLoginAt: serverTimestamp() }, { merge: true });
          }

          // Check if profile exists
          await checkProfileExists(currentUser.uid);
          
        } catch (error) {
          handleFirestoreError(error, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setUserRole(null);
        setHasProfile(null);
      }
      
      setLoading(false);
      });
    };
    
    initAuth();

    return () => { unsubscribe() };
  }, []);

  const checkProfileExists = async (uid: string) => {
    try {
      const profileDocRef = doc(db, 'studentProfiles', uid);
      const profileDoc = await getDoc(profileDocRef);
      setHasProfile(profileDoc.exists());
      return profileDoc.exists();
    } catch (error) {
      handleFirestoreError(error, OperationType.GET, `studentProfiles/${uid}`);
      return false;
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (error?.code !== 'auth/popup-closed-by-user' && error?.code !== 'auth/cancelled-popup-request') {
        console.error('Sign in error', error);
      }
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userRole, loading, signInWithGoogle, logout, hasProfile, checkProfileExists }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

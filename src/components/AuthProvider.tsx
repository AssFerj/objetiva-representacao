'use client';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import { setUser, clearUser } from '../store/slices/authSlice';

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage first
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        dispatch(setUser(userData));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const userState = {
              id: user.uid,
              email: user.email || '',
              name: user.displayName || userData.name || 'User',
              role: userData.role
            };

            // Update Redux state
            dispatch(setUser(userState));
            
            // Update local storage
            localStorage.setItem('user', JSON.stringify(userState));
          } else {
            console.error('User document not found in Firestore');
            dispatch(clearUser());
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          dispatch(clearUser());
          localStorage.removeItem('user');
        }
      } else {
        dispatch(clearUser());
        localStorage.removeItem('user');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
    </div>;
  }

  return <>{children}</>;
}

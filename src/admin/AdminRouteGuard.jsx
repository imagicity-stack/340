'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

const AdminRouteGuard = ({ children }) => {
  const navigate = useNavigate();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = null;

    const runAuthCheck = async () => {
      try {
        unsubscribe = onAuthStateChanged(auth, async (user) => {
          if (!isMounted) return;

          if (!user) {
            navigate('/admin/login', { replace: true });
            setIsChecking(false);
            return;
          }

          try {
            const adminDoc = await getDoc(doc(db, 'admins', user.uid));

            if (!adminDoc.exists()) {
              await signOut(auth);
              if (isMounted) {
                navigate('/admin/login', { replace: true });
                setIsChecking(false);
              }
              return;
            }

            if (isMounted) {
              setIsChecking(false);
            }
          } catch (error) {
            console.error('Admin validation failed', error);
            await signOut(auth);
            if (isMounted) {
              navigate('/admin/login', { replace: true });
              setIsChecking(false);
            }
          }
        });
      } catch (error) {
        console.error('Unable to start admin guard', error);
        if (isMounted) {
          navigate('/admin/login', { replace: true });
          setIsChecking(false);
        }
      }
    };

    runAuthCheck();

    return () => {
      isMounted = false;
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [navigate]);

  if (isChecking) {
    return (
      <div className="admin-loading" style={{ padding: '3rem', textAlign: 'center' }}>
        Validating admin access...
      </div>
    );
  }

  return children;
};

export default AdminRouteGuard;

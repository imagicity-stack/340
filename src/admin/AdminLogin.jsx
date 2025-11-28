'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../lib/firebase.js';
import styles from './AdminApp.module.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateAdmin = async (user) => {
    const adminDoc = await getDoc(doc(db, 'admins', user.uid));
    return adminDoc.exists();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      try {
        const isAdmin = await validateAdmin(user);
        if (isAdmin) {
          navigate('/admin', { replace: true });
        } else {
          await signOut(auth);
        }
      } catch (validationError) {
        console.error('Error validating admin role', validationError);
        await signOut(auth);
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const credential = await signInWithEmailAndPassword(auth, form.email, form.password);
      const isAdmin = await validateAdmin(credential.user);

      if (!isAdmin) {
        await signOut(auth);
        setError('You do not have permission to access this area.');
        return;
      }

      navigate('/admin', { replace: true });
    } catch (authError) {
      console.error('Login failed', authError);
      setError('Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loginShell}>
        <div className={styles.loginCard}>
          <p className={styles.kicker}>Admin Portal</p>
          <h2>Secure entry</h2>
          <p className={styles.subhead}>Use your Firebase admin credentials to sign in.</p>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label>
              Email
              <input
                className={styles.input}
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </label>
            <label>
              Password
              <input
                type="password"
                className={styles.input}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
              />
            </label>
            {error && <p className={styles.error}>{error}</p>}
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <p className={styles.muted}>Only pre-approved admin accounts may access the dashboard.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

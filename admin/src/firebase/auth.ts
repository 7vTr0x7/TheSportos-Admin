import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { auth, firestore } from './firebase-config'; // assuming you have initialized Firebase in this file
import { NavigateFunction, useNavigate } from 'react-router-dom';

const getErrorMessage = (err: unknown): string => {
  if (err instanceof Error) {
    return err.message;
  }
  return 'An unexpected error occurred.';
};

export const handleSignIn = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<void> => {
  if (!email || !password) {
    setError('Please fill the required details');
    throw new Error('Please fill the required details');
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Invalid email address');
    throw new Error('Invalid email address');
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    localStorage.setItem('authToken', token);
    navigate('/');
  } catch (err) {
    const message = getErrorMessage(err);
    setError(message);
    throw new Error(message); // Re-throw the error so it can be caught by onSignIn
  }
};

export const handleForgotPassword = async (
  email: string,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<void> => {
  if (!email) {
    setError('Please enter your email address to reset the password.');
    throw new Error('Please enter your email address to reset the password.');
  }

  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    const message = getErrorMessage(err);
    setError(message);
    throw new Error(message); // Re-throw the error so it can be caught by onForgotPassword
  }
};

export const handleLogout = async (
  navigate: NavigateFunction,
): Promise<void> => {
  try {
    await signOut(auth);
    localStorage.removeItem('authToken');
    navigate('/login');
  } catch (err) {
    const message = getErrorMessage(err);
    throw new Error(message);
  }
};

export const handleSignUp = async (
  email: string,
  password: string,
  navigate: ReturnType<typeof useNavigate>,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
): Promise<void> => {
  if (!email || !password) {
    setError('Please fill in all the required details.');
    throw new Error('Please fill in all the required details.');
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setError('Invalid email address.');
    throw new Error('Invalid email address.');
  }

  if (password.length < 6) {
    setError('Password should be at least 6 characters long.');
    throw new Error('Password should be at least 6 characters long.');
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    if (userCredential) {
      navigate('/auth/signin');
    }
  } catch (err: any) {
    let errorMessage = 'An error occurred.';
    if (err.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already in use.';
    } else if (err.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters long.';
    } else if (err.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address.';
    }

    console.error('Sign-up error:', err);
    setError(errorMessage);
    throw new Error(errorMessage);
  }
};

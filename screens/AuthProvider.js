import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { db, useFirebaseAuth } from './firebaseconfig'; // Assuming you have a useFirebaseAuth hook
import { collection, getDocs, query, where } from 'firebase/firestore';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const { firebase_auth } = useFirebaseAuth(); 

  useEffect(() => {
    const unsubscribe = firebase_auth.onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [firebase_auth]);

  const login = async (email, password) => {
    
    try {
       const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password)
       const loggedInUser = userCredential.user;
       const contactsCollection = collection(db, "User");
       const contactsQuery =  query(contactsCollection, where('email', '==', `${loggedInUser.email}`));
       const contactsSnapshot = await getDocs(contactsQuery);
       const contactsData  =  contactsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUser( ()=> loggedInUser.email);
      console.log("Logged \n"+ loggedInUser.email)
     
      return contactsData
    } catch (error) {
      alert("Incorrect Email or Password")
      console.error('Login error:', error.message);

      return  null
    }


  };
    const signin = async (email, password) => {
    try {
           await createUserWithEmailAndPassword(firebase_auth, email, password)

    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const signOut = async () => {
    try {
      await firebase_auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login ,signOut,signin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

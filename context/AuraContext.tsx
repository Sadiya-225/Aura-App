'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from './AuthContext';

interface AuraContextType {
  receivedEntries: any[];
  sentEntries: any[];
  loading: boolean;
}

const AuraContext = createContext<AuraContextType>({
  receivedEntries: [],
  sentEntries: [],
  loading: true,
});

export const useAura = () => useContext(AuraContext);

export const AuraProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthReady } = useAuth();
  const [receivedEntries, setReceivedEntries] = useState<any[]>([]);
  const [sentEntries, setSentEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthReady || !user) {
      // Use a microtask to avoid synchronous setState in effect body
      Promise.resolve().then(() => {
        setReceivedEntries([]);
        setSentEntries([]);
        setLoading(false);
      });
      return;
    }

    const qReceived = query(
      collection(db, 'aura_entries'),
      where('toUserId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const qSent = query(
      collection(db, 'aura_entries'),
      where('fromUserId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubReceived = onSnapshot(qReceived, (snapshot) => {
      setReceivedEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    const unsubSent = onSnapshot(qSent, (snapshot) => {
      setSentEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubReceived();
      unsubSent();
    };
  }, [user, isAuthReady]);

  return (
    <AuraContext.Provider value={{ receivedEntries, sentEntries, loading }}>
      {children}
    </AuraContext.Provider>
  );
};

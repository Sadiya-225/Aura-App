'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy, limit, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useAuth } from './AuthContext';

interface AuraContextType {
  receivedEntries: any[];
  sentEntries: any[];
  loading: boolean;
  // Entries that were already unseen the moment this session's listener
  // attached — i.e. given to you while the tab wasn't open.
  justReceivedWhileAway: any[];
  clearJustReceivedWhileAway: () => void;
  // The most recent entry that arrived live, while this session was already
  // open. Changes reference on every genuinely new live arrival.
  lastLiveArrival: any | null;
  clearLastLiveArrival: () => void;
}

const AuraContext = createContext<AuraContextType>({
  receivedEntries: [],
  sentEntries: [],
  loading: true,
  justReceivedWhileAway: [],
  clearJustReceivedWhileAway: () => {},
  lastLiveArrival: null,
  clearLastLiveArrival: () => {},
});

export const useAura = () => useContext(AuraContext);

export const AuraProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthReady } = useAuth();
  const [receivedEntries, setReceivedEntries] = useState<any[]>([]);
  const [sentEntries, setSentEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [justReceivedWhileAway, setJustReceivedWhileAway] = useState<any[]>([]);
  const [lastLiveArrival, setLastLiveArrival] = useState<any | null>(null);

  const isInitialLoad = useRef(true);
  const knownIds = useRef<Set<string>>(new Set());

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

    isInitialLoad.current = true;
    knownIds.current = new Set();

    const qReceived = query(
      collection(db, 'sevi_entries'),
      where('toUserId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const qSent = query(
      collection(db, 'sevi_entries'),
      where('fromUserId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubReceived = onSnapshot(qReceived, (snapshot) => {
      const entries = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setReceivedEntries(entries);
      setLoading(false);

      const newEntries = entries.filter((entry: any) => !knownIds.current.has(entry.id));

      if (isInitialLoad.current) {
        // These existed before this session's listener attached — if still
        // unseen, they arrived while the tab wasn't open.
        const arrivedWhileAway = newEntries.filter((entry: any) => !entry.seen);
        if (arrivedWhileAway.length > 0) {
          setJustReceivedWhileAway(arrivedWhileAway);
        }
        isInitialLoad.current = false;
      } else if (newEntries.length > 0) {
        // Genuinely live arrivals during this session.
        setLastLiveArrival(newEntries[0]);
      }

      entries.forEach((entry: any) => knownIds.current.add(entry.id));

      // Mark newly-synced entries as seen so the sender's "seen" indicator
      // lights up.
      entries
        .filter((entry: any) => !entry.seen)
        .forEach((entry: any) => {
          updateDoc(doc(db, 'sevi_entries', entry.id), { seen: true }).catch(() => {});
        });
    });

    const unsubSent = onSnapshot(qSent, (snapshot) => {
      setSentEntries(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubReceived();
      unsubSent();
    };
  }, [user, isAuthReady]);

  const clearJustReceivedWhileAway = () => setJustReceivedWhileAway([]);
  const clearLastLiveArrival = () => setLastLiveArrival(null);

  return (
    <AuraContext.Provider
      value={{
        receivedEntries,
        sentEntries,
        loading,
        justReceivedWhileAway,
        clearJustReceivedWhileAway,
        lastLiveArrival,
        clearLastLiveArrival,
      }}
    >
      {children}
    </AuraContext.Provider>
  );
};

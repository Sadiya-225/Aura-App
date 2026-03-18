'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import GiveAuraModal from '@/components/modals/GiveAuraModal';

export default function GivePickerModal({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [friends, setFriends] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFriend, setSelectedFriend] = useState<any | null>(null);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'friendships'), where('userId', '==', user.uid));
    const unsub = onSnapshot(q, async (snapshot) => {
      const friendIds = snapshot.docs.map(doc => doc.data().friendId);
      if (friendIds.length === 0) {
        setFriends([]);
        setLoading(false);
        return;
      }

      // Fetch friend profiles
      const friendProfiles: any[] = [];
      for (const id of friendIds) {
        const qProfile = query(collection(db, 'users'), where('uid', '==', id));
        const unsubProfile = onSnapshot(qProfile, (snap) => {
          if (!snap.empty) {
            const data = snap.docs[0].data();
            setFriends(prev => {
              const filtered = prev.filter(f => f.uid !== id);
              return [...filtered, data].sort((a, b) => a.displayName.localeCompare(b.displayName));
            });
          }
        });
      }
      setLoading(false);
    });

    return () => unsub();
  }, [user]);

  if (selectedFriend) {
    return (
      <GiveAuraModal 
        friend={selectedFriend} 
        onClose={() => {
          setSelectedFriend(null);
          onClose();
        }} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-aura-surface rounded-2xl border border-aura-surface-deep shadow-2xl relative z-10 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-aura-rose" />
        <div className="p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="serif text-3xl text-aura-rose">Give Aura</h2>
              <p className="text-aura-label text-aura-rose-dim text-[10px]">who moved you?</p>
            </div>
            <button onClick={onClose} className="text-aura-rose-dim hover:text-aura-rose transition-colors">
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-2">
            {loading ? (
              <div className="text-center py-12 text-aura-label text-aura-rose-dim animate-pulse">
                finding your circle...
              </div>
            ) : friends.length === 0 ? (
              <div className="text-center py-12 text-aura-label text-aura-rose-dim">
                add friends first to give them aura
              </div>
            ) : (
              friends.map((friend) => (
                <button
                  key={friend.uid}
                  onClick={() => setSelectedFriend(friend)}
                  className="flex items-center gap-4 p-4 bg-aura-bg rounded-xl border border-aura-surface-deep hover:border-aura-rose-dim transition-colors text-left group"
                >
                  <div className="text-2xl">{friend.avatar}</div>
                  <div className="flex-1">
                    <div className="text-aura-label text-[12px] text-aura-ink group-hover:text-aura-rose transition-colors">
                      {friend.displayName}
                    </div>
                    <div className="text-aura-label text-[9px] text-aura-rose-dim">
                      {friend.auraId}
                    </div>
                  </div>
                  <div className="text-aura-rose-dim group-hover:text-aura-rose transition-colors">
                    ✦
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

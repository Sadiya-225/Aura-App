'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import FriendProfileModal from '@/components/modals/FriendProfileModal';

export default function Friends() {
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

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-aura-label text-aura-rose">Your Circle</h3>

      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="text-center py-12 text-aura-label text-aura-rose-dim animate-pulse">
            finding your circle...
          </div>
        ) : friends.length === 0 ? (
          <div className="text-center py-12 text-aura-label text-aura-rose-dim">
            no friends yet — go to Profile to add your circle
          </div>
        ) : (
          friends.map((friend, i) => (
            <motion.button
              key={friend.uid}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedFriend(friend)}
              className="flex items-center gap-4 p-4 bg-aura-surface rounded-xl border border-aura-surface-deep hover:border-aura-rose-dim transition-colors text-left group"
            >
              <div className="text-3xl">{friend.avatar}</div>
              <div className="flex-1">
                <div className="text-aura-label text-[13px] text-aura-ink group-hover:text-aura-rose transition-colors">
                  {friend.displayName}
                </div>
                <div className="text-aura-label text-[10px] text-aura-rose-dim">
                  {friend.bio || friend.auraId}
                </div>
              </div>
              <div className="text-aura-rose-dim group-hover:text-aura-rose transition-colors">
                ◎
              </div>
            </motion.button>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedFriend && (
          <FriendProfileModal 
            friend={selectedFriend} 
            onClose={() => setSelectedFriend(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

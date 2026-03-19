'use client';

import { useState, useEffect } from 'react';
import { db } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { motion } from 'motion/react';
import GiveAuraModal from '@/components/modals/GiveAuraModal';
import { useAuth } from '@/context/AuthContext';

export default function FriendProfileModal({ friend, onClose }: { friend: any, onClose: () => void }) {
  const { user } = useAuth();
  const [auraFromYou, setAuraFromYou] = useState(0);
  const [showGiveAura, setShowGiveAura] = useState(false);

  useEffect(() => {
    const fetchScore = async () => {
      if (!user) return;
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const q = query(
        collection(db, 'aura_entries'),
        where('fromUserId', '==', user.uid),
        where('toUserId', '==', friend.uid),
        where('month', '==', month)
      );
      const snap = await getDocs(q);
      const total = snap.docs.reduce((sum, doc) => sum + doc.data().points, 0);
      setAuraFromYou(total);
    };
    fetchScore();
  }, [friend.uid, user]);

  if (showGiveAura) {
    return <GiveAuraModal friend={friend} onClose={() => { setShowGiveAura(false); onClose(); }} />;
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
        <div className="p-10 text-center">
          <button onClick={onClose} className="absolute top-6 right-6 text-aura-rose-dim hover:text-aura-rose transition-colors">
            ✕
          </button>

          <div className="text-7xl mb-6">{friend.avatar}</div>
          <h2 className="serif text-4xl text-aura-rose mb-1">{friend.displayName}</h2>
          <p className="text-aura-label text-aura-rose-dim mb-6">{friend.auraId}</p>
          
          <p className="serif italic text-lg text-aura-rose-dim mb-10 max-w-xs mx-auto">
            {friend.bio || 'no bio yet'}
          </p>

          <div className="bg-aura-bg p-6 rounded-xl border border-aura-surface-deep mb-10">
            <div className="serif text-4xl text-aura-rose mb-1">{auraFromYou}</div>
            <div className="text-aura-label text-[8px] text-aura-rose-dim">aura from you this month</div>
          </div>

          <button
            onClick={() => setShowGiveAura(true)}
            className="w-full bg-aura-rose text-aura-bg py-4 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors shadow-lg"
          >
            ✦ Give Aura
          </button>
        </div>
      </motion.div>
    </div>
  );
}

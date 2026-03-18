'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';

const CATEGORIES = ['Style', 'Wit', 'Depth', 'Vibe', 'Taste'];

export default function GiveAuraModal({ friend, onClose }: { friend: any, onClose: () => void }) {
  const { user, profile } = useAuth();
  const [points, setPoints] = useState(50);
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    if (!category) {
      setError('pick a category for this moment');
      return;
    }
    if (!note) {
      setError('add a note — the moment deserves a reason');
      return;
    }

    setLoading(true);
    try {
      const now = new Date();
      const month = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      const year = now.getFullYear();

      await addDoc(collection(db, 'aura_entries'), {
        fromUserId: user.uid,
        fromUserName: profile.displayName,
        toUserId: friend.uid,
        toUserName: friend.displayName,
        points: Number(points),
        category,
        note,
        createdAt: serverTimestamp(),
        month,
        year,
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7a5a5a', '#f5ede6', '#1a1010'],
      });

      onClose();
    } catch (err: any) {
      setError('Failed to give aura');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
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
              <h2 className="serif text-3xl text-aura-rose">{friend.displayName}</h2>
              <p className="text-aura-label text-aura-rose-dim text-[10px]">how much aura did they earn?</p>
            </div>
            <button onClick={onClose} className="text-aura-rose-dim hover:text-aura-rose transition-colors">
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            {/* Points */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="serif text-5xl text-aura-rose">{points}</span>
                <span className="text-aura-label text-aura-rose-dim text-[12px] mt-4">/ 100</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={points}
                onChange={(e) => setPoints(parseInt(e.target.value))}
                className="w-full h-1 bg-aura-surface-deep rounded-full appearance-none cursor-pointer accent-aura-rose"
              />
              <p className="text-aura-label text-[8px] text-aura-rose-dim mt-2">drag to set · max 100 per moment</p>
            </div>

            {/* Category */}
            <div className="flex flex-wrap gap-2 justify-center">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-aura-label text-[10px] border transition-all ${
                    category === cat
                      ? 'bg-aura-rose text-aura-bg border-aura-rose'
                      : 'bg-transparent text-aura-rose-dim border-aura-surface-deep hover:border-aura-rose-dim'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Note */}
            <div className="flex flex-col gap-2">
              <label className="text-aura-label text-aura-rose-dim text-[9px]">The Moment</label>
              <textarea
                required
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="she walked in with that hand chain bracelet and suddenly the whole room made sense..."
                className="bg-aura-bg border border-aura-ink/10 rounded-lg p-4 text-aura-ink focus:border-aura-rose outline-none transition-colors resize-none serif italic text-lg leading-relaxed"
              />
            </div>

            {error && <p className="text-red-500 text-aura-label text-[10px] text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="bg-aura-rose text-aura-bg py-4 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors disabled:opacity-50 shadow-lg"
            >
              {loading ? '...' : '✦ Give Aura'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

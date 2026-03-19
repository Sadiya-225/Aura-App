'use client';

import { useAuth } from '@/context/AuthContext';
import { db } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { motion } from 'motion/react';

const EMOJIS = [
  '✦', '🌙', '🎸', '🌟', '🦋', '🔥', '🌊', '🌿', '🌸', '✨',
  '🎨', '☕', '📚', '🕯️', '🎻', '🎭', '🏔️', '🏜️', '🪐', '🐚',
  '🦢', '🕊️', '🏹', '💎', '🗝️', '📜', '🎐', '🍵', '🍂', '🎐',
  '🪁', '♟️', '🧶', '🪴', '🍄', '🍓', '🍋', '🥨', '🥐', '🥂',
  '🕰️', '📻', '📸', '🎞️', '✒️'
];

export default function EmojiPickerModal({ onClose }: { onClose: () => void }) {
  const { user, profile, refreshProfile } = useAuth();

  const handleSelect = async (emoji: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        avatar: emoji,
      });
      await refreshProfile();
      onClose();
    } catch (err) {
      console.error('Failed to update avatar');
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
              <h2 className="serif text-3xl text-aura-rose">Pick your avatar</h2>
              <p className="text-aura-label text-aura-rose-dim text-[10px]">this is your aura face</p>
            </div>
            <button onClick={onClose} className="text-aura-rose-dim hover:text-aura-rose transition-colors">
              ✕
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 max-h-[400px] overflow-y-auto pr-2">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSelect(emoji)}
                className={`text-2xl p-2 rounded-lg hover:bg-aura-bg transition-colors ${
                  profile?.avatar === emoji ? 'bg-aura-bg border border-aura-rose/30' : ''
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

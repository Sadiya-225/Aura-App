'use client';

import { motion } from 'motion/react';
import { format } from 'date-fns';

interface AuraEntryProps {
  entry: any;
  isReceived: boolean;
  index: number;
}

export default function AuraEntry({ entry, isReceived, index }: AuraEntryProps) {
  const date = entry.createdAt?.toDate ? entry.createdAt.toDate() : new Date();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.06, 0.6), duration: 0.4 }}
      className={`bg-aura-surface p-6 rounded-xl border border-aura-surface-deep relative overflow-hidden group hover:-translate-y-0.5 transition-transform shadow-sm hover:shadow-md`}
    >
      {/* Accent Border */}
      <div 
        className={`absolute left-0 top-0 bottom-0 w-[3px] transition-colors ${
          isReceived ? 'bg-aura-rose/60 group-hover:bg-aura-rose' : 'bg-green-800/60 group-hover:bg-green-800'
        }`} 
      />

      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <span className="text-aura-label text-[11px] text-aura-ink">
            {isReceived ? 'Received from' : 'Sent to'}
          </span>
          <span className="text-aura-label text-[10px] text-aura-rose-dim">
            {isReceived ? entry.fromUserName || 'Friend' : entry.toUserName || 'Friend'}
          </span>
        </div>
        <div className={`serif text-3xl ${isReceived ? 'text-aura-rose' : 'text-green-800'}`}>
          {isReceived ? '+' : ''}{entry.points}
        </div>
      </div>

      {entry.category && (
        <div className="mb-4">
          <span className="text-aura-label text-[8px] px-2 py-0.5 border border-aura-rose/30 text-aura-rose rounded-full">
            {entry.category}
          </span>
        </div>
      )}

      <blockquote className="serif italic text-xl text-aura-ink/80 leading-relaxed mb-4">
        “{entry.note}”
      </blockquote>

      <div className="text-aura-label text-[9px] text-aura-rose-dim/50">
        {format(date, 'MMM d, yyyy · h:mm a')}
      </div>
    </motion.div>
  );
}

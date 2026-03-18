'use client';

import { useAuth } from '@/context/AuthContext';
import { useAura } from '@/context/AuraContext';
import AuraOrb from '@/components/ui/AuraOrb';
import AuraEntry from '@/components/ui/AuraEntry';
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';

export default function Home() {
  const { profile } = useAuth();
  const { receivedEntries, sentEntries, loading } = useAura();
  const [filter, setFilter] = useState<'all' | 'received' | 'sent'>('all');

  const monthlyScore = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return receivedEntries
      .filter(e => e.month === currentMonth)
      .reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const yearlyScore = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return receivedEntries
      .filter(e => e.year === currentYear)
      .reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const allTimeScore = useMemo(() => {
    return receivedEntries.reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const filteredEntries = useMemo(() => {
    if (filter === 'received') return receivedEntries;
    if (filter === 'sent') return sentEntries;
    return [...receivedEntries, ...sentEntries].sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  }, [filter, receivedEntries, sentEntries]);

  return (
    <div className="flex flex-col gap-12">
      {/* Hero */}
      <section className="text-center py-8">
        <div className="text-8xl mb-4">{profile?.avatar}</div>
        <h2 className="serif text-4xl mb-1">{profile?.displayName}</h2>
        <p className="text-aura-label text-aura-rose-dim">{profile?.auraId}</p>
      </section>

      <AuraOrb score={monthlyScore} />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatCard label="this year" value={yearlyScore} />
        <StatCard label="all time" value={allTimeScore} />
      </div>

      <div className="h-px bg-aura-surface-deep w-full" />

      {/* Feed */}
      <section className="flex flex-col gap-6">
        <h3 className="text-aura-label text-aura-rose">Aura Feed</h3>
        
        {/* Filters */}
        <div className="flex gap-2">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')} label="All" />
          <FilterButton active={filter === 'received'} onClick={() => setFilter('received')} label="Received" />
          <FilterButton active={filter === 'sent'} onClick={() => setFilter('sent')} label="Sent" />
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-12 text-aura-label text-aura-rose-dim animate-pulse">
              loading aura...
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-aura-label text-aura-rose-dim">
              nothing here yet
            </div>
          ) : (
            filteredEntries.map((entry, i) => (
              <AuraEntry 
                key={entry.id} 
                entry={entry} 
                isReceived={entry.toUserId === profile?.uid}
                index={i}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string, value: number }) {
  return (
    <div className="bg-aura-surface p-6 rounded-xl border border-aura-surface-deep text-center">
      <div className="serif text-3xl text-aura-rose mb-1">{value}</div>
      <div className="text-aura-label text-[8px] text-aura-rose-dim">{label}</div>
    </div>
  );
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-aura-label text-[10px] border transition-colors ${
        active 
          ? 'bg-aura-rose text-aura-bg border-aura-rose' 
          : 'bg-transparent text-aura-rose-dim border-aura-surface-deep hover:border-aura-rose-dim'
      }`}
    >
      {label}
    </button>
  );
}

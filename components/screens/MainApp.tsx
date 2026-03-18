'use client';

import { useState } from 'react';
import AppShell from '@/components/layout/AppShell';
import Home from '@/components/screens/Home';
import Friends from '@/components/screens/Friends';
import Profile from '@/components/screens/Profile';
import { Plus } from 'lucide-react';
import GivePickerModal from '@/components/modals/GivePickerModal';
import { AnimatePresence } from 'motion/react';

export default function MainApp() {
  const [activeTab, setActiveTab] = useState<'home' | 'friends' | 'profile'>('home');
  const [showGivePicker, setShowGivePicker] = useState(false);

  return (
    <>
      <AppShell activeTab={activeTab} setActiveTab={setActiveTab}>
        {activeTab === 'home' && <Home />}
        {activeTab === 'friends' && <Friends />}
        {activeTab === 'profile' && <Profile />}
      </AppShell>

      {/* FAB */}
      {(activeTab === 'home' || activeTab === 'friends') && (
        <button
          onClick={() => setShowGivePicker(true)}
          className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-aura-rose text-aura-bg rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-transform"
        >
          <span className="text-2xl">✦</span>
        </button>
      )}

      <AnimatePresence>
        {showGivePicker && (
          <GivePickerModal onClose={() => setShowGivePicker(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

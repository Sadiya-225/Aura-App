'use client';

import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AuraProvider } from '@/context/AuraContext';
import Landing from '@/components/screens/Landing';
import MainApp from '@/components/screens/MainApp';
import AuraReceivedHandler from '@/components/ui/AuraReceivedHandler';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-aura-bg">
        <div className="serif text-4xl animate-pulse text-aura-rose">SEVI</div>
      </div>
    );
  }

  if (!user) {
    return <Landing />;
  }

  return (
    <AuraProvider>
      <MainApp />
      <AuraReceivedHandler />
    </AuraProvider>
  );
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

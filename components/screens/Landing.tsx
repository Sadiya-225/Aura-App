'use client';

import { useState } from 'react';
import { auth, db } from '@/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { generateAuraId } from '@/lib/aura';
import { motion, AnimatePresence } from 'motion/react';

export default function Landing() {
  const [mode, setMode] = useState<'landing' | 'login' | 'signup'>('landing');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        const auraId = generateAuraId();
        await setDoc(doc(db, 'users', userCred.user.uid), {
          uid: userCred.user.uid,
          displayName: name,
          email,
          auraId,
          avatar: '✦',
          bio: '',
          createdAt: serverTimestamp(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden bg-aura-bg">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-aura-rose/5 rounded-full blur-[100px] animate-pulse" />

      <AnimatePresence mode="wait">
        {mode === 'landing' ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10"
          >
            <h1 className="text-8xl serif text-aura-rose tracking-[0.2em] mb-4">AURA</h1>
            <p className="text-aura-label text-aura-rose-dim mb-12">
              a journal other people write about you
            </p>
            <div className="flex flex-col gap-4 w-64 mx-auto">
              <button
                onClick={() => setMode('signup')}
                className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors"
              >
                Begin
              </button>
              <button
                onClick={() => setMode('login')}
                className="text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
              >
                Sign in
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="auth"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md bg-aura-surface p-12 rounded-2xl border border-aura-surface-deep shadow-xl relative z-10"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-aura-rose rounded-t-2xl" />
            <h2 className="serif text-4xl text-aura-rose mb-8 text-center">
              {mode === 'signup' ? 'Begin' : 'Sign in'}
            </h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-6">
              {mode === 'signup' && (
                <div className="flex flex-col gap-2">
                  <label className="text-aura-label text-aura-rose-dim">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-aura-label text-aura-rose-dim">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-aura-label text-aura-rose-dim">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
                />
              </div>
              {error && <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors disabled:opacity-50"
              >
                {loading ? '...' : mode === 'signup' ? 'Create Account' : 'Sign in'}
              </button>
            </form>
            <button
              onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
              className="w-full mt-6 text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              {mode === 'signup' ? 'Already have an account? Sign in' : "Don't have an account? Begin"}
            </button>
            <button
              onClick={() => setMode('landing')}
              className="w-full mt-2 text-aura-label text-aura-rose-dim/50 hover:text-aura-rose transition-colors"
            >
              Back
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

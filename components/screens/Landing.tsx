"use client";

import { useState } from "react";
import { auth, db } from "@/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { generateSeviId } from "@/lib/aura";
import { motion, AnimatePresence } from "motion/react";
import LandingPage from "./LandingPage";
import { useAuth } from "@/context/AuthContext";

export default function Landing() {
  const [mode, setMode] = useState<"landing" | "login" | "signup" | "marketing">("marketing");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { refreshProfile } = useAuth();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "signup") {
        const userCred = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const seviId = generateSeviId();
        await setDoc(doc(db, "users", userCred.user.uid), {
          uid: userCred.user.uid,
          displayName: name,
          email,
          seviId,
          avatar: "✦",
          bio: "",
          createdAt: serverTimestamp(),
        });
        // AuthContext's own onAuthStateChanged listener fires as soon as the
        // account is created and fetches the profile immediately — before
        // this doc exists — leaving it stuck at null. Force a re-fetch now
        // that the doc is actually there.
        await refreshProfile();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCred = await signInWithPopup(auth, provider);

      // Check if user already exists
      const userRef = doc(db, "users", userCred.user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        // Create new user profile if doesn't exist
        const seviId = generateSeviId();
        await setDoc(userRef, {
          uid: userCred.user.uid,
          displayName: userCred.user.displayName || "User",
          email: userCred.user.email,
          seviId,
          avatar: "✦",
          bio: "",
          createdAt: serverTimestamp(),
        });
        // Same race as email signup: AuthContext's listener already looked
        // for this doc (and found nothing) before it existed. Re-fetch now.
        await refreshProfile();
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
        {mode === "marketing" ? (
          <motion.div
            key="marketing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <LandingPage
              onJoinClick={(capturedEmail) => {
                if (capturedEmail) setEmail(capturedEmail);
                setMode("signup");
              }}
            />
          </motion.div>
        ) : mode === "landing" ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center z-10"
          >
            <h1 className="text-8xl serif text-aura-rose tracking-[0.2em] mb-4">
              SEVI
            </h1>
            <p className="text-aura-label text-aura-rose-dim mb-12">
              a journal other people write about you
            </p>
            <div className="flex flex-col gap-4 w-64 mx-auto">
              <button
                onClick={() => setMode("signup")}
                className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors"
              >
                Begin
              </button>
              <button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="bg-aura-surface text-aura-rose py-3 rounded-full text-aura-label hover:bg-aura-surface-deep transition-colors border border-aura-surface-deep disabled:opacity-50"
              >
                {loading ? "..." : "Sign in with Google"}
              </button>
              <button
                onClick={() => setMode("login")}
                className="text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
              >
                Sign in with Email
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
              {mode === "signup" ? "Begin" : "Sign in"}
            </h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-6">
              {mode === "signup" && (
                <div className="flex flex-col gap-2">
                  <label className="text-aura-label text-aura-rose-dim">
                    Name
                  </label>
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
                <label className="text-aura-label text-aura-rose-dim">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-aura-label text-aura-rose-dim">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-aura-bg border border-aura-ink/10 rounded-lg p-3 text-aura-ink focus:border-aura-rose outline-none transition-colors"
                />
              </div>
              {error && (
                <p className="text-red-500 text-[10px] uppercase tracking-widest">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors disabled:opacity-50"
              >
                {loading
                  ? "..."
                  : mode === "signup"
                    ? "Create Account"
                    : "Sign in"}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="h-px bg-aura-surface-deep flex-1" />
              <span className="text-aura-label text-[10px] text-aura-rose-dim">
                OR
              </span>
              <div className="h-px bg-aura-surface-deep flex-1" />
            </div>

            {/* Google Sign-in */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-aura-surface text-aura-rose py-3 rounded-full text-aura-label hover:bg-aura-surface-deep transition-colors border border-aura-surface-deep disabled:opacity-50"
            >
              {loading ? "..." : "Continue with Google"}
            </button>

            <button
              onClick={() => setMode(mode === "signup" ? "login" : "signup")}
              className="w-full mt-6 text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              {mode === "signup"
                ? "Already have an account? Sign in"
                : "Don't have an account? Begin"}
            </button>
            <button
              onClick={() => setMode("marketing")}
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

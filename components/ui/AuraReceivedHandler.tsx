"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAura } from "@/context/AuraContext";

/**
 * Handles both live arrivals (while this tab is open) and the "you were
 * seen while away" reveal, and renders a toast / a celebration card for
 * each respectively.
 */
export default function AuraReceivedHandler() {
  const {
    justReceivedWhileAway,
    clearJustReceivedWhileAway,
    lastLiveArrival,
    clearLastLiveArrival,
  } = useAura();
  const lastHandledLiveId = useRef<string | null>(null);

  // The toast's own visibility is derived straight from `lastLiveArrival` —
  // no local copy of it — so auto-dismiss just tells the context to clear
  // it, rather than mirroring context state into component state.
  useEffect(() => {
    if (lastLiveArrival && lastLiveArrival.id !== lastHandledLiveId.current) {
      lastHandledLiveId.current = lastLiveArrival.id;
      const timer = setTimeout(() => clearLastLiveArrival(), 5000);
      return () => clearTimeout(timer);
    }
  }, [lastLiveArrival, clearLastLiveArrival]);

  const totalPoints = justReceivedWhileAway.reduce(
    (sum: number, entry: any) => sum + entry.points,
    0,
  );
  const uniqueNames = [
    ...new Set(justReceivedWhileAway.map((entry: any) => entry.fromUserName)),
  ];
  const nameText =
    uniqueNames.length === 1 ? uniqueNames[0] : `${uniqueNames.length} people`;

  return (
    <>
      {/* Live-arrival toast */}
      <AnimatePresence>
        {lastLiveArrival && (
          <motion.div
            key={lastLiveArrival.id}
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            className="fixed top-6 right-6 z-[200] max-w-xs bg-aura-surface border border-aura-surface-deep rounded-xl shadow-2xl overflow-hidden cursor-pointer"
            onClick={clearLastLiveArrival}
          >
            <div className="h-1 bg-aura-rose" />
            <div className="p-4 flex items-start gap-3">
              <div className="text-2xl text-aura-rose">✦</div>
              <div>
                <div className="text-aura-label text-aura-rose text-[10px] mb-1">
                  You Received Aura!
                </div>
                <div className="text-sm text-aura-rose-dim">
                  {lastLiveArrival.fromUserName || "Someone"} Gave You{" "}
                  {lastLiveArrival.points} Points
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* "Seen while away" celebration */}
      <AnimatePresence>
        {justReceivedWhileAway.length > 0 && (
          <div className="fixed inset-0 z-[210] flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={clearJustReceivedWhileAway}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm bg-aura-surface rounded-2xl border border-aura-surface-deep shadow-2xl relative z-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-aura-rose" />
              <div className="p-10 flex flex-col items-center gap-6 text-center">
                <div className="text-5xl text-aura-rose">✦</div>
                <div>
                  <h2 className="serif text-3xl text-aura-rose mb-3">
                    You Were Seen!
                  </h2>
                  <p className="text-aura-rose-dim">
                    {nameText} Gave You {totalPoints} Points While You Were
                    Away.
                  </p>
                </div>
                <button
                  onClick={clearJustReceivedWhileAway}
                  className="w-full bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors"
                >
                  See it
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

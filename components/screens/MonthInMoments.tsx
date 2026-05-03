"use client";

import { useAuth } from "@/context/AuthContext";
import { useAura } from "@/context/AuraContext";
import AuraEntry from "@/components/ui/AuraEntry";
import { useMemo } from "react";
import { motion } from "motion/react";

interface MonthInMomentsProps {
  month?: string; // YYYY-MM format, defaults to last month
  onClose: () => void;
  onGiveAura?: () => void;
  onViewArchive?: () => void;
}

export default function MonthInMoments({
  month,
  onClose,
  onGiveAura,
  onViewArchive,
}: MonthInMomentsProps) {
  const { profile } = useAuth();
  const { receivedEntries, sentEntries } = useAura();

  // Get last month if not specified
  const targetMonth = useMemo(() => {
    if (month) return month;
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, "0")}`;
  }, [month]);

  // Format month name
  const monthName = useMemo(() => {
    const [year, monthNum] = targetMonth.split("-");
    const date = new Date(parseInt(year), parseInt(monthNum) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [targetMonth]);

  // Check if user gave aura that month
  const gaveAura = useMemo(() => {
    return sentEntries.some((entry) => entry.month === targetMonth);
  }, [sentEntries, targetMonth]);

  // Get entries for that month
  const monthEntries = useMemo(() => {
    return receivedEntries
      .filter((e) => e.month === targetMonth)
      .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
  }, [receivedEntries, targetMonth]);

  // Calculate stats
  const totalAura = useMemo(() => {
    return monthEntries.reduce((sum, e) => sum + e.points, 0);
  }, [monthEntries]);

  const uniqueGivers = useMemo(() => {
    const givers = new Set(monthEntries.map((e) => e.fromUserId));
    return givers.size;
  }, [monthEntries]);

  const categoryBreakdown = useMemo(() => {
    const breakdown: Record<string, number> = {};
    monthEntries.forEach((entry) => {
      const cat = entry.category;
      if (cat) {
        breakdown[cat] = (breakdown[cat] || 0) + 1;
      }
    });
    return breakdown;
  }, [monthEntries]);

  const mostCommonCategory = useMemo(() => {
    if (Object.keys(categoryBreakdown).length === 0) return null;
    const sorted = Object.entries(categoryBreakdown).sort(
      (a, b) => b[1] - a[1],
    );
    return sorted[0][0];
  }, [categoryBreakdown]);

  const topMoments = useMemo(() => {
    return monthEntries.slice(0, 3);
  }, [monthEntries]);

  if (!gaveAura && monthEntries.length > 0) {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
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
          <div className="p-10 flex flex-col items-center gap-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              ✕
            </button>

            {/* Lock Icon */}
            <div className="text-6xl">🔒</div>

            {/* Message */}
            <div className="text-center">
              <h2 className="serif text-2xl text-aura-rose mb-4">
                You Have to See Someone Else Clearly Before You Get to See
                Yourself Clearly
              </h2>
              <p className="text-aura-label text-aura-rose-dim text-[11px] mb-8">
                Give Aura to Someone this Month to Unlock Next Month's Recap
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                onClose();
                onGiveAura?.();
              }}
              className="w-full bg-aura-rose text-aura-bg py-3 rounded-full text-aura-label hover:bg-aura-rose-dim transition-colors"
            >
              Give Aura to Someone
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // If no entries, show empty state
  if (monthEntries.length === 0) {
    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-6">
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
          <div className="p-10 flex flex-col items-center gap-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              ✕
            </button>

            <div className="text-center">
              <h2 className="serif text-2xl text-aura-rose mb-4">
                {monthName}
              </h2>
              <p className="text-aura-label text-aura-rose-dim text-[11px]">
                {gaveAura
                  ? "You Saw Others Clearly This Month. Your Turn Will Come."
                  : "No Sevi This Month. That's Okay - Keep Showing Up."}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-aura-bg rounded-2xl border border-aura-surface-deep shadow-2xl relative z-10 my-4 sm:my-8"
        style={{
          background: "linear-gradient(135deg, #fdf8f4 0%, #f9f1eb 100%)",
        } as React.CSSProperties}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-aura-rose-dim hover:text-aura-rose transition-colors z-10"
        >
          ✕
        </button>

        <div className="p-6 sm:p-10 flex flex-col gap-8 sm:gap-10 max-h-[85vh] overflow-y-auto">
          {/* Header */}
          <section className="text-center">
            <h1 className="serif text-4xl text-aura-rose mb-2">{monthName}</h1>
            <p className="text-aura-label text-aura-rose-dim text-[10px]">
              How people saw you this month
            </p>
          </section>

          {/* Key Stats */}
          <section className="grid grid-cols-2 gap-4">
            <div className="bg-aura-surface/50 p-6 rounded-xl border border-aura-surface-deep text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="serif text-5xl text-aura-rose mb-1"
              >
                {totalAura}
              </motion.div>
              <div className="text-aura-label text-[8px] text-aura-rose-dim">
                Total Sevi
              </div>
            </div>
            <div className="bg-aura-surface/50 p-6 rounded-xl border border-aura-surface-deep text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="serif text-5xl text-aura-rose mb-1"
              >
                {uniqueGivers}
              </motion.div>
              <div className="text-aura-label text-[8px] text-aura-rose-dim">
                {uniqueGivers === 1 ? "person noticed" : "people noticed"}
              </div>
            </div>
          </section>

          {mostCommonCategory && (
            <section className="text-center">
              <p className="serif text-lg text-aura-rose-dim italic">
                "You Radiated{" "}
                <span className="text-aura-rose font-normal">
                  {mostCommonCategory}
                </span>{" "}
                Most"
              </p>
            </section>
          )}

          {/* Top Moments */}
          <section className="flex flex-col gap-4">
            <h3 className="text-aura-label text-aura-rose text-center">
              Top Moments
            </h3>
            {topMoments.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <AuraEntry entry={entry} isReceived={true} index={i} />
              </motion.div>
            ))}
          </section>

          {/* Category Breakdown */}
          {Object.keys(categoryBreakdown).length > 0 && (
            <section className="flex flex-col gap-4">
              <h3 className="text-aura-label text-aura-rose text-center">
                Category Breakdown
              </h3>
              <div
                className={`grid gap-3 ${
                  Object.keys(categoryBreakdown).length === 1
                    ? "grid-cols-1 max-w-[200px] mx-auto"
                    : "grid-cols-2"
                }`}
              >
                {Object.entries(categoryBreakdown).map(([category, count]) => (
                  <div
                    key={category}
                    className="bg-aura-surface/50 p-4 rounded-lg border border-aura-surface-deep text-center"
                  >
                    <div className="text-aura-label text-[10px] text-aura-rose-dim mb-1">
                      {category}
                    </div>
                    <div className="serif text-2xl text-aura-rose">
                      {count} {count === 1 ? "Time" : "Times"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Action Buttons */}
          <section className="flex flex-col gap-3">
            <button
              onClick={() => {
                onClose();
                onViewArchive?.();
              }}
              className="w-full bg-transparent border border-aura-rose text-aura-rose py-3 rounded-full text-aura-label hover:bg-aura-rose/10 transition-colors"
            >
              View full archive
            </button>
            <button
              onClick={onClose}
              className="w-full text-aura-label text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              Close
            </button>
          </section>
        </div>
      </motion.div>
    </div>
  );
}

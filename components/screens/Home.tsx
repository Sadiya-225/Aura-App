"use client";

import { useAuth } from "@/context/AuthContext";
import { useAura } from "@/context/AuraContext";
import AuraOrb from "@/components/ui/AuraOrb";
import AuraEntry from "@/components/ui/AuraEntry";
import MonthInMoments from "@/components/screens/MonthInMoments";
import { getPreviousMonth } from "@/lib/aura";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Home({
  onNavigateToArchive,
}: {
  onNavigateToArchive?: () => void;
}) {
  const { profile } = useAuth();
  const { receivedEntries, sentEntries, loading } = useAura();
  const [filter, setFilter] = useState<"all" | "received" | "sent">("all");
  const [showMonthInMoments, setShowMonthInMoments] = useState(false);
  const [showRecapBanner, setShowRecapBanner] = useState(true);

  const monthlyScore = useMemo(() => {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return receivedEntries
      .filter((e) => e.month === currentMonth)
      .reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const yearlyScore = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return receivedEntries
      .filter((e) => e.year === currentYear)
      .reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const allTimeScore = useMemo(() => {
    return receivedEntries.reduce((sum, e) => sum + e.points, 0);
  }, [receivedEntries]);

  const mostReceivedCategory = useMemo(() => {
    if (receivedEntries.length === 0) return null;

    const categoryCount: Record<string, number> = {};
    const categoryRecent: Record<string, number> = {};

    receivedEntries.forEach((entry, index) => {
      const cat = entry.category;
      if (cat) {
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
        // Store the most recent index (lower index = more recent)
        if (!categoryRecent[cat] || index < categoryRecent[cat]) {
          categoryRecent[cat] = index;
        }
      }
    });

    // Find max count
    const maxCount = Math.max(...Object.values(categoryCount));
    const topCategories = Object.entries(categoryCount)
      .filter(([_, count]) => count === maxCount)
      .map(([cat]) => cat);

    // If tie, pick most recent
    if (topCategories.length > 1) {
      const mostRecent = topCategories.reduce((prev, curr) => {
        return categoryRecent[curr] < categoryRecent[prev] ? curr : prev;
      });
      return mostRecent;
    }

    return topCategories[0];
  }, [receivedEntries]);

  const filteredEntries = useMemo(() => {
    if (filter === "received") return receivedEntries;
    if (filter === "sent") return sentEntries;
    return [...receivedEntries, ...sentEntries].sort(
      (a, b) => b.createdAt?.seconds - a.createdAt?.seconds,
    );
  }, [filter, receivedEntries, sentEntries]);

  // Recap always covers the literal previous calendar month, not just the
  // most recent month that happens to have entries.
  const recapMonthData = useMemo(() => {
    const lastMonth = getPreviousMonth();
    const hasEntries =
      receivedEntries.some((e) => e.month === lastMonth) ||
      sentEntries.some((e) => e.month === lastMonth);

    return { month: lastMonth, hasEntries };
  }, [receivedEntries, sentEntries]);

  const shouldShowRecapBanner = useMemo(() => {
    const now = new Date();
    const isFirstOfMonth = now.getDate() === 1;
    return isFirstOfMonth && showRecapBanner && recapMonthData.hasEntries;
  }, [showRecapBanner, recapMonthData]);

  return (
    <>
      <div className="flex flex-col gap-12">
        {/* Month in Moments Banner */}
        {shouldShowRecapBanner && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => setShowMonthInMoments(true)}
            className="relative overflow-hidden bg-gradient-to-r from-aura-rose/20 to-aura-rose/10 border border-aura-rose/30 rounded-xl p-4 hover:from-aura-rose/30 hover:to-aura-rose/20 transition-all cursor-pointer"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowRecapBanner(false);
              }}
              className="absolute top-2 right-2 text-aura-rose-dim hover:text-aura-rose transition-colors"
            >
              ✕
            </button>
            <div className="flex items-center gap-3">
              <div className="text-2xl text-aura-rose">✦</div>
              <div className="text-left">
                <div className="text-aura-label text-aura-rose font-medium">
                  Your recap is ready
                </div>
                <div className="text-aura-label text-[9px] text-aura-rose-dim">
                  See how people saw you last month
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Hero */}
        <section className="text-center py-8">
          <div className="text-8xl mb-4">{profile?.avatar}</div>
          <h2 className="serif text-4xl mb-1">{profile?.displayName}</h2>
          <p className="text-aura-label text-aura-rose-dim">
            {profile?.seviId}
          </p>
        </section>

        <AuraOrb score={monthlyScore} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard label="this year" value={yearlyScore} />
          <StatCard label="all time" value={allTimeScore} />
        </div>

        {/* Most Received Category */}
        {mostReceivedCategory && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="serif text-lg text-aura-rose-dim italic">
              "You Radiate{" "}
              <span className="text-aura-rose font-normal">
                {mostReceivedCategory}
              </span>{" "}
              Most"
            </p>
          </motion.div>
        )}

        <div className="h-px bg-aura-surface-deep w-full" />

        {/* Feed */}
        <section className="flex flex-col gap-6">
          <h3 className="text-aura-label text-aura-rose">Sevi Feed</h3>

          {/* Filters */}
          <div className="flex gap-2">
            <FilterButton
              active={filter === "all"}
              onClick={() => setFilter("all")}
              label="All"
            />
            <FilterButton
              active={filter === "received"}
              onClick={() => setFilter("received")}
              label="Received"
            />
            <FilterButton
              active={filter === "sent"}
              onClick={() => setFilter("sent")}
              label="Sent"
            />
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <div className="text-center py-12 text-aura-label text-aura-rose-dim animate-pulse">
                Loading Sevi...
              </div>
            ) : filteredEntries.length === 0 ? (
              <div className="text-center py-12 text-aura-label text-aura-rose-dim">
                Nothing Here Yet
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

      {/* Month in Moments Modal */}
      <AnimatePresence>
        {showMonthInMoments && recapMonthData.month && (
          <MonthInMoments
            month={recapMonthData.month}
            onClose={() => setShowMonthInMoments(false)}
            onGiveAura={() => {
              // This will be handled by the FAB in MainApp
              setShowMonthInMoments(false);
            }}
            onViewArchive={() => {
              setShowMonthInMoments(false);
              onNavigateToArchive?.();
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-aura-surface p-6 rounded-xl border border-aura-surface-deep text-center">
      <div className="serif text-3xl text-aura-rose mb-1">{value}</div>
      <div className="text-aura-label text-[8px] text-aura-rose-dim">
        {label}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-aura-label text-[10px] border transition-colors ${
        active
          ? "bg-aura-rose text-aura-bg border-aura-rose"
          : "bg-transparent text-aura-rose-dim border-aura-surface-deep hover:border-aura-rose-dim"
      }`}
    >
      {label}
    </button>
  );
}

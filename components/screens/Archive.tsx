"use client";

import { useAuth } from "@/context/AuthContext";
import { useAura } from "@/context/AuraContext";
import AuraEntry from "@/components/ui/AuraEntry";
import MonthInMoments from "@/components/screens/MonthInMoments";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function Archive() {
  const { profile } = useAuth();
  const { receivedEntries, loading } = useAura();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedRecapMonth, setSelectedRecapMonth] = useState<string | null>(
    null,
  );

  // Group entries by month
  const entriesByMonth = useMemo(() => {
    let filtered = [...receivedEntries];

    // Apply filters
    if (selectedPerson !== "all") {
      filtered = filtered.filter((e) => e.fromUserId === selectedPerson);
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter((e) => e.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((e) =>
        e.note?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    // Apply date range filters
    if (startDate) {
      const start = new Date(startDate);
      filtered = filtered.filter((e) => {
        if (!e.createdAt?.seconds) return false;
        const entryDate = new Date(e.createdAt.seconds * 1000);
        return entryDate >= start;
      });
    }
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999); // Include the entire end day
      filtered = filtered.filter((e) => {
        if (!e.createdAt?.seconds) return false;
        const entryDate = new Date(e.createdAt.seconds * 1000);
        return entryDate <= end;
      });
    }

    // Group by month
    const grouped: Record<string, any[]> = {};
    filtered.forEach((entry) => {
      const monthKey = entry.month || "Unknown";
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(entry);
    });

    // Sort months descending
    const sortedMonths = Object.keys(grouped).sort((a, b) =>
      b.localeCompare(a),
    );

    return sortedMonths.map((month) => ({
      month,
      entries: grouped[month].sort(
        (a, b) => b.createdAt?.seconds - a.createdAt?.seconds,
      ),
    }));
  }, [
    receivedEntries,
    selectedPerson,
    selectedCategory,
    searchQuery,
    startDate,
    endDate,
  ]);

  // Get unique people who gave aura
  const uniquePeople = useMemo(() => {
    const peopleMap = new Map();
    receivedEntries.forEach((entry) => {
      if (!peopleMap.has(entry.fromUserId)) {
        peopleMap.set(entry.fromUserId, entry.fromUserName);
      }
    });
    return Array.from(peopleMap.entries());
  }, [receivedEntries]);

  const categories = ["Style", "Wit", "Depth", "Vibe", "Taste"];

  // Format month for display
  const formatMonth = (monthStr: string) => {
    if (monthStr === "Unknown") return "Unknown";
    const [year, month] = monthStr.split("-");
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <section className="text-center">
        <h1 className="serif text-4xl text-aura-rose mb-2">Archive</h1>
        <p className="text-aura-label text-aura-rose-dim text-[10px]">
          Your permanent journal - moments never disappear
        </p>
      </section>

      {/* Filters */}
      <section className="flex flex-col gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search Notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-aura-surface border border-aura-surface-deep rounded-lg p-3 text-aura-ink text-sm focus:border-aura-rose outline-none transition-colors"
        />

        {/* Filter by Person */}
        <div className="flex flex-col gap-2">
          <label className="text-aura-label text-[9px] text-aura-rose-dim">
            Filter by Person
          </label>
          <select
            value={selectedPerson}
            onChange={(e) => setSelectedPerson(e.target.value)}
            className="bg-aura-surface border border-aura-surface-deep rounded-lg p-3 text-aura-ink text-sm focus:border-aura-rose outline-none transition-colors"
          >
            <option value="all">All People</option>
            {uniquePeople.map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Category */}
        <div className="flex flex-col gap-2">
          <label className="text-aura-label text-[9px] text-aura-rose-dim">
            Filter by Category
          </label>
          <div className="flex flex-wrap gap-2">
            <CategoryButton
              active={selectedCategory === "all"}
              onClick={() => setSelectedCategory("all")}
              label="All"
            />
            {categories.map((cat) => (
              <CategoryButton
                key={cat}
                active={selectedCategory === cat}
                onClick={() => setSelectedCategory(cat)}
                label={cat}
              />
            ))}
          </div>
        </div>

        {/* Date Range Filter */}
        <div className="flex flex-col gap-2">
          <label className="text-aura-label text-[9px] text-aura-rose-dim">
            Date Range
          </label>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-aura-label text-[8px] text-aura-rose-dim">
                From
              </span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-aura-surface border border-aura-surface-deep rounded-lg p-3 text-aura-ink text-sm focus:border-aura-rose outline-none transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-aura-label text-[8px] text-aura-rose-dim">
                To
              </span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-aura-surface border border-aura-surface-deep rounded-lg p-3 text-aura-ink text-sm focus:border-aura-rose outline-none transition-colors"
              />
            </div>
          </div>
          {(startDate || endDate) && (
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="text-aura-label text-[9px] text-aura-rose-dim hover:text-aura-rose transition-colors self-start"
            >
              Clear dates
            </button>
          )}
        </div>
      </section>

      <div className="h-px bg-aura-surface-deep w-full" />

      {/* Entries by Month */}
      <section className="flex flex-col gap-8">
        {loading ? (
          <div className="text-center py-12 text-aura-label text-aura-rose-dim animate-pulse">
            loading archive...
          </div>
        ) : entriesByMonth.length === 0 ? (
          <div className="text-center py-12 text-aura-label text-aura-rose-dim">
            {receivedEntries.length === 0
              ? "Your journal is empty. Start by giving sevi to someone."
              : "No entries match your filters."}
          </div>
        ) : (
          entriesByMonth.map(({ month, entries }) => (
            <motion.div
              key={month}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col gap-4"
            >
              {/* Month Header - Sticky */}
              <div className="sticky top-20 z-10 bg-aura-bg/90 backdrop-blur-sm py-2 flex items-center justify-between">
                <h2 className="serif text-2xl text-aura-rose">
                  {formatMonth(month)}
                </h2>
                <button
                  onClick={() => setSelectedRecapMonth(month)}
                  className="text-aura-label text-[10px] text-aura-rose-dim hover:text-aura-rose transition-colors"
                >
                  View Recap →
                </button>
              </div>

              {/* Entries */}
              <div className="flex flex-col gap-4">
                {entries.map((entry, i) => (
                  <AuraEntry
                    key={entry.id}
                    entry={entry}
                    isReceived={true}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))
        )}
      </section>

      {/* Month in Moments Modal */}
      <AnimatePresence>
        {selectedRecapMonth && (
          <MonthInMoments
            month={selectedRecapMonth}
            onClose={() => setSelectedRecapMonth(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function CategoryButton({
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

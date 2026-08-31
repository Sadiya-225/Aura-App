"use client";

import { useState } from "react";

const CATEGORIES = ["Style", "Wit", "Depth", "Vibe", "Taste"];

const DEFAULTS = {
  name: "Vermonica",
  points: 75,
  tag: "Depth",
  note: "you said one thing and suddenly everything i'd been overthinking made sense...",
};

export default function GiveReceiveDemo() {
  const [name, setName] = useState(DEFAULTS.name);
  const [points, setPoints] = useState(DEFAULTS.points);
  const [tag, setTag] = useState(DEFAULTS.tag);
  const [note, setNote] = useState(DEFAULTS.note);
  const [sent, setSent] = useState(DEFAULTS);
  const [justSent, setJustSent] = useState(false);

  const handleSend = () => {
    setSent({
      name: name.trim() || DEFAULTS.name,
      points,
      tag,
      note: note.trim() || DEFAULTS.note,
    });
    setJustSent(true);
    window.setTimeout(() => setJustSent(false), 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
      {/* Give — interactive */}
      <div className="bg-aura-surface border border-aura-surface-deep rounded-lg p-6 sm:p-8">
        <div className="text-aura-label text-aura-rose-dim text-[8px] sm:text-[9px] uppercase tracking-wider mb-6">
          The Give
        </div>
        <div className="serif text-lg text-aura-ink mb-1">
          To{" "}
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={DEFAULTS.name}
            maxLength={24}
            className="font-semibold bg-transparent border-b border-dashed border-aura-surface-deep focus:border-aura-rose outline-none w-36 align-baseline"
          />
        </div>
        <div className="text-xs text-aura-rose-dim mb-6">
          How Much Did This Moment Move You?
        </div>
        <div className="bg-aura-bg border border-aura-surface-deep rounded-lg py-5 px-6 mb-4">
          <div className="text-center mb-3">
            <span className="serif text-4xl text-aura-rose">{points}</span>
            <span className="text-xs text-aura-rose-dim"> / 100</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={points}
            onChange={(e) => setPoints(Number(e.target.value))}
            className="w-full accent-aura-rose"
          />
        </div>
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              type="button"
              key={cat}
              onClick={() => setTag(cat)}
              className={`text-aura-label text-[8px] uppercase tracking-wider px-2.5 py-1.5 rounded-full border transition-colors ${
                cat === tag
                  ? "border-aura-rose text-aura-rose bg-aura-rose/5"
                  : "border-aura-surface-deep text-aura-rose-dim hover:border-aura-rose-dim"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="bg-aura-bg border border-aura-surface-deep rounded-lg p-4 mb-5">
          <div className="text-aura-label text-[8px] text-aura-rose-dim uppercase tracking-wider mb-2">
            The Moment - What Did You See?
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            maxLength={160}
            rows={3}
            placeholder={DEFAULTS.note}
            className="serif italic text-sm text-aura-ink leading-relaxed w-full bg-transparent resize-none outline-none placeholder:text-aura-ink/40"
          />
        </div>
        <button
          type="button"
          onClick={handleSend}
          className="w-full bg-aura-rose text-aura-bg text-center py-3 rounded-full text-aura-label text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors"
        >
          ✦ Give Aura
        </button>
      </div>

      {/* Arrow */}
      <div className="text-center">
        <div
          className={`serif text-4xl sm:text-5xl leading-none rotate-90 md:rotate-0 transition-colors duration-500 ${
            justSent ? "text-aura-rose" : "text-aura-rose-dim"
          }`}
        >
          →
        </div>
        <div className="text-aura-label text-[8px] text-aura-rose-dim uppercase tracking-wider mt-2">
          instantly
        </div>
      </div>

      {/* Receive — reflects last sent snapshot */}
      <div
        className={`bg-aura-surface border rounded-lg p-6 sm:p-8 transition-all duration-500 ${
          justSent
            ? "border-green-700 shadow-lg shadow-green-700/10"
            : "border-aura-surface-deep"
        }`}
      >
        <div className="text-aura-label text-green-700 text-[8px] sm:text-[9px] uppercase tracking-wider mb-6">
          The Receive
        </div>
        <div className="serif text-lg text-aura-ink mb-1">
          {sent.name}&apos;s Journal
        </div>
        <div className="text-xs text-aura-rose-dim mb-6">February 2026</div>
        <div className="bg-aura-bg border border-aura-surface-deep border-l-4 border-l-green-700 rounded-lg p-5 mb-3">
          <span className="text-aura-label text-[8px] text-aura-rose uppercase tracking-wider border border-aura-rose-dim px-2 py-0.5 rounded-full inline-block mb-3">
            {sent.tag}
          </span>
          <p className="serif italic text-base text-aura-ink leading-relaxed mb-3">
            &quot;{sent.note}&quot;
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-aura-rose-dim">
              from You · Just Now
            </span>
            <span className="serif text-2xl text-green-700">
              +{sent.points}
            </span>
          </div>
        </div>
        <div className="bg-aura-bg border border-aura-surface-deep rounded-lg p-4 flex items-center justify-between">
          <div>
            <div className="text-aura-label text-[8px] text-aura-rose-dim uppercase tracking-wider mb-1">
              Monthly aura
            </div>
            <div className="serif text-3xl text-aura-rose">247</div>
          </div>
          <div className="text-right">
            <div className="text-aura-label text-[8px] text-aura-rose-dim uppercase tracking-wider mb-1">
              This moment
            </div>
            <div className="serif text-xl text-green-700">+{sent.points} ✦</div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface LandingPageProps {
  onJoinClick: () => void;
}

export default function LandingPage({ onJoinClick }: LandingPageProps) {
  const [navScrolled, setNavScrolled] = useState(false);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setNavScrolled(e.currentTarget.scrollTop > 6);
  };

  return (
    <div
      className="min-h-screen bg-aura-bg overflow-y-auto"
      onScroll={handleScroll}
    >
      {/* NAV */}
      <nav
        className={`sticky top-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-6 bg-aura-bg/80 backdrop-blur-md transition-all ${
          navScrolled ? "border-b border-aura-surface-deep" : ""
        }`}
      >
        <div className="serif text-xl sm:text-2xl tracking-[0.2em] text-aura-rose">
          SEVI
        </div>
        <div className="hidden sm:flex items-center gap-4 lg:gap-7">
          <a
            href="#how"
            className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider hover:text-aura-rose transition-colors"
          >
            How it works
          </a>
          <a
            href="#philosophy"
            className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider hover:text-aura-rose transition-colors"
          >
            Philosophy
          </a>
          <button
            onClick={onJoinClick}
            className="bg-aura-rose text-aura-bg px-4 sm:px-6 py-2 rounded-full text-aura-label text-[8px] sm:text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors"
          >
            Join Sevi
          </button>
        </div>
        <button
          onClick={onJoinClick}
          className="sm:hidden bg-aura-rose text-aura-bg px-3 py-2 rounded-full text-aura-label text-[8px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors"
        >
          Join
        </button>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 lg:px-12 py-12 sm:py-24 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 sm:w-96 h-64 sm:h-96 bg-aura-rose/5 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <div className="text-aura-label text-aura-rose-dim mb-6 sm:mb-8 tracking-wider uppercase text-[8px] sm:text-[9px]">
            Introducing Sevi · 2026
          </div>

          <h1 className="serif text-4xl sm:text-5xl lg:text-7xl text-aura-rose mb-6 sm:mb-8 leading-tight">
            A journal <em className="italic">other people</em> write about you.
          </h1>

          {/* Give/Receive Pills */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 px-2">
            <div className="bg-aura-surface border border-aura-rose-dim px-4 sm:px-7 py-4 rounded-lg">
              <div className="text-aura-label text-[15px] text-aura-rose uppercase tracking-wider mb-2">
                ✦ Give Aura
              </div>
              <div className="serif text-base sm:text-lg text-aura-rose-dim">
                Notice something real.
                <br />
                Name it. Send it.
              </div>
            </div>
            <div className="hidden sm:flex text-aura-rose-dim text-2xl">⟷</div>
            <div className="bg-aura-surface border border-aura-surface-deep border-l-4 border-l-aura-rose px-4 sm:px-7 py-4 rounded-lg">
              <div className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose uppercase tracking-wider mb-2">
                ✦ Receive Sevi
              </div>
              <div className="serif text-base sm:text-lg text-aura-rose-dim">
                Feel seen. Specifically.
                <br />
                Keep it forever.
              </div>
            </div>
          </div>

          {/* Proof Note */}
          <div className="max-w-md mx-auto bg-aura-surface border border-aura-surface-deep border-l-4 border-l-aura-rose-dim px-5 sm:px-7 py-6 rounded-lg mb-8">
            <p className="serif italic text-lg text-aura-rose-dim mb-4 leading-relaxed">
              "She walked in with that hand chain bracelet over the blue dress
              and suddenly the whole room made sense, like a Bukowski poem in
              motion, I've been thinking about it for three days."
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim flex-wrap">
              <span className="border border-aura-rose-dim px-2 py-1 uppercase">
                Style
              </span>
              <span className="serif text-lg sm:text-xl text-aura-rose">
                50
              </span>
              <span className="ml-auto">From Sierra · this month</span>
            </div>
          </div>

          {/* Clarity Block */}
          <div className="max-w-md mx-auto mb-8 px-2">
            <div className="text-aura-label text-aura-rose-dim mb-4 text-[8px] sm:text-[9px] uppercase tracking-wider">
              What Sevi is
            </div>
            <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed">
              A <span className="font-semibold">private recognition app</span>{" "}
              for your inner circle. Give sevi to the people who move you -
              write exactly what you saw. Receive it from the people who truly
              see you. It stays in their journal{" "}
              <span className="font-semibold">forever.</span>
            </p>
          </div>

          {/* Email Capture */}
          <div className="flex flex-col items-center gap-4 mb-12 px-2">
            <div className="flex flex-col sm:flex-row gap-0 w-full max-w-sm">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-aura-bg border border-aura-surface-deep border-b-0 sm:border-b sm:border-r-0 px-4 sm:px-5 py-3 sm:py-4 text-aura-ink text-sm focus:border-aura-rose outline-none rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
              />
              <button
                onClick={onJoinClick}
                className="bg-aura-rose text-aura-bg px-4 sm:px-6 py-3 sm:py-4 text-aura-label text-[8px] sm:text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors rounded-b-lg sm:rounded-r-lg sm:rounded-b-none"
              >
                Join Sevi
              </button>
            </div>
            <p className="text-aura-label text-[9px] sm:text-[10px] text-aura-rose-dim">
              Inner circle only. Free to join.
            </p>
          </div>
        </motion.div>

        <div className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase animate-bounce">
          Scroll ↓
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section
        id="problem"
        className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-aura-label text-aura-rose-dim mb-8 sm:mb-12 tracking-wider uppercase text-[8px] sm:text-[9px]">
            The Problem
          </div>

          <h2 className="serif text-3xl sm:text-4xl lg:text-5xl text-aura-rose mb-8 sm:mb-16 leading-tight">
            When something genuinely moves you about someone,
            <br />
            you have three options.{" "}
            <em className="italic">None of them are enough.</em>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-16">
            {[
              {
                num: "01",
                title: "Say nothing.",
                desc: "The moment passes unsaid. You meant it. You felt it. But there was nowhere to put it, so it disappears. This is what happens most of the time.",
                verdict: "The most common alternative. And the most costly.",
              },
              {
                num: "02",
                title: "Send a DM.",
                desc: "Too casual for what you actually felt. It disappears into a stream of other messages. There's no structure, no permanence, no weight to it.",
                verdict: "Inadequate for a genuine moment.",
              },
              {
                num: "03",
                title: "Leave a comment.",
                desc: "Public. Performed for an audience. The presence of others changes what you say. Genuine recognition requires privacy, not a stage.",
                verdict: "Performance, not recognition.",
              },
            ].map((alt) => (
              <div
                key={alt.num}
                className="bg-aura-bg border border-aura-surface-deep p-6 sm:p-8 rounded-lg text-left"
              >
                <div className="serif text-4xl sm:text-5xl lg:text-6xl text-aura-surface-deep mb-4">
                  {alt.num}
                </div>
                <h3 className="serif text-xl sm:text-2xl text-aura-rose mb-3">
                  {alt.title}
                </h3>
                <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed mb-4">
                  {alt.desc}
                </p>
                <p className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim border-t border-aura-surface-deep pt-4 mt-4">
                  {alt.verdict}
                </p>
              </div>
            ))}
          </div>

          <p className="serif text-xl sm:text-2xl lg:text-3xl text-aura-rose italic max-w-2xl mx-auto leading-relaxed px-2">
            The most important competitor is silence.
            <br />
            Sevi's job is to replace the unsaid moment.
          </p>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-aura-label text-aura-rose-dim mb-8 sm:mb-12 tracking-wider uppercase text-[8px] sm:text-[9px] text-center">
            How it works
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            {[
              {
                num: "01",
                title: "Notice something.",
                desc: "Something about someone genuinely stands out - their style, something they said, a quality they brought to the room. You feel the impulse to say something.",
              },
              {
                num: "02",
                title: "Write what you saw.",
                desc: "Find them in your inner circle. Add a score, a category, and a note, in your own words. The note is required. The note is the soul of it.",
              },
              {
                num: "03",
                title: "It stays forever.",
                desc: "It becomes part of their journal permanently. The score resets every month. The moments never do.",
              },
            ].map((step) => (
              <div key={step.num} className="text-center">
                <div className="serif text-4xl sm:text-5xl lg:text-6xl text-aura-rose-dim mb-4">
                  {step.num}
                </div>
                <h3 className="serif text-xl sm:text-2xl text-aura-rose mb-4">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY - Glassy and Merged */}
      <section
        id="philosophy"
        className="relative border-t border-aura-surface-deep py-20 sm:py-32 px-4 sm:px-8 lg:px-12 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="text-aura-label text-aura-rose-dim mb-12 tracking-wider uppercase text-[8px] sm:text-[9px] text-center opacity-80">
            What we believe
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-aura-ink/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-3xl shadow-2xl">
            {[
              {
                title: "Presence over performance.",
                desc: "Sevi can only be given in a real-life moment. You have to be there, physically, with someone. There is no feed to scroll. No audience to perform for. The app rewards being present, not curating a persona online.",
              },
              {
                title: "The note is the soul.",
                desc: "Points without a note is just a number. The note is what captures the moment - what you saw, why it moved you, why it mattered. The note is what they'll remember.",
              },
              {
                title: "Recognition without comparison.",
                desc: "No leaderboard. No ranking. No public score. A high score means people around you are paying attention, that's worth celebrating, not competing over.",
              },
              {
                title: "Give to truly receive.",
                desc: "The Month in Moments recap only unlocks if you gave Sevi to at least one person that month. You have to see someone else clearly before you get to see yourself clearly.",
              },
              {
                title: "Inner circle over audience.",
                desc: "Sevi means more when it comes from people who actually know you. Recognition from people who actually see you is categorically different from recognition from strangers.",
                fullWidth: true,
              },
            ].map((belief, i) => (
              <div
                key={i}
                className={`group relative p-8 sm:p-12 bg-aura-ink/40 hover:bg-aura-ink/20 transition-all duration-500 ${belief.fullWidth ? "md:col-span-2" : ""}`}
              >
                {/* Individual hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-aura-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="serif text-xl sm:text-2xl text-white mb-4 relative z-10">
                  {belief.title}
                </h3>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed relative z-10 max-w-prose">
                  {belief.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="serif text-2xl sm:text-4xl lg:text-6xl text-aura-rose mb-6 sm:mb-8 leading-tight">
            Think about the last time someone told you something{" "}
            <em className="italic">specific and true</em> about yourself.
          </h2>

          <p className="serif text-lg sm:text-xl lg:text-2xl text-aura-rose-dim italic mb-4 sm:mb-6 leading-relaxed">
            Not a compliment. Not a like. Something specific. Something true.
          </p>

          <p className="serif text-lg sm:text-xl lg:text-2xl text-aura-rose italic mb-8 sm:mb-12">
            Say it to someone today.
          </p>

          <div className="flex flex-col sm:flex-row gap-0 w-full max-w-sm mx-auto mb-4">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-aura-bg border border-aura-surface-deep border-b-0 sm:border-b sm:border-r-0 px-4 sm:px-5 py-3 sm:py-4 text-aura-ink text-sm focus:border-aura-rose outline-none rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />
            <button
              onClick={onJoinClick}
              className="bg-aura-rose text-aura-bg px-4 sm:px-6 py-3 sm:py-4 text-aura-label text-[8px] sm:text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors rounded-b-lg sm:rounded-r-lg sm:rounded-b-none"
            >
              Join Sevi
            </button>
          </div>

          <p className="text-aura-label text-[9px] sm:text-[10px] text-aura-rose-dim">
            Inner circle only. Free forever for early members.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-aura-surface-deep px-4 sm:px-8 lg:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 text-center sm:text-left">
        <div className="serif text-xl sm:text-2xl tracking-[0.2em] text-aura-rose">
          SEVI
        </div>
        <p className="serif text-base sm:text-lg italic text-aura-rose-dim order-3 sm:order-2 w-full sm:w-auto">
          A journal other people write about you.
        </p>
        <div className="flex gap-4 sm:gap-6 order-2 sm:order-3">
          <a
            href="#"
            className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider hover:text-aura-rose transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider hover:text-aura-rose transition-colors"
          >
            Contact
          </a>
        </div>
      </footer>
    </div>
  );
}

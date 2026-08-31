"use client";

import { useState } from "react";
import { motion } from "motion/react";
import GiveReceivePills from "@/components/ui/GiveReceivePills";
import GiveReceiveDemo from "@/components/ui/GiveReceiveDemo";

interface LandingPageProps {
  onJoinClick: (email: string) => void;
}

export default function LandingPage({ onJoinClick }: LandingPageProps) {
  const [navScrolled, setNavScrolled] = useState(false);
  const [email, setEmail] = useState("");

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
            onClick={() => onJoinClick(email)}
            className="bg-aura-rose text-aura-bg px-4 sm:px-6 py-2 rounded-full text-aura-label text-[8px] sm:text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors"
          >
            Join Sevi
          </button>
        </div>
        <button
          onClick={() => onJoinClick(email)}
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
          <GiveReceivePills />

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
              <span className="ml-auto">From Sierra · This Month</span>
            </div>
          </div>

          {/* Clarity Block */}
          <div className="max-w-md mx-auto mb-8 px-2">
            <div className="text-aura-label text-aura-rose-dim mb-4 text-[8px] sm:text-[9px] uppercase tracking-wider">
              What Sevi is
            </div>
            <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed">
              A <span className="font-semibold">private recognition app</span>{" "}
              for your inner circle. Give aura to the people who move you -
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-aura-bg border border-aura-surface-deep border-b-0 sm:border-b sm:border-r-0 px-4 sm:px-5 py-3 sm:py-4 text-aura-ink text-sm focus:border-aura-rose outline-none rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
              />
              <button
                onClick={() => onJoinClick(email)}
                className="bg-aura-rose text-aura-bg px-4 sm:px-6 py-3 sm:py-4 text-aura-label text-[8px] sm:text-[9px] uppercase tracking-wider hover:bg-aura-rose-dim transition-colors rounded-b-lg sm:rounded-r-lg sm:rounded-b-none"
              >
                Join Sevi
              </button>
            </div>
            <p className="text-aura-label text-[9px] sm:text-[10px] text-aura-rose-dim">
              Inner circle only. Free to join.
            </p>
          </div>

          {/* Identity Narrative */}
          <div className="w-px h-16 bg-gradient-to-b from-aura-rose-dim to-transparent mx-auto mb-12" />

          <div className="max-w-2xl mx-auto text-left">
            <div className="text-aura-label text-aura-rose-dim mb-6 text-[8px] sm:text-[9px] uppercase tracking-wider">
              For the people who notice more than they say
            </div>
            <div className="serif text-lg sm:text-xl text-aura-ink leading-relaxed space-y-5">
              <p>There is a type of person who notices more than they say.</p>
              <p>
                They feel something specific when a friend walks into a room
                wearing exactly the right thing. They are still thinking about
                something someone said three days ago in a conversation that
                everyone else has forgotten.
              </p>
              <p>
                They notice the bracelet. They hear the thing beneath the thing.
                They are moved quietly, specifically, genuinely and then the
                moment passes and they say nothing. Not because they didn't mean
                it. Because there was{" "}
                <em className="text-aura-rose italic">nowhere to put it.</em>
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-aura-surface-deep flex items-center justify-between">
              <span className="serif italic text-base text-aura-rose">
                This is for the Noticer.
              </span>
              <span className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider">
                Sevi · 2026
              </span>
            </div>
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

      {/* THE GIVE */}
      <section className="border-t border-aura-surface-deep bg-aura-surface py-12 sm:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-aura-label text-aura-rose-dim mb-8 sm:mb-16 tracking-wider uppercase text-[8px] sm:text-[9px]">
            The Give
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] gap-10 md:gap-16 items-start">
            {/* Giver */}
            <div>
              <h3 className="serif text-2xl sm:text-3xl lg:text-4xl text-aura-rose mb-6 sm:mb-8 leading-tight">
                Most people notice.
                <br />
                Almost nobody
                <br />
                <em className="italic">says anything.</em>
              </h3>
              <div className="text-sm text-aura-rose-dim leading-loose space-y-4">
                <p>Giving aura is a decision.</p>
                <p>
                  Not a tap. Not a reaction. A deliberate act that says: I was
                  paying attention. This moment was real. And you deserved to
                  know it.
                </p>
                <p>
                  You open Sevi. You find them. You pick a number - not
                  casually, but honestly. How much did this actually move you?
                  You pick the category. And then you write the note.
                </p>
                <p>
                  The note is the part that takes courage. Because it requires
                  you to be specific. Not "you looked great", but why. Not "that
                  was smart", but what exactly you saw. Specificity is the proof
                  that you actually noticed. Anyone can give a compliment. Only
                  someone who was truly paying attention can give aura.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block bg-aura-surface-deep w-px h-full min-h-[300px]" />

            {/* Receiver */}
            <div>
              <h3 className="serif text-xl sm:text-2xl text-aura-rose-dim italic mb-6 sm:mb-8 leading-snug">
                What it feels like
                <br />
                to receive one.
              </h3>
              <div className="text-sm text-aura-rose-dim leading-loose space-y-4">
                <p>It arrives without warning.</p>
                <p>
                  No context. No preamble. Just: someone was thinking about you.
                  Someone noticed something specific. Someone took the time to
                  name it, score it, and send it; just for you.
                </p>
                <p>
                  You will read it three times. You will screenshot it. You will
                  think about it for days. Not because it was a compliment, but
                  because it wastrue. Because someone saw something in you that
                  you maybe didn't even know was visible.
                </p>
                <p>That feeling has a name now.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-aura-surface-deep">
                <span className="serif text-2xl sm:text-3xl italic text-aura-rose">
                  That's aura.
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 sm:mt-20 pt-10 sm:pt-14 border-t border-aura-surface-deep">
            <p className="serif text-lg sm:text-2xl italic text-aura-ink">
              And then you send it. And something shifts.
            </p>
          </div>
        </div>
      </section>

      {/* DIFFERENTIATION */}
      <section className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-aura-label text-aura-rose-dim mb-8 sm:mb-12 tracking-wider uppercase text-[8px] sm:text-[9px]">
            What This Is Not
          </div>
          <h2 className="serif text-3xl sm:text-5xl lg:text-6xl text-aura-rose mb-6 sm:mb-8 leading-tight">
            This is not social media.
          </h2>
          <div className="flex justify-center gap-5 sm:gap-10 flex-wrap mb-6 sm:mb-8">
            {["No posts", "No followers", "No feeds", "No performance"].map(
              (t) => (
                <span
                  key={t}
                  className="text-aura-label text-[9px] sm:text-[10px] text-aura-rose-dim uppercase tracking-wider line-through"
                >
                  {t}
                </span>
              ),
            )}
          </div>
          <p className="serif text-xl sm:text-2xl lg:text-3xl text-aura-ink italic">
            Just one person noticing another and writing it down.
          </p>
        </div>
      </section>

      {/* THE EXCHANGE */}
      <section className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-aura-label text-aura-rose-dim mb-8 tracking-wider uppercase text-[8px] sm:text-[9px]">
            The Exchange
          </div>
          <h2 className="serif text-3xl sm:text-4xl lg:text-5xl text-aura-rose mb-4 leading-tight">
            One gives.
            <br />
            One receives.
            <br />
            Both remember.
          </h2>
          <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed mb-10 sm:mb-16">
            When someone gives you aura, you feel it instantly. A score, a
            category, and a note written just for you. Not a like. Not a
            notification. Something that lasts.
          </p>

          <GiveReceiveDemo />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-aura-surface-deep border border-aura-surface-deep rounded-3xl overflow-hidden shadow-sm">
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
                title: "Give to truly receive.",
                desc: "The Month in Moments recap only unlocks if you gave Sevi to at least one person that month. You have to see someone else clearly before you get to see yourself clearly.",
              },
              {
                title: "Inner circle over audience.",
                desc: "Sevi means more when it comes from people who actually know you. Recognition from people who actually see you is categorically different from recognition from strangers.",
              },
            ].map((belief, i) => (
              <div
                key={i}
                className="group relative p-8 sm:p-12 bg-aura-surface hover:bg-aura-bg transition-all duration-500"
              >
                {/* Individual hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-aura-rose/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <h3 className="serif text-xl sm:text-2xl text-aura-rose mb-4 relative z-10">
                  {belief.title}
                </h3>
                <p className="text-sm sm:text-base text-aura-rose-dim leading-relaxed relative z-10 max-w-prose">
                  {belief.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-aura-label text-aura-rose-dim mb-8 tracking-wider uppercase text-[8px] sm:text-[9px]">
            What Kind Of Moment Was It?
          </div>
          <h2 className="serif text-2xl sm:text-3xl lg:text-4xl text-aura-rose mb-10 sm:mb-14 leading-tight">
            Five ways to recognize someone.
            <br />
            <em className="italic">Everyone's aura is different.</em>
          </h2>
          <div className="flex flex-wrap justify-center border-t border-b border-aura-surface-deep mb-10 sm:mb-14">
            {[
              { name: "Style", feel: "what they chose to show the world" },
              { name: "Wit", feel: "the flash that cuts through a room" },
              {
                name: "Depth",
                feel: "the thing that made the room go quiet",
              },
              { name: "Vibe", feel: "what they radiate without trying" },
              {
                name: "Taste",
                feel: "the confidence of knowing without announcing",
              },
            ].map((cat, i) => (
              <div
                key={cat.name}
                className={`flex-1 min-w-[140px] py-8 sm:py-11 px-4 hover:bg-aura-surface transition-colors ${
                  i !== 0 ? "border-l border-aura-surface-deep" : ""
                }`}
              >
                <div className="serif text-xl sm:text-2xl text-aura-ink mb-2">
                  {cat.name}
                </div>
                <div className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider">
                  {cat.feel}
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-aura-rose-dim leading-relaxed max-w-lg mx-auto">
            Every entry is tagged with one of these. Over time, the category you
            receive most becomes a quiet portrait of who you are, as seen by the
            people who were actually there.
          </p>
        </div>
      </section>

      {/* REAL NOTES */}
      <section className="border-t border-aura-surface-deep py-12 sm:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <p className="serif text-2xl sm:text-4xl text-aura-rose mb-10 sm:mb-16 leading-snug max-w-xl">
            This is what it sounds like
            <br />
            when someone really notices you.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              {
                text: "the way you walked in with that hand chain bracelet over the blue dress - the whole room made sense. i've been thinking about it for three days.",
                cat: "Style",
                pts: 50,
              },
              {
                text: "you said one thing mid-conversation and i haven't stopped thinking about it. you changed how i see the whole problem.",
                cat: "Depth",
                pts: 75,
              },
              {
                text: "i don't know how you do it but you walked into a room full of strangers and within ten minutes everyone was talking to each other.",
                cat: "Vibe",
                pts: 80,
              },
              {
                text: "that reference you dropped, nobody else in the room would have made that connection. that's the thing i love about your mind.",
                cat: "Wit",
                pts: 60,
              },
            ].map((note, i) => (
              <div
                key={i}
                className="bg-aura-surface border border-aura-surface-deep border-l-4 border-l-aura-rose-dim hover:border-l-aura-rose hover:-translate-y-1 transition-all rounded-lg p-6 sm:p-8"
              >
                <p className="serif italic text-lg sm:text-xl text-aura-ink leading-relaxed mb-5">
                  "{note.text}"
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-aura-label text-[8px] text-aura-rose uppercase tracking-wider border border-aura-rose-dim px-2.5 py-1 rounded-full">
                    {note.cat}
                  </span>
                  <span className="serif text-2xl text-aura-rose-dim">
                    +{note.pts}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THE JOURNAL */}
      <section className="border-t border-b border-aura-surface-deep bg-aura-surface py-12 sm:py-24 px-4 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div>
            <div className="text-aura-label text-aura-rose-dim mb-6 tracking-wider uppercase text-[8px] sm:text-[9px]">
              The Journal
            </div>
            <h2 className="serif text-3xl sm:text-4xl lg:text-5xl text-aura-rose mb-5 leading-tight">
              The score resets.
              <br />
              <em className="italic">The moments stay.</em>
            </h2>
            <p className="text-sm text-aura-rose-dim leading-loose">
              Every month is a fresh page. But the notes people wrote about you
              live in your journal forever. An archive of every moment someone
              looked at you and thought: that's worth remembering.
              <br />
              <br />
              At the end of each month, before the reset, you receive your{" "}
              <span className="font-semibold">Month in Moments</span>, a recap
              of every time you were recognised. Every note. Every person. Every
              category.
              <br />
              <br />
              There's a catch.{" "}
              <span className="text-aura-rose">
                You have to give aura to at least one person first.
              </span>{" "}
              You have to see someone else clearly before you get to see
              yourself clearly.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <div className="text-aura-label text-aura-rose-dim text-[8px] sm:text-[9px] uppercase tracking-wider mb-1">
              Your journal · February 2026
            </div>
            {[
              {
                date: "February 14",
                note: "the way you held that room without trying to - i've been thinking about it for three days",
                cat: "Vibe",
                pts: 80,
              },
              {
                date: "February 9",
                note: "you said one thing and suddenly everything made sense",
                cat: "Depth",
                pts: 75,
              },
              {
                date: "February 3",
                note: "that bracelet over the blue dress - the whole room made sense",
                cat: "Style",
                pts: 50,
              },
            ].map((entry, i) => (
              <div
                key={i}
                className="bg-aura-bg border border-aura-surface-deep border-l-4 border-l-aura-rose-dim hover:border-l-aura-rose transition-colors rounded-lg px-5 py-4"
              >
                <div className="text-aura-label text-[8px] text-aura-rose-dim uppercase tracking-wider mb-2">
                  {entry.date}
                </div>
                <p className="serif italic text-base text-aura-ink leading-relaxed mb-2">
                  "{entry.note}"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-aura-label text-[8px] text-aura-rose uppercase tracking-wider border border-aura-rose-dim px-2 py-0.5 rounded-full">
                    {entry.cat}
                  </span>
                  <span className="serif text-xl text-aura-rose-dim">
                    +{entry.pts}
                  </span>
                </div>
              </div>
            ))}
            <div className="bg-aura-surface-deep rounded-lg py-4 text-center mt-1">
              <span className="serif italic text-sm text-aura-rose-dim">
                3 Moments this Month · 205 Aura
              </span>
            </div>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-aura-bg border border-aura-surface-deep border-b-0 sm:border-b sm:border-r-0 px-4 sm:px-5 py-3 sm:py-4 text-aura-ink text-sm focus:border-aura-rose outline-none rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />
            <button
              onClick={() => onJoinClick(email)}
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
          <a
            href="https://instagram.com/_thesevi"
            className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose-dim uppercase tracking-wider hover:text-aura-rose transition-colors"
          >
            @_thesevi
          </a>
        </div>
      </footer>
    </div>
  );
}

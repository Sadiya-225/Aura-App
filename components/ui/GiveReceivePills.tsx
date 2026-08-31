"use client";

import { motion, useMotionValue, useTransform } from "motion/react";

const DRAG_TRANSITION = { bounceStiffness: 380, bounceDamping: 14 };

export default function GiveReceivePills() {
  const p1x = useMotionValue(0);
  const p1y = useMotionValue(0);
  const p2x = useMotionValue(0);
  const p2y = useMotionValue(0);

  // Whichever pill is pulled further stretches the arrow toward it and
  // tilts it, like a rubber band under tension. Snaps back in sync with the
  // pill once released, since dragSnapToOrigin animates the same motion
  // values these transforms read from.
  const arrowScaleX = useTransform(
    [p1x, p1y, p2x, p2y],
    ([x1, y1, x2, y2]: number[]) => {
      const d1 = Math.hypot(x1, y1);
      const d2 = Math.hypot(x2, y2);
      return 1 + Math.min(Math.max(d1, d2) / 120, 0.7);
    },
  );

  const arrowRotate = useTransform(
    [p1x, p2x],
    ([x1, x2]: number[]) => {
      const pull = x1 !== 0 ? -x1 : x2;
      return Math.max(-20, Math.min(20, pull * 0.08));
    },
  );

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-2">
      <motion.div
        drag
        dragElastic={0.6}
        dragSnapToOrigin
        dragTransition={DRAG_TRANSITION}
        style={{ x: p1x, y: p1y }}
        whileDrag={{ scale: 1.05 }}
        className="bg-aura-surface border border-aura-surface-deep border-l-4 border-l-aura-rose px-4 sm:px-7 py-4 rounded-lg cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <div className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose uppercase tracking-wider mb-2">
          ✦ Give Aura
        </div>
        <div className="serif text-base sm:text-lg text-aura-rose-dim">
          Notice something real.
          <br />
          Name it. Send it.
        </div>
      </motion.div>

      <motion.div
        style={{ scaleX: arrowScaleX, rotate: arrowRotate }}
        className="hidden sm:flex text-aura-rose-dim text-2xl"
      >
        ⟷
      </motion.div>

      <motion.div
        drag
        dragElastic={0.6}
        dragSnapToOrigin
        dragTransition={DRAG_TRANSITION}
        style={{ x: p2x, y: p2y }}
        whileDrag={{ scale: 1.05 }}
        className="bg-aura-surface border border-aura-surface-deep border-l-4 border-l-aura-rose px-4 sm:px-7 py-4 rounded-lg cursor-grab active:cursor-grabbing touch-none select-none"
      >
        <div className="text-aura-label text-[8px] sm:text-[9px] text-aura-rose uppercase tracking-wider mb-2">
          ✦ Receive Sevi
        </div>
        <div className="serif text-base sm:text-lg text-aura-rose-dim">
          Feel seen. Specifically.
          <br />
          Keep it forever.
        </div>
      </motion.div>
    </div>
  );
}

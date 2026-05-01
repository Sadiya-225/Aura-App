"use client";

import React from "react";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { motion } from "motion/react";

interface AppShellProps {
  children: React.ReactNode;
  activeTab: "home" | "friends" | "profile" | "archive";
  setActiveTab: (tab: "home" | "friends" | "profile" | "archive") => void;
}

export default function AppShell({
  children,
  activeTab,
  setActiveTab,
}: AppShellProps) {
  const { profile } = useAuth();

  return (
    <div className="max-w-[680px] mx-auto min-h-screen flex flex-col relative pb-28">
      {/* Top Nav */}
      <nav className="sticky top-0 z-50 bg-aura-bg/80 backdrop-blur-md border-b border-aura-surface px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => setActiveTab("home")}
          className="serif text-2xl tracking-widest text-aura-rose hover:opacity-80 transition-opacity"
        >
          SEVI
        </button>

        <div className="flex items-center gap-4">
          <div className="text-aura-label text-aura-rose-dim">
            {profile?.seviId}
          </div>

          <button
            onClick={() => signOut(auth)}
            className="text-aura-label hover:text-aura-rose transition-colors"
          >
            Out
          </button>
        </div>
      </nav>

      {/* Content */}
      <main className="flex-1 px-6 py-8">{children}</main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-6 pb-[env(safe-area-inset-bottom)]">
        <div className="w-full max-w-[680px] h-20 rounded-2xl border border-aura-surface bg-aura-bg/80 backdrop-blur-xl shadow-xl flex items-center justify-around">
          <TabButton
            active={activeTab === "home"}
            onClick={() => setActiveTab("home")}
            icon="✦"
            label="Home"
          />

          <TabButton
            active={activeTab === "friends"}
            onClick={() => setActiveTab("friends")}
            icon="◎"
            label="Circle"
          />

          <TabButton
            active={activeTab === "archive"}
            onClick={() => setActiveTab("archive")}
            icon="◈"
            label="Archive"
          />

          <TabButton
            active={activeTab === "profile"}
            onClick={() => setActiveTab("profile")}
            icon="○"
            label="Profile"
          />
        </div>
      </nav>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  const iconSize = label === "Home" ? "text-xl" : "text-2xl";

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        active ? "text-aura-rose" : "text-aura-rose-dim"
      }`}
    >
      <motion.span
        animate={{ y: active ? -2 : 0 }}
        className={`${iconSize} leading-none`}
      >
        {icon}
      </motion.span>

      <span className="text-aura-label text-[8px]">{label}</span>
    </button>
  );
}

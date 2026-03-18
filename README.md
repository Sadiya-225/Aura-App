# Aura App

### *"A journal other people write about you."*

[View Live Demo](https://Aura-app-demo.vercel.app/) | [View Source](https://github.com/Sadiya-125/Aura-App) |[AI Studio Project URL](https://ai.studio/apps/35463939-8f5f-47fd-85b4-f225b02c20df)

---

## Quickstart

```bash
git clone https://github.com/Sadiya-125/Aura-App.git
cd Aura-App
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## What is Aura?

Aura is a private recognition journal for close relationships. When someone in your inner circle does something that genuinely moves, impresses, or surprises you - you open the app and record it.

Every entry has three parts:
- **Points** (1-100) - whatever feels right for the moment
- **Category** - the kind of thing you witnessed
- **Note** - your own words describing exactly what you saw

The note is the soul of every entry. Without it, the number means nothing. With it, the number becomes a timestamp on a memory.

### The Five Categories

| Category | What it captures |
|----------|-----------------|
| **Style** | The way they showed up physically - clothes, posture, presence |
| **Wit** | Something sharp, funny, or unexpected they said |
| **Depth** | Something unexpectedly profound that shifts your thinking |
| **Vibe** | The energy they brought - the room changed because of them |
| **Taste** | A choice that revealed how they see the world |

### Core Principles

- **Private only** - Scores visible only to giver and receiver
- **No comparisons** - No leaderboards, no feeds, no algorithms
- **Monthly reset** - Scores reset each month; entries never delete
- **Inner circle** - Friends added by Aura-ID or QR code
- **Real moments** - The trigger is always physical and present

---

## Tech Stack

### Frontend
- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS 4** with CSS custom properties
- **Framer Motion** for animations
- **Lucide React** for icons
- **qrcode.react** for QR code generation

### Backend
- **Firebase Auth** for authentication
- **Firestore** for database with security rules
- **Realtime** via `onSnapshot` subscriptions

### Dependencies

```json
{
  "next": "^15.4.9",
  "react": "^19.2.1",
  "firebase": "^12.10.0",
  "motion": "^12.38.0",
  "lucide-react": "^0.553.0",
  "tailwindcss": "4.1.11"
}
```

---

## Database Schema

### Collections

**users**
```
uid (doc id)
├── displayName: string
├── AuraId: string (unique, e.g., "Aura-K7PQ")
├── avatar: string (emoji)
├── bio: string
└── createdAt: timestamp
```

**friendships** (directional)
```
├── userId: string
├── friendId: string
└── createdAt: timestamp
```

**Aura_entries**
```
├── fromUserId: string
├── toUserId: string
├── points: number (1-100)
├── category: "Style" | "Wit" | "Depth" | "Vibe" | "Taste"
├── note: string
├── createdAt: timestamp
├── month: string (YYYY-MM)
└── year: number
```

### Score Computation

Scores are **never stored** - always computed dynamically:
- **Monthly:** Sum where `toUserId == uid && month == currentMonth`
- **Yearly:** Sum where `toUserId == uid && year == currentYear`
- **All-time:** Sum where `toUserId == uid`

### Security Rules

- Users can read all profiles, write only their own
- Friendships readable/creatable by the initiating user
- Entries readable by sender or receiver, creatable by sender only

See [firestore.rules](firestore.rules) for full implementation.

---

## Project Structure

```
app/
├── layout.tsx          # Root layout (fonts, theme)
├── page.tsx            # Auth guard → Landing or MainApp
└── globals.css         # Design system variables

components/
├── layout/
│   └── AppShell.tsx    # Navigation shell
├── modals/
│   ├── GivePickerModal.tsx
│   ├── GiveAuraModal.tsx
│   ├── FriendProfileModal.tsx
│   └── EmojiPickerModal.tsx
├── screens/
│   ├── Home.tsx
│   ├── Profile.tsx
│   └── Friends.tsx
└── ui/
    ├── AuraEntry.tsx
    ├── AuraOrb.tsx
    └── ...

context/
├── AuthContext.tsx     # User profile state
└── AuraContext.tsx     # Entries state

lib/
├── Aura.ts             # Aura-ID generation
└── utils.ts            # Helpers
```

---

## Design System

### Aesthetic

Literary journal - cream paper, rose ink, generous whitespace. Like a beautifully printed object, not a rendered screen.

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--color-Aura-bg` | `#fdf8f4` | Background (warm paper white) |
| `--color-Aura-ink` | `#1a1010` | Primary text |
| `--color-Aura-rose` | `#7a5a5a` | Accent (logo, scores, active states) |
| `--color-surface` | `#f5ede6` | Cards and elevated elements |
| `--color-sent` | `#3a6a3a` | Sent entry accent (sage green) |

### Typography

| Font | Usage |
|------|-------|
| **Cormorant Garamond** | Headings, scores, entry notes (italic with quotation marks) |
| **DM Mono** | Labels, metadata, navigation (all-caps, 0.4em letter-spacing) |

### Key Components

- **Aura Orb:** 240px pulsing circle with 80px score, rose glow animation
- **AuraEntry:** Surface card with colored left border, quoted note in italic
- **Navigation:** Sticky top bar, frosted bottom tabs (✦/◎/○)

---

## Demo Accounts

| Email | Password | Name | Aura-ID | Avatar |
|-------|----------|------|---------|--------|
| priya@demo.com | demo123 | Priya | Aura-PRIY | 🌙 |
| rohan@demo.com | demo123 | Rohan | Aura-ROHI | 🎸 |

---

## Commands

```bash
npm run dev      # Development server (localhost:3000)
npm run build    # Production build (.next/standalone)
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## The Soul of Aura

> The note text inside every Aura entry must feel like finding a handwritten note left for you by someone who saw you clearly.

The score resets every month. The moments never do.
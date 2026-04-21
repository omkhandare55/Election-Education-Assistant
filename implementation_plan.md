# Election Education Assistant — Implementation Plan

## Goal

Build a **portfolio-ready**, interactive Election Education Assistant with a premium WhatsApp-style chat UI, interactive quick-reply buttons, and a dynamic timeline visualization of the election process.

---

## Architecture Decision

> [!IMPORTANT]
> **Single Next.js App** — Using Next.js App Router for both frontend and backend (API Routes). This eliminates the need for a separate Express server, simplifies deployment (single Vercel deploy), and keeps the project clean.

### Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 15 (App Router)** | Full-stack, SSR, API routes |
| Styling | **Tailwind CSS v4** | Per user request, rapid premium UI |
| State | **React Context + useReducer** | Lightweight, no extra dependency |
| AI | **OpenAI API (GPT-4o-mini)** | Cost-effective, streaming support |
| Fonts | **Google Fonts (Inter)** | Modern, clean typography |
| Animations | **CSS + Framer Motion** | Smooth micro-interactions |
| Deployment | **Vercel** | Zero-config Next.js hosting |

---

## User Review Required

> [!WARNING]
> **OpenAI API Key Required** — The AI chat feature requires an OpenAI API key. For the MVP, I'll build a **fully functional static response mode** that works without an API key, plus an AI mode that activates when the key is provided via `.env.local`. This means **you can demo the app immediately** without any API key.

> [!IMPORTANT]
> **No Database for MVP** — Chat history will be session-based (in-memory). Database integration (MongoDB/Firebase) can be added in Phase 4 as described in your roadmap.

---

## Proposed Changes

### 1. Project Scaffolding

#### [NEW] Next.js project initialization
- `npx -y create-next-app@latest ./` with App Router, Tailwind CSS, TypeScript
- Configure fonts (Inter from Google Fonts)
- Set up project structure

---

### 2. Design System & Global Styles

#### [NEW] [globals.css](file:///d:/Election%20Education%20Assistant/src/app/globals.css)
- CSS custom properties for the color palette (dark WhatsApp-inspired theme)
- Chat bubble styles, animations, scrollbar customization
- Responsive breakpoints

#### Color Palette (WhatsApp-Dark inspired with election theme)
```
Background:     #0b141a (deep dark)
Chat BG:        #0d1b2a (slightly lighter)
User Bubble:    #005c4b (teal-green)
Bot Bubble:     #1e293b (slate)
Accent:         #6366f1 (indigo for buttons/highlights)
Timeline:       Linear gradient (indigo → emerald)
Text Primary:   #e2e8f0
Text Secondary: #94a3b8
```

---

### 3. Core Components

#### [NEW] [ChatBubble.jsx](file:///d:/Election%20Education%20Assistant/src/components/ChatBubble.jsx)
- Left-aligned (assistant) and right-aligned (user) bubbles
- Avatar for assistant (🗳️ emoji or icon)
- Timestamp display
- Entrance animation (slide-in + fade)
- Support for markdown-like formatting in messages

#### [NEW] [TypingIndicator.jsx](file:///d:/Election%20Education%20Assistant/src/components/TypingIndicator.jsx)
- WhatsApp-style 3-dot bouncing animation
- Shows when assistant is "thinking"

#### [NEW] [QuickReplyButtons.jsx](file:///d:/Election%20Education%20Assistant/src/components/QuickReplyButtons.jsx)
- Renders A/B/C style option buttons
- Glassmorphism design with hover effects
- Click sends the option as a user message
- Disappears after selection (like WhatsApp)

#### [NEW] [Timeline.jsx](file:///d:/Election%20Education%20Assistant/src/components/Timeline.jsx)
- Horizontal scrollable timeline (desktop) / Vertical (mobile)
- Steps: Registration → Nomination → Campaign → Voting → Results
- Active step indicator with pulse animation
- Gradient connector lines
- Click on step to learn more about it

#### [NEW] [ChatInput.jsx](file:///d:/Election%20Education%20Assistant/src/components/ChatInput.jsx)
- WhatsApp-style input bar with send button
- Mic icon placeholder (future voice feature)
- Auto-resize textarea

#### [NEW] [Header.jsx](file:///d:/Election%20Education%20Assistant/src/components/Header.jsx)
- WhatsApp-style header with assistant avatar, name, online status
- "Election Education Assistant" title
- Settings/info icon

---

### 4. Chat Logic & State Management

#### [NEW] [ChatContext.jsx](file:///d:/Election%20Education%20Assistant/src/context/ChatContext.jsx)
- React Context with useReducer
- Actions: ADD_MESSAGE, SET_TYPING, SET_OPTIONS, CLEAR_OPTIONS
- Message schema: `{ id, role, content, timestamp, options? }`

#### [NEW] [chatEngine.js](file:///d:/Election%20Education%20Assistant/src/lib/chatEngine.js)
- Static response engine (works without API key)
- Decision tree for election education flow:
  1. Welcome → Ask level (Beginner/Intermediate)
  2. Ask country focus
  3. Start guided learning with topics
  4. Each topic offers: Basics / Example / Timeline
- Handles button option routing

---

### 5. AI Integration (API Route)

#### [NEW] [route.js](file:///d:/Election%20Education%20Assistant/src/app/api/chat/route.js)
- POST endpoint accepting `{ messages, userLevel, country }`
- System prompt with the election education master prompt
- Streaming response support via ReadableStream
- Fallback to static engine if no API key configured
- Rate limiting (basic)

---

### 6. Main Page

#### [MODIFY] [page.jsx](file:///d:/Election%20Education%20Assistant/src/app/page.jsx)
- Full-screen WhatsApp-style layout
- Chat area with scrollable messages
- Fixed header and input bar
- Timeline component (collapsible panel or triggered by chat)
- Welcome screen with onboarding flow

---

### 7. Assets & Metadata

#### [MODIFY] [layout.jsx](file:///d:/Election%20Education%20Assistant/src/app/layout.jsx)
- SEO metadata (title, description, OG tags)
- Inter font from Google Fonts
- Dark theme body styling

---

## Folder Structure

```
d:\Election Education Assistant\
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.js          # AI chat endpoint
│   │   ├── globals.css               # Design system
│   │   ├── layout.jsx                # Root layout + metadata
│   │   └── page.jsx                  # Main chat page
│   ├── components/
│   │   ├── ChatBubble.jsx
│   │   ├── ChatInput.jsx
│   │   ├── Header.jsx
│   │   ├── QuickReplyButtons.jsx
│   │   ├── Timeline.jsx
│   │   └── TypingIndicator.jsx
│   ├── context/
│   │   └── ChatContext.jsx           # State management
│   └── lib/
│       └── chatEngine.js             # Static response logic
├── public/
│   └── favicon.ico
├── .env.local                        # OPENAI_API_KEY (optional)
├── package.json
├── tailwind.config.js
└── next.config.js
```

---

## Key UX Details

### WhatsApp Authenticity
- **Message grouping** — consecutive same-sender messages have reduced spacing
- **Tail on bubbles** — CSS triangle on first message in a group
- **Seen ticks** — double blue checkmark on user messages
- **Wallpaper pattern** — subtle doodle pattern on chat background (election-themed)
- **Smooth scroll** — auto-scroll to latest message with smooth behavior

### Premium Polish
- **Glassmorphism** on buttons and timeline cards
- **Gradient accents** on active elements
- **Staggered animations** on button groups
- **Skeleton loading** states
- **Responsive** — mobile-first, looks great on all screens

---

## Open Questions

> [!IMPORTANT]
> 1. **Do you have an OpenAI API key?** The app will work fully without one (using smart static responses), but AI mode enables dynamic conversations. I can add the integration either way.
> 2. **Country focus?** Should the election process default to **India** (Lok Sabha elections), or should it be configurable? This affects the static content and timeline data.
> 3. **TypeScript or JavaScript?** Next.js supports both. I'll use **JavaScript (JSX)** for faster development unless you prefer TypeScript.

---

## Verification Plan

### Automated Tests
- `npm run build` — Ensure production build succeeds
- `npm run dev` — Verify dev server runs without errors

### Manual Verification (Browser)
- Full chat flow: Welcome → Level selection → Topic exploration
- Button interactions work and route correctly
- Timeline renders and is interactive
- Typing indicator shows during AI responses
- Mobile responsiveness (viewport resizing)
- Smooth animations and transitions
- Dark theme consistency

---

## Development Phases

| Phase | Scope | Time |
|-------|-------|------|
| **Phase 1** | Project setup, Chat UI, Static responses, Buttons | First build |
| **Phase 2** | AI API route, OpenAI integration, Streaming | After API key |
| **Phase 3** | Timeline, Animations, UX polish | Enhancement |
| **Phase 4** | Database, Session persistence | Future |
| **Phase 5** | Deployment to Vercel | When ready |

I will implement **Phases 1 + 3** in this session (full working UI with static AI + timeline), making it demo-ready immediately.

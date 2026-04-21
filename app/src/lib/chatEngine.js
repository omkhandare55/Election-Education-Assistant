/**
 * chatEngine.js
 * Static/rule-based election education response engine.
 * Works fully offline — no API key required.
 * Falls back to this when OpenAI/Grok is unavailable.
 */

/* ─── Timeline Data ─────────────────────────────────────────── */
export const ELECTION_TIMELINE = [
  {
    id: "registration",
    icon: "1",
    label: "Voter\nRegistration",
    color: "#6366f1",
    date: "6 months before",
    description:
      "Citizens enroll in the Electoral Roll (voter list) using Form 6. You must be 18+ years old and an Indian citizen.",
    fact: "India has over 96 crore registered voters — the largest electorate in the world!",
  },
  {
    id: "nomination",
    icon: "2",
    label: "Nomination\n& Filing",
    color: "#8b5cf6",
    date: "4 weeks before",
    description:
      "Candidates file their nomination papers, pay a security deposit, and submit their affidavits to the Returning Officer.",
    fact: "A Lok Sabha candidate must deposit ₹25,000 (₹12,500 for SC/ST). It's forfeited if they get less than 1/6th of votes.",
  },
  {
    id: "campaign",
    icon: "3",
    label: "Campaign\nPeriod",
    color: "#06b6d4",
    date: "2 weeks before",
    description:
      "Candidates and parties campaign actively. The Model Code of Conduct (MCC) by ECI governs all behaviour during this period.",
    fact: '"Silent Period" — No campaigning is allowed 48 hours before voting day!',
  },
  {
    id: "voting",
    icon: "4",
    label: "Voting\nDay",
    color: "#10b981",
    date: "Election Day",
    description:
      "Citizens vote using Electronic Voting Machines (EVMs). A VVPAT slip is generated for transparency. Voting is secret and free.",
    fact: "India invented the world's largest EVM-based election. Each machine can record up to 2,000 votes.",
  },
  {
    id: "results",
    icon: "5",
    label: "Results\n& Oath",
    color: "#f59e0b",
    date: "Count Day",
    description:
      "Votes are counted, results announced. The winning candidate takes an oath before the Speaker/President to begin their term.",
    fact: "EVM results are typically declared within 1 day — paper ballots used to take weeks!",
  },
];

/* ─── Topics Database ────────────────────────────────────────── */
const TOPICS = {
  basics: {
    title: "Election Basics",
    content: `India is the world's largest democracy! Here's how the Lok Sabha election works:

**What is Lok Sabha?**
The Lok Sabha (House of the People) has **543 seats**. Citizens directly vote for their local Member of Parliament (MP).

**Constituencies**
India is divided into 543 Parliamentary Constituencies. Each elects ONE MP.

**How often?**
General elections happen every **5 years**, unless the government dissolves the house earlier.

**Key Bodies**
The **Election Commission of India (ECI)** is an independent body that runs the entire election process — from schedules to results.`,
    options: [
      { label: "Deep Dive", value: "deep_dive" },
      { label: "Real Example", value: "real_example" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  deep_dive: {
    title: "Deep Dive — How Voting Works",
    content: `Let's go deeper! Here's how election day actually works:

**Electronic Voting Machine (EVM)**
- A 2-unit system: Control Unit (with polling officer) + Ballot Unit (with voter)
- Voter presses the button next to their candidate
- A beep confirms the vote

**VVPAT — Your Vote Receipt**
Voter Verified Paper Audit Trail shows a **paper slip** for 7 seconds, lets you verify your vote was recorded correctly.

**Secret Ballot**
No one can see who you voted for. The booth is private.

**What you need**
Voter ID card (EPIC) or any of 12 alternate documents like Aadhaar, Passport, NREGA card.

**Timing**
Polls open at **7:00 AM** and close at **6:00 PM** (may vary by state).`,
    options: [
      { label: "Real Example", value: "real_example" },
      { label: "EVM vs Paper", value: "evm_paper" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  real_example: {
    title: "Real Example — 2024 Lok Sabha Election",
    content: `Let's look at the **2024 Indian General Election** (18th Lok Sabha):

**By the Numbers**
- 7 phases of voting (Apr 19 – Jun 1, 2024)
- 96.8 crore registered voters
- 10.5 lakh polling stations set up
- 543 seats contested
- NDA won 293 seats; BJP alone won 240 seats

**Phase System**
Because India is so large, elections happen in **7 phases** across different states. This ensures security forces can be deployed effectively.

**Example Constituency**
In **Mumbai North**, candidates from BJP, Congress, AAP, and independents all competed. The ECI published real-time turnout data online!

**Voter Helpline**
ECI's **1950 helpline** and Voter Helpline App helped crores of voters find their booth and check registration.`,
    options: [
      { label: "Back to Basics", value: "basics" },
      { label: "Deep Dive", value: "deep_dive" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  evm_paper: {
    title: "EVM vs Paper Ballots",
    content: `A comparison of India's journey from paper to digital voting:

| Feature | Paper Ballot | EVM |
|---|---|---|
| Speed | Days to count | Hours |
| Error | Spoilt votes possible | No invalid votes |
| Tampering risk | High | Very low |
| Cost | High (paper + transport) | Lower over time |
| Transparency | Physical | VVPAT adds transparency |

India switched to EVMs fully in **2004** general elections.

**Is EVM secure?**
- Standalone machines — not connected to internet
- Unique frequency keypads
- One-time programmable chips
- Burned after 15 years

The Supreme Court upheld EVMs multiple times after detailed technical scrutiny.`,
    options: [
      { label: "2024 Example", value: "real_example" },
      { label: "Registration", value: "voter_registration" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  voter_registration: {
    title: "How to Register as a Voter",
    content: `Turning 18? Here's how to get on the electoral roll:

**Step 1 — Check if registered**
Visit **voters.eci.gov.in** and search by your name, EPIC number, or mobile number.

**Step 2 — Fill Form 6**
Available online at the National Voter Services Portal (NVSP) or at your nearest Electoral Registration Office.

**Required Documents**
- Age proof (birth certificate / class 10 certificate / Aadhaar)
- Address proof (Aadhaar / utility bill / bank passbook)
- Recent passport-size photograph

**Step 3 — Submit & Track**
Submit online or at your booth level officer. Track status online with your reference number.

**Deadlines**
Registration cutoff is usually **3 months before** the election date.

**Voter Helpline App**
Download the official app to register, find your booth, and update details easily!`,
    options: [
      { label: "Voting Day Tips", value: "voting_day" },
      { label: "Real Example", value: "real_example" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  voting_day: {
    title: "What Happens on Voting Day",
    content: `Everything you need to know about election day:

**Before you go**
- Check your name on voter list
- Know your polling booth address
- Carry your Voter ID or any valid alternate ID

**At the Booth**
1. Join the queue (senior citizens & differently-abled get priority)
2. Show ID to Polling Officer
3. Sign or thumbprint the register
4. Press the EVM button for your candidate
5. Check the VVPAT slip for 7 seconds
6. Walk out — your finger is inked!

**The Ink**
Indelible ink is applied on your left index finger to prevent double voting. It stays for ~2 weeks!

**After Voting**
You're done! Results are typically announced within 1-2 days of the final phase.

**Don'ts**
- No mobile phones in the voting compartment
- No campaigning within 100m of booth
- No money or gifts to influence votes`,
    options: [
      { label: "EVM Details", value: "evm_paper" },
      { label: "Registration", value: "voter_registration" },
      { label: "Show Timeline", value: "show_timeline" },
    ],
  },

  show_timeline: {
    title: "Election Timeline",
    content: `Here's the complete election journey from start to finish! I've opened the **interactive timeline** above for you.

The 5 key stages are:
1. **Voter Registration** — Enroll on the electoral roll
2. **Nomination** — Candidates file papers
3. **Campaign** — Parties spread their message
4. **Voting Day** — Citizens cast their vote
5. **Results** — Counting and oath-taking

Click any step in the timeline to explore details!`,
    options: [
      { label: "Basics", value: "basics" },
      { label: "Deep Dive", value: "deep_dive" },
      { label: "Real Example", value: "real_example" },
    ],
    showTimeline: true,
  },

  model_code: {
    title: "Model Code of Conduct",
    content: `The **Model Code of Conduct (MCC)** is a set of guidelines by the Election Commission of India (ECI).

It kicks in as soon as election dates are announced and stays until results.

**Key Rules**
- No using government resources for campaigning
- No communal or caste-based appeals
- No paid news
- No announcing new government schemes
- All election rallies need prior permission
- Parties must submit expense accounts

**Enforcement**
ECI can remove officials, issue notices, and even debar candidates for violations.

The MCC has no statutory backing — but its **moral authority** is immense. Every party respects it.`,
    options: [
      { label: "2024 Example", value: "real_example" },
      { label: "Show Timeline", value: "show_timeline" },
      { label: "Deep Dive", value: "deep_dive" },
    ],
  },
};

/* ─── Flow Engine ────────────────────────────────────────────── */

export const WELCOME_OPTIONS = [
  { label: "Beginner", value: "level_beginner" },
  { label: "Intermediate", value: "level_intermediate" },
];

export const BEGINNER_START_OPTIONS = [
  { label: "Basics", value: "basics" },
  { label: "Voter Registration", value: "voter_registration" },
  { label: "Show Timeline", value: "show_timeline" },
];

export const INTERMEDIATE_START_OPTIONS = [
  { label: "Deep Dive", value: "deep_dive" },
  { label: "Real Example", value: "real_example" },
  { label: "EVM vs Paper", value: "evm_paper" },
  { label: "Model Code", value: "model_code" },
];

export const WELCOME_MESSAGE = `Welcome to the **Election Education Assistant**.

I am configured to help you understand how elections work in **India** — from voter registration all the way to results day.

Whether you're a first-time voter, a student, or just curious about democracy, I can assist you.

What is your experience level?`;

export const BEGINNER_INTRO = `Understood. Let's start from the basics.

India is the **world's largest democracy** with over 96 crore registered voters. Understanding how elections work is the first step to being an active citizen.

What would you like to learn first?`;

export const INTERMEDIATE_INTRO = `Acknowledged. We will go deeper.

I'll assume you know the basics — so we'll look at how the system really works, from EVMs and VVPAT to the Model Code of Conduct and real 2024 election data.

What topic interests you?`;

/**
 * Process a user input value and return the bot response.
 * Returns: { title, content, options, showTimeline? }
 */
export function processInput(value, stage, userLevel) {
  // Handle level selection
  if (value === "level_beginner") {
    return {
      title: null,
      content: BEGINNER_INTRO,
      options: BEGINNER_START_OPTIONS,
      nextStage: "learning",
      level: "beginner",
    };
  }
  if (value === "level_intermediate") {
    return {
      title: null,
      content: INTERMEDIATE_INTRO,
      options: INTERMEDIATE_START_OPTIONS,
      nextStage: "learning",
      level: "intermediate",
    };
  }

  // Handle topic lookup
  const topic = TOPICS[value];
  if (topic) {
    return {
      title: topic.title,
      content: topic.content,
      options: topic.options,
      showTimeline: topic.showTimeline || false,
      nextStage: "learning",
    };
  }

  // Fallback for free-text input
  return getFallbackResponse(value, userLevel);
}

function getFallbackResponse(text, userLevel) {
  const lower = text.toLowerCase();

  if (
    lower.includes("register") ||
    lower.includes("enroll") ||
    lower.includes("voter id")
  )
    return processInput("voter_registration");
  if (
    lower.includes("evm") ||
    lower.includes("machine") ||
    lower.includes("voting machine")
  )
    return processInput("evm_paper");
  if (
    lower.includes("timeline") ||
    lower.includes("stages") ||
    lower.includes("steps")
  )
    return processInput("show_timeline");
  if (
    lower.includes("2024") ||
    lower.includes("result") ||
    lower.includes("example")
  )
    return processInput("real_example");
  if (
    lower.includes("campaign") ||
    lower.includes("mcc") ||
    lower.includes("code of conduct")
  )
    return processInput("model_code");
  if (
    lower.includes("vot") ||
    lower.includes("booth") ||
    lower.includes("election day")
  )
    return processInput("voting_day");
  if (
    lower.includes("how") ||
    lower.includes("what") ||
    lower.includes("explain")
  )
    return {
      content: `I can help you explore the following topics:

- **Election Basics** — How Lok Sabha elections work
- **Deep Dive** — EVMs, VVPAT, and voting mechanics
- **Real Example** — 2024 Indian General Election
- **Registration** — How to register as a voter
- **Voting Day** — What to do on election day
- **Timeline** — All 5 stages visualized

Which area would you like to focus on?`,
      options:
        userLevel === "beginner"
          ? BEGINNER_START_OPTIONS
          : INTERMEDIATE_START_OPTIONS,
    };

  return {
    content: `I could not parse that request. Let me help you explore the election process through these popular topics:`,
    options:
      userLevel === "beginner"
        ? BEGINNER_START_OPTIONS
        : INTERMEDIATE_START_OPTIONS,
  };
}

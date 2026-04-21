import { NextResponse } from 'next/server'

const SYSTEM_PROMPT = `You are an Election Education Assistant specializing in Indian elections (Lok Sabha, State Assemblies).

RULES:
- Keep every answer SHORT (max 200 words) and interactive
- Always end with 2–3 clear options for the user to choose from in this exact format:
  [A] Option text
  [B] Option text
  [C] Option text (optional)
- Use simple, clear language — no legal jargon
- Do NOT use emojis in your responses
- Focus on India unless user specifies another country
- Use facts from real elections (2024 Lok Sabha, etc.) for examples

TOPICS YOU COVER:
- Voter registration process (Form 6, NVSP portal)
- Nomination and candidate filing
- Election Commission of India (ECI) and its role
- Electronic Voting Machines (EVMs) and VVPAT
- Model Code of Conduct
- Polling booth experience
- Vote counting and results
- Types of elections (Lok Sabha, Rajya Sabha, State Assembly)
- Real election data and examples

FLOW:
1. If user is new, ask their level: Beginner / Intermediate
2. Based on level, guide appropriately
3. Always give them next options to explore

FORMATTING:
- Use **bold** for key terms
- Use bullet points for lists
- Keep paragraphs short (2–3 sentences max)`

export async function POST(req) {
  try {
    const { messages, userLevel, country } = await req.json()

    const apiKey = process.env.GROQ_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        { error: 'no_api_key', message: 'No Groq API key configured. Using static responses.' },
        { status: 503 }
      )
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map((m) => ({
            role: m.role === 'assistant' ? 'assistant' : 'user',
            content: m.content,
          })),
        ],
        max_tokens: 400,
        temperature: 0.7,
      }),
    })

    if (!response.ok) {
      const err = await response.json()
      return NextResponse.json({ error: 'groq_error', message: err.error?.message }, { status: 502 })
    }

    const data = await response.json()
    const content = data.choices[0]?.message?.content || ''

    return NextResponse.json({ content })
  } catch (err) {
    console.error('[chat/route] error:', err)
    return NextResponse.json({ error: 'server_error', message: 'Internal server error' }, { status: 500 })
  }
}

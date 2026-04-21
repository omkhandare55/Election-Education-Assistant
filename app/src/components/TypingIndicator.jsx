'use client'

export default function TypingIndicator() {
  return (
    <div className="msg-in" style={{ display: 'flex', padding: '4px 16px', alignItems: 'flex-end' }}>
      {/* Avatar */}
      <div
        style={{
          width: 30,
          height: 30,
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          marginRight: 6,
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      </div>

      {/* Dots bubble */}
      <div
        className="bubble-bot"
        style={{
          padding: '12px 18px',
          display: 'flex',
          gap: 5,
          alignItems: 'center',
        }}
      >
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  )
}

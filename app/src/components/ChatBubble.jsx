'use client'

import { useMemo } from 'react'

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

/**
 * Renders markdown-like bold (**text**) and bullet points in message content.
 */
function renderContent(text) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    // Process bold
    const parts = line.split(/(\*\*.*?\*\*)/g).map((part, j) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={j} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
            {part.slice(2, -2)}
          </strong>
        )
      }
      return part
    })

    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      return (
        <div key={i} style={{ display: 'flex', gap: 6, paddingLeft: 4, marginTop: 2 }}>
          <span style={{ color: 'var(--accent-primary)', flexShrink: 0 }}>•</span>
          <span>{parts.map((p, idx) => typeof p === 'string' ? p.replace(/^[-•]\s*/, '') : p)}</span>
        </div>
      )
    }

    // Table rows
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      return null // Skip tables for now, they render in the full block
    }

    // Empty line = spacing
    if (line.trim() === '') {
      return <div key={i} style={{ height: 6 }} />
    }

    // Normal line
    return (
      <div key={i} style={{ marginTop: i > 0 ? 2 : 0 }}>
        {parts}
      </div>
    )
  })
}

export default function ChatBubble({ message, isGrouped = false }) {
  const { role, content, timestamp } = message
  const isUser = role === 'user'
  const time = useMemo(() => formatTime(timestamp), [timestamp])

  return (
    <div
      className={isUser ? 'msg-out' : 'msg-in'}
      style={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        padding: `${isGrouped ? 1 : 4}px 16px`,
        maxWidth: '100%',
      }}
    >
      {!isUser && !isGrouped && (
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
            marginTop: 2,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </div>
      )}

      {/* Spacer for grouped bot messages */}
      {!isUser && isGrouped && <div style={{ width: 36, flexShrink: 0 }} />}

      {/* Bubble */}
      <div
        className={isUser ? 'bubble-user' : 'bubble-bot'}
        style={{
          maxWidth: '78%',
          padding: '8px 12px 6px',
          fontSize: '0.9rem',
          lineHeight: 1.55,
          color: 'var(--text-primary)',
          wordBreak: 'break-word',
        }}
      >
        {/* Title */}
        {message.title && (
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              color: isUser ? 'rgba(255,255,255,0.7)' : 'var(--accent-primary)',
              marginBottom: 4,
            }}
          >
            {message.title}
          </div>
        )}

        {/* Content */}
        <div>{renderContent(content)}</div>

        {/* Timestamp + ticks */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 4,
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.45)' }}>
            {time}
          </span>
          {isUser && <span className="tick">✓✓</span>}
        </div>
      </div>
    </div>
  )
}

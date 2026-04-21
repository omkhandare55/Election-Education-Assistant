'use client'

/**
 * Header Component
 * Displays the AI assistant's avatar, status, and control buttons (timeline toggle, info).
 * 
 * @param {Object} props - The component props
 * @param {Function} props.onTimelineToggle - Callback function when timeline button is clicked
 * @param {boolean} props.timelineOpen - Boolean indicating if the timeline is currently open
 * @returns {JSX.Element}
 */
export default function Header({ onTimelineToggle, timelineOpen }) {
  return (
    <header
      id="chat-header"
      aria-label="Assistant Header"
      className="glass-dark"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        borderBottom: '1px solid var(--border-color)',
        zIndex: 10,
        flexShrink: 0,
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
      </div>

      {/* Name & Status */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h1
          style={{
            fontSize: '1rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.3,
            margin: 0,
          }}
        >
          Election Education Assistant
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
          <span className="online-dot" />
          <span style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', fontWeight: 500 }}>
            Online
          </span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginLeft: 4 }}>
            | India Edition
          </span>
        </div>
      </div>

      {/* Timeline Toggle */}
      <button
        id="timeline-toggle-btn"
        aria-label="Toggle Election Timeline"
        aria-expanded={timelineOpen}
        onClick={onTimelineToggle}
        title="Toggle Election Timeline"
        style={{
          width: 38,
          height: 38,
          borderRadius: 'var(--radius-full)',
          border: timelineOpen
            ? '2px solid var(--accent-primary)'
            : '1px solid var(--border-color)',
          background: timelineOpen
            ? 'rgba(99,102,241,0.15)'
            : 'rgba(255,255,255,0.04)',
          color: timelineOpen ? 'var(--accent-primary)' : 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-fast)',
          flexShrink: 0,
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
      </button>

      {/* Info */}
      <button
        id="info-btn"
        aria-label="About this Assistant"
        title="About this Assistant"
        style={{
          width: 38,
          height: 38,
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-color)',
          background: 'rgba(255,255,255,0.04)',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all var(--transition-fast)',
          flexShrink: 0,
        }}
        onClick={() => {
          alert(
            'Election Education Assistant v1.0\n\nAn interactive tool to learn about the Indian election process.\n\nBuilt with Next.js & React.'
          )
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
      </button>
    </header>
  )
}

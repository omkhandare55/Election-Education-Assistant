'use client'

export default function QuickReplyButtons({ options, onSelect, disabled = false }) {
  if (!options || options.length === 0) return null

  return (
    <div
      className="fade-up"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        padding: '6px 16px 6px 52px',
        justifyContent: 'flex-start',
      }}
    >
      {options.map((opt, i) => (
        <button
          key={opt.value}
          id={`quick-reply-${opt.value}`}
          className="quick-btn stagger-btn"
          disabled={disabled}
          onClick={() => onSelect(opt)}
          style={{
            animationDelay: `${i * 0.07 + 0.05}s`,
            opacity: disabled ? 0.5 : undefined,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

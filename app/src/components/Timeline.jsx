'use client'

import { useState } from 'react'
import { ELECTION_TIMELINE } from '@/lib/chatEngine'

/**
 * Timeline Component
 * Displays a horizontal timeline of election steps with expandable details.
 * 
 * @param {Object} props - The component props
 * @param {string} props.activeStep - ID of the currently active/highlighted step
 * @param {Function} props.onStepClick - Callback when a timeline step is clicked
 * @returns {JSX.Element}
 */
export default function Timeline({ activeStep, onStepClick }) {
  const [expandedStep, setExpandedStep] = useState(null)

  function handleClick(step) {
    setExpandedStep(expandedStep === step.id ? null : step.id)
    if (onStepClick) onStepClick(step)
  }

  return (
    <div
      id="election-timeline"
      className="panel-slide open"
      style={{
        background: 'var(--bg-panel)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 12px',
        overflowX: 'auto',
        flexShrink: 0,
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 14,
          paddingInline: 4,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="glow-badge">TIMELINE</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Indian General Election Process
          </span>
        </div>
      </div>

      {/* Timeline steps */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 0,
          minWidth: 'max-content',
          paddingBottom: 4,
        }}
      >
        {ELECTION_TIMELINE.map((step, i) => {
          const isActive = activeStep === step.id
          const isExpanded = expandedStep === step.id
          const isLast = i === ELECTION_TIMELINE.length - 1

          return (
            <div key={step.id} style={{ display: 'flex', alignItems: 'flex-start' }}>
              {/* Step */}
              <div
                className="timeline-step"
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`Timeline step: ${step.label.replace('\n', ' ')}`}
                onClick={() => handleClick(step)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClick(step);
                  }
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  minWidth: 100,
                  maxWidth: 120,
                }}
              >
                {/* Circle */}
                <div
                  className={isActive ? 'timeline-pulse' : ''}
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 'var(--radius-full)',
                    background: isActive
                      ? `linear-gradient(135deg, ${step.color}, ${step.color}dd)`
                      : isExpanded
                      ? `${step.color}33`
                      : 'var(--bg-secondary)',
                    border: `2px solid ${isActive || isExpanded ? step.color : 'var(--border-color)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    position: 'relative',
                    transition: 'all var(--transition-normal)',
                    boxShadow: isActive
                      ? `0 0 20px ${step.color}44`
                      : 'none',
                  }}
                >
                  {step.icon}
                </div>

                {/* Label */}
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? step.color : 'var(--text-secondary)',
                    textAlign: 'center',
                    marginTop: 6,
                    lineHeight: 1.3,
                    whiteSpace: 'pre-line',
                    transition: 'color var(--transition-fast)',
                  }}
                >
                  {step.label}
                </span>

                {/* Date */}
                <span
                  style={{
                    fontSize: '0.6rem',
                    color: 'var(--text-muted)',
                    marginTop: 2,
                  }}
                >
                  {step.date}
                </span>

                {/* Expanded info card */}
                {isExpanded && (
                  <div
                    className="fade-up glass"
                    style={{
                      marginTop: 8,
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1.45,
                      maxWidth: 200,
                      minWidth: 160,
                      textAlign: 'left',
                      whiteSpace: 'normal',
                    }}
                  >
                    <p style={{ marginBottom: 6 }}>{step.description}</p>
                    <p
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--accent-amber)',
                        fontStyle: 'italic',
                      }}
                    >
                      {step.fact}
                    </p>
                  </div>
                )}
              </div>

              {/* Connector line */}
              {!isLast && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 44,
                    paddingInline: 2,
                  }}
                >
                  <div
                    className="timeline-connector"
                    style={{
                      width: 40,
                      opacity: 0.6,
                    }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

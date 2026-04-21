'use client'

import { useState, useRef } from 'react'

/**
 * ChatInput Component
 * Handles user text input and submissions.
 * 
 * @param {Object} props - The component props
 * @param {Function} props.onSend - Callback fired when a message is sent
 * @param {boolean} props.disabled - Whether the input should be disabled (e.g. while bot is typing)
 * @returns {JSX.Element}
 */
export default function ChatInput({ onSend, disabled = false }) {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  function handleSend() {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function handleInput(e) {
    setText(e.target.value)
    // Auto-resize
    const el = e.target
    el.style.height = 'auto'
    el.style.height = Math.min(el.scrollHeight, 120) + 'px'
  }

  return (
    <div
      id="chat-input-bar"
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: 8,
        padding: '8px 12px',
        background: 'var(--bg-input)',
        borderTop: '1px solid var(--border-color)',
        flexShrink: 0,
      }}
    >
      {/* Emoji placeholder */}
      <button
        style={{
          width: 38,
          height: 38,
          borderRadius: 'var(--radius-full)',
          border: 'none',
          background: 'transparent',
          color: 'var(--text-muted)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'color var(--transition-fast)',
        }}
        title="Attach"
        aria-label="Attach File"
        onClick={() => {}}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
      </button>

      {/* Text input area */}
      <div
        style={{
          flex: 1,
          background: 'var(--bg-panel)',
          borderRadius: 'var(--radius-xl)',
          padding: '8px 16px',
          border: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Type a message or click an option..."
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          id="chat-input-textarea"
          aria-label="Type your message"
        />
      </div>

      {/* Send button */}
      <button
        id="send-btn"
        className="send-btn"
        onClick={handleSend}
        disabled={!text.trim() || disabled}
        style={{
          width: 42,
          height: 42,
          border: 'none',
          cursor: text.trim() && !disabled ? 'pointer' : 'not-allowed',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          flexShrink: 0,
          opacity: text.trim() && !disabled ? 1 : 0.5,
        }}
        title="Send"
        aria-label="Send Message"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  )
}

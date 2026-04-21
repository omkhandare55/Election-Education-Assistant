'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { ChatProvider, useChat } from '@/context/ChatContext'
import Header from '@/components/Header'
import ChatBubble from '@/components/ChatBubble'
import TypingIndicator from '@/components/TypingIndicator'
import QuickReplyButtons from '@/components/QuickReplyButtons'
import ChatInput from '@/components/ChatInput'
import Timeline from '@/components/Timeline'
import {
  WELCOME_MESSAGE,
  WELCOME_OPTIONS,
  processInput,
} from '@/lib/chatEngine'

/* ─── Inner Chat Component ─────────────────────────────────── */
function ChatApp() {
  const {
    messages,
    isTyping,
    userLevel,
    stage,
    addMessage,
    setTyping,
    setUserLevel,
    setStage,
  } = useChat()

  const [showTimeline, setShowTimeline] = useState(false)
  const [activeTimelineStep, setActiveTimelineStep] = useState(null)
  const [currentOptions, setCurrentOptions] = useState(null)
  const scrollRef = useRef(null)
  const hasInitialized = useRef(false)

  /* ─── Auto-scroll ─────────────────────────────────────────── */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping, currentOptions])

  /* ─── Welcome message ────────────────────────────────────── */
  useEffect(() => {
    if (hasInitialized.current) return
    hasInitialized.current = true

    setTimeout(() => {
      setTyping(true)
    }, 300)

    setTimeout(() => {
      setTyping(false)
      addMessage('assistant', WELCOME_MESSAGE)
      setCurrentOptions(WELCOME_OPTIONS)
    }, 1500)
  }, [addMessage, setTyping])

  /* ─── Process user input ──────────────────────────────────── */
  const handleUserInput = useCallback(
    (value, label = null) => {
      // Add user message
      addMessage('user', label || value)
      setCurrentOptions(null)

      // Simulate typing delay
      setTyping(true)

      const delay = 800 + Math.random() * 700

      setTimeout(() => {
        setTyping(false)

        const result = processInput(value, stage, userLevel)

        // Handle level setting
        if (result.level) {
          setUserLevel(result.level)
        }
        if (result.nextStage) {
          setStage(result.nextStage)
        }

        // Add bot message
        addMessage('assistant', result.content, null, {
          title: result.title || null,
        })

        // Show timeline if requested
        if (result.showTimeline) {
          setShowTimeline(true)
        }

        // Set new options
        if (result.options) {
          setTimeout(() => {
            setCurrentOptions(result.options)
          }, 200)
        }
      }, delay)
    },
    [addMessage, setTyping, stage, userLevel, setUserLevel, setStage]
  )

  /* ─── Quick reply handler ─────────────────────────────────── */
  const handleQuickReply = useCallback(
    (opt) => {
      handleUserInput(opt.value, opt.label)
    },
    [handleUserInput]
  )

  /* ─── Free text handler ───────────────────────────────────── */
  const handleSend = useCallback(
    (text) => {
      handleUserInput(text)
    },
    [handleUserInput]
  )

  /* ─── Timeline step click ─────────────────────────────────── */
  const handleTimelineStep = useCallback(
    (step) => {
      setActiveTimelineStep(step.id)
    },
    []
  )

  /* ─── Check if messages should group ──────────────────────── */
  function isGrouped(idx) {
    if (idx === 0) return false
    return messages[idx].role === messages[idx - 1].role
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100dvh',
        maxWidth: 900,
        margin: '0 auto',
        background: 'var(--bg-secondary)',
        boxShadow: '0 0 60px rgba(0,0,0,0.5)',
        position: 'relative',
      }}
    >
      {/* Header */}
      <Header
        onTimelineToggle={() => setShowTimeline(!showTimeline)}
        timelineOpen={showTimeline}
      />

      {/* Timeline Panel */}
      {showTimeline && (
        <Timeline
          activeStep={activeTimelineStep}
          onStepClick={handleTimelineStep}
        />
      )}

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="chat-wallpaper"
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          paddingTop: 12,
          paddingBottom: 12,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Date badge */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '8px 16px',
            marginBottom: 4,
          }}
        >
          <span
            className="glass"
            style={{
              fontSize: '0.7rem',
              color: 'var(--text-secondary)',
              padding: '4px 14px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 500,
            }}
          >
            Today
          </span>
        </div>

        {/* Encryption notice */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: '4px 16px 12px',
          }}
        >
          <span
            style={{
              fontSize: '0.65rem',
              color: 'var(--text-muted)',
              background: 'rgba(245,158,11,0.08)',
              padding: '5px 12px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center',
              lineHeight: 1.4,
              maxWidth: 320,
            }}
          >
            This is an educational assistant. Your session is private and not stored.
          </span>
        </div>

        {/* Messages */}
        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} message={msg} isGrouped={isGrouped(i)} />
        ))}

        {/* Typing Indicator */}
        {isTyping && <TypingIndicator />}

        {/* Quick Reply Options */}
        {!isTyping && currentOptions && (
          <QuickReplyButtons
            options={currentOptions}
            onSelect={handleQuickReply}
            disabled={isTyping}
          />
        )}

        {/* Bottom spacer */}
        <div style={{ height: 8, flexShrink: 0 }} />
      </div>

      {/* Input Bar */}
      <ChatInput onSend={handleSend} disabled={isTyping} />
    </div>
  )
}

/* ─── Page Wrapper ──────────────────────────────────────────── */
export default function Home() {
  return (
    <ChatProvider>
      <ChatApp />
    </ChatProvider>
  )
}

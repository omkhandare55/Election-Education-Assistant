'use client'

import { createContext, useContext, useReducer, useCallback } from 'react'

const ChatContext = createContext(null)

const initialState = {
  messages: [],
  isTyping: false,
  currentOptions: null,
  userLevel: null,
  userCountry: 'India',
  stage: 'welcome', // welcome | level | country | learning
}

function chatReducer(state, action) {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] }
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload }
    case 'SET_OPTIONS':
      return { ...state, currentOptions: action.payload }
    case 'CLEAR_OPTIONS':
      return { ...state, currentOptions: null }
    case 'SET_USER_LEVEL':
      return { ...state, userLevel: action.payload }
    case 'SET_COUNTRY':
      return { ...state, userCountry: action.payload }
    case 'SET_STAGE':
      return { ...state, stage: action.payload }
    case 'CLEAR_CHAT':
      return { ...initialState }
    default:
      return state
  }
}

export function ChatProvider({ children }) {
  const [state, dispatch] = useReducer(chatReducer, initialState)

  const addMessage = useCallback((role, content, options = null, meta = {}) => {
    const message = {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      role,       // 'user' | 'assistant'
      content,
      options,    // array of { label, value } or null
      timestamp: new Date(),
      ...meta,
    }
    dispatch({ type: 'ADD_MESSAGE', payload: message })
    return message.id
  }, [])

  const setTyping = useCallback((val) => dispatch({ type: 'SET_TYPING', payload: val }), [])
  const setOptions = useCallback((opts) => dispatch({ type: 'SET_OPTIONS', payload: opts }), [])
  const clearOptions = useCallback(() => dispatch({ type: 'CLEAR_OPTIONS' }), [])
  const setUserLevel = useCallback((lvl) => dispatch({ type: 'SET_USER_LEVEL', payload: lvl }), [])
  const setCountry = useCallback((c) => dispatch({ type: 'SET_COUNTRY', payload: c }), [])
  const setStage = useCallback((s) => dispatch({ type: 'SET_STAGE', payload: s }), [])
  const clearChat = useCallback(() => dispatch({ type: 'CLEAR_CHAT' }), [])

  return (
    <ChatContext.Provider value={{
      ...state,
      addMessage,
      setTyping,
      setOptions,
      clearOptions,
      setUserLevel,
      setCountry,
      setStage,
      clearChat,
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const ctx = useContext(ChatContext)
  if (!ctx) throw new Error('useChat must be used within ChatProvider')
  return ctx
}

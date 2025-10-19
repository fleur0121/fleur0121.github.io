import React, { useEffect, useRef, useState } from 'react'

type Props = {
  text: string
  // Either a fixed ms delay or a function returning delay per character
  speed?: number | ((ch: string, index: number) => number)
  startDelay?: number // ms before typing starts
  cursor?: boolean
  className?: string
  ariaLabel?: string
  onDone?: () => void
  // optional humanizing tweaks
  spacePause?: number // extra ms when the next char is a space
  punctuationPause?: number // extra ms when the next char is punctuation
  jitter?: number // +/- ms random jitter per keystroke
}

const TypingText: React.FC<Props> = ({
  text,
  speed = 90,
  startDelay = 200,
  cursor = true,
  className,
  ariaLabel,
  onDone,
  spacePause = 80,
  punctuationPause = 120,
  jitter = 25,
}) => {
  const [count, setCount] = useState(0)
  const timerRef = useRef<number | null>(null)
  const startedRef = useRef(false)
  const [done, setDone] = useState(false)
  const doneRef = useRef(false)
  // Use a ref to hold the latest speed prop to avoid effect restarts
  const speedRef = useRef<typeof speed>(speed)
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    // reset when text changes
    setCount(0)
    setDone(false)
    doneRef.current = false
    if (timerRef.current) window.clearTimeout(timerRef.current)
    startedRef.current = false

    const start = () => {
      startedRef.current = true
      const tick = () => {
        setCount((c) => {
          if (c >= text.length) {
            if (!doneRef.current) {
              doneRef.current = true
              setDone(true)
              onDone?.()
            }
            return c
          }
          const nextIndex = c
          const ch = text.charAt(nextIndex)
          let base =
            typeof speedRef.current === 'function'
              ? (speedRef.current as (ch: string, index: number) => number)(ch, nextIndex)
              : (speedRef.current as number)
          // humanize: extra pause for spaces/punctuation
          if (ch === ' ') base += spacePause
          if (',.;:!?、。・ー'.includes(ch)) base += punctuationPause
          // jitter
          const delta = jitter > 0 ? (Math.random() * 2 - 1) * jitter : 0
          const delay = Math.max(10, Math.round(base + delta))

          timerRef.current = window.setTimeout(tick, delay)
          return c + 1
        })
      }
      const firstDelay =
        typeof speedRef.current === 'function'
          ? ((speedRef.current as (ch: string, index: number) => number)(text.charAt(0), 0) as number)
          : (speedRef.current as number)
      timerRef.current = window.setTimeout(tick, Math.max(10, firstDelay))
    }

    timerRef.current = window.setTimeout(start, startDelay)

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [text, startDelay, spacePause, punctuationPause, jitter, onDone])

  const shown = text.slice(0, count)

  const showCaret = cursor && !done
  const showBlink = cursor && done

  return (
    <span className={className} aria-label={ariaLabel} aria-live="polite">
      {shown}
      {showCaret && (
        <span className="typing-caret" aria-hidden>
          |
        </span>
      )}
      {showBlink && (
        <span className="typing-cursor" aria-hidden>
          |
        </span>
      )}
    </span>
  )
}

export default TypingText

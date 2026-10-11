import { useCallback, useLayoutEffect, useRef } from 'react'

type Show = () => void

const callbacks = new WeakMap<Element, Show>()

let observer: IntersectionObserver | null = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const show = callbacks.get(entry.target)
        callbacks.delete(entry.target)
        observer?.unobserve(entry.target)
        show?.()
      }
    },
    { rootMargin: '0px 0px -24px 0px', threshold: 0 },
  )
  return observer
}

function observe(element: Element, show: Show) {
  callbacks.set(element, show)
  getObserver().observe(element)
}

function unobserve(element: Element) {
  callbacks.delete(element)
  observer?.unobserve(element)
}

export function useReveal<T extends HTMLElement>(mode: 'block' | 'stagger' = 'block') {
  const ref = useRef<T>(null)
  const settleTimer = useRef(0)

  const settle = useCallback(() => {
    const element = ref.current
    if (!element?.dataset.reveal) return
    window.clearTimeout(settleTimer.current)
    element.dataset.reveal = 'settled'
  }, [])

  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return

    let media: MediaQueryList
    try {
      media = window.matchMedia('(prefers-reduced-motion: reduce)')
    } catch {
      return
    }

    if (media.matches || typeof IntersectionObserver === 'undefined') return

    let cancelled = false

    const show = () => {
      if (cancelled || element.dataset.reveal === 'shown' || element.dataset.reveal === 'settled') {
        return
      }
      element.dataset.reveal = 'shown'
      unobserve(element)
      if (mode !== 'stagger') return
      settleTimer.current = window.setTimeout(() => {
        if (element.dataset.reveal === 'shown') element.dataset.reveal = 'settled'
      }, 720)
    }

    try {
      observe(element, show)
    } catch {
      return
    }

    element.dataset.reveal = 'hidden'

    const onFocus = () => show()
    element.addEventListener('focusin', onFocus)

    const onMedia = () => {
      if (!media.matches) return
      cancelled = true
      window.clearTimeout(settleTimer.current)
      unobserve(element)
      delete element.dataset.reveal
    }
    media.addEventListener('change', onMedia)

    const failsafe = window.setTimeout(() => {
      if (cancelled || element.dataset.reveal !== 'hidden') return
      const rect = element.getBoundingClientRect()
      const inView = rect.top < window.innerHeight * 0.92 && rect.bottom > 0
      if (inView) show()
    }, 500)

    return () => {
      cancelled = true
      window.clearTimeout(failsafe)
      window.clearTimeout(settleTimer.current)
      element.removeEventListener('focusin', onFocus)
      media.removeEventListener('change', onMedia)
      unobserve(element)
    }
  }, [mode])

  return { ref, settle }
}

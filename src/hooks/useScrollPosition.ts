import { useState, useEffect, useCallback } from 'react'

export default function useScrollPosition(
  scrollContainerElement: HTMLElement | null
) {
  const [scrollPosition, setScrollPosition] = useState(0)

  const onScrollChange = useCallback(() => {
    if (!scrollContainerElement) return
    setScrollPosition(scrollContainerElement.scrollTop)
  }, [setScrollPosition, scrollContainerElement])

  useEffect(() => {
    if (!scrollContainerElement) return

    scrollContainerElement.addEventListener('scroll', onScrollChange)

    return () =>
      scrollContainerElement.removeEventListener('scroll', onScrollChange)
  }, [scrollContainerElement, onScrollChange])

  return scrollPosition
}

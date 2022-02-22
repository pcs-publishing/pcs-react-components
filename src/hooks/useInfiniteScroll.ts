import { RefObject, useState, useEffect } from 'react'
import useScrollPosition from './useScrollPosition'

interface InfiniteScrollOptions {
  scrollContainerRef: RefObject<HTMLElement>
  scrollItemsContainerRef: RefObject<HTMLElement>
  loadMore: () => void
  loading: boolean
  pixelsFromBottomBeforeLoadingMore?: number
}

export default function useInfiniteScroll(options: InfiniteScrollOptions) {
  const { scrollContainerRef, scrollItemsContainerRef, loadMore, loading } =
    options
  const [needsToLoadMore, setNeedsToLoadMore] = useState(false)

  const childrenContainerHeight =
    scrollItemsContainerRef.current?.offsetHeight || 0

  const scrollPosition = useScrollPosition(scrollContainerRef.current)
  const scrollContainerHeight = scrollContainerRef.current?.offsetHeight || 0

  const pixelsFromBottomBeforeLoadingMore =
    options.pixelsFromBottomBeforeLoadingMore || 500

  // Try to load more if we have empty space or have scrolled to the bottom, if we're already loading, set a flag to load when we're next not loading
  useEffect(() => {
    const hasEmptySpace = childrenContainerHeight < scrollContainerHeight

    const hasScrolledToBottom =
      scrollPosition + scrollContainerHeight >
      childrenContainerHeight - pixelsFromBottomBeforeLoadingMore

    if (hasEmptySpace || hasScrolledToBottom) {
      if (loading) {
        setNeedsToLoadMore(true)
      } else {
        loadMore()
      }
    }
  }, [
    childrenContainerHeight,
    scrollContainerHeight,
    scrollPosition,
    loadMore,
    loading,
    pixelsFromBottomBeforeLoadingMore
  ])

  // Load more if needsToLoadMore is set and we're not currently loading
  useEffect(() => {
    if (!loading && needsToLoadMore) {
      loadMore()
      setNeedsToLoadMore(false)
    }
  }, [loading, needsToLoadMore, setNeedsToLoadMore, loadMore])
}

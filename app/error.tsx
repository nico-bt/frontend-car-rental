"use client" // Error components must be Client Components

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  const router = useRouter()
  return (
    <div className="nextErrorHandler">
      <h2>
        <span>Ups...</span> <span>Something went wrong!</span>
      </h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.refresh()
        }
      >
        Try again
      </button>
    </div>
  )
}

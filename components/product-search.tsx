"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"

interface ProductSearchProps {
  locale: string
}

export function ProductSearch({ locale }: ProductSearchProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [query, setQuery] = useState(searchParams.get("search") || "")

  // Sync state when URL changes (optional)
  useEffect(() => {
    setQuery(searchParams.get("search") || "")
  }, [searchParams])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set("search", query)
    } else {
      params.delete("search")
    }
    router.push(`/${locale}/decorative?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-lg border border-gray-300 px-3 py-2"
      />
      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  )
}

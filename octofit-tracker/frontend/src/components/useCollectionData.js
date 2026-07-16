import { useEffect, useState } from 'react'

export function useCollectionData(resourceName, endpoint) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadCollection() {
      setLoading(true)
      setError('')

      try {
        const response = await fetch(endpoint, { signal: controller.signal })
        console.log(`${resourceName} response status:`, response.status)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()
        console.log(`${resourceName} fetched data:`, payload)

        const normalizedRecords = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.results)
            ? payload.results
            : []

        setRecords(normalizedRecords)
      } catch (requestError) {
        if (requestError.name === 'AbortError') {
          return
        }

        console.error(`${resourceName} fetch error:`, requestError)
        setRecords([])
        setError(requestError.message || 'Unable to load data')
      } finally {
        setLoading(false)
      }
    }

    loadCollection()

    return () => controller.abort()
  }, [endpoint, resourceName])

  return { records, loading, error }
}
import CollectionPage from './CollectionPage.jsx'
import { getApiEndpoint } from './api.js'
import { useCollectionData } from './useCollectionData.js'

export default function Leaderboard() {
  const endpoint = getApiEndpoint('leaderboard')
  console.log('Leaderboard endpoint:', endpoint)

  const { records, loading, error } = useCollectionData('Leaderboard', endpoint)

  return (
    <CollectionPage
      title="Leaderboard"
      subtitle="Ranked team and athlete standings from the backend REST API."
      records={records}
      loading={loading}
      error={error}
    />
  )
}
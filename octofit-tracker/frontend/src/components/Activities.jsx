import CollectionPage from './CollectionPage.jsx'
import { getApiEndpoint } from './api.js'
import { useCollectionData } from './useCollectionData.js'

export default function Activities() {
  const endpoint = getApiEndpoint('activities')
  const { records, loading, error } = useCollectionData('Activities', endpoint)

  return (
    <CollectionPage
      title="Activities"
      subtitle="Activity logs from the backend REST API."
      records={records}
      loading={loading}
      error={error}
    />
  )
}
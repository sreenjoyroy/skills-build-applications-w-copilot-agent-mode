import CollectionPage from './CollectionPage.jsx'
import { getApiEndpoint } from './api.js'
import { useCollectionData } from './useCollectionData.js'

export default function Teams() {
  const endpoint = getApiEndpoint('teams')
  const { records, loading, error } = useCollectionData('Teams', endpoint)

  return (
    <CollectionPage
      title="Teams"
      subtitle="Team information loaded from the backend REST API."
      records={records}
      loading={loading}
      error={error}
    />
  )
}
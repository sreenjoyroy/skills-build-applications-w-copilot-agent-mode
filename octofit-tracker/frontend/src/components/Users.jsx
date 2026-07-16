import CollectionPage from './CollectionPage.jsx'
import { getApiEndpoint } from './api.js'
import { useCollectionData } from './useCollectionData.js'

export default function Users() {
  const endpoint = getApiEndpoint('users')
  const { records, loading, error } = useCollectionData('Users', endpoint)

  return (
    <CollectionPage
      title="Users"
      subtitle="User profiles synced from the backend REST API."
      records={records}
      loading={loading}
      error={error}
    />
  )
}
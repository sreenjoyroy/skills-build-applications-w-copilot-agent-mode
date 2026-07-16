import CollectionPage from './CollectionPage.jsx'
import { getApiEndpoint } from './api.js'
import { useCollectionData } from './useCollectionData.js'

export default function Workouts() {
  const endpoint = getApiEndpoint('workouts')
  console.log('Workouts endpoint:', endpoint)

  const { records, loading, error } = useCollectionData('Workouts', endpoint)

  return (
    <CollectionPage
      title="Workouts"
      subtitle="Workout plans and templates pulled from the backend REST API."
      records={records}
      loading={loading}
      error={error}
    />
  )
}
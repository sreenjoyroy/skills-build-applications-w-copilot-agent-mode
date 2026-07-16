import { useMemo, useState } from 'react'

function formatValue(value) {
  if (value === null || value === undefined) {
    return '—'
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(', ') : '—'
  }

  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2)
  }

  return String(value)
}

export default function CollectionPage({ title, subtitle, records, loading, error }) {
  const [query, setQuery] = useState('')
  const [selectedRecord, setSelectedRecord] = useState(null)

  const filteredRecords = useMemo(() => {
    const searchTerm = query.trim().toLowerCase()

    if (!searchTerm) {
      return records
    }

    return records.filter((record) =>
      JSON.stringify(record).toLowerCase().includes(searchTerm),
    )
  }, [query, records])

  const visibleFields = useMemo(() => {
    const fieldNames = new Set(['id'])

    filteredRecords.forEach((record) => {
      Object.keys(record || {}).forEach((field) => fieldNames.add(field))
    })

    return Array.from(fieldNames)
  }, [filteredRecords])

  return (
    <section className="card dashboard-card border-0 shadow-lg">
      <div className="card-body p-4 p-lg-5">
        <div className="d-flex flex-column flex-lg-row justify-content-between gap-3 mb-4">
          <div>
            <p className="text-uppercase text-secondary small fw-semibold mb-1">REST collection</p>
            <h2 className="h3 fw-bold mb-2">{title}</h2>
            <p className="text-body-secondary mb-0">{subtitle}</p>
          </div>
          <div className="text-lg-end text-secondary small">
            <div>React Router powered</div>
            <div>Bootstrap table layout</div>
          </div>
        </div>

        <form className="row g-3 align-items-end mb-4" onSubmit={(event) => event.preventDefault()}>
          <div className="col-12 col-md-8 col-lg-9">
            <label className="form-label fw-semibold" htmlFor={`${title}-search`}>
              Search {title.toLowerCase()}
            </label>
            <input
              id={`${title}-search`}
              type="search"
              className="form-control form-control-lg"
              placeholder={`Filter ${title.toLowerCase()} by any field`}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 col-lg-3 d-grid">
            <button
              type="button"
              className="btn btn-outline-light btn-lg dashboard-button"
              onClick={() => setQuery('')}
              disabled={!query}
            >
              Clear filter
            </button>
          </div>
        </form>

        {loading ? (
          <div className="alert alert-info mb-0">Loading {title.toLowerCase()} from the API...</div>
        ) : null}

        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

        {!loading && !error && filteredRecords.length === 0 ? (
          <div className="alert alert-warning mb-0">
            No {title.toLowerCase()} were returned from the API.
          </div>
        ) : null}

        {!loading && !error && filteredRecords.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover align-middle dashboard-table mb-0">
              <thead className="table-dark">
                <tr>
                  {visibleFields.map((field) => (
                    <th key={field} scope="col" className="text-capitalize text-nowrap">
                      {field}
                    </th>
                  ))}
                  <th scope="col" className="text-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record, index) => (
                  <tr key={record.id || `${title}-${index}`}>
                    {visibleFields.map((field) => (
                      <td key={`${record.id || index}-${field}`} className="text-break">
                        {formatValue(record?.[field])}
                      </td>
                    ))}
                    <td className="text-nowrap">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-info me-2"
                        onClick={() => setSelectedRecord(record)}
                      >
                        View
                      </button>
                      <a
                        href={`#${title.toLowerCase()}-details`}
                        className="btn btn-sm btn-link text-info text-decoration-none p-0"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      {selectedRecord ? (
        <div
          className="modal fade show d-block"
          id={`${title.toLowerCase()}-details`}
          tabIndex="-1"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`${title.toLowerCase()}-details-title`}
          onClick={() => setSelectedRecord(null)}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable" onClick={(event) => event.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title h5 fw-bold" id={`${title.toLowerCase()}-details-title`}>
                  {title} details
                </h3>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedRecord(null)} />
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table table-sm table-bordered align-middle mb-0">
                    <tbody>
                      {Object.entries(selectedRecord).map(([field, value]) => (
                        <tr key={`${selectedRecord.id || 'selected'}-${field}`}>
                          <th scope="row" className="text-capitalize w-25">
                            {field}
                          </th>
                          <td>
                            <pre className="mb-0 text-break">{formatValue(value)}</pre>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedRecord(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {selectedRecord ? <div className="modal-backdrop fade show" /> : null}
    </section>
  )
}
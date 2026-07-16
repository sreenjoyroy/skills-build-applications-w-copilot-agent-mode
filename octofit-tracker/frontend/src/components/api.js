export function getApiEndpoint(resourceName) {
  const envCodespaceName =
    import.meta.env.VITE_REACT_APP_CODESPACE_NAME || import.meta.env.REACT_APP_CODESPACE_NAME

  if (envCodespaceName) {
    return `https://${envCodespaceName}-8000.app.github.dev/api/${resourceName}/`
  }

  if (typeof window !== 'undefined') {
    const { hostname, origin, protocol } = window.location

    if (hostname.endsWith('.app.github.dev')) {
      const backendHost = hostname.replace(/-\d+\.app\.github\.dev$/, '-8000.app.github.dev')
      return `https://${backendHost}/api/${resourceName}/`
    }

    if (protocol === 'https:') {
      return `${origin}/api/${resourceName}/`
    }
  }

  return `http://localhost:8000/api/${resourceName}/`
}
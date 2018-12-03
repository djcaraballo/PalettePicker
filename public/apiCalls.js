export const fetchData = async (url) => {
  const response = await fetch(url)
  if (response.status >= 300) {
    return 'Error: Failed to fetch data.'
  } else {
    const result = await response.json() 
    return result
  }
}

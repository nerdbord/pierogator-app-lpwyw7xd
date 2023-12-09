'use server'

export async function getPublicDumplings() {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes',
      { method: 'GET' },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    return res.recipes
  } catch (error) {
    console.error('Error fetching public dumplings:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

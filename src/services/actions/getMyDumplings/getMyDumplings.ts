'use server'

export async function getMyDumplings() {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes/me',
      {
        method: 'GET',
        headers: {
          Authorization: `${process.env.API_KEY}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    return res
  } catch (error) {
    console.error('Error fetching my dumplings:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

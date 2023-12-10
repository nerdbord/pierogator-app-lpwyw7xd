'use server'

export async function deleteDumpling(id: string) {
  try {
    const response = await fetch(
      `https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `${process.env.API_KEY_NERDBORD}`,
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
    console.error('Error deleting dumpling:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

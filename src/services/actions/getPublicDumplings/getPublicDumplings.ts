'use server'
import { revalidatePath } from "next/cache";

export async function getPublicDumplings() {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes',
      {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    revalidatePath("/dumplinghub")
    return res.recipes
  } catch (error) {
    console.error('Error fetching public dumplings:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

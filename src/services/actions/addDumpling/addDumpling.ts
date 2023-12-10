'use server'

import type { DumplingRecipe } from '@/types/types'

export async function addDumpling(payload: DumplingRecipe) {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/pierogator/dumpling-recipes',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.API_KEY_NERDBORD}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        body: JSON.stringify(payload),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    return res
  } catch (error) {
    console.error('Error adding new dumpling:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

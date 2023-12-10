'use server'
import { revalidatePath } from 'next/cache'

export async function generateImage(prompt: string) {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/openai/images/generations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.API_KEY_GPT}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt: prompt,
          n: 1,
          size: '1024x1024',
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    const imgUrl = res.data[0]?.url
    revalidatePath('/')
    return imgUrl
  } catch (error) {
    console.error('Error during GPT fetch:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

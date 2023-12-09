'use server'

export async function generateName(prompt: string) {
  try {
    const response = await fetch(
      'https://training.nerdbord.io/api/v1/openai/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${process.env.API_KEY}`,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        }),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const res = await response.json()
    const name = res.choices[0].message.content
    return name
  } catch (error) {
    console.error('Error during GPT fetch:', error)
    throw new Error(`HTTP error! status: ${error}`)
  }
}

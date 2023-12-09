'use server'

async function fetchFromAPI(prompt: string) {
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
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
      }),
    },
  )

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

export async function generateIngredients() {
  const doughPrompt = `podaj losowy opis ciasta na pierogi, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe ciasto blablabla" tylko podaj po prostu opis ciasta. opis ma być krótki np. "cienkie, elastyczne ciasto, klasyczny polski przepis z jajkami". tylko nie pisz z jakich składników.  Bez id: ${Math.floor(
    Math.random() * 1000,
  )} `
  const fillingPrompt = `podaj losowy opis nadzienia do pierogów, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe nadzienie blablabla" tylko podaj po prostu krótki opis nadzienia. opis ma być krótki np. "aksamitne tradycyjne wytrawne nadzienie". tylko nie pisz z jakich składników.  Bez id: ${Math.floor(
    Math.random() * 1000,
  )}`
  const ingredientsPrompt = `podaj losowy opis składników do pierogów, nie pisz nic więcej chujku mały, i nie zaczynaj zdania od "oto losowe składniki blablabla" tylko podaj po prostu krótkie składniki. opis ma być krótki np. "cebula, feta, szpinak".  Bez id: ${Math.floor(
    Math.random() * 1000,
  )}`

  const dough = await fetchFromAPI(doughPrompt)
  const filling = await fetchFromAPI(fillingPrompt)
  const ingredients = await fetchFromAPI(ingredientsPrompt)

  return { dough, filling, ingredients }
}

'use server'
interface GenerateRecipeProps {
  doughDescription: string
  ingredientsDescription: string
}
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

export async function generateRecipe({
  doughDescription,
  ingredientsDescription
}: GenerateRecipeProps) {
  const doughIngredientsPrompt = ` WYŚWIETL PRZYKŁADOWE SKŁADNIKI NA CIASTO (${doughDescription}) DO PIEROGÓW W PONUMEROWANEJ LIŚCIE. LISTĘ <UL> POPRZEDŹ ZNAKIEM SPECJALNYM "$" TYLKO JEDEN RAZ "1. nazwa składnika ilosc składnika
  2. nazwa składnika ilosc składnika
  3. nazwa składnika ilosc składnika
  4. nazwa składnika ilosc składnika". ZACHOWAJ FORMAT PONUMEROWANEJ LISTY NIE PISZ NIC WIĘCEJ Następnie liste oddziel znakiem % i po tym znaku podaj przykładowy sposób przygotowaia ciasta  Bez id: ${Math.floor(Math.random() * 1000)} `

  const fillingIngredientsPrompt = `WYŚWIETL PRZYKŁADOWE SKŁADNIKI NA FARSZ (np. te${ingredientsDescription}) DO PIEROGÓW W PONUMEROWANEJ LIŚCIE. LISTĘ <UL> POPRZEDŹ ZNAKIEM SPECJALNYM "#" TYLKO JEDEN RAZ  "1. nazwa składnika, ilosc składnika
  2. nazwa składnika, ilosc składnika
  3. nazwa składnika, ilosc składnika
  4. nazwa składnika, ilosc składnika". ZACHOWAJ FORMAT PONUMEROWANEJ LISTY NIE PISZ NIC WIĘCEJ Następnie liste oddziel znakiem % i po tym znaku podaj przykładowy sposób przygotowaia farszu. Nasstępnie oddziel to znakiem & i podaj przykładowy sposób przygotowania i gotowania pierogów z takim farszem. następnie oddziel to znakiem ^ i podaj przykładowy sposób serwowania pierogów Bez id: ${Math.floor(Math.random() * 1000)} `

  const doughIngredients = await fetchFromAPI(doughIngredientsPrompt)
  const fillingIngredients = await fetchFromAPI(fillingIngredientsPrompt)

  return { doughIngredients, fillingIngredients }
}

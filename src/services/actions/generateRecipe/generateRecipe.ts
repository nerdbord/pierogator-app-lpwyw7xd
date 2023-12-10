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

export async function generateRecipe({doughDescription, ingredientsDescription}: GenerateRecipeProps) {
  const prompt1 = `UTWÓRZ PIEROGI.JSON - WYŚWIETL LOSOWE SKŁADNIKI PIEROGÓW, SKŁADNIKI DOWOLNE, UZUPEŁNIJ CAŁY JSON, PODSTAW LOSOWE DANE TYLKO INNE NIŻ PRZYKŁADZIE NIŻEJ, MOŻESZ SIĘ WZOROWAĆ NA OPISIE CIASTA I SKŁADNIKÓW - ${doughDescription}, ${ingredientsDescription}
  
  "ingredients": {
    "dough": [
      { "name": "Mąka", "quantity": "2 szklanki" },
      { "name": "Woda", "quantity": "1 szklanka" }
      { "name": "Płatki owsiane", "quantity": "50g" }
    ],
    "filling": [
      { "name": "ziemniaki", "quantity": "1 kilogram" },
      { "name": "cebula", "quantity": "1 kilogram" }
      { "name": "tuńczyk", "quantity": "100 g" }
      { "name": "Orzechy włoskie", "quantity": "garść" }
    ]
  }

  TO WSZYSTKO PODAJ W POWYŻSZYM FORMACIE CZYLI JSON
Bez id: ${Math.floor(Math.random() * 1000)}`

const prompt2 = `UTWÓRZ PIEROGI.JSON - WYŚWIETL LOSOWE PRZYGOTOWANIE CIASTA I FARSZU PIEROGÓW, SKŁADNIKI DOWOLNE, UZUPEŁNIJ CAŁY JSON, PODSTAW LOSOWE DANE TYLKO INNE NIŻ PRZYKŁADZIE NIŻEJ, MOŻESZ SIĘ WZOROWAĆ NA OPISIE CIASTA I SKŁADNIKÓW - ${doughDescription}, ${ingredientsDescription}
  
"instructions": {
  "dough_preparation": [
    "wymieszaj mąke",
    "wbij jajka",
    "dolej mleka i wymieszaj"
  ],
  "filling_preparation": [
    "ugotuj ziemniaki",
    "pokrój cebule",
    "dodaj orzechy i wymieszaj"
  ]

TO WSZYSTKO PODAJ W POWYŻSZYM FORMACIE CZYLI JSON
Bez id: ${Math.floor(Math.random() * 1000)}`

const prompt3 = `UTWÓRZ PIEROGI.JSON - WYŚWIETL LOSOWY SPOSÓB FORMOWANIA I SERWOWANIA PIEROGÓW, SKŁADNIKI DOWOLNE, UZUPEŁNIJ CAŁY JSON, PODSTAW SPOSOBY FORMOWANIA I SERWOWANIA TYLKO INNE NIŻ W PRZYKŁADZIE NIŻEJ, MOŻESZ SIĘ WZOROWAĆ NA OPISIE CIASTA I SKŁADNIKÓW - ${doughDescription}, ${ingredientsDescription}

"instructions": { 
"cooking": [
  "Posyp mąką",
  "Nałóż farsz",
  "Zawiń pierogi"
],
"serving": [
  "Gotuj pierogi 5 minut",
  "Podawaj gorące",
  "Polej ulubionym sosem",
]

TO WSZYSTKO PODAJ W POWYŻSZYM FORMACIE CZYLI JSON
Bez id: ${Math.floor(Math.random() * 1000)}`


const ingredients= await fetchFromAPI(prompt1)
const preparation = await fetchFromAPI(prompt2)
const cookingServing = await fetchFromAPI(prompt3)
return { ingredients, preparation, cookingServing }

}

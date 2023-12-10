type FakeDatabaseType = {
  [key: string]: {
    name: string;
    quantity: string;
  }[][] | string[][];
};

export const fakeDatabase: FakeDatabaseType = {
  dough: [
    [
      { name: 'Mąka pszenna', quantity: '2 szklanki' },
      { name: 'Woda ciepła', quantity: '1 szklanka' },
      { name: 'Drożdże świeże', quantity: '25g' },
      { name: 'Oliwa z oliwek', quantity: '2 łyżki' },
      { name: 'Szczypta soli', quantity: 'wg gustu' },
    ],
    [
      { name: 'Mąka żytnia', quantity: '3 szklanki' },
      { name: 'Mleko', quantity: '1/2 szklanki' },
      { name: 'Masło', quantity: '50g' },
      { name: 'Cukier', quantity: '1 łyżka' },
      { name: 'Sól', quantity: '1 łyżeczka' },
    ],
    [
      { name: 'Mąka orkiszowa', quantity: '2.5 szklanki' },
      { name: 'Woda mineralna', quantity: '1.5 szklanki' },
      { name: 'Olej roślinny', quantity: '3 łyżki' },
      { name: 'Drożdże instant', quantity: '30g' },
      { name: 'Cukier waniliowy', quantity: '1 łyżeczka' },
    ],
    [
      { name: 'Mąka kukurydziana', quantity: '2 szklanki' },
      { name: 'Jogurt naturalny', quantity: '1 szklanka' },
      { name: 'Jajko', quantity: '1 sztuka' },
      { name: 'Proszek do pieczenia', quantity: '1 łyżeczka' },
      { name: 'Miód', quantity: '2 łyżki' },
    ],
    [
      { name: 'Mąka graham', quantity: '3 szklanki' },
      { name: 'Kefir', quantity: '1 szklanka' },
      { name: 'Drożdże piekarnicze', quantity: '15g' },
      { name: 'Oliwa z oliwek extra virgin', quantity: '4 łyżki' },
      { name: 'Sól morska', quantity: '1 łyżka' },
    ],
  ],
  filling: [
    [
      { name: 'Ser biały', quantity: '500g' },
      { name: 'Ziemniaki ugotowane', quantity: '1kg' },
      { name: 'Cebula drobno posiekana', quantity: '2 sztuki' },
      { name: 'Pieprz czarny mielony', quantity: 'do smaku' },
      { name: 'Sól', quantity: 'do smaku' },
    ],
    [
      { name: 'Mięso mielone', quantity: '500g' },
      { name: 'Pieczarki', quantity: '250g' },
      { name: 'Cebula', quantity: '1 sztuka' },
      { name: 'Czosnek', quantity: '3 ząbki' },
    ],
    [
      { name: 'Kapusta kiszona', quantity: '600g' },
      { name: 'Grzyby suszone', quantity: '100g' },
      { name: 'Cebula', quantity: '1 sztuka' },
      { name: 'Marchew', quantity: '1 sztuka' },
      { name: 'Olej', quantity: '2 łyżki' },
    ],
    [
      { name: 'Ricotta', quantity: '400g' },
      { name: 'Szpinak', quantity: '200g' },
      { name: 'Orzechy włoskie', quantity: '50g' },
      { name: 'Parmezan', quantity: '50g' },
    ],
    [
      { name: 'Jabłko', quantity: '3 sztuki' },
      { name: 'Cukier', quantity: '100g' },
      { name: 'Cynamon', quantity: '1 łyżeczka' },
      { name: 'Rodzynki', quantity: '50g' },
    ]
  ],
  dough_preparation: [
    [
      'Wymieszaj mąkę z drożdżami i solą.',
      'Dodaj ciepłą wodę i oliwę, wyrabiaj ciasto do uzyskania gładkości.',
      'Odstaw ciasto w ciepłe miejsce do wyrośnięcia na około 30 minut.'
    ],
    [
      'Połącz mąkę, sól i cukier w dużej misce.',
      'Dodaj stopione masło i mieszaj, aż powstanie jednolita masa.',
      'Stopniowo dodawaj wodę, wyrabiając ciasto, aż będzie elastyczne.'
    ],
    [
      'W małej misce wymieszaj drożdże z letnią wodą, aż się rozpuszczą.',
      'W dużej misce wymieszaj mąkę, sól, dodaj rozmieszczone drożdże.',
      'Wyrabiaj ciasto, aż będzie gładkie, następnie przykryj i odstaw do wyrośnięcia.'
    ],
    [
      'Wymieszaj mąkę orkiszową i sól w misce.',
      'Dodaj ciepłe mleko i rozpuszczone drożdże, mieszaj do połączenia składników.',
      'Odstaw ciasto do wyrośnięcia w ciepłym miejscu na 45 minut.'
    ],
    [
      'W dużej misce wymieszaj mąkę, sól i cukier.',
      'Dodaj zimną wodę i szybko wyrabiaj ciasto, aż zacznie odchodzić od rąk.',
      'Uformuj kulkę z ciasta, owiń folią i odstaw do lodówki na co najmniej 1 godzinę.'
    ]
  ],
  filling_preparation: [
    [
      'Ziemniaki ugotuj, a następnie ugnieć na puree.',
      'Cebulę podsmaż na złoty kolor i dodaj do serka.',
      'Do masy serowo-ziemniaczanej dodaj sól i pieprz do smaku, wymieszaj.'
    ],
    [
      'Mięso mielone smaż na patelni do zrumienienia.',
      'Dodaj posiekaną cebulę i czosnek, smaż do miękkości.',
      'Przypraw mięso solą, pieprzem i ziołami, odstaw do ostygnięcia.'
    ],
    [
      'Kapustę drobno poszatkuj i zalej wrzątkiem.',
      'Dodaj starte jabłko i cebulę, smaż na patelni.',
      'Dopraw kapustę solą, pieprzem i odrobiną cukru, mieszaj do połączenia składników.'
    ],
    [
      'Grzyby namocz w ciepłej wodzie, a następnie drobno posiekaj.',
      'Cebulę zeszklij na maśle, dodaj grzyby, smaż do odparowania wody.',
      'Dodaj natkę pietruszki i przyprawy, wymieszaj wszystko razem.'
    ],
    [
      'Ser biały wymieszaj z drobno posiekanym koperkiem.',
      'Dodaj posiekaną wędzoną rybę i wymieszaj do uzyskania jednolitej masy.',
      'Dopraw nadzienie solą, pieprzem i sokiem z cytryny.'
    ]
  ],
  cooking: [
    [
      'Na stolnicy posypanej mąką rozwałkuj ciasto na cienkie placki.',
      'Na każdy placek nałóż porcję farszu.',
      'Zlep brzegi ciasta, formując pierogi.',
      'Gotuj pierogi w osolonej wodzie do wypłynięcia na powierzchnię.'
    ],
    [
      'Rozwałkuj ciasto na grubość około 3 mm.',
      'Wytnij kółka przy pomocy szklanki lub foremki.',
      'Na środek każdego kółka nałóż łyżeczkę farszu.',
      'Zlep brzegi, tworząc półksiężyce.',
      'Gotuj pierogi w dużym garnku z osoloną wodą przez około 5 minut.'
    ],
    [
      'Rozgrzej piekarnik do 180 stopni Celsjusza.',
      'Uformuj pierogi i ułóż je na blaszce wyłożonej papierem do pieczenia.',
      'Piecz pierogi przez 20-25 minut, aż będą złociste.'
    ],
    [
      'Ciasto rozwałkuj na grubość 2 mm.',
      'Wykrawaj kwadraty, na środek każdego nałóż farsz.',
      'Formuj pierogi, składając kwadraty na pół, by utworzyć trójkąty.',
      'Gotuj pierogi w bulionie warzywnym przez 6-7 minut.'
    ],
    [
      'Rozwałkuj ciasto i wykrawaj dowolne kształty za pomocą foremek.',
      'Na środek każdego kształtu nałóż farsz.',
      'Zamknij pierogi, używając widelca do zaciśnięcia brzegów.',
      'Gotuj w parowarze przez 10 minut.'
    ]
  ],
  serving: [
    [
      'Podawaj pierogi gorące, polane roztopionym masłem.',
      'Możesz również podać je z cebulką podsmażoną na złoty kolor.',
      'Pierogi świetnie komponują się z kwaśną śmietaną.'
    ],
    [
      'Udekoruj pierogi świeżymi ziołami, takimi jak koperek lub pietruszka.',
      'Podawaj z sosem grzybowym lub mięsnym.',
      'Dodaj kwaśną śmietanę dla złagodzenia smaku.'
    ],
    [
      'Podawaj pierogi z chrupiącym boczkiem.',
      'Dodaj sałatkę z surowych warzyw, aby zrównoważyć smaki.',
      'Spróbuj z sosem pomidorowym lub pesto.'
    ],
    [
      'Podawaj pierogi z dodatkiem świeżego sera twarogowego na wierzchu.',
      'Spróbuj z sosem czosnkowym lub sosem tzatziki.',
      'Pierogi są również pyszne z marynowanymi ogórkami.'
    ],
    [
      'Podawaj pierogi z prażonymi ziarnami sezamu lub słonecznika.',
      'Możesz również zaoferować pikantny sos chili do maczania.',
      'Dodaj odrobinę świeżo zmielonego pieprzu dla intensywniejszego smaku.'
    ]
  ],
}

export default fakeDatabase


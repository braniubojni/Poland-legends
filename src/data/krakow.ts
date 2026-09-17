import type { Story } from "./types";

export const krakowStories: Story[] = [
  {
    id: "hejnal",
    cityId: "krakow",
    title: { en: "The broken call", pl: "Urwany hejnał" },
    place: { en: "St Mary’s Basilica", pl: "Kościół Mariacki" },
    pin: { lat: 50.0616, lng: 19.9394 },
    image: { light: "/stories/hejnal.webp", dark: "/stories/hejnal-dark.webp" },
    legend: {
      en: "During a Tatar raid a watchman on the taller tower sounded the alarm. An arrow struck his throat. The melody breaks off mid-phrase. The gates closed in time.",
      pl: "Podczas najazdu tatarskiego strażnik na wyższej wieży zagrał alarm. Strzała przeszyła mu gardło. Melodia urywa się w pół frazy. Bramy zdążono zamknąć.",
    },
    fact: {
      en: "The call is real and old. City pay records name a trumpeter at St Mary’s in 1392. Hejnał comes from Hungarian hajnal — dawn. It marked gates, fire, and danger. Firefighters still play it hourly to four directions. The arrow tale as we know it was written in the 1920s and spread by Eric P. Kelly’s The Trumpeter of Krakow (1928).",
      pl: "Hejnał jest prawdziwy i stary. Miejskie rachunki z 1392 roku płacą trębaczowi na Mariackim. Słowo hejnał pochodzi od węgierskiego hajnal — świt. Służył do bram, pożaru i alarmu. Strażacy wciąż grają go co godzinę na cztery strony świata. Historia o strzale, jaką znamy, powstała w latach 20. XX wieku i rozeszła się dzięki powieści Erica P. Kelly’ego The Trumpeter of Krakow (1928).",
    },
    seeToday: {
      en: "Stand on the Rynek at any full hour. Look at the taller tower — the hejnalica. At noon the same call goes out on Polish Radio.",
      pl: "Stań na Rynku o pełnej godzinie. Patrz na wyższą wieżę — hejnalicę. W południe ten sam hejnał idzie w Polskie Radio.",
    },
    game: {
      kind: "quiz",
      questions: [
        {
          id: "q1",
          prompt: {
            en: "When is a trumpeter at St Mary’s first documented?",
            pl: "Kiedy po raz pierwszy udokumentowano trębacza na Mariackim?",
          },
          options: [
            { id: "a", label: { en: "1241, during a Tatar siege", pl: "1241, podczas oblężenia tatarskiego" } },
            { id: "b", label: { en: "1392, in city pay records", pl: "1392, w miejskich rachunkach" } },
            { id: "c", label: { en: "1928, in Kelly’s novel", pl: "1928, w powieści Kelly’ego" } },
          ],
          correctId: "b",
          explanation: {
            en: "The payroll is the oldest hard date. The 1241 raid is history; tying the broken note to an arrow is not.",
            pl: "Lista płac to najstarsza twarda data. Najazd z 1241 roku jest historią; powiązanie urwanego dźwięku ze strzałą — już nie.",
          },
        },
        {
          id: "q2",
          prompt: {
            en: "Where does the word hejnał come from?",
            pl: "Skąd pochodzi słowo hejnał?",
          },
          options: [
            { id: "a", label: { en: "Hungarian hajnal, “dawn”", pl: "Węgierskie hajnal, „świt”" } },
            { id: "b", label: { en: "Latin hymnus", pl: "Łacińskie hymnus" } },
            { id: "c", label: { en: "Old Polish for “arrow”", pl: "Staropolskie słowo na „strzałę”" } },
          ],
          correctId: "a",
          explanation: {
            en: "The Hungarian court of Louis and Jadwiga fits the late-14th-century date.",
            pl: "Węgierski dwór Ludwika i Jadwigi pasuje do daty z końca XIV wieku.",
          },
        },
        {
          id: "q3",
          prompt: {
            en: "Who plays the hejnał today?",
            pl: "Kto dziś gra hejnał?",
          },
          options: [
            { id: "a", label: { en: "The cathedral choir", pl: "Chór katedralny" } },
            { id: "b", label: { en: "City firefighters", pl: "Strażacy miejscy" } },
            { id: "c", label: { en: "A military band", pl: "Orkiestra wojskowa" } },
          ],
          correctId: "b",
          explanation: {
            en: "A seven-person firefighter unit still keeps the watch. They play to four directions every hour.",
            pl: "Siedmioosobowy oddział strażaków wciąż trzyma wartę. Grają na cztery strony świata co godzinę.",
          },
        },
        {
          id: "q4",
          prompt: {
            en: "The Tatar-arrow story as tourists hear it was popularized in…",
            pl: "Historię o tatarskiej strzale, jaką słyszą turyści, spopularyzowano w…",
          },
          options: [
            { id: "a", label: { en: "A 13th-century chronicle", pl: "Kronice z XIII wieku" } },
            { id: "b", label: { en: "A 1928 American novel", pl: "Amerykańskiej powieści z 1928 roku" } },
            { id: "c", label: { en: "A royal decree of Casimir", pl: "Dekrecie Kazimierza Wielkiego" } },
          ],
          correctId: "b",
          explanation: {
            en: "Keep the legend. Just do not file it as a medieval court record.",
            pl: "Zostaw legendę. Tylko nie wpinaj jej do średniowiecznych akt.",
          },
        },
      ],
    },
  },
  {
    id: "smok",
    cityId: "krakow",
    title: { en: "The Wawel dragon", pl: "Smok wawelski" },
    place: { en: "Wawel Hill", pl: "Wzgórze wawelskie" },
    pin: { lat: 50.0530, lng: 19.9334 },
    image: { light: "/stories/smok.webp", dark: "/stories/smok-dark.webp" },
    legend: {
      en: "A dragon lived under the hill and ate livestock — and, in darker tellings, people. Knights failed. A clever cobbler (Skuba) left a sulfur-stuffed skin. The beast drank the Vistula and burst. The city took the name of Krak.",
      pl: "Smok mieszkał pod wzgórzem i pożerał bydło — w mroczniejszych wersjach także ludzi. Rycerze nic nie wskórali. Sprytny szewczyk Skuba zostawił skórę wypchaną siarką. Bestia wypiła Wisłę i pękła. Miasto wzięło imię Kraka.",
    },
    fact: {
      en: "The oldest written version is Bishop Wincenty Kadłubek’s chronicle (turn of the 12th/13th century): Krak’s sons feed the monster sulfur-stuffed cattle. The popular cobbler arrives later. The cave is a real limestone den. Bones hung at the cathedral were long called dragon bones; they are prehistoric.",
      pl: "Najstarszy zapis to kronika biskupa Wincentego Kadłubka (przełom XII i XIII w.): synowie Kraka karmią potwora bydłem z siarką. Popularny szewczyk pojawia się później. Jaskinia jest prawdziwą wapienną grotą. Kości przy katedrze długo zwano smoczymi; są prehistoryczne.",
    },
    seeToday: {
      en: "Walk down to the Vistula. The bronze dragon breathes fire every few minutes. The den can be walked in season.",
      pl: "Zejdź nad Wisłę. Spiżowy smok zieje ogniem co kilka minut. Jamę można zwiedzać sezonowo.",
    },
    game: {
      kind: "order",
      prompt: {
        en: "Put the tale in order.",
        pl: "Ułóż opowieść po kolei.",
      },
      steps: [
        { id: "den", label: { en: "A dragon nests under Wawel", pl: "Smok gnieździ się pod Wawelem" } },
        { id: "tribute", label: { en: "The town pays tribute in cattle", pl: "Gród płaci haracz bydłem" } },
        { id: "sulfur", label: { en: "A sulfur-stuffed skin is left as bait", pl: "Skóra z siarką zostaje jako przynęta" } },
        { id: "burst", label: { en: "The dragon drinks the river and bursts", pl: "Smok pije rzekę i pęka" } },
      ],
      correct: ["den", "tribute", "sulfur", "burst"],
    },
  },
  {
    id: "wieze",
    cityId: "krakow",
    title: { en: "Two unequal towers", pl: "Dwie nierówne wieże" },
    place: { en: "St Mary’s towers", pl: "Wieże mariackie" },
    pin: { lat: 50.06185, lng: 19.93975 },
    image: { light: "/stories/wieze.webp", dark: "/stories/wieze-dark.webp" },
    legend: {
      en: "Two brothers were hired to raise the towers. One murdered the other so his tower would stand taller. He finished the work, then killed himself with the same knife. The shorter tower is the unfinished guilt.",
      pl: "Dwóch braci miało wznieść wieże. Jeden zabił drugiego, by jego wieża była wyższa. Dokończył robotę i przebił się tym samym nożem. Niższa wieża to niedokończona wina.",
    },
    fact: {
      en: "The towers really differ. The northern one — the hejnalica — is about 81 metres with a sharp Gothic crown. The other is lower, with a Renaissance helm. That is design and centuries of rebuilding, not a documented fratricide.",
      pl: "Wieże naprawdę się różnią. Północna — hejnalica — ma około 81 metrów i ostry gotycki hełm. Druga jest niższa, z renesansowym zwieńczeniem. To projekt i wieki przebudów, nie udokumentowane bratobójstwo.",
    },
    seeToday: {
      en: "Stand by the Cloth Hall and compare the silhouettes. The taller tower is the one that still speaks every hour.",
      pl: "Stań przy Sukiennicach i porównaj sylwetki. Z wyższej wieży miasto wciąż odzywa się co godzinę.",
    },
    game: {
      kind: "towers",
      prompt: {
        en: "Which tower does the trumpeter play from?",
        pl: "Z której wieży gra trębacz?",
      },
      explanation: {
        en: "The taller northern tower is the hejnalica. The shorter one never held the watch.",
        pl: "Wyższa, północna wieża to hejnalica. Niższa nigdy nie była wartownią.",
      },
    },
  },
  {
    id: "lajkonik",
    cityId: "krakow",
    title: { en: "The hobby-horse Tatar", pl: "Lajkonik" },
    place: { en: "Zwierzyniec to the Rynek", pl: "Zwierzyniec — Rynek" },
    pin: { lat: 50.0545, lng: 19.9145 },
    image: { light: "/stories/lajkonik.webp", dark: "/stories/lajkonik-dark.webp" },
    legend: {
      en: "Tatars camped by the Vistula near Zwierzyniec. Raftsmen (włóczkowie) struck first, killed a commander, and rode into town in his clothes. The city was saved. The ride is repeated every year.",
      pl: "Tatarzy stanęli nad Wisłą koło Zwierzyńca. Włóczkowie uderzyli pierwsi, zabili wodza i wjechali do miasta w jego stroju. Grodu uratowano. Przejazd powtarza się co roku.",
    },
    fact: {
      en: "The parade is old — at least since 1738 — and still runs on the Thursday in the octave of Corpus Christi. The neat Tatar-victory plot was written down in 1820 by Konstanty Majeranowski. A man in a Tatar costume on a wooden horse still collects tribute and taps spectators with a mace for luck.",
      pl: "Pochód jest stary — co najmniej od 1738 roku — i wciąż idzie w czwartek w oktawie Bożego Ciała. Zgrabną fabułę o zwycięstwie nad Tatarami spisał w 1820 roku Konstanty Majeranowski. Człowiek w tatarskim stroju na drewnianym koniku wciąż zbiera haracz i uderza buławą na szczęście.",
    },
    seeToday: {
      en: "Catch the parade on the Thursday after Corpus Christi, Zwierzyniec to the Rynek. The costume lives year-round in the Museum of Kraków.",
      pl: "Pochód: czwartek po Bożym Ciele, ze Zwierzyńca na Rynek. Strój przez cały rok jest w Muzeum Krakowa.",
    },
    game: {
      kind: "order",
      prompt: {
        en: "Tap the ride in order.",
        pl: "Wskaż przejazd po kolei.",
      },
      steps: [
        { id: "camp", label: { en: "Raiders camp near Zwierzyniec", pl: "Najeźdźcy obozują koło Zwierzyńca" } },
        { id: "rafts", label: { en: "Raftsmen attack first", pl: "Włóczkowie atakują pierwsi" } },
        { id: "dress", label: { en: "The leader puts on Tatar dress", pl: "Przywódca wkłada tatarski strój" } },
        { id: "square", label: { en: "A triumphant ride to the Rynek", pl: "Triumfalny wjazd na Rynek" } },
      ],
      correct: ["camp", "rafts", "dress", "square"],
    },
  },
  {
    id: "golebie",
    cityId: "krakow",
    title: { en: "The square’s pigeons", pl: "Gołębie na Rynku" },
    place: { en: "Main Market Square", pl: "Rynek Główny" },
    pin: { lat: 50.06135, lng: 19.9370 },
    image: { light: "/stories/golebie.webp", dark: "/stories/golebie-dark.webp" },
    legend: {
      en: "They are not ordinary birds. Knights who betrayed a duke were turned into pigeons by a witch and doomed to circle the square until a just king undid the spell.",
      pl: "To nie zwykłe ptaki. Rycerzy, którzy zdradzili księcia, wiedźma zamieniła w gołębie. Krążą po Rynku, aż sprawiedliwy król zdjąłby urok.",
    },
    fact: {
      en: "The flock is real; the curse is a later folk tale, often tied to Henryk Probus. Feeding is restricted — grain and breadcrumbs harm the birds and the stone. Look, do not feed.",
      pl: "Stado jest prawdziwe; klątwa to późniejsza opowieść, często wiązana z Henrykiem Pobożnym. Karmienie jest ograniczone — ziarno i bułka szkodzą ptakom i kamieniowi. Patrz, nie karm.",
    },
    seeToday: {
      en: "They still work the flags of the Cloth Hall. Leave the bag in your pocket.",
      pl: "Wciąż krążą przy Sukiennicach. Schowaj torebkę z karmą.",
    },
    game: {
      kind: "quiz",
      questions: [
        {
          id: "g1",
          prompt: {
            en: "In the legend, what were the pigeons before the spell?",
            pl: "W legendzie kim były gołębie przed urokiem?",
          },
          options: [
            { id: "a", label: { en: "Knights", pl: "Rycerzami" } },
            { id: "b", label: { en: "Royal messengers", pl: "Królewskimi posłańcami" } },
            { id: "c", label: { en: "Monks of Tyniec", pl: "Mnichami z Tyńca" } },
          ],
          correctId: "a",
          explanation: {
            en: "A betrayal, a witch, a square full of grey coats. Typical Kraków: a curse you can still photograph.",
            pl: "Zdrada, wiedźma, rynek pełen szarych płaszczy. Typowy Kraków: klątwa, którą wciąż można sfotografować.",
          },
        },
        {
          id: "g2",
          prompt: {
            en: "Should you feed them?",
            pl: "Czy trzeba je karmić?",
          },
          options: [
            { id: "a", label: { en: "Yes — it is a local custom", pl: "Tak — to lokalny zwyczaj" } },
            { id: "b", label: { en: "No — feeding is restricted and harms them", pl: "Nie — karmienie jest ograniczone i im szkodzi" } },
            { id: "c", label: { en: "Only on Easter Monday", pl: "Tylko w lany poniedziałek" } },
          ],
          correctId: "b",
          explanation: {
            en: "The useful half of this pin: bread is not kindness here.",
            pl: "Praktyczna połowa tej pinezki: chleb nie jest tu dobrocią.",
          },
        },
        {
          id: "g3",
          prompt: {
            en: "The curse is usually attached to which ruler?",
            pl: "Klątwę zwykle wiąże się z którym władcą?",
          },
          options: [
            { id: "a", label: { en: "Casimir the Great", pl: "Kazimierzem Wielkim" } },
            { id: "b", label: { en: "Henryk Probus", pl: "Henrykiem Pobożnym / Probusem" } },
            { id: "c", label: { en: "John III Sobieski", pl: "Janem III Sobieskim" } },
          ],
          correctId: "b",
          explanation: {
            en: "A 13th-century Silesian duke, not a tourist-board invention of the Renaissance.",
            pl: "Trzynastowieczny śląski książę, nie wymysł renesansowego biura turystycznego.",
          },
        },
      ],
    },
  },
  {
    id: "rynek",
    cityId: "krakow",
    title: { en: "A city drawn with a ruler", pl: "Miasto od linijki" },
    place: { en: "Main Market Square", pl: "Rynek Główny" },
    pin: { lat: 50.06155, lng: 19.9374 },
    image: { light: "/stories/rynek.webp", dark: "/stories/rynek-dark.webp" },
    legend: {
      en: "Kraków feels inevitable — as if the square had always been there. The founding stories prefer kings, dragons, and fate.",
      pl: "Kraków wydaje się oczywisty — jakby Rynek był tu od zawsze. Opowieści założycielskie wolą królów, smoki i przeznaczenie.",
    },
    fact: {
      en: "In 1257 Duke Bolesław V the Chaste chartered Kraków under Magdeburg law after the Tatar destruction of 1241. The Rynek was laid out as a planned grid — about 200 by 200 metres, one of the largest medieval squares in Europe. The Cloth Hall sits on the original trade axis. This is the hard-history pin: a city rebuilt on purpose.",
      pl: "W 1257 roku książę Bolesław V Wstydliwy lokował Kraków na prawie magdeburskim po zniszczeniach tatarskich z 1241. Rynek wytyczono jako planową sieć — około 200 na 200 metrów, jeden z największych średniowiecznych placów Europy. Sukiennice stoją na osi handlu. To pinezka twardej historii: miasto odbudowane z zamysłu.",
    },
    seeToday: {
      en: "Walk the square edge to edge. Then go under it — Rynek Underground shows the pre-1257 streets still in the ground.",
      pl: "Przejdź Rynek od krawędzi do krawędzi. Potem zejdź pod spód — Rynek Underground pokazuje ulice sprzed 1257 roku, wciąż w ziemi.",
    },
    game: {
      kind: "quiz",
      questions: [
        {
          id: "r1",
          prompt: {
            en: "In which year was Kraków chartered under Magdeburg law?",
            pl: "W którym roku lokowano Kraków na prawie magdeburskim?",
          },
          options: [
            { id: "a", label: { en: "1000", pl: "1000" } },
            { id: "b", label: { en: "1257", pl: "1257" } },
            { id: "c", label: { en: "1364", pl: "1364" } },
          ],
          correctId: "b",
          explanation: {
            en: "1364 is the university. 1000 is a bishopric. 1257 is the planned town.",
            pl: "1364 to uniwersytet. 1000 to biskupstwo. 1257 to planowe miasto.",
          },
        },
        {
          id: "r2",
          prompt: {
            en: "Who issued the 1257 charter?",
            pl: "Kto wydał przywilej lokacyjny z 1257 roku?",
          },
          options: [
            { id: "a", label: { en: "Bolesław V the Chaste", pl: "Bolesław V Wstydliwy" } },
            { id: "b", label: { en: "Krakus the cobbler", pl: "Krak szewczyk" } },
            { id: "c", label: { en: "Casimir the Great", pl: "Kazimierz Wielki" } },
          ],
          correctId: "a",
          explanation: {
            en: "After the 1241 raid the duke rebuilt with German town law, not with a dragon.",
            pl: "Po najeździe 1241 książę odbudował miasto na niemieckim prawie miejskim, nie ze smokiem.",
          },
        },
        {
          id: "r3",
          prompt: {
            en: "Roughly how wide is the Rynek?",
            pl: "Ile mniej więcej ma Rynek w boku?",
          },
          options: [
            { id: "a", label: { en: "About 80 metres", pl: "Około 80 metrów" } },
            { id: "b", label: { en: "About 200 metres", pl: "Około 200 metrów" } },
            { id: "c", label: { en: "About 600 metres", pl: "Około 600 metrów" } },
          ],
          correctId: "b",
          explanation: {
            en: "Two hundred metres on a side — large enough to hold a town’s trade, small enough to walk in one breath.",
            pl: "Dwieście metrów boku — dość, by pomieścić handel miasta, dość mało, by przejść jednym tchem.",
          },
        },
        {
          id: "r4",
          prompt: {
            en: "What still sits on the original trade axis of the square?",
            pl: "Co wciąż stoi na pierwotnej osi handlu Rynku?",
          },
          options: [
            { id: "a", label: { en: "Wawel Castle", pl: "Zamek Wawelski" } },
            { id: "b", label: { en: "The Cloth Hall (Sukiennice)", pl: "Sukiennice" } },
            { id: "c", label: { en: "The Barbican", pl: "Barbakan" } },
          ],
          correctId: "b",
          explanation: {
            en: "The Cloth Hall is not a later souvenir shed. It is the medieval stall, rebuilt in stone.",
            pl: "Sukiennice to nie późniejszy budynek z pamiątkami. To średniowieczny kram, odbudowany w kamieniu.",
          },
        },
      ],
    },
  },
];

export const storyOrder = krakowStories.map((s) => s.id);

export function getStory(id: string) {
  return krakowStories.find((s) => s.id === id);
}

export function nextStoryId(id: string) {
  const i = storyOrder.indexOf(id);
  if (i < 0 || i === storyOrder.length - 1) return null;
  return storyOrder[i + 1] ?? null;
}

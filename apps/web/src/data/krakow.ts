// GENERATED FILE — do not hand-edit.
// Source of truth: content/. Regenerate with `pnpm gen:content`.
import type { Story } from "./types";

export const krakowStories: Story[] = [
  {
    id: "hejnal",
    cityId: "krakow",
    title: {
      en: "The broken call",
      pl: "Urwany hejnał",
    },
    place: {
      en: "St Mary’s Basilica",
      pl: "Kościół Mariacki",
    },
    pin: {
      lat: 50.0616,
      lng: 19.9394,
    },
    image: {
      light: "/stories/hejnal.webp",
      dark: "/stories/hejnal-dark.webp",
    },
    legend: {
      en: "During a Tatar raid a watchman stood on the taller tower of St Mary’s. He sounded the alarm. An arrow struck his throat, and the melody broke off mid-phrase. The gates closed in time.\n\nThe city kept the broken note. Every hour the call still stops where the watchman stopped.",
      pl: "Podczas najazdu tatarskiego strażnik stał na wyższej wieży Mariackiej. Zagrał alarm. Strzała przeszyła mu gardło, a melodia urwała się w pół frazy. Bramy zdążono zamknąć.\n\nMiasto zatrzymało urwany dźwięk. Co godzinę hejnał wciąż milknie tam, gdzie zamilkł strażnik.",
    },
    fact: {
      en: "The call is real and old. City pay records of 1392 name a trumpeter at St Mary’s. The word hejnał comes from Hungarian hajnal — dawn. It marked the gates, fire, and danger. Firefighters still play it every hour, to four directions. At noon the same call goes out live on Polish Radio, and has done since 1927.\n\nThe arrow tale is young. In 1919 Anna Pruszyńska told it to the American Eric P. Kelly. He published The Trumpeter of Krakow in 1928. Keep the legend. Do not file it as a medieval court record.",
      pl: "Hejnał jest prawdziwy i stary. Miejskie rachunki z 1392 roku wymieniają trębacza na Mariackim. Słowo hejnał pochodzi od węgierskiego hajnal — świt. Oznaczał bramy, pożar i alarm. Strażacy wciąż grają go co godzinę, na cztery strony świata. W południe ten sam sygnał idzie na żywo w Polskim Radiu — od 1927 roku.\n\nHistoria o strzale jest młoda. W 1919 roku Anna Pruszyńska opowiedziała ją Amerykaninowi Ericowi P. Kelly’emu. On wydał The Trumpeter of Krakow w 1928 roku. Zostaw legendę. Nie wpinaj jej do średniowiecznych akt.",
    },
    seeToday: {
      en: "Stand on the Rynek at any full hour and look up at the taller tower — the hejnalica. A small window opens. The trumpeter plays once to each side of the square, and the last note breaks off.\n\nAt noon you can hear the same call on Polish Radio, sent live from the tower.",
      pl: "Stań na Rynku o pełnej godzinie i patrz na wyższą wieżę — hejnalicę. Otwiera się małe okienko. Trębacz gra raz na każdą stronę placu, a ostatni dźwięk się urywa.\n\nW południe ten sam hejnał słychać w Polskim Radiu, nadawany na żywo z wieży.",
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
            {
              id: "a",
              label: {
                en: "1241, during a Tatar siege",
                pl: "1241, podczas oblężenia tatarskiego",
              },
            },
            {
              id: "b",
              label: {
                en: "1392, in city pay records",
                pl: "1392, w miejskich rachunkach",
              },
            },
            {
              id: "c",
              label: {
                en: "1928, in Kelly’s novel",
                pl: "1928, w powieści Kelly’ego",
              },
            },
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
            {
              id: "a",
              label: {
                en: "Hungarian hajnal, “dawn”",
                pl: "Węgierskie hajnal, „świt”",
              },
            },
            {
              id: "b",
              label: {
                en: "Latin hymnus",
                pl: "Łacińskie hymnus",
              },
            },
            {
              id: "c",
              label: {
                en: "Old Polish for “arrow”",
                pl: "Staropolskie słowo na „strzałę”",
              },
            },
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
            {
              id: "a",
              label: {
                en: "The cathedral choir",
                pl: "Chór katedralny",
              },
            },
            {
              id: "b",
              label: {
                en: "City firefighters",
                pl: "Strażacy miejscy",
              },
            },
            {
              id: "c",
              label: {
                en: "A military band",
                pl: "Orkiestra wojskowa",
              },
            },
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
            {
              id: "a",
              label: {
                en: "A 13th-century chronicle",
                pl: "Kronice z XIII wieku",
              },
            },
            {
              id: "b",
              label: {
                en: "A 1928 American novel",
                pl: "Amerykańskiej powieści z 1928 roku",
              },
            },
            {
              id: "c",
              label: {
                en: "A royal decree of Casimir",
                pl: "Dekrecie Kazimierza Wielkiego",
              },
            },
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
    title: {
      en: "The Wawel dragon",
      pl: "Smok wawelski",
    },
    place: {
      en: "Wawel Hill",
      pl: "Wzgórze wawelskie",
    },
    pin: {
      lat: 50.053,
      lng: 19.9334,
    },
    image: {
      light: "/stories/smok.webp",
      dark: "/stories/smok-dark.webp",
    },
    legend: {
      en: "A dragon lived in a den under Wawel and ate the town’s livestock. In darker tellings it ate people too. Knights went down and did not come back.\n\nKrak’s sons — in the later, popular tale, a cobbler named Skuba — stuffed a calf skin with sulfur and left it as bait. The beast swallowed the skin, drank the Vistula to quench the burn, and burst. The city took the name of Krak.",
      pl: "Smok mieszkał w jamie pod Wawelem i pożerał bydło grodu. W mroczniejszych wersjach zjadał także ludzi. Rycerze schodzili w dół i nie wracali.\n\nSynowie Kraka — w późniejszej, popularnej opowieści szewczyk Skuba — wypchali cielęcą skórę siarką i zostawili ją jako przynętę. Bestia połknęła skórę, wypiła Wisłę, żeby ugasić żar, i pękła. Miasto wzięło imię Kraka.",
    },
    fact: {
      en: "The oldest written version is Bishop Wincenty Kadłubek’s chronicle, from the turn of the 12th and 13th centuries. There Krak’s sons feed the monster cattle stuffed with sulfur. The clever cobbler arrives in later tellings.\n\nThe cave is a real limestone den under the hill, open to the river. Bones hung for years by the cathedral were called the dragon’s. They are prehistoric.",
      pl: "Najstarszy zapis to kronika biskupa Wincentego Kadłubka, z przełomu XII i XIII wieku. Tam synowie Kraka karmią potwora bydłem wypchanym siarką. Sprytny szewczyk pojawia się w późniejszych opowieściach.\n\nJaskinia jest prawdziwą wapienną grotą pod wzgórzem, otwartą ku rzece. Kości, które latami wisiały przy katedrze, zwano smoczymi. Są prehistoryczne.",
    },
    seeToday: {
      en: "Walk down from the castle to the Vistula bank. A bronze dragon stands at the cave mouth and breathes fire every few minutes.\n\nIn season you can walk the den itself — low, damp, and short — and come out facing the river.",
      pl: "Zejdź z zamku nad brzeg Wisły. Spiżowy smok stoi u wylotu jamy i co kilka minut zieje ogniem.\n\nSezonowo można przejść samą grotę — niską, wilgotną i krótką — i wyjść twarzą do rzeki.",
    },
    game: {
      kind: "order",
      prompt: {
        en: "Put the tale in order.",
        pl: "Ułóż opowieść po kolei.",
      },
      steps: [
        {
          id: "den",
          label: {
            en: "A dragon nests under Wawel",
            pl: "Smok gnieździ się pod Wawelem",
          },
        },
        {
          id: "tribute",
          label: {
            en: "The town pays tribute in cattle",
            pl: "Gród płaci haracz bydłem",
          },
        },
        {
          id: "sulfur",
          label: {
            en: "A sulfur-stuffed skin is left as bait",
            pl: "Skóra z siarką zostaje jako przynęta",
          },
        },
        {
          id: "burst",
          label: {
            en: "The dragon drinks the river and bursts",
            pl: "Smok pije rzekę i pęka",
          },
        },
      ],
      correct: ["den", "tribute", "sulfur", "burst"],
    },
  },
  {
    id: "wieze",
    cityId: "krakow",
    title: {
      en: "Two unequal towers",
      pl: "Dwie nierówne wieże",
    },
    place: {
      en: "St Mary’s towers",
      pl: "Wieże mariackie",
    },
    pin: {
      lat: 50.06185,
      lng: 19.93975,
    },
    image: {
      light: "/stories/wieze.webp",
      dark: "/stories/wieze-dark.webp",
    },
    legend: {
      en: "Two brothers were hired to raise the towers of St Mary’s. Each wanted his own to stand taller. The one who was winning murdered the other, finished the work, and then killed himself with the same knife.\n\nThe shorter tower was left as it was. People read it as unfinished guilt.",
      pl: "Dwóch braci wynajęto, by wznieśli wieże Mariackie. Każdy chciał, żeby jego była wyższa. Ten, który wygrywał, zabił drugiego, dokończył robotę i przebił się tym samym nożem.\n\nNiższą wieżę zostawiono taką, jaka była. Czyta się ją jako niedokończoną winę.",
    },
    fact: {
      en: "The towers really do not match. The northern one — the hejnalica — is about 81 metres, with a sharp late-Gothic crown. The other is lower, and wears a Renaissance helm. That difference is design and centuries of rebuilding.\n\nNo court record names the brothers or the knife. The fratricide is a legend told about a fact you can see.",
      pl: "Wieże naprawdę do siebie nie pasują. Północna — hejnalica — ma około 81 metrów i ostry późnogotycki hełm. Druga jest niższa i nosi renesansowe zwieńczenie. Ta różnica to projekt i wieki przebudów.\n\nŻaden akt nie wymienia braci ani noża. Bratobójstwo jest legendą opowiedzianą o fakcie, który widać.",
    },
    seeToday: {
      en: "Stand by the Cloth Hall and look at both silhouettes against the sky. The taller, sharper tower is the one that still speaks every hour. The shorter one keeps its rounder helm and stays quiet.",
      pl: "Stań przy Sukiennicach i porównaj obie sylwetki na niebie. Wyższa, ostrzejsza wieża to ta, z której miasto wciąż odzywa się co godzinę. Niższa trzyma okrąglejszy hełm i milczy.",
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
    title: {
      en: "The hobby-horse Tatar",
      pl: "Lajkonik",
    },
    place: {
      en: "Zwierzyniec to the Rynek",
      pl: "Zwierzyniec — Rynek",
    },
    pin: {
      lat: 50.0545,
      lng: 19.9145,
    },
    image: {
      light: "/stories/lajkonik.webp",
      dark: "/stories/lajkonik-dark.webp",
    },
    legend: {
      en: "Tatars camped by the Vistula near Zwierzyniec, during the octave of Corpus Christi. Raftsmen — the włóczkowie — struck first. They killed a commander, put on his clothes, and rode his horse into town.\n\nThe city was saved. Kraków repeats the ride every year: a man in Tatar dress on a hobby horse, a mace, a crowd that pays a small tribute and takes a tap for luck.",
      pl: "Tatarzy stanęli nad Wisłą koło Zwierzyńca, w oktawie Bożego Ciała. Włóczkowie uderzyli pierwsi. Zabili wodza, włożyli jego strój i wjechali na jego koniu do miasta.\n\nGród ocalono. Kraków powtarza ten przejazd co roku: człowiek w tatarskim stroju na drewnianym koniku, buława, tłum, który płaci drobny haracz i bierze uderzenie na szczęście.",
    },
    fact: {
      en: "The parade is old. The first written notice of the Zwierzyniec hobby horse is from 1738, a quarrel after the ride. It still goes out on the Thursday in the octave of Corpus Christi, from Zwierzyniec toward the Rynek.\n\nThe neat plot — raftsmen beating the Tatars — was written down in 1820 by Konstanty Majeranowski, in Pszczółka Krakowska. The costume is kept year-round at the Museum of Kraków.",
      pl: "Pochód jest stary. Pierwsza pisana wzmianka o koniku zwierzynieckim pochodzi z 1738 roku: sprzeczka po przejeździe. Wciąż wychodzi w czwartek w oktawie Bożego Ciała, ze Zwierzyńca w stronę Rynku.\n\nZgrabną fabułę — włóczkowie biją Tatarów — spisał w 1820 roku Konstanty Majeranowski w „Pszczółce Krakowskiej”. Strój przez cały rok trzyma Muzeum Krakowa.",
    },
    seeToday: {
      en: "If you are in Kraków on that Thursday, wait along the route from the Norbertine convent in Zwierzyniec to the Main Market Square. Lajkonik collects a coin and taps passers-by with the mace.\n\nOn any other day the costume is in the Museum of Kraków. Look there, and do not expect the horse on the square.",
      pl: "Jeśli jesteś w Krakowie w ten czwartek, czekaj na trasie od klasztoru norbertanek na Zwierzyńcu po Rynek Główny. Lajkonik zbiera monetę i uderza przechodniów buławą.\n\nW każdy inny dzień strój jest w Muzeum Krakowa. Szukaj go tam i nie czekaj konika na placu.",
    },
    game: {
      kind: "order",
      prompt: {
        en: "Tap the ride in order.",
        pl: "Wskaż przejazd po kolei.",
      },
      steps: [
        {
          id: "camp",
          label: {
            en: "Raiders camp near Zwierzyniec",
            pl: "Najeźdźcy obozują koło Zwierzyńca",
          },
        },
        {
          id: "rafts",
          label: {
            en: "Raftsmen attack first",
            pl: "Włóczkowie atakują pierwsi",
          },
        },
        {
          id: "dress",
          label: {
            en: "The leader puts on Tatar dress",
            pl: "Przywódca wkłada tatarski strój",
          },
        },
        {
          id: "square",
          label: {
            en: "A triumphant ride to the Rynek",
            pl: "Triumfalny wjazd na Rynek",
          },
        },
      ],
      correct: ["camp", "rafts", "dress", "square"],
    },
  },
  {
    id: "golebie",
    cityId: "krakow",
    title: {
      en: "The square’s pigeons",
      pl: "Gołębie na Rynku",
    },
    place: {
      en: "Main Market Square",
      pl: "Rynek Główny",
    },
    pin: {
      lat: 50.06135,
      lng: 19.937,
    },
    image: {
      light: "/stories/golebie.webp",
      dark: "/stories/golebie-dark.webp",
    },
    legend: {
      en: "The pigeons on the Rynek are not ordinary birds. When Duke Henryk IV Probus wanted a crown and had no gold, he went to a witch. She turned his knights into pigeons.\n\nThe birds settled on St Mary’s and pecked at the walls. What fell to the ground became coins. Probus took the gold and set off for Rome, to ask the pope for a kingdom. He feasted the money away on the road and never came back. The knights are still on the square, waiting.",
      pl: "Gołębie na Rynku to nie zwykłe ptaki. Kiedy książę Henryk IV Probus chciał korony, a nie miał złota, poszedł do czarownicy. Ta zamieniła jego rycerzy w gołębie.\n\nPtaki obsiadły kościół Mariacki i dziobały mury. To, co spadło na ziemię, stawało się monetami. Probus wziął złoto i ruszył do Rzymu, prosić papieża o królestwo. Roztrwonił pieniądze w drodze i nigdy nie wrócił. Rycerze wciąż są na placu i czekają.",
    },
    fact: {
      en: "The flock is real. The spell is a later folk tale, told about Henryk IV Probus — also called Prawy — a 13th-century duke of Wrocław and Kraków who did seek a Polish crown. It is not about Henryk II Pobożny, who died at Legnica in 1241.\n\nFeeding the birds is restricted. Grain and breadcrumbs harm them and stain the stone. Look. Do not feed.",
      pl: "Stado jest prawdziwe. Urok to późniejsza opowieść ludowa o Henryku IV Probusie — zwanym też Prawym — trzynastowiecznym księciu wrocławskim i krakowskim, który naprawdę starał się o polską koronę. Nie chodzi o Henryka II Pobożnego, który zginął pod Legnicą w 1241 roku.\n\nKarmienie ptaków jest ograniczone. Ziarno i bułka szkodzą im i brudzą kamień. Patrz. Nie karm.",
    },
    seeToday: {
      en: "They still work the ledges and the flags of the Cloth Hall, thickest in the morning before the square fills. Leave any bag of grain in your pocket. The walls of St Mary’s are the ones the tale says they pecked for gold.",
      pl: "Wciąż pracują na gzymsach i przy Sukiennicach, najgęściej rano, zanim plac się zapełni. Torebkę z ziarnem zostaw w kieszeni. Mury Mariackiego to te, które w opowieści ptaki dziobały po złoto.",
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
            {
              id: "a",
              label: {
                en: "Knights",
                pl: "Rycerzami",
              },
            },
            {
              id: "b",
              label: {
                en: "Royal messengers",
                pl: "Królewskimi posłańcami",
              },
            },
            {
              id: "c",
              label: {
                en: "Monks of Tyniec",
                pl: "Mnichami z Tyńca",
              },
            },
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
            {
              id: "a",
              label: {
                en: "Yes — it is a local custom",
                pl: "Tak — to lokalny zwyczaj",
              },
            },
            {
              id: "b",
              label: {
                en: "No — feeding is restricted and harms them",
                pl: "Nie — karmienie jest ograniczone i im szkodzi",
              },
            },
            {
              id: "c",
              label: {
                en: "Only on Easter Monday",
                pl: "Tylko w lany poniedziałek",
              },
            },
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
            {
              id: "a",
              label: {
                en: "Casimir the Great",
                pl: "Kazimierzem Wielkim",
              },
            },
            {
              id: "b",
              label: {
                en: "Henryk Probus",
                pl: "Henrykiem IV Probusem (Prawym)",
              },
            },
            {
              id: "c",
              label: {
                en: "John III Sobieski",
                pl: "Janem III Sobieskim",
              },
            },
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
    title: {
      en: "A city drawn with a ruler",
      pl: "Miasto od linijki",
    },
    place: {
      en: "Main Market Square",
      pl: "Rynek Główny",
    },
    pin: {
      lat: 50.06155,
      lng: 19.9374,
    },
    image: {
      light: "/stories/rynek.webp",
      dark: "/stories/rynek-dark.webp",
    },
    legend: {
      en: "Kraków feels inevitable, as if the square had always been there. Founding tales prefer a king, a dragon, and fate: a city that grew because it had to.\n\nThe square you walk was drawn. After fire and a raid, someone took a rope and a rule and laid a town on purpose.",
      pl: "Kraków wydaje się oczywisty, jakby Rynek był tu od zawsze. Opowieści założycielskie wolą króla, smoka i przeznaczenie: miasto, które urosło, bo musiało.\n\nPlac, po którym chodzisz, został narysowany. Po pożarze i najeździe ktoś wziął sznur i linijkę i wytyczył miasto z zamysłu.",
    },
    fact: {
      en: "In 1257 Duke Bolesław V the Chaste chartered Kraków under Magdeburg law, after the Tatar destruction of 1241. The Rynek was laid out as a planned grid, about 200 metres on a side — one of the largest medieval squares in Europe. The Cloth Hall still sits on the original trade axis.\n\nThis is the hard-history pin: a city rebuilt on purpose. The charter is the record. The dragon is the other story.",
      pl: "W 1257 roku książę Bolesław V Wstydliwy lokował Kraków na prawie magdeburskim, po zniszczeniach tatarskich z 1241. Rynek wytyczono jako planową sieć, około 200 metrów w boku — jeden z największych średniowiecznych placów Europy. Sukiennice wciąż stoją na pierwotnej osi handlu.\n\nTo pinezka twardej historii: miasto odbudowane z zamysłu. Przywilej jest zapisem. Smok jest inną opowieścią.",
    },
    seeToday: {
      en: "Walk the square edge to edge. It takes a few minutes; that width is the 1257 measure. Then go under it. Rynek Underground keeps the older streets in the ground, the ones the charter buried when the new grid was drawn.",
      pl: "Przejdź Rynek od krawędzi do krawędzi. Zajmie to kilka minut; ta szerokość to miara z 1257 roku. Potem zejdź pod spód. Rynek Underground trzyma w ziemi starsze ulice, te, które przywilej przykrył, kiedy rysowano nową sieć.",
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
            {
              id: "a",
              label: {
                en: "1000",
                pl: "1000",
              },
            },
            {
              id: "b",
              label: {
                en: "1257",
                pl: "1257",
              },
            },
            {
              id: "c",
              label: {
                en: "1364",
                pl: "1364",
              },
            },
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
            {
              id: "a",
              label: {
                en: "Bolesław V the Chaste",
                pl: "Bolesław V Wstydliwy",
              },
            },
            {
              id: "b",
              label: {
                en: "Krakus the cobbler",
                pl: "Krak szewczyk",
              },
            },
            {
              id: "c",
              label: {
                en: "Casimir the Great",
                pl: "Kazimierz Wielki",
              },
            },
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
            {
              id: "a",
              label: {
                en: "About 80 metres",
                pl: "Około 80 metrów",
              },
            },
            {
              id: "b",
              label: {
                en: "About 200 metres",
                pl: "Około 200 metrów",
              },
            },
            {
              id: "c",
              label: {
                en: "About 600 metres",
                pl: "Około 600 metrów",
              },
            },
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
            {
              id: "a",
              label: {
                en: "Wawel Castle",
                pl: "Zamek Wawelski",
              },
            },
            {
              id: "b",
              label: {
                en: "The Cloth Hall (Sukiennice)",
                pl: "Sukiennice",
              },
            },
            {
              id: "c",
              label: {
                en: "The Barbican",
                pl: "Barbakan",
              },
            },
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

---
title: Myten om det åndbare hus
date: 2021-09-07
hashtags: [Danish, Nonsens, Fra det pseudo-videnskabelige faktultet]
category: Write
topic: Building Science
snippet: Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores fugiat veniam cum omnis dolorem repellat ipsam earum sed dolorum nam ab corrupti neque debitis cupiditate, unde eos similique dolore tenetur.
cta: Læs mere
style: posts/07-09-2021/07-09-2021.scss
img: /images/https://ik.imagekit.io/dlfdk/lythfrederiksen/blog/stripe-imitation_0GrxC5rvM.png
---

<!-- <p class="post__caption">Millionprojekt genopdager det, vi allerede vidste: Ventilation er vigtigt<p> -->

Byg åndbart og slip for det mekaniske ventilationsanlæg.

Nogenlunde sådan lyder hypotesen i projektet “Det Åndbare Hus” gennemført af Egen Vinding og Datter (EVD). Med finansiering fra blandt andre Miljøstyrelsen og Realdania færdiggør de i 2015 det testhus, der også ligger navn til projektet, og som på passende vis er udført med diffusionsåbne konstruktioner af hygroskopiske materialer.

Efter godt fire års målinger af hus og indeklima i samarbejde med Teknologisk Institut (TI) lander rapporten i 2019 med resultater, der har gjort EVD _“... rigtig meget klogere.”_, som det hedder i det tilhørende nyhedsbrev. Generelt lægger rapportens konklusion og EVD’s efterfølgende formidling - eksempelvis via [detaandbarehus.dk](https://detaandbarehus.dk/) - op til, at hypotesen er bekræftet.

Det ellers prisværdige projekt undermineres dog af en række helt centrale misforståelser, der i sidste ende reducerer nyhedsværdien til nærved nul. Man finder kort sagt det forkerte svar på det forkerte spørgsmål stillet ud fra den forkerte antagelse. Med rapportens egne tal vil jeg i det følgende argumentere for, at fugttransport ved diffusion gennem klimaskærmen ingen betydning har for med hvilket udstyr eller med hvilken mængde, et hus bør ventileres.

<h2 id="hvor-bliver-fugten-af"><a title="Permalink til Hvor bliver fugten af?" href="#hvor-bliver-fugten-af">Hvor bliver fugten af?</a></h2>

Dissekeres projektets hypotese og rapportens argumentation finder vi antagelsen, at det i boliger primært er fugtbelastningen, der bestemmer ventilationsbehovet. Heraf følger, at kan fugten håndteres ved diffusion gennem klimaskærmen, vil ventilationsbehovet reduceres. Det mekaniske ventilationsanlæg kan nu undværes til fordel for naturlig ventilation med tilhørende besparelser på både anlægs- og driftsomkostninger.

Projektets fokus ligger primært på det spørgsmål, der så at sige binder enderne af hypotesen sammen: Kan fugten fra én familie håndteres udelukkende ved diffusion gennem klimaskærmen?

Eksperimentet, der skal give svaret, foregår således: I januar 2017 opsætter man i det ubeboede hus en koldfordamper, som frem til marts 2018 tilfører mellem 7 og 10 liter vand dagligt. I denne periode holdes huset lukket, hvor også aftrækskanaler og ventilationsåbninger er blokerede. Forventningen er, at al fugttransport derfor foregår ved diffusion. Viser målinger af indeklimaet, at den relative luftfugtighed i perioden ligger på et stabilt og acceptabelt niveau, har den diffusionsåbne konstruktion altså evnet at håndtere fugten.

I rapporten fortolkes måleresultaterne ganske klart:

> _“EVD konkluderer på baggrund heraf, at det ser ud til, at fugt i størrelsesordenen op til 10 l/dag kan flyttes via diffusion gennem konstruktionen. Derved kan diffusionsåbne konstruktioner bidrage til at mindske behovet for ventilation.”_ (Egen Vinding og Datter, 2019a, s. 36)

Desværre sætter man i rapporten aldrig tal på eksperimentet, der kan sandsynliggøre, at det vitterligt er ved diffusion, de 10 liter per døgn forsvinder. Hverken for huset som helhed eller konstruktionens enkeltdele sættes der tal på diffusionsmodstanden, og heraf må det naturligvis følge, at der heller ikke laves en beregning af den forventede, samlede fugttransport ved diffusion.

Så det gør jeg her.

Da jeg ikke har haft adgang til projektets datasæt og derfor må nøjes med de grafer, som TI deler i deres afrapportering, har jeg udvalgt en periode, som letter fastlæggelsen af damptrykket indendørs. Den periode løber over fire måneder fra november 2017 til februar 2018, hvor temperatur og absolut luftfugtighed ligger rimelig stabilt omkring henholdsvis 22 &deg;C og 10 g/m<sup>3</sup>.

Data fra udeklimaet henter jeg hos DMI, der har tal på timebasis for husets omtrentlige placering. Det giver knap 2900 sæt af temperatur og relativ luftfugtighed, som omregnes til damptryk og herefter reduceres til et gennemsnit for hele perioden.

Og så er der husets diffusionsmodstand. Den er straks sværere. Som sagt er rapporten ikke rig på detaljer, så den kræver lidt ekstra detektivarbejde at fastlægge. For at give EVD’s konklusion de bedste chancer har jeg søgt at fastlægge en Z-værdi, der repræsenterer den mest sandsynlige mindsteværdi for konstruktionen. Med andre ord er det højst usandsynligt, at diffusionsmodstanden i praksis har ligget lavere, og at fugttransport ved diffusion derfor har været højere. Mit bud er en gennemsnitlig Z-værdi på 7 GPa s m<sup>2</sup>/kg. Denne holdes op med husets overfladeareal, der bedømt ud fra rapportens tegninger ligger omkring 284 m<sup>2</sup>. Jeg tillader mig at antage, at fugten fra koldfordamperen er jævnt fordelt i hele testhusets volumen. 

Resultatet af regnestykket bliver en gennemsnitlig, daglig fugttransport for perioden på 2,4 liter. 

Der er meget langt op til 10 L/døgn. 

Skal fugttransporten ved diffusion højere op, skal Z-værdien altså væsentligt længere ned.

<figure class="graph">
    <div  class="graph__y-label"><p>Fugttransport L/døgn</p></div>
    {% include 'src/posts/07-09-2021/svg/figure-1.svg' %}<div  class="graph__x-label"><p>Z-værdi GPa s m<sup>2</sup>/kg</p></div>
    <figcaption>Fugttransport per døgn ved diffusion som en funktion af klimaskærmens gennemsnitlige Z-værdi</figcaption>
</figure>

Ja, faktisk skal vi helt ned på 1,6 GPa s m<sup>2</sup>/kg, førend der kan transporteres så meget vand per døgn. Alene de 410 mm indblæst papiruld i testhuset har en Z-værdi på 4 GPa s m<sup>2</sup>/kg (Papiruld Danmark, 2020).

Men hvordan slipper alt det vand så ud? Holder vi fast i de 7-10 L/døgn fra koldfordamperen, må der nødvendigvis være en anden mekanisme på spil. Kan det være exfiltration?
<figure class="graph">
    <div  class="graph__y-label"><p>Fugttransport L/døgn</p></div>
    {% include 'src/posts/07-09-2021/svg/figure-2.svg' %}<div  class="graph__x-label"><p>Luftskifte h<sup>-1</sup></p></div>
    <figcaption>Samlet fugttransport per døgn som en funktion af luftskifte.</figcaption>
</figure>

Grafen viser den samlede fugttransport per døgn, hvis vi tager højde for både diffusion og exfiltration. Skal den ligge mellem 7 og 10 liter, kræver det et luftskifte mellem 0,15 h<sup>-1</sup> og 0,25 h<sup>-1</sup>. 

Kan det lade sig gøre for testhuset, der jo helt bevidst er holdt lukket og så tæt som muligt?

Undervejs i projektet laver TI blandt andet to målinger af husets luftskifte, hvor anden måling foretages i den periode, jeg har udvalgt til analysen her. Den 20. november 2017 måles luftskiftet til 0,1 h<sup>-1</sup> med sporgas. TI karakteriserer ikke vejrforholdene på dagen, så for at kunne bedømme, hvor godt de beskriver perioden som helhed, er det endnu engang vejrdata fra DMI, der skal i spil. For husets omtrentlige placering er gennemsnittet af middeltemperatur og middelvind for tidsrummet 8-16 henholdsvis 3,8 &deg;C og 1,8 m/s. For perioden som helhed ligger de to på 2,7 &deg;C og 4,3 m/s. Både temperatur og vind taler altså for, at luftskiftet i perioden i gennemsnit har ligget højere end 0,1 h<sup>-1</sup>.

Ved første måling med sporgas er resultatet et luftskifte på 0,4 h<sup>-1</sup> på en dag, hvor middeltemperatur og middelvind ligger på henholdsvis 11 &deg;C og 6,6 m/s. En simpel lineær interpolation mellem de to målinger baseret på middelvind giver et luftskifte på 0,25 h<sup>-1</sup> for perioden analyseret her, men hvor det dog bør bemærkes, at huset imellem de to målinger bliver tætnet yderligere. Den betydelige forskel i temperatur mellem de to målinger komplicerer også sammenligningen.

Ovenstående taget i betragtning er det ikke utænkeligt, at luftskiftet i perioden befinder sig på et niveau, som giver en samlet fugttransport på 7-10 L/døgn.

<figure class="graph">
    <div  class="graph__y-label"><p>Fugttransport ved diffusion %</p></div>
    {% include 'src/posts/07-09-2021/svg/figure-3.svg' %}<div  class="graph__x-label"><p>Luftskifte h<sup>-1</sup></p></div>
    <figcaption>Andel af fugttransport ved diffusion som en funktion af luftskifte.</figcaption>
</figure>

Uagtet er vi dog allerede ved det målte luftskifte på 0,1 h<sup>-1</sup> langt fra EVD’s konklusion. Hverken en analyse af Z-værdien eller luftskiftet kan sandsynliggøre, at det vitterligt udelukkende er ved diffusion, at de 7-10 L/døgn transporteres bort.

Heller ikke hvis vi tillader luftfugtigheden at stige over de 10 g/m<sup>3</sup>, som er niveauet for testhuset i perioden, når fugttransporten ved diffusion nogensinde målsætningen. Z-værdien er simpelthen for høj til, at det kan lade sig gøre. 

Det, der skulle binde projektets hypotese sammen, er revet over.

> _“Vi har således fået bekræftet, at diffusion kan løse behovet for at få fugten ud af huset 100 %...”_ (Egen Vinding og Datter, 2019a, s. 10)

At lade så stor en fugtmængde - omtrent 4 til 7 L/døgn - transportere bort ved exfiltration kan i sig selv være problematisk. Modsat diffusion, der er mere jævnt fordelt over husets overflade, får man ved exfiltration en koncentration af fugten igennem de utætheder, der netop er skyld i fænomenet. En koncentration, som selv i en diffusionsåben konstruktion risikerer at danne grobund for svamp og råd.

Intet i denne analyse kræver reelt set, at der bygges et testhus, og man må i den grad sige, at det havde været værd at lave en overslagsberegning inden første spadestik. Rapporten nævner blot ventilation via utætheder i en kort bemærkning, men vurderer aldrig indflydelsen i hverken ord eller tal. Som de ovenstående citater indikerer, tages der aldrig forbehold for exfiltration som fejlkilde.

**Fugten fra én familie kan altså ikke håndteres ved diffusion gennem klimaskærmen.**


<h2 id="der-er-noget-i-luften"><a title="Permalink til Der er noget i luften" href="#der-er-noget-i-luften">Der er noget i luften</a></h2>

Lad os vende tilbage til rapportens centrale antagelse: At det i boliger primært er fugtbelastningen, der bestemmer ventilationsbehovet. Kun når det er tilfældet, har den diffusionsåbne konstruktion en chance for indflydelse herpå. Men holder antagelsen?

En del af svaret får vi faktisk i rapporten selv. Et af de andre mål i projektet er nemlig at udvælge materialer til både hus og inventar, der indeholder ingen eller meget lidt problematisk kemi. EVD beskriver i detaljer, hvordan de med stor omhu sammensætter de mange forskellige elementer, der nu engang udgør et hus, og endda hvordan de udvikler en ny spartelmasse, og delvist når i mål med en tilsvarende fugemasse. Også leverandørerne involveres, da der bestilles specialelementer med specifikke limtyper. Der er ingen tvivl om, at man virkelig forsøger at skabe de bedste betingelser for et godt indeklima.

Derfor kommer det som en stor overraskelse, da TI ved deres måling af indeklimaet i november 2017 erklærer huset uegnet til beboelse. De mange bestræbelse til trods har det lave luftskifte tilladt en række problematiske stoffer at ophobe sig og nå et niveau, som ifølge TI udgør en _“.. risiko for, at personer kan opleve helbredsmæssige gener ved længerevarende ophold i huset under de konstaterede forhold.”_ (Teknologisk Institut, 2018, s. 4). TI peger selv på, at det kan skyldes det meget lave luftskifte. Og heldigvis hjælper netop en øgning af luftskiftet. Ved de sidste målinger i 2019 erklærer TI atter huset egnet til beboelse.

Skønt kombinationen af fugttransport ved diffusion og exfiltration i testhuset holder luftfugtigheden på et acceptabelt niveau, ligger luftskiftet altså så lavt, at indeklimaet er usundt. For testhuset kan vi med sikkerhed sige, at det ikke er fugten, der bestemmer ventilationsbehovet.

Man kan selvfølgelig vælge at klandre valget af materialer. Det tænker jeg er en blindgyde. For når EVD med sådan en iver har forsøgt at tage alle de rigtige valg og alligevel kan konstatere, at de skadelige stoffer finder vej indenfor, så tegner det altså ikke godt for Hr. og Fru Danmark, der jo næppe går til opgaven med helt samme nidkærhed. Selv hvis vi vitterligt kunne fjerne alle kilder til problematiske stoffer fra et givent hus, så holder det kun til, der er udskiftning blandt beboerne. Hvad de nye ejere hiver indenfor, er der næppe et byggefirma, som vil stå til ansvar for.

Men nu det hypotetiske scenarie med et helt rent indeklima er på bordet, så lader vi det lige blive der et kort øjeblik. For hvis nu man kunne eliminere kilderne til det, som TI har målt for meget af, kunne ventilationsbehovet så reduceres?

Nej, desværre ikke. Den primære kilde til forurening af indeklimaet er nemlig os selv. Og et hjem uden beboere er der trods alt næppe meget hjem over. Vi forurener blandt andet indeklimaet ved vores vejrtrækning. Mere skal der faktisk ikke til. Vores udåndingsluft indeholder en større koncentration af CO2 end vores indåndingsluft, og i et lukket rum vil den samlede koncentration af CO2 derfor stige over tid.

Der ligger efterhånden ganske solid videnskab bag sammenhængen mellem koncentrationen af CO2 i indeklimaet og vores trivsel. Emnet er omfangsrigt og tåler dårligt en opsummering her, men klart er det, at måles der høje koncentrationer af CO2, stiger risikoen for negative helbredseffekter. Hvor høj en CO2-koncentration, der kan tolereres, lader der ikke til endnu at være entydige retningslinjer for. Her til lands sættes grænsen typisk ved 1000 ppm, men indikationer for helbredseffekter er fundet allerede ved 600 ppm (Allen et al., 2016).

Den krævede ventilationsrate for at nå en så lav koncentration er afhængig af antallet af personer og deres aktivitetsniveau, hvorfor et helt entydigt svar er svært at finde. Persily og de Jonge (2017) udvikler i deres studie en model til opgaven, hvor der tillige gives en række eksempler. For en familie på to voksne og to børn vil jævnt fordelt ventilation med omtrent 15 L/s per person give en koncentration af CO2 på mellem 600 og 700 ppm. Omregnes ventilationsraten til et luftskifte bliver det for testhuset 0,75 h<sup>-1</sup>.

Bygningsreglementet har naturligvis også en holdning til, hvor meget der bør ventileres. Her lyder kravet på 0,3 L/s m<sup>2</sup>, som omsat til testhuset bliver et luftskifte på 0,55 h<sup>-1</sup> - langt over det, der skal til for at komme af med 10 liter vand per døgn. Holder vi fast i den absolutte luftfugtighed fra testhuset (10 g/m<sup>3</sup>), kan der ved dette højere luftskifte ventileres mere end 17 liter bort per døgn. I praksis bliver situationen den, at luftfugtigheden i boligen falder indtil der igen er ligevægt mellem fugtbelastning og fugttransport.

Og for netop den situation er det oplagt at sammenligne det diffusionsåbne hus med det diffusionstætte. Hvad bliver den relative luftfugtighed, hvis man lægger fugtbelastningen fast på 10 L/døgn?

<figure class="graph">
    <div  class="graph__y-label"><p>Relativ luftfugtighed %</p></div>
    {% include 'src/posts/07-09-2021/svg/figure-4.svg' %}<div  class="graph__x-label"><p>Luftskifte h<sup>-1</sup></p></div>
    <figcaption>Relativ luftfugtighed i et diffusionstæt hus (lilla kurve) og testhuset (blå kurve) som en funktion af luftskifte. De sorte prikker markerer et luftskifte, der overholder bygningsreglementet.</figcaption>
</figure>

På grafen ovenover er det spørgsmål besvaret. Den blå kurve repræsentere testhuset med dens gennemsnitlige Z-værdi på 7 GPa s m<sup>2</sup>/kg, og den lilla kurve repræsenterer et hus af samme størrelse og udformning, der er absolut diffusionstæt. Her kan fugten altså kun slippe bort ved exfiltration og ventilation.

Vurderer man udelukkende kvaliteten af indeklimaet på baggrund af den relative luftfugtighed, har den diffusionsåbne konstruktion i et dårligt ventileret hus en klar fordel over den diffusionstætte. Men det er en konkurrence kun med tabere.

Så snart luftskiftet når et niveau, der tager hensyn til de mange andre elementer, som også udgør et sundt indeklima, forvises forskellen til decimalerne. Som grafen så fint illustrerer, vil der ved ventilation efter bygningsreglementets krav ikke være en forskel af betydning mellem det diffusionstætte og diffusionsåbne hus (41,3 % mod 39,6 %).

Bemærk at antagelsen fra testhuset om den jævne fordeling af fugten er fastholdt her. I praksis vil udsugning nær fugtkilder - bad, køkken, etc. - reducere betydningen af den diffusionsåbne konstruktion yderligere.

Konklusionen er klar: Den centrale antagelse - at det i boliger primært er fugtbelastningen, der bestemmer ventilationsbehovet - holder ikke, og projektets hypotese må forkastes. Fugttransport ved diffusion gennem klimaskærmen har ingen betydning for med hvilket udstyr eller med hvilken mængde, der bør ventileres.

For hvad angår de hygroskopiske egenskaber, er rapporten ordknap. Det lader til udelukkende at være testhusets diffusionsåbne konstruktioner, der tilskrives indflydelse på ventilationsbehovet og derfor undersøges eksperimentelt. Termerne “buffer” og “fugtbuffer” anvendes en enkelt gang hver, og de hygroskopiske kvaliteter omtales ikke nærmere. Termen “hygroskopi” og variationer heraf bliver ikke brugt. Vi kan med rimelighed aflede, at EVD kun tilskriver dette aspekt beskeden indflydelse.

<h2 id="byg-tæt,-ventilér-korrekt"><a title="Permalink til Byg tæt, ventilér korrekt" href="#byg-tæt,-ventilér-korrekt">Byg tæt, ventilér korrekt</a></h2>

Pointen med denne analyse er på ingen måde at advare imod brugen af hverken diffusionsåbne konstruktioner eller hygroskopiske materialer, men at anholde den centrale misforståelse, at det automatisk skulle reducere behovet for ventilation eller være en garanti for et godt indeklima. Der kan være mange glimrende grunde til at bygge “åndbart”, men lige de to kvaliteter er altså ikke en del af pakken.

Retfærdigvis skal det siges, at EVD anerkender, at indeklimaets kvalitet bestemmes af en række faktorer, deriblandt CO2-koncentration, partikler, mv. Det gøres både i rapporten og i det tilhørende nyhedsbrev citeret tidligere. Ligeså tages TI's målinger til efterretning og man forsøger at finde en forklaring på forekomsten af de problematiske stoffer. Man går bare aldrig hele vejen og får sat spørgsmålstegn ved antagelsen om fugten som det afgørende. Det ligger hele tiden i luften, at de andre faktorer er sekundære, at det nødvendigvis må være fugten, der styrer showet. Som vist er det ganske enkelt forkert.

> _“Behovet for ventilation bliver dog væsentligt lavere i en diffusionsåben konstruktion end i en bygning med en diffusionstæt klimaskærm.”_ (Egen Vinding og Datter, 2019b, s. 2).

EVD lader til at være drevet af et behov for på videnskabelig vis at demonstrere og dokumentere meritterne bag deres foretrukne måde at bygge på - diffusionsåbent af hygroskopiske materialer. Det er prisværdigt.

Men dokumentationen findes faktisk allerede derude. I rigelige mængder. Fagfællebedømt og med solid empiri i ryggen. Den beskedne udbredelse af byggemetoden herhjemme skyldes ikke manglende kvaliteter, men skal findes i manglende infrastruktur, kendskab og en konservativ tilgang, der foretrækker det gængse. Desværre hjælper pseudovidenskabelige forklaringer om åndbarhed som kilden til det sunde indeklima ikke sagen. Det gør et demonstrationshus, der erklæres uegnet til beboelse, heller ikke.

Sælg nu det klimavenlige, diffusionsåbne hus af hygroskopiske materialer på dets virkelige kvaliteter. Alt det andet skader vores gode sag.

**Kilder**

-   Allen, Joseph G., Piers MacNaughton, Usha Satish, Suresh Santanam, Jose Vallarino, and John D. Spengler. 2016. _“Associations of cognitive function scores with carbon dioxide, ventilation, and volatile organic compound exposures in office workers: a controlled exposure study of green and conventional office environments.”_ Environmental health perspectives 124 (6): 805-812. [nih.gov](https://ehp.niehs.nih.gov/doi/10.1289/ehp.1510037).
-   Egen Vinding og Datter, ed. 2019a. Det Åndbare Hus - Afsluttende rapport: Miljøstyrelsen. [egenvinding.dk](https://egenvinding.dk/sites/default/files/Rapport%20Det%20%C3%85ndbare%20Hus%20MUDP%20978-87-7038-100-0.pdf).
-   Egen Vinding og Datter. 2019b. “Nyhedsbrev nr. 14.” [egenvinding.dk](https://egenvinding.dk/sites/default/files/Nyhedsbrev%20nr%2014%20Det%20%C3%85ndbare%20Hus%20final_0.pdf).
-   Papiruld Danmark A/S. 2020. “Konstruktionskatalog.” [papiruld.dk](https://www.papiruld.dk/sites/default/files/content_files/katalog_november_2020.pdf).
-   Persily, A., and L. de Jonge. 2017. _“Carbon dioxide generation rates for building occupants.”_ Indoor Air 27 (5): 868–879. [nih.gov](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5666301/).
-   Teknologisk Institut. 2018. Luftkvalitet i Det Åndbare Hus. [egenvinding.dk](https://egenvinding.dk/sites/default/files/Rapport%20Det%20%C3%85ndbare%20Hus%20MUDP%20978-87-7038-100-0.pdf).

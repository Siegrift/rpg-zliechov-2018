This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Ako to spustit

1. Nainstalovat [LTS Node.js](https://nodejs.org/en/)
2. Nainstalovat [Yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
3. Clone repo
4. V naklonovanom repozitari spustit `yarn`
5. Po nainstalovani balickov, spustit pomocou `yarn start`

## Ako to funguje

Appka ma [4 screeny](https://github.com/Siegrift/rpg-zliechov-2018/blob/master/src/App.js):

1. **create** - Veduci v nej vytvori priseru (zada vlastnosti, ikonku, spelly)
2. **dungeon** - Screena, ktora je spustena na pocitaci a vidia ju ucastnici. Na screene
   je prisera vytvorena veducim.
3. **fighters** - Po kliknuti na priseru sa zobrazi tato podstranka, kde ucastnici zadaju
   svoje staty, spelly, kuzla...
4. **fight** - Posledna screena sluzi na realny boj. Ucastnici bojuju s priserou pouzivanim
   svojich spellov a itemov. V hornej casti stranky su sila/obr/int "bar-y", ktore obsahuju ako
   maximum sucet statov prisery a ucastnikov (snazia sa dostat za polku)...

Appka je velmi jednoducha, a ma globalny stav od ktoreho sa odraza UI. To co robi React je
vyabstrahovane a na pridanie logiky treba vediet iba kus JS. Po zahrati
spellu alebo itemu sa updatne stav hry a React prekresli okno podla toho co sa zmenilo. Stav
hry sa updatuje vo funkcii, ktora je zavolana s 3 argumentami **aktivny hrac, aktivna prisera,
kompletny stav hry**.

## Ako pridat nove spelly/itemy/rasy alebo prisery

Podrobnejsi popis ako co pridat najdes v kode v jednotlivych suboroch

1. [zaciatocny stav](https://github.com/Siegrift/rpg-zliechov-2018/blob/master/src/store/initialState.js) -
   obsahuje zaciatocny stav a popisuje jeho strukturu (oplati sa vediet, co sa v hre kde pameta)
2. [spelly](https://github.com/Siegrift/rpg-zliechov-2018/blob/master/src/spells.js)
3. [itemy](https://github.com/Siegrift/rpg-zliechov-2018/blob/master/src/items.js)
4. [rasy](https://github.com/Siegrift/rpg-zliechov-2018/blob/master/src/units.js)

Vsetky tieto "objekty" potrebuju obrazok. Pri hladani obrazkov je odporucana resolution aspon
400x400 a obrazok by mal byt cca stvorec.

## Zvysok

- Appka by mala fungovat rozumne v rozliseniach HD (to su tusim enti) a Full-HD (zvysne rozumne PC)
- Vsetky veci by mali (casom) byt keyboard ovladatelne, aby vypisovanie formov trvalo co najmenej

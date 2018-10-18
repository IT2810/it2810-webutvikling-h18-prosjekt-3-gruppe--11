# IT2810 – Webutvikling | Prosjekt 3 (Gruppe 11), Høst 2018
### Oppgavebeskrivelse
I dette prosjektet fikk vi i oppgave å designe og implementere en "Personal Information and Motivation Manager" app for mobil, med React Native. Hovedformålet her var å demonstrere funksjonaliteten og bruk av teknologien. Det tenkes her at brukeren motiveres ved at applikasjonen skal støtte en form for registrering av personlige mål og resultater, ved enten fysisk eller intellektuell aktivitet. 

Mer infomasjon om oppgaven kan finnes på Blackboard (Krever tilgang).

## Teknologi
Følgende er nødvendig for å kjøre prosjektet:
- Expo (PC + mobil)
- React Native V0.55.4
- Node.js

Prosjektet er hovedsakelig drevet av:
- React
- CSS

## Hvordan kjøre programmet
Klon dette prosjektet. Kjør deretter følgende linje i prosjektmappen:
```
expo start
```
Et vindu med en QR-kode vil åpnes i nettleseren din. Denne QR-koden skal i tillegg være tilgjengelig i kommandolinjen. Scan denne med Expo appen på en mobil enhet for å åpne applikasjonen.

## Om applikasjonen
### En to-do liste
Vi har laget en daglig to-do list som roser bruker for å fullføre alle dagens mål, og som kan minne bruker på at de burde opprette eller fullføre gjøremål i løpet av dagen ved hjelp av push-varsler. Vi valgte å bruke push-varsler som det utover basic React Native UI-problematikk fordi vi følte funksjonaliteten samsvarte godt med formålet til en daglig to-do liste.

### Komponentdiagram
Vi tok utgangspunkt i følgende komponentdiagram da vi utviklet applikasjonen.
![alt text](https://i.gyazo.com/4c95caf836516dbb24fb7031ed14ccfd.png)

- **APP** - ``` HomeScreen.js ```
- **Notification switch** - komponent som kontrollerer push-notifikasjoner.
- **PopUp** - komponent med alert som aktiveres når alle dagens mål er fullført.
- **ListComponent** - komponent som generer en liste.
- **ListItem** - komponent som inneholder listeinnhold.

Dette oppsettet ble noe anderledes under utvikling. F.eks. er ikke popup-en lenger en egen komponent, men del av en funksjon da dette viste seg mer hensiktsmessig.

### Dependencies
Prosjektet ble initiert med expo sin mal istedenfor den blanke versjonen, slik at vi kunne lære av strukturen som allerede var laget. Vi benyttet oss av både komponenter som er i React Native og fra tredjepartsbiblioteker.

- Expo API (Local scheduled notifications)
- UI komponenter: 
    - React Native (ListView, TextInput, View, Container, Content, Footer, Header, Title, Switch)
    - NativeBase (Button, CheckBox, Icon, List, ListItem, Text)
    
### Testing
Til testing har vi, slik oppgaven ber om, benyttet oss av Jest.
- Snapshot testing for å sjekke om at UI komponenter rendrer riktig.
- Async testing [...]

### Hindringer underveis
Da vi startet å bygge applikasjonen hadde vi to vulnerabilities i React Native, i pakkene ws (high vulnerability) og lodash (low vulnerability). For å bli kvitt dem oppdaterte vi React Native til en nyere versjon, 0.57.0. Denne versjonen av React Native viste seg å ikke være kompatibel med Expo, slik at vi ikke fikk til å bruke dem sammen. For å kunne utvikle måtte vi altså nedgradere tilbake versjon 0.55.4, til tross for at dette vil si at vi har vulnerabilities i programmet.

Vi opplevde også noen problemer med å sjekke funksjonalitet på mobil. Ingen på gruppen har mobil med IOS, så for å verifisere at appen fungerer på IOS måtte vi bruke en simulator. Noen gruppemedlemmer opplevde også problemer med Expo-appen, der appen bl.a. ikke oppdaterte seg i sanntid og krevde mange forsøk med lasting inn på nytt før oppdatert kode viste seg, eller ga falsk feilmedling da den ble åpnet som gjorde det umulig å jobbe på en av mobilene.

## Tutorial
### Hvordan legge til push notifications
1. Lorem
2. Ipsum

## Gruppemedlemmer
* [Minh Ha Do](https://github.com/mhado)    
* [Kim Duong](https://github.com/kimduo)    
* [Catriona Thora Tørklep](https://github.com/CatrionaTorklep)  

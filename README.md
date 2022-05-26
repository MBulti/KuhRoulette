# KuhRoulette
KuhRoulette für den SUS Buer


## Anforderungen
- Feld 10x10 (A-J, 1-10)
- Auswahl eines Feldes durch Klicken, dann Eingabe eines Namens
- Ein Feld, auf dem ein Name eingegeben wurde mit X markieren, sind mehrere Namen auf ein Feld dieses anders hervorheben
- Markieren des Gewinnerfeldes (nach Eingabe)
- In dem 10x10 Feld keine Namen anzeigen (ggfs. nur über "Admin" Modus?)
- Zusätzlich in einem anderen Fenster eine Tabelle mit allen Namen anzeigen
- Möglichkeit, neue Runden zu starten

## Technisch
- Backend: FireBase
- Frontend: HTML + JS + CSS

- 10x10 Feld -> Array 100 Stellen, Zeilen = X % 10, Reihe = X / 10 (abgerundet)
- EventListener auf Feld, Nummer muss als ID gespeichert werden


## Abrufbar unter
https://mbulti.github.io/KuhRoulette/
Work in Progress ..

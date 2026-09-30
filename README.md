# Vorher-Nachher

Web-App für die Lüftungsreinigung: Einen Ordner mit Fotos hineinziehen, die App ordnet automatisch
zu, welches Vorher-Foto zu welchem Nachher-Foto gehört. Läuft komplett im Browser – die Fotos
verlassen das Gerät nie, es wird nichts hochgeladen.

## So ordnet die App zu

1. **Aufnahmezeit** aus dem Foto (EXIF), sonst aus dem Dateinamen (`20260930_143012.jpg`), sonst
   nur die Reihenfolge der Dateinamen. Das frühere Foto eines Paares ist immer „Vorher“.
2. **Optischer Vergleich**: Kanten-Richtungen (Form/Perspektive), grobes Helligkeitsbild mit
   Ausgleich von Helligkeit/Kontrast (Schmutz soll möglichst wenig zählen), Farben der Umgebung.
3. **Regeln aus dem Arbeitsablauf**
   - Fotos, die weniger als 45 Sekunden auseinander liegen, sind kein Paar (da kann nicht gereinigt
     worden sein) – typisch mehrere Vorher-Ansichten in der Küche.
   - Kanal: Das direkt folgende Foto nach ein paar Minuten ist oft das Nachher-Foto → Bonus.
   - Küche: Liegen mehr als 20 Minuten zwischen zwei Foto-Serien, gilt die zweite als Nachher-Runde;
     ähnliche Position in der Serie gibt einen kleinen Bonus.
   - Hoch- und Querformat gemischt → Abzug. Verschiedene Unterordner werden nie gemischt.
4. Die besten Paare werden zuerst vergeben. Paare mit knappem Vorsprung sind orange („bitte prüfen“).

Der Regler „mehr Paare ↔ nur sichere“ verschiebt die Schwelle.

## Korrigieren

- Foto antippen, dann ein zweites: Die beiden tauschen den Platz. Im selben Paar = Vorher/Nachher tauschen.
- Zwei Fotos „ohne Partner“ nacheinander = neues Paar.
- Knöpfe am Paar: gross vergleichen, tauschen, auflösen. Bezeichnung eintippen (kommt in PDF und Dateinamen).

## Für den Kunden auswählen

- Am Paar „Auswählen“ tippen → kommt in den Kunden-Ordner. Bezeichnung eintippen oder aus der Liste
  wählen (Küchenhaube, Abluftkanal, Zuluftkanal, Monoblock …; eigene Begriffe merkt sich die App).
- Oben „Für Kunden ausgewählt“: nur die Auswahl, mit Pfeilen die Reihenfolge ändern (= Nummern).
- Wird der Objektordner über „Ordner wählen“ geöffnet, speichert die App direkt in dessen Unterordner
  „Vorher-Nachher“: `01 Küchenhaube vorher.jpg`, `01 Küchenhaube nachher.jpg` … iPhone-HEIC wird als JPG
  gespeichert. Ein vorhandener Vorher-Nachher-Unterordner wird beim Einlesen übersprungen.

## Speichern

- **PDF-Bericht**: zwei Paare pro A4-Seite, Vorher links, Nachher rechts, mit Überschrift, Objekt, Datum.
- **In Ordner kopieren** (Edge/Chrome am PC): umbenannte Kopien `01a_vorher_…`, `01b_nachher_…`,
  Rest in „Ohne Partner“. Originale bleiben unverändert.
- **Als ZIP**: dasselbe als ZIP-Datei.

## Online-Adresse

**https://pasidreamer.github.io/vorhe-nachher/** (GitHub Pages)

- `.gitignore` schliesst Fotos, PDFs und ZIPs aus – Kundenfotos kommen nie ins Repository.
- **Neue Fassung veröffentlichen:** In `sw.js` die `VERSION` hochzählen, committen, `git push`.

## Technik

- `index.html` – die ganze App · `lib/` – pdf-lib 1.17.1, JSZip 3.10.1
- `sw.js` – Offline-Kopie · `app.webmanifest` – Installation als App
- Lokal testen: `python -m http.server 8767 --bind 127.0.0.1`, dann `http://localhost:8767`

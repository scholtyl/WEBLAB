# Gym Tracker

Der «GymTracker» ist eine Applikation, welche einem hilft den Überblick beim Training im Gym zu Behalten. Bei einem Training ist es wichtig zu wissen welches Gewicht bei welcher Maschine zu wählen ist. Ausserdem hilft sie einem den Verlauf und Fortschritt der Trainings zu sehen.

Auf der Webseite kann man Verschiedene Maschinen erfassen. Für jede Maschine kann man ein Training hinzufügen mit Kilos, Repetitionen für 3 Sets. Die Trainings kann man auch wieder 
Löschen oder Editieren.

## Techstack 
Die Applikation wird als moderne Webanwendung mit Angular unter Verwendung von TypeScript und JavaScript entwickelt.  
Das Frontend nutzt Tailwind CSS und DaisyUI, um eine ansprechende und responsive Benutzeroberfläche zu gewährleisten. Zusätzlich werden Boxicons für die Darstellung von Icons verwendet.  

Die Datenhaltung erfolgt in einer PostgreSQL-Datenbank, die innerhalb eines Docker-Containers betrieben wird, um eine flexible und skalierbare Infrastruktur zu ermöglichen.

## Repo 
https://github.com/scholtyl/WEBLAB 

## Stories

### User Story 1: Maschinenübersicht (MUST) 
Als Benutzer möchte ich eine übersichtliche Darstellung aller verfügbaren Trainingsmaschinen erhalten, um meine Workouts eAizient planen und durchführen zu können.

**Akzeptanzkriterien:** 
Die Übersicht enthält folgende Informationen zu jeder Maschine: 
- Bild der Maschine 
- Name der Maschine 
- Durchschnittliches Gewicht des letzten Trainings des aktuellen Benutzers 
- Status der Maschine (Heute schon benutzt oder nicht) 

---

### User Story 2: Training erfassen (MUST) 
Als Benutzer möchte ich meine Trainingseinheiten erfassen, um meinen Trainingsverlauf zu dokumentieren und meine Fortschritte nachverfolgen zu können. 

**Akzeptanzkriterien:**
- Für jedes Training an einer Maschine müssen folgende Eingaben möglich sein: 
    - Gewicht (Kommazahl) und Anzahl der Wiederholungen (Ganzzahl) für jeweils drei Sets 
- Beim Speichern eines Trainings werden folgende Informationen zusätzlich festgehalten: 
    - Zugewiesene Maschine 
    - Datum des Trainings 
    - Benutzer 
- Es werden mindestens die letzten fünf Trainings der aktuell ausgewählten Maschine inklusive Trainingsdetails angezeigt. 
---

### User Story 3: Training bearbeiten (MUST) 
Als Benutzer möchte ich meine Trainingseinträge bearbeiten können, um fehlerhafte oder unvollständige Informationen zu korrigieren.

**Akzeptanzkriterien:**
- Der Benutzer kann mindestens die letzten fünf Trainings bearbeiten.
- Der Benutzer kann mindestens die letzten fünf Trainings löschen. 
---

### User Story 4: Anmeldung & Benutzerverwaltung (SHOULD) 
- Als Applikation möchte ich mehrere Benutzerprofile unterstützen, um eine individuelle Nutzung für verschiedene Personen zu ermöglichen. 

**Akzeptanzkriterien:**
- Der Benutzer kann sich sicher in sein Benutzerkonto einloggen. 
- Der Benutzer sieht ausschließlich seine eigenen Trainings. 
- Der Benutzer kann nur seine eigenen Trainings bearbeiten oder löschen.
---

### User Story 5: Administrator-Funktionalitäten (SHOULD) 
Als Administrator möchte ich administrative Aufgaben erledigen können, um die Applikation und die Benutzer eAizient zu verwalten. 

**Akzeptanzkriterien:** 
- Der Administrator kann Maschinen hinzufügen. 
- Der Administrator kann Maschinen bearbeiten. 
- Der Administrator kann Maschinen deaktivieren oder reaktivieren. 
- Der Administrator kann Benutzer verwalten (Passwörter zurücksetzen). 
---

### User Story 6: Statistiken & Fortschrittsanalyse (COULD) 
Als Benutzer möchte ich meinen Trainingsfortschritt detailliert analysieren können, um meine Leistung und Entwicklung nachzuvollziehen.

**Akzeptanzkriterien:** 
- Der Benutzer hat eine Sub-Page für Statistiken zur Verfügung. 
- Der Benutzer kann den Verlauf der verwendeten Gewichte pro Maschine über die Zeit hinweg einsehen. 
- Es gibt eine grafische Darstellung der Trainingshistorie (z. B. Liniendiagramme, Balkendiagramme). 
---

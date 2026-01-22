# WebSocket Wiki & Vue Lab

Progetto accademico dedicato all'analisi del protocollo WebSocket, realizzato come Single Page Application (SPA).

L'obiettivo del software è fornire una piattaforma documentale interattiva che illustri le specifiche tecniche del protocollo WebSocket, dimostrando al contempo l'efficacia del framework Vue.js in configurazione "No-Build" per lo sviluppo di interfacce reattive e moderne.

## Panoramica del Progetto

L'applicazione è concepita come una Wiki interattiva che sfrutta il rendering lato client per garantire una navigazione fluida e istantanea, eliminando i tempi di ricaricamento tipici delle architetture web tradizionali.

### Caratteristiche Tecniche

* **Architettura SPA:** Gestione avanzata del routing tramite **Vue Router**, con caricamento dinamico dei componenti e sincronizzazione dell'URL.
* **Gestione Dinamica del Tema (Dark Mode):** Sistema di tematizzazione centralizzato che modifica programmaticamente le variabili CSS e gli asset grafici per supportare la modalità scura.
* **Data Fetching asincrono:** Integrazione con la libreria **Axios** per il recupero di dataset esterni in formato JSON, con gestione del ciclo di vita dei dati nei componenti Vue.
* **Interfaccia CRUD (In-Memory):** Implementazione di un modulo gestionale per record di dati che sfrutta il two-way data binding di Vue per operazioni di creazione, lettura, aggiornamento ed eliminazione in tempo reale.
* **Mobile-First Design:** Interfaccia adattiva ottimizzata per diverse risoluzioni, dotata di un sistema di navigazione overlay (hamburger menu) gestito via JavaScript.

## Stack Tecnologico

Il progetto è sviluppato esclusivamente con tecnologie web standard e librerie caricate tramite CDN, dimostrando un approccio leggero e privo di dipendenze da complessi sistemi di build.

* **Linguaggi:** HTML5, CSS3, JavaScript (ES6+).
* **Framework:** Vue.js 3 (Options API).
* **Routing:** Vue Router 4.
* **HTTP Client:** Axios.

## Installazione e Utilizzo

L'architettura "No-Build" del progetto permette un'esecuzione immediata senza necessità di installare dipendenze tramite Node.js.

1.  **Clonazione del repository:**
    ```bash
    git clone [https://github.com/giovimori/ProgettoSistemiWeb.git](https://github.com/giovimori/ProgettoSistemiWeb.git)
    ```

2.  **Esecuzione dell'applicazione:**
    * Aprire il file `index.html` in un browser web.
    * **Nota Tecnica:** Per garantire il corretto funzionamento delle richieste HTTP locali (Axios), è consigliato l'utilizzo di un server di sviluppo locale (es. Apache) per evitare restrizioni di sicurezza legate alle policy CORS.

## Struttura della Repository

* `index.html`: Entry point dell'applicazione con definizione del layout strutturale e dei collegamenti alle librerie esterne.
* `websocket.js`: Logica applicativa core, inclusa la configurazione del router, i template dei componenti e la gestione dello stato reattivo.
* `style.css`: Architettura CSS con variabili di stile per la Dark Mode e media queries per il responsive design.
* `minecraft_items.json`: Dataset strutturato utilizzato per le dimostrazioni di data fetching.

## Autori

* **Giovanni Morelli** - Architettura logica, sviluppo JavaScript e implementazione Vue.js.
* **Jonathan Crescentini** - Design dell'interfaccia, sviluppo CSS e mockup strutturali.

---
*Corso di Sistemi Web | CdL Tecnologie dei Sistemi Informatici | Università di Bologna | A.A. 2024-2025*

Campi di sviluppo principale:
Giovanni: HTML, JS, VueJS
Jonathan: CSS, Mockup, HTML
 
SPECIFICHE GENERALI
Sito similwiki, in design minimale per facilitare la lettura dell’utente finale.
Il progetto si basa su una SPA (single page application) sviluppata con vue.js.
Usa Vue Router per la navigazione tra le pagine rimuovendo la necessità di ricaricare il sito.
 
ROUTE
Dichiarate le routes (const routeName) per permettere di accedere ad ogni componente tramite URL dedicato.
I componenti sono montati dinamicamente tramite HTML tag: <router-view />, ciò rimuove la necessità di dover ricaricare la pagina.
 
DARK MODE
Implementata dark-mode attivabile tramite bottone in HTML <button id="darkModeToggle"> segnalato sulla pagina da relativa icona cliccabile.
Tramite JS, quando il bottone viene cliccato, viene aggiunta o rimossa la classe dark-mode al <body>, cambiando, oltre alla palette di colori, anche l’icona del bottone stesso e il logo del sito.
Definito un insieme di regole CSS contenente lo stile per la dark-mode (selettori “body.dark-mode” e simili).
 
MENU DI NAVIGAZIONE A TENDINA
Implementato tramite una combinazione di HTML, CSS e JavaScript.
 
HTML:
Struttura del menù all’interno di <header>. Premere la hamburger icon (<span class="hamburger" ...>) per aprire il menu chiamando la funzione JS openNav().
Il menu vero e proprio è il <div id="myNav" class="overlay">, che contiene i link di navigazione <a>
Il bottone con classe .closebtn chiude il menu chiamando la funzione closeNav().
 
CSS:
Nel CSS il menu è chiuso di default tramite width:0
Per aprirlo, JS imposta la width.
 
JS:
openNav(): imposta la larghezza del menu a 300px su desktop (overlay su lato sinistro) o 100% su mobile (overlay full-screen).
closeNav(): riporta la larghezza a 0%, nascondendo il menu.
Inoltre, in fondo al file JS c’è un comando che chiude automaticamente il menu quando viene cliccata un link al suo interno.

 
 
DESIGN CSS
Design mobile first, layout desktop si attiva a finestra larghezza: 768px.
Usato Flexbox per il layout della pagina.
Rispettato contrasto 7:1 nella scelta dei colori.
Sezione di root in cima al codice per una più veloce modifica e correzione dei parametri di stile della pagina durante lo sviluppo.
Codice diviso in sezioni tematiche per facilitare lo sviluppo e la modifica.
Implementata reattività ai click per accessibilità.
Layout Mobile con componenti impilati.
Layout Desktop con Aside a lato e larghezza massima del corpo a 1600px.
 
 
DATI IN JSON
i dati in json sono contenuti in un file esterno, quando si visita la pagina JSON viene fatto il mount() e viene chiamata la funzione GetData(); GetData() usa Axios per fare una richiesta HTTP GET al file minecraft_items.json.
Quando la risposta arriva, i dati JSON vengono salvati nella variabile minecraftItems.
La tabella HTML nel template usa v-for per ciclare su ogni elemento dell’array minecraftItems e mostrare i dati riga per riga.
(In sintesi: I dati JSON vengono caricati dinamicamente tramite Axios, salvati nello stato del componente Vue, e visualizzati in una tabella HTML usando il binding reattivo di Vue (v-for))

TABELLA (CRUD)
Visualizzazione dei dati: Nel componente Tabella (in websocket.js), i dati delle persone sono dichiarati tramite un array all’interno di const Tabella
La tabella HTML mostra questi dati usando v-for:
 
Aggiunta di una persona
 
Cliccando su "Aggiungi Persona" si apre un form:
<button type="button" @click="
 mostraFormAggiungi = !mostraFormAggiungi;
 if(mostraFormAggiungi) mostraFormModifica = false;">
 {{ mostraFormAggiungi ? 'Chiudi' : 'Aggiungi Persona' }}
</button>
 
Il form di aggiunta:
<div v-if="mostraFormAggiungi" class="aggiungi-form">
 <form @submit.prevent="aggiungiPersona">
   <input type="text" v-model="nome" required />
   <input type="text" v-model="cognome" required/>
   <button type="submit">Aggiungi</button>
 </form>
</div>
 
Il metodo associato:
aggiungiPersona() {
 if (this.nome.trim() && this.cognome.trim()) {
   this.persone.push({ nome: this.nome, cognome: this.cognome });
   this.nome = "";
   this.cognome = "";
   this.mostraFormAggiungi = false;
 }
}

 
Modifica di una persona
 
Ogni riga ha il pulsante "Modifica", che apre il form di modifica precompilato:
<div v-if="mostraFormModifica" class="modifica-form">
 <form @submit.prevent="salvaModificaPersona">
   <input type="text" v-model="modificaNome" required />
   <input type="text" v-model="modificaCognome" required/>
   <button type="submit">Salva</button>
   <button type="button" @click="mostraFormModifica = false">Annulla</button>
 </form>
</div>
 
Metodi associati:
apriFormModifica(index) {
 this.indiceModifica = index;
 this.modificaNome = this.persone[index].nome;
 this.modificaCognome = this.persone[index].cognome;
 this.mostraFormModifica = true;
 this.mostraFormAggiungi = false;
},
salvaModificaPersona() {
 if (this.modificaNome.trim() && this.modificaCognome.trim() && this.indiceModifica !== null) {
   this.persone[this.indiceModifica].nome = this.modificaNome;
   this.persone[this.indiceModifica].cognome = this.modificaCognome;
   this.mostraFormModifica = false;
   this.indiceModifica = null;
 }
}
 
 
Eliminazione di una persona
Come per modifica, ogni riga ha il proprio bottone elimina collegato direttamente alla persona .
 
Metodo associato:
eliminaPersona(index) {
 this.persone.splice(index, 1);
 if (this.indiceModifica === index) {
   this.mostraFormModifica = false;
 }
}
 

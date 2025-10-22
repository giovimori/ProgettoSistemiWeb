document.addEventListener("DOMContentLoaded", () => {
    const toggleButton = document.getElementById('darkModeToggle');
    const icon = document.getElementById('darkModeIcon');
    const logo = document.getElementById('siteLogo');

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            icon.src = 'img/moon_light.png';
            logo.src = 'img/logo2.png';
        } else {
            icon.src = 'img/moon_dark.png';
            logo.src = 'img/logo1.png';
        }
    });
});
// Funzione per aprire il menu di navigazione
function openNav() {
    const overlay = document.getElementById("myNav");
    if (window.innerWidth >= 768) {
        overlay.style.width = "300px"; // Desktop
    } else {
        overlay.style.width = "100%"; // Mobile
    }
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}


//SPA
const Home = { template: `
    <h1>Storia e Funzionamento</h1>
    <article id="che-cose-websocket">
        <h2>Che Cos'è WebSocket</h2>
        <p>WebSocket è un protocollo di comunicazione progettato per consentire una connessione permanente e
            bidirezionale tra un client (come un browser) e un server. A differenza del tradizionale protocollo
            HTTP, dove il client deve inviare una richiesta per ricevere una risposta, WebSocket permette a entrambi
            i lati di inviare dati in qualsiasi momento su una singola connessione TCP, senza la necessità di
            continue richieste.</p>
        <p>Questo tipo di comunicazione è fondamentale per le applicazioni in tempo reale, dove la latenza e
            l’efficienza sono elementi critici. Ad esempio, una chat online, una piattaforma di trading o un gioco
            multiplayer non possono funzionare in modo fluido se il server deve attendere una richiesta del client
            per rispondere.</p>
    </article>

    <article id="origini-del-protocollo">
        <h2>Origini del Protocollo</h2>
        <p>Il protocollo WebSocket è stato formalmente introdotto nel 2011 con la pubblicazione della specifica RFC
            6455 da parte dell’IETF (Internet Engineering Task Force). La sua creazione è stata motivata dalla
            necessità di una comunicazione realmente in tempo reale nel web moderno.</p>
        <p>Prima dei WebSocket, venivano utilizzate tecniche come il long polling e il Comet, che cercavano di
            simulare la comunicazione in tempo reale mantenendo una connessione HTTP aperta. Tuttavia, queste
            soluzioni erano inefficaci, poiché creavano un sovraccarico inutile sul server e non garantivano
            prestazioni ottimali. WebSocket ha rappresentato un importante passo avanti, offrendo una comunicazione
            efficiente, continua e molto meno costosa in termini di risorse.</p>
        <img src="img/websocketdec1.png" alt="" width="370" height="170">
    </article>

    <article id="applicazioni-pratiche">
        <h2>Applicazioni Pratiche</h2>
        <p>L’adozione di WebSocket è cresciuta esponenzialmente grazie alla sua efficienza. Le sue applicazioni più
            comuni includono:</p>
        <ul>
            <li>Chat in tempo reale, come WhatsApp Web o Slack, dove i messaggi devono essere ricevuti
                istantaneamente.</li>
            <li>Sistemi di notifica, come avvisi in tempo reale per email, sicurezza o transazioni.</li>
            <li>Piattaforme di trading, dove ogni variazione di prezzo deve essere trasmessa in millisecondi.</li>
            <li>Giochi multiplayer, dove ogni azione deve essere sincronizzata tra più giocatori.</li>
            <li>Collaborazione online, come Google Docs o strumenti per prendere appunti condivisi.</li>
            <li>Controllo di dispositivi IoT, dove lo stato dei sensori e attuatori viene trasmesso costantemente.
            </li>
        </ul>
    </article>
`};

const Connections = { template: `
    <h2>Instaurare una Connessione</h2>
    <article id="connessione-websocket">
        <h3>Come viene instaurata una connessione WebSocket</h3>
        <p>La creazione di una connessione WebSocket avviene in due fasi:</p>
        <ol>
            <li>
                <strong>Handshake:</strong> La connessione inizia come una normale richiesta HTTP. Il client invia
                una richiesta al server con l’intenzione di “aggiornare” la connessione a WebSocket. Questo avviene
                specificando degli header HTTP speciali come <code>Upgrade: websocket</code> e
                <code>Connection: Upgrade</code>.
                <p>Esempio di richiesta:</p>
                <code>
GET /chat HTTP/1.1
Host: example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Version: 13
                </code>
                <ul>
                    <li><strong>Host:</strong> Specifica il dominio a cui si sta connettendo (obbligatorio in
                        HTTP/1.1).</li>
                    <li><strong>Connection: Upgrade:</strong> Conferma che la connessione può essere "upgradata",
                        cioè trasformata da HTTP a WebSocket.</li>
                    <li><strong>Sec-WebSocket-Key:</strong> Una chiave base64 generata casualmente dal client. Serve
                        per garantire che la connessione sia legittima e non forzata da terze parti.</li>
                </ul>
            </li>
        </ol>
        <ol start="2">
            <li>
                <strong>Risposta del server:</strong> Se il server supporta il protocollo, risponde con uno status
                <code>101 Switching Protocols</code>, indicando che accetta il passaggio.
                <p>Esempio di risposta:</p>
                <code>
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
                </code>
                <ul>
                    <li><strong>Upgrade: websocket & Connection: Upgrade:</strong> Confermano che il protocollo è
                        stato effettivamente aggiornato a WebSocket.</li>
                    <li><strong>Sec-WebSocket-Accept:</strong> È la chiave derivata dalla chiave del client. Il
                        server prende la <code>Sec-WebSocket-Key</code>, la concatena con una stringa fissa (come
                        specificato nella RFC), la hash con SHA-1, e la codifica in base64.</li>
                </ul>
            </li>
        </ol>
        <img src="img/sockconn.png" alt="Connessione WebSocket: handshake" width="300" height="250">
        <p>Dopo questo scambio, la connessione HTTP viene trasformata in una connessione WebSocket e da quel momento
            in poi la comunicazione avviene tramite frame binari o di testo, inviati in tempo reale da una parte
            all’altra.</p>
    </article>

    <article id="frame-websocket">
        <h3>Struttura di un Frame WebSocket</h3>
        <p>Ogni <strong>frame</strong> contiene un’intestazione (header) e il contenuto del messaggio (payload).</p>
        <p>Questa è la struttura di un frame WebSocket:</p>
        <img src="img/frame.png" alt="Struttura di un frame WebSocket" width="400" height="300">
        <ul>
            <li><strong>Byte 0:</strong>
                <ul>
                    <li><strong>FIN:</strong> Un bit che indica se il messaggio è concluso o continuerà in frame
                        successivi.</li>
                    <li><strong>Opcode:</strong> Indica il tipo di messaggio (testuale, binario, ping, pong,
                        chiusura, ecc.).</li>
                </ul>
            </li>
            <li><strong>Byte 1:</strong>
                <ul>
                    <li><strong>Mask:</strong> Specifica se il payload è mascherato (obbligatorio per i messaggi dal
                        client).</li>
                    <li><strong>Payload len:</strong> La dimensione del messaggio.</li>
                </ul>
            </li>
            <li><strong>Payload:</strong> I dati veri e propri del messaggio (testuali o binari), eventualmente
                suddivisi in più frame.</li>
        </ul>
        <p>Se <code>MASK=1</code>, i dati devono essere <strong>smaskerati</strong> usando la masking key prima di
            poterli leggere.</p>
        <p>Questo formato è molto più leggero rispetto all’HTTP, il che rende WebSocket adatto a trasmissioni
            frequenti e rapide.</p>
    </article>
`};

const json = { 
  data() {
    return {
      minecraftItems: null
    }
  },
  template: `
    <h2>JSON</h2>
    <p>50 items random di Minecraft in JSON visualizzati in una tabella:</p>
    <table>
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nome</th>
          <th scope="col">Tipo</th>
          <th scope="col">Rarità</th>
          <th scope="col">Ottenibile Da</th>
          <th scope="col">Utilizzo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in minecraftItems" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.nome}}</td>
          <td>{{item.tipo}}</td>
          <td>{{item.rarità}}</td>
          <td>{{item.ottenibile_da}}</td>
          <td>{{item.utilizzo}}</td>
        </tr>
      </tbody>
    </table>
  `,
  methods: {
    getData: function() {
        axios.get('./minecraft_items.json')
            .then(response => {
                this.minecraftItems = response.data;
            });
    }
  },
  mounted() {
    this.getData();
  }
};

const Tabella = { 
  template: `
  <div class="Tabella">
    <h2>
      Lista Persone
      <button type="button" @click="
  mostraFormAggiungi = !mostraFormAggiungi;
  if(mostraFormAggiungi) mostraFormModifica = false;">
        {{ mostraFormAggiungi ? 'Chiudi' : 'Aggiungi Persona' }}
      </button>
    </h2>
    <table class="Tabella">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cognome</th>
          <th>Azioni</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(persona, index) in persone" :key="index">
          <td>{{ persona.nome }}</td>
          <td>{{ persona.cognome }}</td>
          <td>
            <button type="button" @click="apriFormModifica(index)">Modifica</button>
            <button type="button" @click="eliminaPersona(index)">Elimina</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="Tabella">
    <div v-if="mostraFormModifica" class="modifica-form">
      <form @submit.prevent="salvaModificaPersona">
        <h3>Modifica Persona</h3>
        <ul>
          <li>
            <label for="nome_modifica">Nome:</label>
            <input type="text" name="nome_modifica" id="nome_modifica" v-model="modificaNome" required />    
          </li>
          <li>
            <label for="cognome_modifica">Cognome:</label>
            <input type="text" name="cognome_modifica" id="cognome_modifica" v-model="modificaCognome" required/>    
          </li>
          <li>
            <button type="submit">Salva</button>
            <button type="button" @click="mostraFormModifica = false">Annulla</button>
          </li>
        </ul>
      </form>
    </div>
  </div>

  <div class="Tabella">
    <div v-if="mostraFormAggiungi" class="aggiungi-form">
      <form @submit.prevent="aggiungiPersona">
        <h3>Aggiungi Persona</h3>
        <ul>
          <li>
            <label for="nome_nuovo">Nome: </label>
            <input type="text" name="nome_nuovo" id="nome_nuovo" v-model="nome" required />    
          </li>
          <li>
            <label for="cognome_nuovo">Cognome: </label>
            <input type="text" name="cognome_nuovo" id="cognome_nuovo" v-model="cognome" required/>    
          </li>
          <li>
            <button type="submit">Aggiungi</button>
          </li>
        </ul>
      </form>
    </div>
  </div>
  `,
  data() {
    return {
      persone: [
        { nome: "Marco", cognome: "Rossi" },
        { nome: "Luca", cognome: "Bianchi" },
        { nome: "Giulia", cognome: "Ferrari" },
        { nome: "Mario", cognome: "Verdi" },
        { nome: "Carla", cognome: "Ceci" }
      ],
      nome: "",
      cognome: "",
      mostraFormAggiungi: false,
      mostraFormModifica: false,
      indiceModifica: null,
      modificaNome: "",
      modificaCognome: ""
    }
  },
  //(index) viene passato come paramentro, rappresenta l'indice nell'array della persona da modificare
  methods: {
    eliminaPersona(index) {
      this.persone.splice(index, 1);
      if (this.indiceModifica === index) {
        this.mostraFormModifica = false;
      }
    },
    apriFormModifica(index) {
      this.indiceModifica = index;
      this.modificaNome = this.persone[index].nome;
      this.modificaCognome = this.persone[index].cognome;
      this.mostraFormModifica = true;
      this.mostraFormAggiungi = false; // Chiudi il form aggiungi se aperto
    },
    salvaModificaPersona() {
      if (this.modificaNome.trim() && this.modificaCognome.trim() && this.indiceModifica !== null) {
        this.persone[this.indiceModifica].nome = this.modificaNome;
        this.persone[this.indiceModifica].cognome = this.modificaCognome;
        this.mostraFormModifica = false;
        this.indiceModifica = null;
      }
    },
    aggiungiPersona() {
      if (this.nome.trim() && this.cognome.trim()) {
        this.persone.push({ nome: this.nome, cognome: this.cognome });
        this.nome = "";
        this.cognome = "";
        this.mostraFormAggiungi = false;
      }
    }
  }
};

const routes = [
    {path: '/', component: Home}, 
    {path: '/connections', component: Connections},
    {path: '/json', component: json},
    {path: '/tabella', component: Tabella}
];

//creazione router SEMPRE UGUALE, USARE COME SCHELETRO X PROGETTO
const router = VueRouter.createRouter({  
    history: VueRouter.createWebHashHistory(),
    routes
});

const app = Vue.createApp({ 
});

app.use(router); //installazione router
app.mount("#app");


// Chiudi il menu quando clicchi su un link del menu
document.querySelectorAll("#myNav a").forEach(link => {
    link.addEventListener("click", () => {
        closeNav();
    });
});

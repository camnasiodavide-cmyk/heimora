# HEIMORA — Project Manager

Ultimo aggiornamento: 2026-11-10

Questo file è il registro operativo delle attività, decisioni e miglioramenti di HEIMORA. Aggiornarlo quando si decide, implementa o verifica una modifica. Non inserire dati privati, documenti o informazioni bancarie: il repository può essere pubblico.

## Da fare / prossimo sviluppo

| ID | Priorità | Attività | Criterio di completamento | Stato |
|---|---|---|---|---|
| H-001 | Alta | Gestione rate ricorrenti mutuo e prestito | Implementata prima versione mensile configurabile in Movimenti. Da testare su iPhone/desktop. Per condominio preferire piani importati dai PDF, non ricorrenze mensili fisse. | Da testare |
| H-002 | Alta | Sincronizzazione privata tra dispositivi | Creazione, modifica e cancellazione Mac/iPhone riferite come già collaudate dall'utente. Controllo cloud del 10/11/2026: 239 movimenti su cloud e dispositivo, 0 ID duplicati, 0 modifiche in attesa, 0 differenze, 0 duplicati mutuo/prestito. Monitorare soltanto eventuali anomalie future. | Completata — verificata dall'utente |
| H-003 | Media | Analisi storiche affidabili | Distinguere mesi senza dati da zero, periodi incompleti e ripartizioni mensili stimate; confronti annuali e per fornitore | Da fare |
| H-004 | Media | Backup ed esportazione | Esportazione JSON già verificata dall'utente. Ripristino/import completo non dichiarato collaudato; provarlo solo in ambiente sicuro, senza sovrascrivere archivio reale. | Export completato; ripristino opzionale da verificare |

## In corso / prossima implementazione

| ID | Priorità | Attività | Criterio di completamento | Stato |
|---|---|---|---|---|
| H-015 | Alta | Importazione piani rateali MioCondominio | Implementato caricamento locale PDF, estrazione Rate pianificate (data, dovuto, versato, saldo), classificazione ordinaria/straordinaria, anteprima selezionabile e controllo duplicati. Stato pagato solo se saldo zero; documenti non conservati. Da testare su PDF reali nell’app, inclusi layout diversi e pagamenti parziali. | Da testare |

## In attesa di evento / materiale

| ID | Priorità | Attività | Quando riprenderla | Stato |
|---|---|---|---|---|
| H-005 | Media | Lettura PDF Fastweb Energia (gas e corrente) | Gas implementato e validato su prima fattura reale (ottobre 2026); Luce predisposto ma da verificare sulla prima fattura reale quando arriverà. | Gas completato; Luce in attesa |

## Idee future / versione pubblica

| ID | Priorità | Attività | Note | Stato |
|---|---|---|---|---|
| H-006 | Futura | Lettore PDF universale/ibrido | Oggi il riconoscimento è basato su modelli Nexta e Sky. Per distribuire HEIMORA a utenti con fornitori diversi, valutare estrazione generica, interpretazione flessibile/IA, OCR per scansioni, affidabilità, privacy e costi. Non necessario per l'uso domestico attuale. | Backlog |
| H-007 | Futura | Notifiche push iPhone | Valutare solo quando servono davvero; richiedono infrastruttura e consenso. Priorità a eventuali scadenze condominiali, non conferme ripetitive delle bollette. | Backlog |
| H-008 | Futura | Preparazione alla pubblicazione | Multiutente, gestione utenti in-app (inviti, modifica profilo, revoca), onboarding, sicurezza, privacy, test su fornitori e dispositivi diversi, sostenibilità dei costi. Per ora utenti gestiti da Appwrite. | Backlog |

## Completato / decisioni confermate

| ID | Risultato | Note |
|---|---|---|
| H-009 | Lettura PDF Nexta e Sky TV/Internet | Test su fatture reali; verifica dati prima del salvataggio; PDF non archiviato |
| H-010 | Analisi consumi gas ed elettricità | kWh e Smc, costo medio complessivo; periodi non registrati indicati come n.d.; ripartizione mensile dei bimestri convenzionale |
| H-011 | Canone RAI | Incluso nell'importo della fattura elettrica; attribuito alle analisi TV senza duplicare la spesa |
| H-012 | Filtri dipendenti in Analisi | Selezione categoria principale limita sezioni e sottofiltri pertinenti |
| H-013 | Pagamenti semplificati | Fatture PDF proposte come pagate; niente promemoria di conferma; rate mutuo/condominio programmate passano a pagate dopo la scadenza, senza verifica bancaria |
| H-014 | Scelta prodotto | Uso personale gratuito e semplice adesso; valutare funzionalità universali solo per eventuale distribuzione futura |

## Revisione UX in attesa

| ID | Priorità | Attività | Criterio di completamento | Stato |
|---|---|---|---|---|
| H-016 | Media | Ripensare il menu Movimenti | Dopo il test dell'importazione PDF, valutare struttura, funzioni e posizione dei comandi di Movimenti; mantenere un unico punto di caricamento documenti e un'interfaccia semplice. | Da discutere dopo test |

## Regola UX — caricamento documenti

Un unico comando **Carica documento**: l’app riconosce automaticamente fattura Nexta/Sky o piano rateale MioCondominio, apre la relativa anteprima e chiede conferma. Non creare caricamenti separati per categorie o fornitori. Il comando attualmente si trova in Movimenti; la sua collocazione finale potrà essere rivista senza duplicarlo.

## Regole di gestione

1. Prima di avviare un nuovo intervento, verificare le attività aperte e aggiornare la voce interessata.
2. Dopo ogni modifica al codice, registrare esito, test necessari e stato.
3. Non considerare una funzione **completata** finché non è stata verificata nell'app, se richiede un test utente.
4. Non aggiungere complessità senza un bisogno concreto. Conservare nel backlog le possibilità future.
5. Non caricare nel repository fatture, documenti o dati finanziari personali.

- 2026-11-08: aggiunta in Analisi > Condominio la ripartizione per Ordinaria/Straordinaria e per motivo/gestione estratto dalla descrizione (es. Contabilizzatori). Da verificare in browser con dati importati.

- 2026-11-08: controllo duplicati anticipato subito dopo lettura PDF, prima dell'anteprima. Bollette con numero fattura già presente e piani MioCondominio con tutte le rate già registrate mostrano un avviso informativo senza salvare; verificare in app. In caso di dati incompleti o dubbia corrispondenza mantenere verifica manuale.

- 2026-11-08 — Regola concordata per deduplicazione: il nome del file allegato non va mai utilizzato. Per le fatture privilegiare identificativo del fornitore e numero fattura estratti dal contenuto, usando importo/periodo/data come verifica di coerenza e non come prova univoca; evitare di bloccare documenti distinti solo perché simili. Per MioCondominio identificare esercizio/gestione e singola rata con scadenza, distinguendo rate già presenti da aggiornamenti di versato/saldo; non duplicare rate in caso di prospetti successivi. Da implementare e testare la gestione degli aggiornamenti di pagamento.

- 2026-11-08 — Revisione UX Movimenti: l'utente preferisce un registro compilato automaticamente dall'importazione documenti, consultabile e modificabile in caso di errore. Proposta: eliminare + Nuova dalla vista Movimenti e spostare la configurazione rate ricorrenti in Altro; mantenere un solo Carica documento in Home. Prima di rimuovere definitivamente inserimento manuale, valutare fallback per spese senza PDF. Stato: da definire/implementare.

- 2026-11-08 — Decisione Movimenti confermata: registro alimentato principalmente da documenti, modificabile/eliminabile; inserimento manuale conservato come funzione secondaria in Altro. Configurazione mutuo da progettare: impostazione una tantum (importo, giorno addebito, inizio), generazione rate mensili, variazioni future senza alterare storico; distinguere previsione da pagamento bancario effettivo. Non assumere verifica bancaria. Da concordare politica dello stato rata con utente prima dell'implementazione.

- Dettagli finanziari e identificativi personali omessi dal registro pubblico; verificare esclusivamente nell’archivio privato.

- Dettagli finanziari e identificativi personali omessi dal registro pubblico; verificare esclusivamente nell’archivio privato.

- 2026-11-08 — Priorità concordata: NON caricare solo mutuo. Preparare un unico caricamento iniziale completo con tutti i documenti storici disponibili: MioCondominio esercizi ordinari e straordinari, bollette Nexta gas/corrente (consumi e canone TV), storico mutuo 2021–2026 e rate future, prestito personale storico e futuro, Sky TV/Internet per le sole fatture disponibili. Importazione privata e idempotente, senza pubblicare dati personali su GitHub; deduplicare i record già inseriti sul dispositivo. Conservare i totali esatti e distinguere stime/ripartizioni annuali da rate effettive e future. Prima inventariare e verificare tutti i documenti, senza inventare periodi mancanti. Non sovrascrivere dati esistenti senza anteprima.

- Dettagli finanziari e identificativi personali omessi dal registro pubblico; verificare esclusivamente nell’archivio privato.

- 2026-11-08 — Home aggiornata: totale primario solo gestione (Gas, Corrente, TV e Internet, Condominio); totale complessivo secondario include Mutuo + prestito; quattro card gestione in griglia e card larga mutuo/prestito sotto. Nessun dato persistito modificato. Da testare sul dispositivo.

- 2026-11-08 — Analisi semplificate come approvato: filtro predefinito 'Spese di gestione (senza mutuo)', grafici mensili/categorie/confronto annuale senza finanziamenti; selezionando Mutuo + prestito mostra soltanto il totale dell'anno, nascondendo grafici superflui. Dati esistenti invariati. Da verificare in browser.

- 2026-11-08 — Grafici Analisi cliccabili implementati (mensile, categoria, confronto annuale, consumi energetici, condominio per tipo/motivo). Dialog dettaglio con movimenti e quote di competenza, navigabile anche da tastiera; mutuo resta solo totale. Da testare su browser e mobile; nessun dato persistente modificato.

- 2026-11-08 — Appwrite fase 1: configurati endpoint EU, Project ID e Database ID non segreti; aggiunto in Altro login email/password, controllo sessione persistente e logout. Nessun upload o cancellazione di movimenti: archivio locale invariato. Test utente necessario prima di attivare sincronizzazione. Non usare credenziali amministratore né API key nel client pubblico. Verificare team membership e permessi prima di scrivere sul cloud.

- 2026-11-08 — Test login Appwrite segnalato non riuscito: password spariva e form restava visibile. Modificato login per cancellare password solo dopo conferma GET /account e mostrare errore esplicito quando sessione non persiste (possibile blocco cookie cross-site Safari/GitHub Pages). Attendere testo diagnostico; non avviare sincronizzazione/migrazione.

- 2026-11-08 — Diagnosi screenshot: login email accettato, GET /account restituisce 401 per cookie cross-site. Corretto client REST usando header di risposta/richiesta X-Fallback-Cookies documentato da Appwrite, persistito localmente con chiave dedicata, cancellato al logout. Da testare su Safari e dopo ricarica. Nessun movimento sincronizzato.

- 2026-11-08 — Login Appwrite confermato funzionante da screenshot. Su richiesta utente spostata gestione account da grande card in Altro a menu compatto in alto a destra, con nome, email, stato connessione, login e logout; da verificare su desktop/iPhone. Sincronizzazione movimenti ancora non attiva.

- 2026-11-08 — Utente conferma login funzionante su entrambi i dispositivi. Header aggiornato: logo/titolo HEIMORA cliccabili per tornare alla Home; avatar account sostituito con icona persona SVG moderna, mantenendo login/logout invariati. Da verificare visualmente su iPhone e Mac. Sincronizzazione dati non ancora attiva.

- 2026-11-08 — Aggiunta sezione Altro → Sincronizzazione cloud: lettura paginata Appwrite TablesDB, controllo numero movimenti, upload manuale soltanto quando cloud vuoto e dopo conferma backup, identificativi deterministici, verifica finale dei record, importazione cloud con merge non distruttivo. Non sono ancora attivi auto-sync, propagazione modifiche/cancellazioni e risoluzione conflitti. Verificare API, permessi, comportamento su Mac e iPhone prima di affidarsi al cloud. Gestione utenti in-app rinviata a eventuale pubblicazione.

- 2026-11-08 — Aggiunto gate di autenticazione all'avvio: UI principale nascosta fino a GET /account valido, login dedicato a schermo intero, logout riporta al gate, sessione valida apre la Home senza password. Nessun dato locale cancellato. Da testare su Safari/iPhone. Nota sicurezza: blocco UI non equivale a cifratura localStorage; per protezione completa migrare dati al cloud e rimuovere cache locale privata in modo controllato dopo backup e test.

- 2026-11-08 — Prima migrazione Appwrite interrotta a 120/223 per HTTP 429 rate limit. Dati locali intatti. Corretto caricamento per rileggere cloud, confrontare ID/contenuti, non sovrascrivere conflitti, caricare solo record mancanti con pausa di 1,1 s tra richieste e interrompere con messaggio su 429; verifica finale. Da testare dopo raffreddamento rate limit. Evitare ripetizioni ravvicinate.

- 2026-11-08 — Confermata importazione dei 223 movimenti anche su iPhone. Aggiunta prima sincronizzazione automatica non distruttiva (lettura cloud all'accesso, ritorno in app e dopo salvataggi; upload nuovi/aggiornati con coda persistente e controllo conflitti). Non sono ancora sincronizzate le cancellazioni; evitare di dichiarare completato finché non si verificano creazione e modifica cross-device, rate limit, errori e gestione di due utenti sullo stesso browser. Ricorrenze e altri flussi di scrittura diretta localStorage da integrare.

- 2026-11-08 — Utente dispone temporaneamente solo di iPhone e chiede di rinviare test sincronizzazione su due dispositivi. Stato: 223 movimenti migrati/importati; auto-sync nuovi/modificati implementato ma non verificato; cancellazioni non sincronizzate. Non fare test cross-device ora; proseguire su altra funzionalità concordata.

- 2026-11-08 — Migliorata sezione Movimenti senza toccare i dati: ricerca testuale (fornitore, descrizione, fattura, categoria, periodo), filtro stato Pagate/Da pagare/Da verificare, conteggio e somma dei documenti filtrati, ordinamento per scadenza/periodo. Totale esplicitamente di importi integrali, non ripartizione annuale. Da verificare su iPhone. Cancellazioni ancora non sincronizzate, evitare test di eliminazione fino a completamento sync.

- 2026-11-08 — Movimenti ridisegnati come elenco compatto a righe espandibili: descrizione, categoria/data, importo e stato sempre visibili; tap apre dettagli (fattura, scadenza, periodo, consumo, canone TV) e pulsante Modifica. Ricerca e filtri invariati. Eliminazione disabilitata nella nuova vista finché cancellazioni cloud non sono sincronizzate, per evitare riapparizioni; da testare su iPhone. Nessun dato storico modificato.

- 2026-11-08 — Decisione utente: rate condominiali ordinarie/straordinarie SEMPRE con conferma manuale, non passano automaticamente a Pagata. Nuove rate ricorrenti condominiali create come 'due'; dopo scadenza etichetta UI 'Scaduta' (senza cambiare il dato); nella scheda Movimenti aggiunto 'Segna come pagata' per condominio. settleScheduledPayments automatizza soltanto Mutuo + prestito. Storico già pagato non modificato. Da completare: notifiche in-app, separazione previsioni/consuntivo, sync configurazioni ricorrenti e test.

- 2026-11-08 — Regola confermata: rate condominiali NON pagate escluse da Home e Analisi; al pagamento registrare paymentDate effettiva (default oggi, modificabile con richiesta data), contabilizzare intero importo nel mese paymentDate anche se oltre scadenza. Aggiornate allocations, analysisDetailItems, anno disponibile e dettaglio movimento; pagamento manuale da Movimenti e modifica. Storico condominiale già pagato privo di paymentDate conserva attribuzione precedente senza inventare date. Da verificare su iPhone e collaudare cross-device; necessario perfezionare UX date e gestione import storico/ricorrenze.

- 2026-11-08 — Implementato campo Data pagamento effettivo modificabile in form Movimenti per tutte le categorie; default oggi su nuova spesa, mantenimento data nelle modifiche, pulsante Segna come pagata per ogni movimento non pagato con scelta data reale. Home, grafici analisi e dettaglio grafici ora usano solo status=paid e paymentDate (se presente), inclusa ripartizione canone TV e condominio. Bollette nuove pagate contate nel mese di pagamento, non periodo consumi. Periodo consumi preservato per analisi energetica. Record storici pagati senza paymentDate mantengono vecchia attribuzione per non inventare date. Da collaudare sul dispositivo e con PDF import; sincronizzazione multi-dispositivo non verificata.

- 2026-11-08 — Import PDF Nexta/Sky: dopo openEntry() assegnata esplicitamente paymentDate=localToday() e nota di verifica data per bollette già pagate o scelta Da pagare; data resta modificabile in Movimenti. Non cambia storico. Da collaudare su iPhone.

- 2026-11-08 — Home: nuova scheda Rate condominiali mostrata solo se ci sono rate non pagate scadute o entro 60 giorni, con conteggio/importo separati, prime cinque scadenze e pulsante Pagata che chiede data effettiva e aggiorna le spese tramite persist. Non conta le rate non pagate nei totali. Scadenze future oltre 60 giorni non visualizzate in Home; i piani ricorrenti attuali generano righe solo fino al mese corrente (da estendere per anteprima futura). Da testare su iPhone.

- 2026-11-08 — Avvio controllato: revisione statica della sincronizzazione. Corretti due rischi di perdita aggiornamenti: modifiche successive allo stesso movimento ora aggiornano la voce in coda senza perdere la base di confronto; modifiche locali durante una sincronizzazione in corso non vengono eliminate quando termina la richiesta. Anche la creazione automatica delle rate e il passaggio automatico a pagato per mutuo/prestito entrano nella coda cloud. Nessun dato storico modificato. Restano da verificare su dispositivo: salvataggio offline/online, esiti e conflitti Appwrite, sincronizzazione fra due dispositivi, cancellazioni cloud non implementate. Non dichiarare collaudo completato.

- 2026-11-08 — Localizzazione date: Home rate, Movimenti e dettagli visualizzano date GG/MM/AAAA (mesi MM/AAAA); la conferma pagamento con prompt richiede GG/MM/AAAA, convertito internamente in ISO per i calcoli. Gli input nativi date/month del browser conservano il proprio comportamento locale. Nessun movimento modificato.


## 2026-11-08 — Bootstrap automatico dispositivi
- Se un account autenticato non ha ancora una baseline locale e non ha modifiche in coda, HEIMORA legge l'archivio cloud e inizializza automaticamente il dispositivo, senza passaggi manuali.
- Prima della sostituzione conserva una copia locale `heimora-bootstrap-backup-<userId>`; in caso di cloud vuoto con archivio locale presente non sovrascrive.
- La sincronizzazione delle modifiche successive rimane in collaudo: test bidirezionale, conflitti simultanei e cancellazioni non ancora validati.


## 2026-11-08 — Eliminazione generale e aggiornamento automatico
- Pulsante Elimina disponibile per ogni movimento in Movimenti, con conferma a tema HEIMORA.
- La cancellazione è cloud-first: si procede solo se la versione locale, la baseline verificata e la versione cloud coincidono e non ci sono modifiche in coda; poi si elimina localmente.
- Ogni dispositivo collegato rileva cancellazioni remote solo per movimenti già presenti nella propria baseline, evitando di cancellare nuove registrazioni locali.
- Controllo automatico ogni 15 secondi con pagina visibile, oltre a ritorno in app e riconnessione.
- Restano da collaudare: cancellazione di un movimento reale e modifiche simultanee/offline. Nessuna cancellazione storica effettuata durante il rilascio.

## 2026-11-08 — Verifica cloud in sola lettura
- In Altro → Sincronizzazione → Controlla cloud aggiunto rapporto non distruttivo: numero movimenti, ID duplicati, rate dicembre 2026 mutuo/prestito, copertura e totale rate 2027, duplicati mensili, differenze dispositivo/cloud e modifiche in coda.
- Versione 2026.11.08.9. Il rapporto legge direttamente Appwrite dall'account autorizzato, non pubblica dati nel repository e non scrive né modifica movimenti.
- **Da verificare dall'app**: output del controllo su iPhone; poi affrontare i test di sincronizzazione e la rimozione degli importi finanziari hardcoded dal repository pubblico con migrazione prudente.

## 2026-11-08 — Riduzione esposizione dati personali
- Rimossi dal codice pubblico nomi e importi specifici usati come valori fissi per dicembre 2026: la continuità usa il movimento privato precedente, se necessario, e non modifica rate già presenti.
- Redatti dal registro operativo corrente importi finanziari e riferimenti identificativi personali.
- **Ancora aperto**: i totali 2027 restano nel codice per mantenere la quadratura concordata. Non rimuoverli senza una configurazione privata cloud verificata e migrazione sicura.
- **Limite importante**: le versioni precedenti rimangono nella cronologia Git pubblica; la redazione del file corrente non cancella la storia. Valutare una bonifica della cronologia solo con procedura controllata, dopo backup e senza interrompere GitHub Pages.

## 2026-11-10 — Ricognizione stabilità e test già eseguiti
- L'utente conferma di avere già verificato su Mac e iPhone creazione, modifica ed eliminazione sincronizzata dei movimenti: non richiedere nuovamente questi test senza anomalie concrete.
- Screenshot di «Controlla cloud» del 10/11/2026: 239 movimenti cloud / 239 dispositivo, 0 ID duplicati, 0 modifiche locali in attesa, 0 movimenti solo locali o solo cloud, 0 duplicati rate mutuo/prestito. Dicembre 2026 mutuo e prestito presenti e programmati; 2027 generato a partire da gennaio 2027.
- L'utente conferma che «Esporta backup JSON» è già stato provato e funziona. Non confondere export verificato con ripristino completo collaudato.
- Fastweb Gas validato su fattura ottobre 2026; Fastweb Luce attende primo PDF reale. Evitare nuovi sviluppi non necessari: priorità stabilità e manutenzione.
- Restano come miglioramenti separati, non bloccanti: eventuale collaudo del ripristino in ambiente isolato e migrazione prudente degli importi finanziari 2027 dal codice pubblico a configurazione privata. Nessuna modifica ai movimenti o alla logica delle rate in questa ricognizione.

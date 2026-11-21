# heimora
HEIMORA - Gestione bollette e scadenze domestiche

## Anteprima Firebase Spark

Questa copia usa un archivio locale separato da quello della versione Appwrite.
Per il primo collaudo usa un progetto Spark e dati fittizi.

1. Nella console Firebase crea o seleziona il progetto, registra una web app
   e salva la configurazione Web in `firebase-config.json`. Il formato è in
   `firebase-config.example.json`. Il file accetta solo la configurazione
   client. Conserva chiavi amministrative e file di servizio fuori dalla cartella.
2. Abilita Email/Password in Authentication, poi crea i due utenti di collaudo.
3. Crea Firestore Standard e scegli la regione. Pubblica `firestore.rules`
   prima di usare l'archivio. Crea dalla console un documento `members/{uid}`
   per ogni utente autorizzato, con il campo facoltativo `name`.
4. Servi questa directory via HTTP su localhost o via HTTPS per un dispositivo
   remoto. Apri la pagina e verifica entrambi gli accessi, il rifiuto di un
   utente senza documento di appartenenza e una scrittura da due sessioni.
5. Prima di migrare, esporta e riconcilia movimenti, code locali, prospetti
   e configurazioni delle rate. La configurazione annuale viene letta da
   `privateConfig/rate-annuali-2027`. I prospetti storici già incorporati nel
   frontend vanno trasferiti nell'archivio privato prima di pubblicare
   l'anteprima. Il test di importazione e il confronto con Appwrite
   precedono il cambio dell'app live.

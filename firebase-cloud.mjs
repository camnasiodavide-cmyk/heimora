const sdkBase = "https://www.gstatic.com/firebasejs/13.4.0/";

function failure(status, message) {
 return Object.assign(new Error(message), {status});
}

export function createFirebaseCloud(auth, db, authSdk, firestore, onMovementsChanged) {
 const {signInWithEmailAndPassword, signOut} = authSdk;
 const {collection, doc, getDocFromServer, getDocsFromServer, onSnapshot, runTransaction} = firestore;
 let stopListening;
 let movementRows;
 let listenerError;

 function clearListener() {
  stopListening?.();
  stopListening = undefined;
  movementRows = undefined;
  listenerError = undefined;
 }

 function asRows(snapshot) {
  return snapshot.docs.map(row => ({$id: row.id, payload: row.data().payload}));
 }

 async function account() {
  await auth.authStateReady();
  const user = auth.currentUser;
  if (!user) throw failure(401, "Accedi con il tuo account HEIMORA.");
  const member = await getDocFromServer(doc(db, "members", user.uid));
  if (!member.exists()) {
   clearListener();
   await signOut(auth);
   throw failure(403, "Questo account non ha accesso all’archivio di HEIMORA.");
  }
  if (!stopListening) {
   stopListening = onSnapshot(collection(db, "movements"), {includeMetadataChanges: true}, snapshot => {
    if (snapshot.metadata.fromCache || snapshot.metadata.hasPendingWrites) {
     movementRows = undefined;
     return;
    }
    movementRows = asRows(snapshot);
    onMovementsChanged();
   }, error => {
    clearListener();
    listenerError = error;
    onMovementsChanged();
   });
  }
  return {$id: user.uid, email: user.email, name: member.data().name || user.displayName};
 }

 return {
  account,
  async login(email, password) {
   clearListener();
   await signInWithEmailAndPassword(auth, email, password);
   return account();
  },
  async logout() {
   await signOut(auth);
   clearListener();
  },
  async readRows(name, useListener = false) {
   if (name === "movements" && useListener) {
    if (listenerError) throw listenerError;
    if (movementRows) return movementRows;
   }
   return asRows(await getDocsFromServer(collection(db, name)));
  },
  async readRow(name, id) {
   const row = await getDocFromServer(doc(db, name, id));
   if (!row.exists()) throw failure(404, "Configurazione cloud assente.");
   return {$id: row.id, payload: row.data().payload};
  },
  async writeRow(name, id, method, payload, expected) {
   const ref = doc(db, name, id);
   await runTransaction(db, async transaction => {
    const current = await transaction.get(ref);
    if (method === "POST") {
     if (current.exists()) {
      if (current.data().payload === payload) return;
      throw failure(409, "La voce esiste già con dati differenti.");
     }
    } else if (!current.exists() || current.data().payload !== expected) {
     throw failure(409, "La voce è cambiata sull’altro dispositivo. Rileggila e riprova.");
    }
    if (method === "DELETE") transaction.delete(ref);
    else transaction.set(ref, {payload});
   });
   if (name === "movements") movementRows = undefined;
  }
 };
}

export async function connectFirebase(onMovementsChanged) {
 const response = await fetch("./firebase-config.json", {cache: "no-store"});
 if (!response.ok) throw failure(503, "Il progetto Firebase di prova deve ancora essere configurato.");
 const config = await response.json();
 if (!config.apiKey || !config.projectId || !config.appId) {
  throw failure(503, "La configurazione Firebase è incompleta.");
 }
 const [{initializeApp}, authSdk, firestore] = await Promise.all([
  import(sdkBase + "firebase-app.js"),
  import(sdkBase + "firebase-auth.js"),
  import(sdkBase + "firebase-firestore.js")
 ]);
 const app = initializeApp(config);
 return createFirebaseCloud(authSdk.getAuth(app), firestore.getFirestore(app), authSdk, firestore, onMovementsChanged);
}

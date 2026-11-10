// HEIMORA: online-first. No cached financial data or HTML is persisted.
self.addEventListener("install",()=>self.skipWaiting());
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("fetch",event=>{
 const request=event.request;
 if(request.method!=="GET"||new URL(request.url).origin!==self.location.origin)return;
 // Network-first for app shell. Do not cache account, bills or private responses.
 if(request.mode==="navigate"){
  event.respondWith(fetch(new Request(request,{cache:"no-store"})).catch(()=>Response.error()));
 }
});

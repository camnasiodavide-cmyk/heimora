// Cache only the public application shell. Account and financial responses go directly to Appwrite.
const CACHE_NAME="heimora-shell-2026.11.20.2";
const SHELL=new URL("./index.html",self.registration.scope).href;
const SCOPE=new URL(self.registration.scope);
self.addEventListener("install",event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await cache.addAll(["./index.html","./manifest.webmanifest","./heimora-icon.svg","./heimora-touch-icon.png"]);
  await self.skipWaiting();
 })());
});
self.addEventListener("activate",event=>{
 event.waitUntil((async()=>{
  const names=await caches.keys();
  await Promise.all(names.filter(name=>name.startsWith("heimora-shell-")&&name!==CACHE_NAME).map(name=>caches.delete(name)));
  await self.clients.claim();
 })());
});
self.addEventListener("fetch",event=>{
 const request=event.request,url=new URL(request.url);
 if(request.method!=="GET"||url.origin!==SCOPE.origin)return;
 if(request.mode==="navigate"&&(url.pathname===SCOPE.pathname||url.href===SHELL)){
  event.respondWith((async()=>{
   try{
    const response=await fetch(new Request(request,{cache:"no-store"}));
    if(response.status<500)return response;
   }catch(e){}
   return await (await caches.open(CACHE_NAME)).match(SHELL)||Response.error();
  })());
 }
 if(url.href===new URL("./heimora-icon.svg",SCOPE).href||url.href===new URL("./heimora-touch-icon.png",SCOPE).href){
  event.respondWith((async()=>await (await caches.open(CACHE_NAME)).match(request)||fetch(request))());
 }
});

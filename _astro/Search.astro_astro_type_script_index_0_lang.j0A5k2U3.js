const w="modulepreload",y=function(m){return"/pruebaAstroBuild/"+m},g={},b=function(c,i,l){let d=Promise.resolve();if(i&&i.length>0){document.getElementsByTagName("link");const r=document.querySelector("meta[property=csp-nonce]"),n=r?.nonce||r?.getAttribute("nonce");d=Promise.all(i.map(t=>{if(t=y(t),t in g)return;g[t]=!0;const s=t.endsWith(".css"),f=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${f}`))return;const o=document.createElement("link");if(o.rel=s?"stylesheet":w,s||(o.as="script",o.crossOrigin=""),o.href=t,n&&o.setAttribute("nonce",n),document.head.appendChild(o),s)return new Promise((u,e)=>{o.addEventListener("load",u),o.addEventListener("error",()=>e(new Error(`Unable to preload CSS for ${t}`)))})}))}return d.then(()=>c()).catch(r=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=r,window.dispatchEvent(n),!n.defaultPrevented)throw r})};class E extends HTMLElement{constructor(){super();const c=this.querySelector("button[data-open-modal]"),i=this.querySelector("button[data-close-modal]"),l=this.querySelector("dialog"),d=this.querySelector(".dialog-frame"),r=e=>{("href"in(e.target||{})||document.body.contains(e.target)&&!d.contains(e.target))&&t()},n=e=>{l.showModal(),document.body.toggleAttribute("data-search-modal-open",!0),this.querySelector("input")?.focus(),e?.stopPropagation(),window.addEventListener("click",r)},t=()=>l.close();c.addEventListener("click",n),c.disabled=!1,i.addEventListener("click",t),l.addEventListener("close",()=>{document.body.toggleAttribute("data-search-modal-open",!1),window.removeEventListener("click",r)}),window.addEventListener("keydown",e=>{(e.metaKey===!0||e.ctrlKey===!0)&&e.key==="k"&&(l.open?t():n(),e.preventDefault())});let s={};try{s=JSON.parse(this.dataset.translations||"{}")}catch{}const u=this.dataset.stripTrailingSlash!==void 0?e=>e.replace(/(.)\/(#.*)?$/,"$1$2"):e=>e;window.addEventListener("DOMContentLoaded",()=>{(window.requestIdleCallback||(h=>setTimeout(h,1)))(async()=>{const{PagefindUI:h}=await b(async()=>{const{PagefindUI:a}=await import("./ui-core.BrCxV8r8.js");return{PagefindUI:a}},[]);new h({element:"#starlight__search",baseUrl:"/pruebaAstroBuild",bundlePath:"/pruebaAstroBuild".replace(/\/$/,"")+"/pagefind/",showImages:!1,translations:s,showSubResults:!0,processResult:a=>{a.url=u(a.url),a.sub_results=a.sub_results.map(p=>(p.url=u(p.url),p))}})})})}}customElements.define("site-search",E);export{b as _};
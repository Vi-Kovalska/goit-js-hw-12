import{a as b,S as L,i as u}from"./assets/vendor-LKfbwt14.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=n(e);fetch(e.href,r)}})();const x="47506069-50a24acca197abc732faaa7f2";async function p(a,t){m.insertAdjacentHTML("afterbegin",'<div class="loader" ></div>');const n=document.querySelector(".loader"),o=await b("https://pixabay.com/api/",{params:{key:x,q:a,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}});return n.remove(),o.data}function g(a){return a.map(({largeImageURL:n,webformatURL:o,likes:e,views:r,comments:l,downloads:h,id:y,tags:v})=>`<li class="gallery-card" data-id="${y}">
      <a class="gallery-link" href="${n}">
  <img class="pixabay-img" src="${o}" alt="${v}" width="360" height="160"/>
  </a>
  <div class="wrapper-card-text">
  <p class="card-text">Likes <span>${e}</span></p>
   <p class="card-text">Views <span>${r}</span></p>
    <p class="card-text">Comments <span>${l}</span></p>
     <p class="card-text">Downloads <span>${h}</span></p>
  </div>
  </li>`).join("")}function f(){return new L(".gallery a",{captionsData:"alt",captionDelay:"250",className:"wrapper"}).refresh()}function w(){return u.show({theme:"dark",iconUrl:"../img/icons/alert.svg",imageWidth:"24px",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",messageColor:"#fff",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#EF4040",timeout:5e3,displayMode:1})}function S(){return u.show({theme:"dark",iconUrl:"../img/icons/alert.svg",imageWidth:"24px",position:"topRight",message:" We are sorry, but you have reached the end of search results.",messageColor:"#fff",messageSize:"16px",messageLineHeight:"24px",backgroundColor:"#EF4040",timeout:5e3,displayMode:1})}const M=document.querySelector(".form-search-img"),m=document.querySelector(".gallery"),s=document.querySelector(".load-more-btn");let i=1,c,d;M.addEventListener("submit",H);async function H(a){if(a.preventDefault(),s.classList.remove("load-more-visible"),i=1,d=a.target.elements.titleImage.value.trim(),!!d){m.innerHTML="";try{const t=await p(d,i);if(t.hits.length===0)throw new Error;m.insertAdjacentHTML("beforeend",g(t.hits)),f(),c=Math.ceil(t.totalHits/15),i<c&&s.classList.add("load-more-visible")}catch{s.classList.remove("load-more-visible"),w()}finally{a.target.elements.titleImage.value=""}}}s.addEventListener("click",async()=>{try{s.classList.remove("load-more-visible"),s.insertAdjacentHTML("afterend",'<div class="loader" ></div>');const a=document.querySelector(".loader");i+=1;const t=await p(d,i);if(a.remove(),c=Math.ceil(t.totalHits/15),i>c)throw new Error;m.insertAdjacentHTML("beforeend",g(t.hits)),f();const o=document.querySelector(".gallery-card").getBoundingClientRect().height;window.scrollBy({left:0,top:o*2,behavior:"smooth"}),s.classList.add("load-more-visible")}catch{if(i>c)return loader.remove(),s.classList.remove("load-more-visible"),S()}});
//# sourceMappingURL=index.js.map
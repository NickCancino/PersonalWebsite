const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const glow=document.querySelector('.cursor-glow');window.addEventListener('pointermove',event=>{glow.style.left=`${event.clientX}px`;glow.style.top=`${event.clientY}px`});
const projects={schools:{title:'Community Schools Dashboard',description:'I built this dashboard to give school staff one place to handle events, service requests, engagement forms, and budgets. It supports separate school and administrator views, multi-day requests, validated forms, and workbook-style budget calculations.',className:'',images:['assets/projects/home page.png','assets/projects/login.png','assets/projects/program service form sub.png']},cardfolio:{title:'Cardfolio',description:'Cardfolio makes the practical side of collecting Pokémon cards easier. It combines live pricing, collection and wishlist tracking, condition adjustments, deal ratings, and a two-sided trade calculator in one mobile experience.',className:'phone',images:['assets/projects/pokemon1.PNG','assets/projects/pokemon2.PNG','assets/projects/pokemon3.PNG','assets/projects/pokemon4.PNG','assets/projects/pokemon5.PNG']}};
const dialog=document.querySelector('#project-dialog'),dialogContent=document.querySelector('#dialog-content');document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{const project=projects[button.dataset.project];dialogContent.innerHTML=`<div class="dialog-body"><p class="section-label">Project spotlight</p><h2>${project.title}</h2><p>${project.description}</p><div class="dialog-gallery ${project.className}">${project.images.map((src,index)=>`<img src="${src}" alt="${project.title} screen ${index+1}">`).join('')}</div></div>`;dialog.showModal()}));document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});document.querySelector('#year').textContent=new Date().getFullYear();

const developmentStacks={
  schools:{title:'Community Schools Dashboard',items:['Next.js','React','TypeScript','Tailwind CSS','Supabase','React Hook Form','Zod','Vitest','Testing Library']},
  cardfolio:{title:'Cardfolio',items:['Expo SDK','React Native','TypeScript','Expo Router','Expo Camera','Expo Image Picker','AsyncStorage','React Context','Vitest','Pokémon TCG API','RapidAPI']},
  deadlock:{title:'Deadlock Tracker',items:['Python','FastAPI','React','OpenAI API','PostgreSQL']}
};
document.querySelectorAll('[data-stack]').forEach(button=>button.addEventListener('click',()=>{
  const stack=developmentStacks[button.dataset.stack];
  dialogContent.innerHTML=`<div class="dialog-body stack-dialog-body"><p class="section-label">Development Stack</p><h2>${stack.title}</h2><div class="stack-list">${stack.items.map(item=>`<span>${item}</span>`).join('')}</div></div>`;
  dialog.showModal();
}));

const profileImage=document.querySelector('[data-profile-shuffle]');
const profilePhotos=[
  {src:'assets/profile/1.JPG',position:'45% 68%'},
  {src:'assets/profile/2.JPG',position:'50% 58%'},
  {src:'assets/profile/3.JPG',position:'84% 53%'},
  {src:'assets/profile/4.JPG',position:'83% 48%'},
  {src:'assets/profile/5.JPG',position:'17% 45%'},
  {src:'assets/profile/6.jpeg',position:'78% 48%'},
  {src:'assets/profile/7.JPG',position:'36% 48%'}
];
profilePhotos.slice(1).forEach(photo=>{const image=new Image();image.src=photo.src});
profileImage.style.objectPosition=profilePhotos[0].position;
if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  let currentPhoto=0;
  window.setInterval(()=>{
    let nextPhoto=currentPhoto;
    while(nextPhoto===currentPhoto) nextPhoto=Math.floor(Math.random()*profilePhotos.length);
    profileImage.classList.add('is-changing');
    window.setTimeout(()=>{
      currentPhoto=nextPhoto;
      profileImage.src=profilePhotos[currentPhoto].src;
      profileImage.style.objectPosition=profilePhotos[currentPhoto].position;
      profileImage.classList.remove('is-changing');
    },320);
  },5200);
}

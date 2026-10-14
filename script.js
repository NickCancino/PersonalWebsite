const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#site-nav');menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open))});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('visible')),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
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

// Keep each image mounted so the previews physically move into the center.
const carousel = document.querySelector('.profile-carousel');
const slides = [...carousel.querySelectorAll('.profile-slide')];
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const pauseButton = carousel.querySelector('[data-carousel="pause"]');
const status = carousel.querySelector('[data-carousel-status]');
const count = carousel.querySelector('.carousel-count');
let currentPhoto = 0;
let paused = false;
let busy = false;
let timer;
let transition;

function relativeSlot(index) {
  let slot = (index - currentPhoto + slides.length) % slides.length;
  if (slot > slides.length / 2) slot -= slides.length;
  return slot;
}

function photoState(slot) {
  return {
    x: 0,
    y: 0,
    xPercent: -50 + slot * 72,
    yPercent: -50,
    scale: slot === 0 ? 1 : .82,
    opacity: slot === 0 ? 1 : Math.abs(slot) === 1 ? .45 : 0,
    filter: slot === 0 ? 'blur(0px)' : 'blur(6px)'
  };
}

function setPhotoState(slide, slot) {
  const state = photoState(slot);
  if (window.gsap) {
    gsap.set(slide, state);
  } else {
    slide.style.transform = `translate(${state.xPercent}%, -50%) scale(${state.scale})`;
    slide.style.opacity = state.opacity;
    slide.style.filter = state.filter;
  }
  slide.style.zIndex = slot === 0 ? '2' : '1';
}

function updatePhotoLabels(announce = false) {
  slides.forEach((slide, index) => {
    const active = index === currentPhoto;
    slide.alt = active ? `Nicolas Cancino and friends — photo ${index + 1} of ${slides.length}` : '';
    slide.setAttribute('aria-hidden', String(!active));
  });
  count.textContent = `${currentPhoto + 1} / ${slides.length}`;
  // Automatic rotation stays quiet for screen readers.
  if (announce) status.textContent = `Photo ${currentPhoto + 1} of ${slides.length}`;
}

function schedulePhoto() {
  window.clearTimeout(timer);
  if (paused || busy || motionPreference.matches || document.hidden ||
      carousel.matches(':hover') || carousel.contains(document.activeElement)) return;
  timer = window.setTimeout(() => advancePhoto(1), 5200);
}

async function advancePhoto(direction, announce = false) {
  if (busy) return;
  window.clearTimeout(timer);
  busy = true;
  const next = (currentPhoto + direction + slides.length) % slides.length;
  const incoming = slides[next];
  // Decode before motion starts, so a slow image cannot leave an empty center.
  incoming.loading = 'eager';
  try {
    await incoming.decode();
  } catch {
    busy = false;
    schedulePhoto();
    return;
  }
  const oldSlots = slides.map((_, index) => relativeSlot(index));
  currentPhoto = next;
  const complete = () => {
    busy = false;
    updatePhotoLabels(announce);
    schedulePhoto();
  };
  if (motionPreference.matches || !window.gsap) {
    slides.forEach((slide, index) => setPhotoState(slide, relativeSlot(index)));
    complete();
    return;
  }
  transition = gsap.timeline({ onComplete: complete });
  slides.forEach((slide, index) => {
    const slot = relativeSlot(index);
    // Wrap only invisible slides, beyond the clipped viewport.
    if (Math.abs(slot - oldSlots[index]) > 1) setPhotoState(slide, slot + direction);
    slide.style.zIndex = slot === 0 ? '2' : '1';
    transition.to(slide, { ...photoState(slot), duration: 1.1, ease: 'power3.inOut' }, 0);
  });
}

carousel.querySelector('[data-carousel="previous"]').addEventListener('click', () => advancePhoto(-1, true));
carousel.querySelector('[data-carousel="next"]').addEventListener('click', () => advancePhoto(1, true));
pauseButton.addEventListener('click', () => {
  paused = !paused;
  pauseButton.textContent = paused ? 'Play' : 'Pause';
  schedulePhoto();
});
carousel.addEventListener('pointerenter', () => window.clearTimeout(timer));
carousel.addEventListener('pointerleave', schedulePhoto);
carousel.addEventListener('focusin', () => window.clearTimeout(timer));
carousel.addEventListener('focusout', () => window.setTimeout(schedulePhoto, 0));
document.addEventListener('visibilitychange', schedulePhoto);
motionPreference.addEventListener('change', () => {
  transition?.kill();
  busy = false;
  slides.forEach((slide, index) => setPhotoState(slide, relativeSlot(index)));
  pauseButton.hidden = motionPreference.matches;
  updatePhotoLabels();
  schedulePhoto();
});
slides.forEach((slide, index) => setPhotoState(slide, relativeSlot(index)));
pauseButton.hidden = motionPreference.matches;
updatePhotoLabels();
schedulePhoto();

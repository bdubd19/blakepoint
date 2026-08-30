const nav=document.querySelector('[data-nav]');
const menu=document.querySelector('.menu');
const links=document.querySelector('#nav-links');
const lightbox=document.querySelector('[data-lightbox]');
const lightboxImage=lightbox.querySelector('img');

addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>32),{passive:true});
menu.addEventListener('click',()=>{
  const open=links.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
});
links.addEventListener('click',()=>{
  links.classList.remove('open');
  menu.setAttribute('aria-expanded','false');
});

document.querySelectorAll('[data-photo]').forEach(button=>button.addEventListener('click',()=>{
  lightboxImage.src=button.dataset.photo;
  lightboxImage.alt=button.querySelector('img').alt;
  lightbox.showModal();
}));
document.querySelector('[data-close]').addEventListener('click',()=>lightbox.close());
lightbox.addEventListener('click',event=>{if(event.target===lightbox) lightbox.close();});

const form=document.querySelector('[data-form]');
form.addEventListener('submit',event=>{
  event.preventDefault();
  const data=new FormData(form);
  const subject=encodeURIComponent('Blake Point House — winter rental inquiry');
  const body=encodeURIComponent([
    `Name: ${data.get('name')}`,
    `Email: ${data.get('email')}`,
    `Preferred dates: ${data.get('dates')}`,
    `Target monthly budget: ${data.get('budget')||'Not provided'}`,
    '',
    'Household:',data.get('household')||'Not provided','',
    'Additional notes:',data.get('notes')||'Not provided'
  ].join('\n'));
  location.href=`mailto:brandon@thedrewlos.com?subject=${subject}&body=${body}`;
});

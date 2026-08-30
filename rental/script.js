(() => {
  const photos = [
    ['bedrooms','Primary bedroom — wide view'],['bedrooms','Bedroom — front view 01'],['bedrooms','Bedroom — front view 02'],['bedrooms','Bedroom — front view 03'],['bedrooms','Bedroom — front view 04'],['bedrooms','Bedroom — front view 05'],['bedrooms','Bedroom — front view 06'],['bedrooms','Bedroom suite — room overview'],
    ['living','TV lounge — view 01'],['living','TV lounge — view 02'],['living','TV lounge — view 03'],['details','Interior console and artwork'],
    ['bedrooms','Second bedroom — view 01'],['bedrooms','Second bedroom — view 02'],['bedrooms','Second bedroom — dresser and workspace'],['bedrooms','Second bedroom — view 03'],['bedrooms','Second bedroom — view 04'],['details','Interior detail — view 02'],['details','Interior detail — view 03'],
    ['bathrooms','Bathroom — vanity and shower'],['bathrooms','Bathroom — shower detail'],
    ['exterior','Front approach — view 01'],['exterior','Front approach — view 02'],['exterior','Covered porch — view 01'],['exterior','Covered porch — view 02'],['exterior','Covered porch — view 03'],['exterior','Exterior angle — view 01'],['exterior','Exterior angle — view 02'],['exterior','House and landscaped yard'],['exterior','Centered front approach — view 01'],['exterior','Centered front approach — view 02']
  ];
  const path = index => `assets/photos/photo-${String(index + 1).padStart(2, '0')}.webp`;
  let current = 0;
  const stageImage = document.querySelector('#stage-image');
  const stageCount = document.querySelector('#stage-count');
  const stageCaption = document.querySelector('#stage-caption');
  const galleryTiles = [...document.querySelectorAll('.gallery-tile')];
  const lightbox = document.querySelector('.lightbox');

  function showPhoto(index, scroll = false) {
    current = (index + photos.length) % photos.length;
    stageImage.style.opacity = '.25';
    const preload = new Image();
    preload.onload = () => {
      stageImage.src = preload.src;
      stageImage.alt = photos[current][1];
      stageImage.style.opacity = '1';
    };
    preload.src = path(current);
    stageCount.textContent = `${String(current + 1).padStart(2, '0')} / 31`;
    stageCaption.textContent = photos[current][1];
    galleryTiles.forEach((tile, i) => tile.setAttribute('aria-current', i === current ? 'true' : 'false'));
    if (scroll) document.querySelector('.gallery-stage').scrollIntoView({behavior:'smooth', block:'center'});
  }

  document.querySelector('.stage-arrow.prev').addEventListener('click', () => showPhoto(current - 1));
  document.querySelector('.stage-arrow.next').addEventListener('click', () => showPhoto(current + 1));
  galleryTiles.forEach(tile => tile.addEventListener('click', () => showPhoto(Number(tile.dataset.index), true)));

  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.classList.toggle('active', item === button));
    galleryTiles.forEach(tile => { tile.hidden = filter !== 'all' && tile.dataset.group !== filter; });
    const first = galleryTiles.find(tile => !tile.hidden);
    if (first) showPhoto(Number(first.dataset.index));
  }));

  function openLightbox() {
    const image = lightbox.querySelector('img');
    image.src = path(current);
    image.alt = photos[current][1];
    lightbox.querySelector('figcaption span').textContent = `${String(current + 1).padStart(2, '0')} / 31`;
    lightbox.querySelector('figcaption b').textContent = photos[current][1];
    lightbox.showModal();
  }
  function updateLightbox(delta) {
    showPhoto(current + delta);
    const image = lightbox.querySelector('img');
    image.src = path(current);
    image.alt = photos[current][1];
    lightbox.querySelector('figcaption span').textContent = `${String(current + 1).padStart(2, '0')} / 31`;
    lightbox.querySelector('figcaption b').textContent = photos[current][1];
  }
  document.querySelector('#open-lightbox').addEventListener('click', openLightbox);
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.querySelector('.lightbox-prev').addEventListener('click', () => updateLightbox(-1));
  lightbox.querySelector('.lightbox-next').addEventListener('click', () => updateLightbox(1));
  lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });

  const levels = {
    1:{image:'assets/floor-plan/floor-1.webp',name:'Floor 1 · 1,067 finished sq. ft.',spaces:'Bedrooms · living room · office · foyer · two baths · patio · balcony'},
    2:{image:'assets/floor-plan/floor-2.webp',name:'Floor 2 · 1,183 finished sq. ft.',spaces:'Primary bedroom · kitchen · dining room · laundry · garage · deck'},
    3:{image:'assets/floor-plan/floor-3.webp',name:'Floor 3 · 545 finished sq. ft.',spaces:'Recreation room · bedroom · bath · storage · electrical room'}
  };
  const levelImage = document.querySelector('#level-image');
  document.querySelectorAll('[data-level]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.level;
    const level = levels[key];
    document.querySelectorAll('[data-level]').forEach(item => {
      item.classList.toggle('active', item === button);
      item.setAttribute('aria-selected', item === button ? 'true' : 'false');
    });
    levelImage.style.opacity = '.2';
    const preload = new Image();
    preload.onload = () => { levelImage.src = preload.src; levelImage.alt = `${level.name} plan`; levelImage.style.opacity = '1'; };
    preload.src = level.image;
    document.querySelector('#level-name').textContent = level.name;
    document.querySelector('#level-spaces').textContent = level.spaces;
  }));

  const planDialog = document.querySelector('.plan-dialog');
  document.querySelector('.plan-zoom').addEventListener('click', () => planDialog.showModal());
  levelImage.addEventListener('click', () => planDialog.showModal());
  planDialog.querySelector('.plan-close').addEventListener('click', () => planDialog.close());
  planDialog.addEventListener('click', event => { if (event.target === planDialog) planDialog.close(); });

  const menu = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobile-nav');
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    mobileNav.classList.toggle('open', !open);
  });
  mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));

  const places = {
    home:{coords:[50.9630752,-119.2724011],label:'Blake Point · approximate',tag:'BP',zoom:14,url:'https://www.google.com/maps/search/?api=1&query=Blake+Point+Magna+Bay+BC'},
    ross:{coords:[50.9621928,-119.2347477],label:'Ross Creek Country Store',tag:'01',zoom:15,url:'https://www.google.com/maps/search/?api=1&query=Ross+Creek+Country+Store+Magna+Bay+BC'},
    health:{coords:[50.9120469,-119.4577348],label:'North Shuswap Health Centre',tag:'02',zoom:15,url:'https://www.google.com/maps/search/?api=1&query=North+Shuswap+Health+Centre'},
    park:{coords:[50.9073277,-119.4399156],label:'Shuswap Lake Provincial Park',tag:'03',zoom:14,url:'https://www.google.com/maps/search/?api=1&query=Shuswap+Lake+Provincial+Park'},
    evelyn:{coords:[50.9716015,-119.1680384],label:'Evelyn Falls trail',tag:'04',zoom:14,url:'https://www.google.com/maps/search/?api=1&query=Evelyn+Falls+Trail+BC'},
    tsutswecw:{coords:[50.9013424,-119.5685973],label:'Tsútswecw Provincial Park',tag:'05',zoom:13,url:'https://www.google.com/maps/search/?api=1&query=Tsutswecw+Provincial+Park'}
  };

  const mapElement = document.querySelector('#area-map');
  function initAreaMap() {
    if (!window.L) {
      mapElement.removeAttribute('aria-busy');
      mapElement.innerHTML='<p style="padding:2rem">The interactive map could not load. Use the verified place links below.</p>';
      return;
    }
    const map = L.map('area-map',{scrollWheelZoom:false,zoomControl:false}).setView([50.94,-119.35],11);
    L.control.zoom({position:'bottomright'}).addTo(map);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      maxZoom:18,
      attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    const markers = {};
    Object.entries(places).forEach(([key,place]) => {
      const icon=L.divIcon({className:'bp-map-marker',html:place.tag,iconSize:[34,34],iconAnchor:[17,17]});
      markers[key]=L.marker(place.coords,{icon}).addTo(map).bindPopup(`<strong>${place.label}</strong><br><a href="${place.url}" target="_blank" rel="noopener">Open directions ↗</a>`);
    });
    const bounds=L.latLngBounds(Object.values(places).map(place => place.coords));
    map.fitBounds(bounds,{padding:[35,35]});
    document.querySelectorAll('[data-place]').forEach(button => button.addEventListener('click', () => {
      const key=button.dataset.place;
      const place=places[key];
      document.querySelectorAll('[data-place]').forEach(item => item.classList.toggle('active',item===button));
      map.flyTo(place.coords,place.zoom,{duration:.7});
      markers[key].openPopup();
    }));
    mapElement.removeAttribute('aria-busy');
    setTimeout(() => map.invalidateSize(),250);
  }
  mapElement.setAttribute('aria-busy','true');
  const mapObserver = new IntersectionObserver(([entry], observer) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    initAreaMap();
  }, {rootMargin:'500px 0px'});
  mapObserver.observe(mapElement);

  const form = document.querySelector('[data-interest-form]');
  function inquiryBody() {
    const data = new FormData(form);
    return [
      'Blake Point House — expression of interest','',
      `Name: ${data.get('name')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone') || 'Not provided'}`,
      `Preferred dates: ${data.get('dates')}`,
      `Intended occupants and residential use: ${data.get('use')}`,
      `Pets and vehicles: ${data.get('petsVehicles') || 'Not provided'}`,
      `Target monthly budget: ${data.get('budget') || 'Not provided'}`,'',
      'I confirmed that I am seeking quiet residential use and not a restricted property use.'
    ].join('\n');
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const body = inquiryBody();
    const mailto=`mailto:brandon@thedrewlos.com?subject=${encodeURIComponent('Blake Point House — expression of interest')}&body=${encodeURIComponent(body)}`;
    form.querySelector('.form-status').textContent='Your email app should open with the inquiry prepared. Nothing was stored on this site.';
    window.location.href=mailto;
  });
  form.querySelector('.copy-inquiry').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const text = inquiryBody();
    try {
      await navigator.clipboard.writeText(text);
      form.querySelector('.form-status').textContent='Inquiry copied. Paste it into an email to brandon@thedrewlos.com.';
    } catch (error) {
      const area=document.createElement('textarea');
      area.value=text;
      area.setAttribute('readonly','');
      area.style.position='fixed';
      area.style.opacity='0';
      document.body.appendChild(area);
      area.select();
      document.execCommand('copy');
      area.remove();
      form.querySelector('.form-status').textContent='Inquiry copied. Paste it into an email to brandon@thedrewlos.com.';
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' && lightbox.open) updateLightbox(-1);
    if (event.key === 'ArrowRight' && lightbox.open) updateLightbox(1);
  });
})();

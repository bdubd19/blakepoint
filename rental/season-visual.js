const section = document.querySelector('#seasons');
const canvas = document.querySelector('#season-canvas');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const compact = matchMedia('(max-width: 900px)');
const saveData = navigator.connection?.saveData;

if (section && canvas && !reduceMotion.matches && !compact.matches && !saveData) {
  let started = false;
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting) && !started) {
      started = true;
      observer.disconnect();
      import('./vendor/three.module.min.js').then(THREE => initSeasonField(THREE)).catch(() => {
        canvas.hidden = true;
      });
    }
  }, { rootMargin: '35% 0px' });
  observer.observe(section);
}

function initSeasonField(THREE) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'low-power' });
  } catch {
    canvas.hidden = true;
    return;
  }

  section.classList.add('webgl-ready');
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.35));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
  camera.position.set(0, 4.5, 8.8);
  camera.lookAt(0, -0.2, 0);

  const field = new THREE.Group();
  field.rotation.x = -0.12;
  scene.add(field);

  const lake = new THREE.Color('#083848');
  const frost = new THREE.Color('#789ca2');
  const spring = new THREE.Color('#5f9585');
  const ember = new THREE.Color('#e85838');
  const lineMaterial = new THREE.LineBasicMaterial({ color: lake, transparent: true, opacity: 0.16 });
  const lineGeometries = [];

  for (let row = 0; row < 28; row += 1) {
    const points = 76;
    const positions = new Float32Array(points * 3);
    const z = -4.5 + row * 0.34;
    for (let i = 0; i < points; i += 1) {
      const x = -7 + i * (14 / (points - 1));
      const offset = i * 3;
      positions[offset] = x;
      positions[offset + 1] = 0;
      positions[offset + 2] = z;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.userData = { row, baseZ: z };
    lineGeometries.push(geometry);
    field.add(new THREE.Line(geometry, lineMaterial));
  }

  const particleCount = 180;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSeeds = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    const offset = i * 3;
    const seedX = Math.random();
    const seedY = Math.random();
    const seedZ = Math.random();
    particleSeeds.set([seedX, seedY, seedZ], offset);
    particlePositions[offset] = (seedX - 0.5) * 13;
    particlePositions[offset + 1] = seedY * 5 - 0.4;
    particlePositions[offset + 2] = (seedZ - 0.5) * 7;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMaterial = new THREE.PointsMaterial({ color: ember, size: 0.045, transparent: true, opacity: 0.48, depthWrite: false });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);

  const pointer = { x: 0, y: 0 };
  section.addEventListener('pointermove', event => {
    const box = section.getBoundingClientRect();
    pointer.x = ((event.clientX - box.left) / box.width - 0.5) * 0.34;
    pointer.y = ((event.clientY - box.top) / box.height - 0.5) * 0.18;
  }, { passive: true });
  section.addEventListener('pointerleave', () => { pointer.x = 0; pointer.y = 0; });

  let frame = 0;
  let visible = false;
  let lastTime = 0;

  function resize() {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    if (canvas.width !== Math.round(width * renderer.getPixelRatio()) || canvas.height !== Math.round(height * renderer.getPixelRatio())) {
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  }

  function seasonProgress() {
    const box = section.getBoundingClientRect();
    return THREE.MathUtils.clamp((innerHeight - box.top) / (innerHeight + box.height), 0, 1);
  }

  function animate(time) {
    if (!visible || document.hidden) return;
    const seconds = time * 0.001;
    const delta = Math.min(0.04, (time - lastTime) * 0.001 || 0.016);
    lastTime = time;
    resize();

    const progress = seasonProgress();
    const seasonalColor = progress < 0.5
      ? ember.clone().lerp(frost, progress * 2)
      : frost.clone().lerp(spring, (progress - 0.5) * 2);
    lineMaterial.color.copy(lake.clone().lerp(seasonalColor, 0.34));
    particleMaterial.color.copy(seasonalColor);

    lineGeometries.forEach(geometry => {
      const positions = geometry.attributes.position.array;
      const row = geometry.userData.row;
      for (let i = 0; i < positions.length / 3; i += 1) {
        const offset = i * 3;
        const x = positions[offset];
        positions[offset + 1] =
          Math.sin(x * 0.72 + row * 0.37 + seconds * 0.16) * 0.12 +
          Math.sin(x * 1.65 - row * 0.18 - seconds * 0.11) * 0.035;
      }
      geometry.attributes.position.needsUpdate = true;
    });

    for (let i = 0; i < particleCount; i += 1) {
      const offset = i * 3;
      const sx = particleSeeds[offset];
      const sy = particleSeeds[offset + 1];
      const sz = particleSeeds[offset + 2];
      particlePositions[offset] += (0.05 + sx * 0.08) * delta * (progress < 0.34 ? 1 : 0.22);
      particlePositions[offset + 1] -= (0.07 + sy * 0.14) * delta * (progress > 0.28 && progress < 0.68 ? 1 : -0.25);
      if (particlePositions[offset] > 6.5) particlePositions[offset] = -6.5;
      if (particlePositions[offset + 1] < -0.6) particlePositions[offset + 1] = 4.8;
      particlePositions[offset + 2] = (sz - 0.5) * 7 + Math.sin(seconds * 0.13 + i) * 0.03;
    }
    particleGeometry.attributes.position.needsUpdate = true;

    camera.position.x += (pointer.x - camera.position.x) * 0.025;
    camera.position.y += (4.5 - pointer.y - camera.position.y) * 0.025;
    camera.lookAt(0, -0.2, 0);
    field.rotation.z = Math.sin(seconds * 0.09) * 0.012;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(animate);
  }

  function start() {
    if (!frame && visible && !document.hidden) frame = requestAnimationFrame(animate);
  }
  function stop() {
    cancelAnimationFrame(frame);
    frame = 0;
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visible ? start() : stop();
  }, { threshold: 0.04 });
  visibilityObserver.observe(section);
  document.addEventListener('visibilitychange', () => document.hidden ? stop() : start());
  addEventListener('resize', resize, { passive: true });
  canvas.addEventListener('webglcontextlost', event => {
    event.preventDefault();
    stop();
    canvas.hidden = true;
  });
}

'use strict';
// No framework or external animation dependency. Motion enhances a complete HTML document.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function initReadingPosition() {
  const bar = document.querySelector('.reading-progress');
  const percent = document.querySelector('.reading-percent');
  const links = [...document.querySelectorAll('.chapter-links a')];
  const chapters = links.map(link => document.querySelector(link.hash));
  if (!bar) return;
  let queued = false;
  function update() {
    const length = document.documentElement.scrollHeight - innerHeight;
    const progress = length > 0 ? Math.max(0, Math.min(1, scrollY / length)) : 0;
    bar.style.transform = `scaleY(${progress})`;
    percent.textContent = `${String(Math.round(progress * 100)).padStart(2, '0')}%`;
    let current = -1;
    chapters.forEach((chapter, index) => {
      if (chapter && chapter.getBoundingClientRect().top <= innerHeight * .36) current = index;
    });
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    queued = false;
  }
  function schedule() { if (!queued) { queued = true; requestAnimationFrame(update); } }
  addEventListener('scroll', schedule, {passive: true});
  addEventListener('resize', schedule);
  document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', schedule));
  update();
}

function initReveals() {
  if (!('IntersectionObserver' in window) || motionPreference.matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, {threshold: .08, rootMargin: '0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.body.classList.add('motion-ready');
  motionPreference.addEventListener('change', event => {
    if (event.matches) {
      observer.disconnect();
      document.body.classList.remove('motion-ready');
      document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
    }
  });
}

function initCoordinationCeiling() {
  const visual = document.querySelector('.ceiling-visual');
  const description = document.querySelector('#ceiling-explanation');
  const buttons = [...document.querySelectorAll('button[data-mode]')];
  if (!visual || !description) return;
  const messages = {
    team: 'One capable team can build a thing and put it into service.',
    system: 'Shared infrastructure, several departments moving together, or a change in the law: delivery depends on other parties acting differently.'
  };
  function setMode(mode) {
    if (!messages[mode]) return;
    visual.dataset.mode = mode;
    description.textContent = messages[mode];
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.mode === mode)));
    document.querySelectorAll('.ceiling-step').forEach(step => step.classList.toggle('is-current', step.dataset.scene === mode));
  }
  buttons.forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));
  // The desktop diagram stays beside the argument; mobile retains explicit controls.
  if ('IntersectionObserver' in window) {
    const desktop = matchMedia('(min-width: 761px)');
    let observer;
    function observeScenes() {
      if (observer) observer.disconnect();
      if (!desktop.matches) return;
      observer = new IntersectionObserver(entries => {
        entries.filter(entry => entry.isIntersecting).forEach(entry => setMode(entry.target.dataset.scene));
      }, {rootMargin: '-25% 0px -40% 0px', threshold: 0});
      document.querySelectorAll('.ceiling-step').forEach(step => observer.observe(step));
    }
    desktop.addEventListener('change', observeScenes);
    observeScenes();
  }
}

function initProsperityCompact() {
  const stages = {
    build: {label:'01 / BUILD WELL', title:'Create value in the short and long term.', copy:'Build AI infrastructure and drive adoption, mobilising collaboration between public and private sectors.', example:'Before there is anything to share, there has to be something built well enough to be worth sharing.'},
    capture: {label:'02 / CAPTURE', title:'Britain keeps a meaningful share.', copy:'Companies scale here instead of selling early. Compute revenue lands in the regions hosting infrastructure. Enterprises retain the intellectual property and learning generated on top of third-party models.', example:'Capture remains the critical challenge, where the circle is most fragile.'},
    stake: {label:'03 / STAKE', title:'Captured value pays for visible benefits.', copy:'Higher wages, skills investment, retained business rates, and lower energy bills near data centres.', example:'A visible stake in prosperity for firms, regions and workers is how trust is built.'},
    consent: {label:'04 / CONSENT', title:'A reason to back further investment.', copy:'Residents who see lower bills, councils that retain business rates, and workers who see wage growth have a reason to back a data centre or grid connection at the planning meeting.', example:'Visible benefits enable us to continue to invest in building well.'}
  };
  const buttons = [...document.querySelectorAll('[data-stage]')];
  const detail = document.querySelector('.compact-detail');
  if (!detail) return;
  let selected = 0;
  let rotation = -90;
  let animation;
  buttons.forEach((button, index) => button.addEventListener('click', () => {
    if (index === selected) return;
    const stage = stages[button.dataset.stage];
    document.querySelector('#compact-step').textContent = stage.label;
    document.querySelector('#compact-detail-title').textContent = stage.title;
    document.querySelector('#compact-detail-copy').textContent = stage.copy;
    document.querySelector('#compact-example').textContent = stage.example;
    buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    document.querySelectorAll('.stage-indicators i').forEach((indicator, i) => indicator.classList.toggle('active', i === index));
    rotation += ((index - selected + 4) % 4) * 90;
    document.querySelector('.loop-trace').style.transform = `rotate(${rotation}deg)`;
    selected = index;
    if (animation) animation.cancel();
    if (!motionPreference.matches && detail.animate) {
      animation = detail.animate([{opacity:0, transform:'translateY(9px)'}, {opacity:1, transform:'translateY(0)'}], {duration:380, easing:'cubic-bezier(.2,.65,.2,1)'});
    }
  }));
}

initReadingPosition();
initReveals();
initCoordinationCeiling();
initProsperityCompact();

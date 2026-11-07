const defaultCards = [
  { day: 1, title: 'Ein gemütlicher Morgen', message: 'Warmer Kakao, eine kuschelige Decke und ein Tag voller kleiner Wunder. Frohe Weihnachten!', sender: 'Mila', accent: '#ef6671' },
  { day: 2, title: 'Schneetag', message: 'Möge jede Schneeflocke dich daran erinnern, dass Magie oft in den stillen Momenten steckt.', sender: 'Noah', accent: '#31aeb2' },
  { day: 3, title: 'Sternenwünsche', message: 'Mögen deine Tage mit Freundlichkeit, Lachen und Liebe funkeln.', sender: 'Lina', accent: '#e9ad42' },
  { day: 4, title: 'Lichterglanz', message: 'Ein Kerzenabend, ein warmes Herz und ein wunderschönes Weihnachtsfest für dich.', sender: 'Eli', accent: '#9670c8' },
  { day: 5, title: 'Festliche Freude', message: 'Jedes Lächeln, das du verschenkst, findet seinen Weg zu dir zurück.', sender: 'Clara', accent: '#5cae78' },
  { day: 6, title: 'Klingende Grüße', message: 'Möge die Musik dieser Zeit dein Zuhause mit Freude erfüllen.', sender: 'Theo', accent: '#e9ad42' },
  { day: 7, title: 'Winterumarmung', message: 'Eine warme Umarmung und eine Tasche voller kuscheliger Erinnerungen für dich.', sender: 'Lucy', accent: '#31aeb2' },
  { day: 8, title: 'Zuckerstangenzauber', message: 'Ich wünsche dir Weihnachten so süß wie ein Traum aus Zuckerstangen.', sender: 'Zoe', accent: '#ef6671' },
  { day: 9, title: 'Sternenfunkeln', message: 'Mögen die Lichter dich daran erinnern, wie lieb du gehabt wirst.', sender: 'Owen', accent: '#31aeb2' },
  { day: 10, title: 'Familienfreude', message: 'Mit dir wird jedes Zusammensein noch ein bisschen schöner.', sender: 'Ava', accent: '#9670c8' },
  { day: 11, title: 'Weihnachtswunder', message: 'Möge dein Weihnachten so funkeln wie die Sterne über dem Schnee.', sender: 'Leo', accent: '#e9ad42' },
  { day: 12, title: 'Merry Moments', message: 'Ein bisschen Lachen, ganz viel Liebe und jede Menge Weihnachtsfreude.', sender: 'Sofia', accent: '#31aeb2' },
  { day: 13, title: 'Warme Wünsche', message: 'Möge jeder Winkel deines Tages von Frieden und Dankbarkeit leuchten.', sender: 'Isaac', accent: '#5cae78' },
  { day: 14, title: 'Goldene Träume', message: 'Auf schöne Erinnerungen, fröhliche Abende und goldene Wintertage!', sender: 'Nora', accent: '#e9ad42' },
  { day: 15, title: 'Gemeinsam ist es schön', message: 'Danke, dass du zu meinen liebsten Weihnachtsmomenten gehörst.', sender: 'Kai', accent: '#ef6671' },
  { day: 16, title: 'Licht & Frieden', message: 'Möge dein Zuhause voller Licht, Lachen und Frieden sein.', sender: 'Emma', accent: '#31aeb2' },
  { day: 17, title: 'Zauberstunde', message: 'Das schönste Geschenk ist die Wärme, die entsteht, wenn jemand an dich denkt.', sender: 'Finn', accent: '#e9ad42' },
  { day: 18, title: 'Schneelächeln', message: 'Ich wünsche dir eine Zeit voller Geborgenheit und Freude.', sender: 'Ruby', accent: '#5cae78' },
  { day: 19, title: 'Festliche Ruhe', message: 'Möge dein Herz ruhig, gemütlich und ganz friedlich sein.', sender: 'Hugo', accent: '#9670c8' },
  { day: 20, title: 'Weihnachtsfunkeln', message: 'Deine Freundlichkeit ist das hellste Licht in jedem Raum.', sender: 'Ivy', accent: '#ef6671' },
  { day: 21, title: 'Süße Weihnachtsgrüße', message: 'Möge dein Weihnachten süß, hell und wunderschön unvergesslich sein.', sender: 'Mason', accent: '#ef6671' },
  { day: 22, title: 'Weihnachten wie im Märchen', message: 'Auf all die kleinen magischen Momente, die diese Zeit bereithält.', sender: 'Luna', accent: '#31aeb2' },
  { day: 23, title: 'Überraschungsfreude', message: 'Mögen dich Liebe, Lachen und schöne Überraschungen begleiten.', sender: 'Jack', accent: '#5cae78' },
  { day: 24, title: 'Frohe Weihnachten', message: 'Ich wünsche dir ein wunderschönes Fest und einen fröhlichen Start ins neue Jahr!', sender: 'Ella', accent: '#ef6671' },
];

const $ = (selector) => document.querySelector(selector);
const scene = $('#scene');
const doorGrid = $('#doorGrid');
const composerPanel = $('#composerPanel');
const cardForm = $('#cardForm');
const senderNameInput = $('#senderName');
const recipientNameInput = $('#recipientName');
const messageInput = $('#cardMessage');
const modal = $('#cardModal');
const STORAGE_KEY = 'advent-cards-v1';
let selectedColor = '#ef6671';
let doors = [];
let stars = Number(localStorage.getItem('winter-village-stars') || 0);
let huntActive = false;
let audioContext;
let musicTimer;
let noteIndex = 0;

function loadDoors() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    doors = Array.isArray(saved) && saved.length ? saved : defaultCards.map((card) => ({ ...card }));
  } catch {
    doors = defaultCards.map((card) => ({ ...card }));
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doors));
}

function renderCalendar() {
  doorGrid.replaceChildren();
  for (let day = 1; day <= 24; day += 1) {
    const card = doors.find((item) => item.day === day) || defaultCards[day - 1];
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'door';
    button.style.setProperty('--card-accent', card.accent || '#ef6671');
    button.setAttribute('aria-label', `Türchen ${day} öffnen: ${card.title}`);
    button.innerHTML = `<span class="door-number">${String(day).padStart(2, '0')}</span><span class="door-glyph" aria-hidden="true">✦</span>`;
    button.addEventListener('click', () => openCard(card, day));
    doorGrid.append(button);
  }
}

function openCard(card, day, title = card.title, message = card.message, sender = card.sender) {
  $('#modalTitle').textContent = title || 'Frohe Weihnachten!';
  $('#modalMessage').textContent = message || '';
  $('#modalSender').textContent = sender || 'Ein Weihnachtswichtel';
  $('#modalDay').textContent = day ? `Tag ${String(day).padStart(2, '0')}` : 'Eine Überraschung';
  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  $('#closeModalButton').focus();
}

function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

function saveStars(amount = 1) {
  stars += amount;
  localStorage.setItem('winter-village-stars', String(stars));
  $('#starCount').textContent = String(stars);
  sparkleAt(Math.random() * 80 + 10, Math.random() * 65 + 10);
}

function sparkleAt(x, y) {
  const sparkle = document.createElement('span');
  sparkle.className = 'sparkle';
  sparkle.textContent = ['✦', '✧', '✨'][Math.floor(Math.random() * 3)];
  sparkle.style.left = `${x}%`;
  sparkle.style.top = `${y}%`;
  $('#sparkleLayer').append(sparkle);
  window.setTimeout(() => sparkle.remove(), 1100);
}

function makeSnow() {
  const layer = $('#snowLayer');
  for (let index = 0; index < 48; index += 1) {
    const flake = document.createElement('i');
    flake.className = 'snowflake';
    flake.textContent = index % 4 === 0 ? '✳' : '•';
    flake.style.left = `${Math.random() * 100}%`;
    flake.style.animationDuration = `${7 + Math.random() * 10}s`;
    flake.style.animationDelay = `${Math.random() * -15}s`;
    flake.style.setProperty('--flake-size', `${5 + Math.random() * 10}px`);
    layer.append(flake);
  }
}

function showSanta() {
  huntActive = false;
  const santa = $('#santaButton');
  santa.classList.remove('hidden');
  santa.classList.add('santa-found');
  $('#gameStatus').textContent = 'Gefunden! Klick den Weihnachtsmann für deine Botschaft.';
  saveStars(2);
  window.setTimeout(() => santa.classList.remove('santa-found'), 900);
}

function startMusic() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) {
    $('#gameStatus').textContent = 'Dein Browser unterstützt leider keine Web-Audio-Musik.';
    return;
  }
  audioContext = audioContext || new AudioContext();
  audioContext.resume();
  const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
  musicTimer = window.setInterval(() => {
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.value = notes[noteIndex % notes.length];
    volume.gain.setValueAtTime(0.0001, audioContext.currentTime);
    volume.gain.exponentialRampToValueAtTime(0.035, audioContext.currentTime + 0.03);
    volume.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.34);
    oscillator.connect(volume).connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.36);
    noteIndex += 1;
  }, 390);
  $('#musicButton').textContent = '♫ Musik an';
  $('#musicButton').setAttribute('aria-pressed', 'true');
}

function stopMusic() {
  window.clearInterval(musicTimer);
  musicTimer = undefined;
  $('#musicButton').textContent = '♫ Musik aus';
  $('#musicButton').setAttribute('aria-pressed', 'false');
}

$('#treeButton').addEventListener('click', () => {
  scene.classList.toggle('tree-lit');
  $('#gameStatus').textContent = scene.classList.contains('tree-lit') ? 'Der Wunschbaum leuchtet! Sammle seine Sterne.' : 'Der Wunschbaum schlummert. Klick ihn an, um ihn zu erleuchten.';
  saveStars();
});

document.querySelectorAll('.ornament').forEach((ornament) => ornament.addEventListener('click', (event) => {
  event.stopPropagation();
  ornament.classList.toggle('ornament-lit');
  saveStars();
}));

document.querySelectorAll('.gift').forEach((gift) => gift.addEventListener('click', () => {
  const surprise = gift.dataset.surprise;
  gift.classList.add('gift-open');
  $('#gameStatus').textContent = surprise;
  openCard({}, null, 'Eine kleine Überraschung', surprise, 'Das Weihnachtsdorf');
  saveStars();
}));

document.querySelectorAll('.house-button').forEach((house) => house.addEventListener('click', () => {
  openCard({}, null, 'Eine Geschichte aus dem Dorf', house.dataset.story, 'Das Weihnachtsdorf');
  house.classList.add('house-visited');
  saveStars();
}));

$('#marketButton').addEventListener('click', () => {
  openCard({}, null, 'Grüße vom Weihnachtsmarkt', 'Du hast einen Lebkuchenstern gewonnen! Er duftet nach Zimt und bringt dir einen Glücksstern. Frohe Weihnachten!', 'Die Marktleute');
  saveStars(2);
});

$('#santaButton').addEventListener('click', () => {
  $('#santaButton').classList.add('santa-wave');
  window.setTimeout(() => $('#santaButton').classList.remove('santa-wave'), 850);
  const name = recipientNameInput.value.trim() || 'du';
  openCard({}, null, `Frohe Weihnachten, ${name}!`, 'Ho, ho, ho! Ich wünsche dir ein Fest voller Lachen, gemütlicher Augenblicke und funkelnder Überraschungen. Danke, dass du so viel Freude in die Welt bringst!', 'Der Weihnachtsmann');
  saveStars();
});

$('#sleighButton').addEventListener('click', () => {
  const sleigh = $('#sleighButton');
  sleigh.classList.remove('sleigh-flight');
  void sleigh.offsetWidth;
  sleigh.classList.add('sleigh-flight');
  $('#gameStatus').textContent = 'Der Schlitten saust über den Himmel!';
  saveStars();
});

document.querySelectorAll('.snowman').forEach((snowman) => snowman.addEventListener('click', () => {
  snowman.classList.toggle('snowman-wave');
  $('#gameStatus').textContent = 'Schneemann entdeckt! Das Rätsel fragt: Wie viele sind im Dorf?';
  saveStars();
}));

$('#huntButton').addEventListener('click', () => {
  if ($('#santaButton').classList.contains('hidden')) {
    huntActive = true;
    $('#gameStatus').textContent = 'Der Weihnachtsmann versteckt sich hinter einem der Häuser. Tippe auf das richtige Haus!';
    document.querySelectorAll('.house-button').forEach((house) => house.classList.add('hunt-clue'));
    window.setTimeout(() => document.querySelectorAll('.house-button').forEach((house) => house.classList.remove('hunt-clue')), 1800);
  } else {
    showSanta();
  }
});

document.querySelectorAll('.house-button').forEach((house) => house.addEventListener('click', () => {
  if (huntActive) showSanta();
}));

$('#countButton').addEventListener('click', () => {
  $('#gameStatus').textContent = 'Im Dorf verstecken sich genau 3 Schneemänner. Klick einen an, um einen Stern zu sammeln!';
  saveStars();
});

$('#giftHuntButton').addEventListener('click', () => {
  $('#gameStatus').textContent = 'Finde das blaue Geschenk im Schnee und klick es an!';
  $('.gift-blue').classList.add('gift-hint');
  window.setTimeout(() => $('.gift-blue').classList.remove('gift-hint'), 2400);
});

$('#snowButton').addEventListener('click', (event) => {
  const paused = scene.classList.toggle('snow-paused');
  event.currentTarget.textContent = paused ? '❄️ Schnee aus' : '❄️ Schnee an';
  event.currentTarget.setAttribute('aria-pressed', String(!paused));
});

$('#musicButton').addEventListener('click', () => musicTimer ? stopMusic() : startMusic());
$('#newCardButton').addEventListener('click', () => {
  composerPanel.classList.toggle('hidden');
  if (!composerPanel.classList.contains('hidden')) senderNameInput.focus();
});
$('#closePanelButton').addEventListener('click', () => composerPanel.classList.add('hidden'));
$('#closeModalButton').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') { closeModal(); composerPanel.classList.add('hidden'); } });

$('#greetingSelect').addEventListener('change', (event) => {
  if (event.target.value) messageInput.value = event.target.value;
  else messageInput.value = '';
});

document.querySelectorAll('.color-swatch').forEach((swatch) => swatch.addEventListener('click', () => {
  document.querySelectorAll('.color-swatch').forEach((item) => item.classList.remove('active'));
  swatch.classList.add('active');
  selectedColor = swatch.dataset.color;
}));

cardForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const sender = senderNameInput.value.trim();
  const recipient = recipientNameInput.value.trim();
  const message = messageInput.value.trim();
  const availableDay = defaultCards.find((card) => !doors.some((item) => item.day === card.day && item.customAdded));
  const day = availableDay?.day || 1;
  const card = { day, title: `Für ${recipient}`, message, sender, recipient, accent: selectedColor, customAdded: true };
  const index = doors.findIndex((item) => item.day === day);
  if (index >= 0) doors[index] = card;
  else doors.push(card);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doors));
  renderCalendar();
  composerPanel.classList.add('hidden');
  openCard(card, day);
  saveStars();
});

$('#starCount').textContent = String(stars);
loadDoors();
renderCalendar();
makeSnow();

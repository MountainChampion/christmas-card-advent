const defaultCards = [
  { day: 1, title: 'Cozy Morning', message: 'Warm cocoa, soft blankets, and a day full of little wonders.', sender: 'Mila', accent: '#ff7f7f' },
  { day: 2, title: 'Snow Day', message: 'Let the snowflakes remind you that magic can happen in quiet moments.', sender: 'Noah', accent: '#56cfe1' },
  { day: 3, title: 'Sweet Wishes', message: 'May your days sparkle with kindness, laughter, and love.', sender: 'Lina', accent: '#ffca3a' },
  { day: 4, title: 'Holiday Glow', message: 'A candlelit evening, a warm heart, and a merry Christmas to you.', sender: 'Eli', accent: '#9b5de5' },
  { day: 5, title: 'Festive Joy', message: 'May every smile you share today come back to you multiplied.', sender: 'Clara', accent: '#7bd389' },
  { day: 6, title: 'Cheerful Notes', message: 'May the music of the season fill your home with happiness.', sender: 'Theo', accent: '#ff9f1c' },
  { day: 7, title: 'Winter Hugs', message: 'Sending warm hugs and a pocket full of cozy memories.', sender: 'Lucy', accent: '#74c69d' },
  { day: 8, title: 'Peppermint Magic', message: 'Hope your Christmas is as sweet as candy cane dreams.', sender: 'Zoe', accent: '#ff6b6b' },
  { day: 9, title: 'Twinkle Time', message: 'May the lights around you remind you how loved you are.', sender: 'Owen', accent: '#4ecdc4' },
  { day: 10, title: 'Family Joy', message: 'Every gathering feels brighter with you in it.', sender: 'Ava', accent: '#b5179e' },
  { day: 11, title: 'Holiday Wonder', message: 'Let your Christmas sparkle like the stars above the snow.', sender: 'Leo', accent: '#ffb703' },
  { day: 12, title: 'Merry Moments', message: 'A little laughter, a lot of love, and endless festive cheer.', sender: 'Sofia', accent: '#8ecae6' },
  { day: 13, title: 'Warm Wishes', message: 'May every corner of your day glow with peace and gratitude.', sender: 'Isaac', accent: '#5ec576' },
  { day: 14, title: 'Golden Dreams', message: 'Here is to sunsets, jolly nights, and beautiful memories.', sender: 'Nora', accent: '#ffd166' },
  { day: 15, title: 'Joyful Togetherness', message: 'Thanks for being part of my favorite holiday memories.', sender: 'Kai', accent: '#ff8fab' },
  { day: 16, title: 'Christmas Blessings', message: 'May your home be full of light, laughter, and peace.', sender: 'Emma', accent: '#7cc6fe' },
  { day: 17, title: 'Magic Hour', message: 'The best gift is the warmth of being remembered with love.', sender: 'Finn', accent: '#ff9f43' },
  { day: 18, title: 'Snowy Smiles', message: 'Wishing you a season wrapped in comfort and joy.', sender: 'Ruby', accent: '#52b69a' },
  { day: 19, title: 'Festive Calm', message: 'May your heart feel quiet, cozy, and completely at peace.', sender: 'Hugo', accent: '#7b2cbf' },
  { day: 20, title: 'Holiday Spark', message: 'Your kindness is the brightest light in every room.', sender: 'Ivy', accent: '#f72585' },
  { day: 21, title: 'Candy Cane Cheer', message: 'May your Christmas be sweet, bright, and beautifully memorable.', sender: 'Mason', accent: '#ef476f' },
  { day: 22, title: 'Storybook Christmas', message: 'Here’s to all the little magical moments this season brings.', sender: 'Luna', accent: '#00bbf9' },
  { day: 23, title: 'Endless Delight', message: 'May love, laughter, and surprises follow you all season long.', sender: 'Jack', accent: '#70e000' },
  { day: 24, title: 'Merry Christmas', message: 'You are sincerely wished the happiest holiday and a fresh start full of joy.', sender: 'Ella', accent: '#ff6b6b' }
];

const scene = document.getElementById('scene');
const composerPanel = document.getElementById('composerPanel');
const newCardButton = document.getElementById('newCardButton');
const closePanelButton = document.getElementById('closePanelButton');
const cardForm = document.getElementById('cardForm');
const colorPicker = document.getElementById('colorPicker');
const senderNameInput = document.getElementById('senderName');
const recipientNameInput = document.getElementById('recipientName');
const messageInput = document.getElementById('cardMessage');
const modal = document.getElementById('cardModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalSender = document.getElementById('modalSender');
const modalDay = document.getElementById('modalDay');
const closeModalButton = document.getElementById('closeModalButton');

const STORAGE_KEY = 'advent-cards-v1';
let selectedColor = '#ff5f6d';
let doors = [];

function generateDoorGrid() {
  const doorGrid = document.createElement('div');
  doorGrid.className = 'door-grid';
  scene.appendChild(doorGrid);

  for (let day = 1; day <= 24; day += 1) {
    const card = doors.find((door) => door.day === day) || defaultCards[day - 1];

    const doorButton = document.createElement('button');
    doorButton.className = 'door';
    doorButton.type = 'button';
    doorButton.dataset.day = String(day);
    doorButton.innerHTML = `
      <div class="door-inner">
        <div class="door-face door-cover">
          <span class="door-number">${day}</span>
          <span class="door-icon">🎄</span>
        </div>
        <div class="door-face door-back">
          <div class="card-preview" style="--card-accent:${card.accent}">
            <span class="mini-label">card</span>
            <strong>${card.title}</strong>
            <span>to ${card.sender}</span>
          </div>
        </div>
      </div>
    `;

    doorButton.addEventListener('click', () => openDoor(day));
    doorGrid.appendChild(doorButton);
  }
}

function loadDoors() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (saved) {
    doors = JSON.parse(saved);
    return;
  }

  doors = defaultCards.map((card) => ({ ...card }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doors));
}

function persistDoors() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(doors));
}

function openDoor(day) {
  const card = doors.find((door) => door.day === day);

  if (!card) return;

  modalTitle.textContent = card.title || `Dear ${card.recipient || 'friend'}`;
  modalMessage.textContent = card.message;
  modalSender.textContent = card.sender || 'Someone special';
  modalDay.textContent = `Day ${String(day).padStart(2, '0')}`;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function addCardToDoor(event) {
  event.preventDefault();

  const sender = senderNameInput.value.trim() || 'Mia';
  const recipient = recipientNameInput.value.trim() || 'Friends';
  const message = messageInput.value.trim() || 'Seasonal joy to you.';

  const emptyDoor = doors.find((door) => !door.customAdded && !door.isOpen);
  const day = emptyDoor ? emptyDoor.day : 1;

  const card = {
    day,
    title: `For ${recipient}`,
    message,
    sender,
    accent: selectedColor,
    recipient,
    customAdded: true,
  };

  const index = doors.findIndex((door) => door.day === day);
  if (index >= 0) {
    doors[index] = card;
  } else {
    doors.push(card);
  }

  persistDoors();
  refreshScene();
  composerPanel.classList.add('hidden');
  cardForm.reset();
  senderNameInput.value = sender;
  recipientNameInput.value = recipient;
  messageInput.value = message;
  openDoor(day);
}

function refreshScene() {
  scene.innerHTML = '';
  generateDoorGrid();
}

function initColorPicker() {
  colorPicker.querySelectorAll('.color-swatch').forEach((swatch) => {
    swatch.addEventListener('click', () => {
      colorPicker.querySelectorAll('.color-swatch').forEach((item) => item.classList.remove('active'));
      swatch.classList.add('active');
      selectedColor = swatch.dataset.color;
    });
  });
}

function toggleComposer() {
  composerPanel.classList.toggle('hidden');
}

newCardButton.addEventListener('click', toggleComposer);
closePanelButton.addEventListener('click', () => composerPanel.classList.add('hidden'));
closeModalButton.addEventListener('click', () => {
  modal.classList.add('hidden');
  document.body.style.overflow = '';
});
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
});
cardForm.addEventListener('submit', addCardToDoor);

loadDoors();
initColorPicker();
refreshScene();

senderNameInput.value = 'Mia';
recipientNameInput.value = 'Leo';
messageInput.value = 'May your Christmas be full of laughter, cozy nights, and endless joy.';

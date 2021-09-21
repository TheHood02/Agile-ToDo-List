// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-analytics.js";
import {
  getDatabase,
  ref,
  get,
  update,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAAJ5oDDilTJ0ZCfJgjRC3yHOE22TKgPvU",
  databaseURL:
    "https://firstproject-256e9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "firstproject-256e9",
  appId: "1:5674279605:web:89583ae3a9211f1f9694fc",
  measurementId: "G-ZJ17SQCYQ1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getDatabase(app);

const getTodo = async () => {
  let res = await get(ref(db, "/Agile v2"));
  let todos = res.val();
  return todos;
};
const todos = await getTodo();

//TODO: design add button at last bcoz it will include the popup modal stuff
//TODO: make the cards clickable and limit the number of words in first page

const ideasBtn = document.querySelector('.category--ideas');
const remindersBtn = document.querySelector('.category--reminders');
const categoryHeading = document.querySelector('.card--heading');
const cards = document.querySelector('.cards');

ideasBtn.addEventListener('click', () => {

  ideasBtn.style = 'pointer-events: none; cursor: none';
  remindersBtn.style = 'pointer-events: auto; cursor: pointer';

  categoryHeading.innerHTML = '';
  cards.innerHTML = '';

  let cardHeadingType = document.createElement("p");
  cardHeadingType.classList.add('ideas');
  cardHeadingType.textContent = 'Ideas';
  categoryHeading.appendChild(cardHeadingType);

  // document.querySelector('card--heading reminders').style = 'display: none';
  
  for (let item in todos['Ideas']) {

    let newCard = document.createElement('div');
    newCard.classList.add('card');
    cards.appendChild(newCard);

    let newTitle = document.createElement('p');
    let newDesc = document.createElement('p');

    newTitle.classList.add('card__title');
    newDesc.classList.add('card__desc');

    newTitle.textContent = `${todos['Ideas'][item]['title']}`;
    newDesc.textContent = `${todos['Ideas'][item]['desc']}`;

    newCard.appendChild(newTitle);
    newCard.appendChild(newDesc);
  }
});

remindersBtn.addEventListener('click', () => {

  ideasBtn.style = 'pointer-events: auto; cursor: pointer';
  remindersBtn.style = 'pointer-events: none; cursor: none';

  categoryHeading.innerHTML = '';
  cards.innerHTML = '';

  let cardHeadingType = document.createElement("p");
  cardHeadingType.classList.add('reminders');
  cardHeadingType.textContent = 'Reminders';
  categoryHeading.appendChild(cardHeadingType);

  // document.querySelector('card--heading reminders').style = 'display: none';
  
  for (let item in todos['Reminders']) {

    let newCard = document.createElement('div');
    newCard.classList.add('card');
    cards.appendChild(newCard);

    let newTitle = document.createElement('p');
    let newDesc = document.createElement('p');

    newTitle.classList.add('card__title');
    newDesc.classList.add('card__desc');

    newTitle.textContent = `${todos['Reminders'][item]['title']}`;
    newDesc.textContent = `${todos['Reminders'][item]['desc']}`;

    newCard.appendChild(newTitle);
    newCard.appendChild(newDesc);
  }
});
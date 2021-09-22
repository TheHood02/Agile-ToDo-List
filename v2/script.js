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
  let res = await get(ref(db, '/Agile v2'));
  let todos = res.val();
  return todos;
};
const todos = await getTodo();

//TODO: design add button at last bcoz it will include the popup modal stuff
//TODO: make the cards clickable and limit the number of words in first page

const ideasBtn = document.querySelector(".category--ideas");
const remindersBtn = document.querySelector(".category--reminders");
const projectsBtn = document.querySelector(".category--projects");
const resourcesBtn = document.querySelector(".category--resources");
const categoryHeading = document.querySelector(".card--heading");
const cards = document.querySelector(".cards");
const btns = [ideasBtn, remindersBtn, projectsBtn, resourcesBtn];

function categoryToRender(category, btnName) {

  categoryHeading.innerHTML = "";
  cards.innerHTML = "";

  let cardHeadingType = document.createElement("p");
  cardHeadingType.classList.add(category.toLowerCase());
  cardHeadingType.textContent = category;
  categoryHeading.appendChild(cardHeadingType);

  for (let item in todos[category]) {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    cards.appendChild(newCard);

    let newTitle = document.createElement("p");
    let newDesc = document.createElement("p");

    newTitle.classList.add("card__title");
    newDesc.classList.add("card__desc");

    newTitle.textContent = `${todos[category][item]["title"]}`;
    newDesc.textContent = `${todos[category][item]["desc"]}`;

    newCard.appendChild(newTitle);
    newCard.appendChild(newDesc);
  }

  for (let btn in btns) {
    if (btns[btn] !== btnName) {
      btns[btn].style = "pointer-events: auto; cursor: pointer";
    } else {
      btns[btn].style = "pointer-events: none; cursor: none";
    }
  }
}

ideasBtn.addEventListener('click', () => {
  categoryToRender('Ideas', ideasBtn);
});

remindersBtn.addEventListener('click', () => {
  categoryToRender('Reminders', remindersBtn);
});

projectsBtn.addEventListener('click', () => {
  categoryToRender('Projects', projectsBtn);
});

resourcesBtn.addEventListener('click', () => {
  categoryToRender('Resources', resourcesBtn);
});

// modal

document.getElementById('add-task').addEventListener('click', () => {
  document.querySelector('.modal--bg').style = "display: flex";
})

document.getElementById('close').addEventListener('click', () => {
  document.querySelector('.modal--bg').style = "display: none";
})

document.getElementById('submit-btn').addEventListener('click', () => {

  const title = document.getElementById('title').value;
  const desc = document.getElementById('desc').value;
  const obj = {
    date: Date().substr(0, 25),
    title: title,
    desc: desc
  };

  //* to get which radio button is selected
  console.log(document.querySelector('input[name="category-selection"]:checked').value);

  const uid = push(ref(db, '/Adile v2')).key;

  update(ref(db, `/Agile v2/${uid}`), obj);
  document.getElementById('title').value = "";
  document.getElementById('desc').value = "";

  

  // document.querySelector('.modal--bg').style = "display: none";
})
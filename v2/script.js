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

//TODO: make the cards clickable and limit the number of words in first page
//TODO: ask for confirmation before deleting the card?

// declare variables

const ideasBtn = document.querySelector(".category--ideas");
const remindersBtn = document.querySelector(".category--reminders");
const projectsBtn = document.querySelector(".category--projects");
const resourcesBtn = document.querySelector(".category--resources");
const categoryHeading = document.querySelector(".card--heading");
const cards = document.querySelector(".cards");
const btns = [ideasBtn, remindersBtn, projectsBtn, resourcesBtn];

// func to render selected category on page

function categoryToRender(category, btnName) {
  categoryHeading.innerHTML = "";
  cards.innerHTML = "";

  let cardHeadingType = document.createElement("div");
  cardHeadingType.textContent = category;
  categoryHeading.appendChild(cardHeadingType);

  for (let item in todos[category]) {
    let newCard = document.createElement("div");
    newCard.classList.add("card");
    if (category == 'Ideas') {
      newCard.style = "background-color: #1D384C";
    } else if (category == 'Reminders') {
      newCard.style = "background-color: #413432";
    } else if (category == 'Projects') {
      newCard.style = "background-color: #1E363C";
    } else if (category == 'Resources') {
      newCard.style = "background-color: #412835";
    }
    cards.appendChild(newCard);

    let newDelBtn = document.createElement("div");
    let newTitle = document.createElement("div");
    let newDesc = document.createElement("div");

    newDelBtn.classList.add("card__del");
    newTitle.classList.add("card__title");
    newDesc.classList.add("card__desc");

    newDelBtn.textContent = "+";
    newTitle.textContent = `${todos[category][item]["title"]}`;
    newDesc.textContent = `${todos[category][item]["desc"]}`;

    newDelBtn.addEventListener("click", () => {
      remove(ref(db, `/Agile v2/${category}/${item}`));
      window.location.reload();
    });

    if (category == "Ideas") {
      cardHeadingType.style = "color: #0ABDE3";
      newDelBtn.style = "color: #0ABDE3";
      newTitle.style = "color: #0ABDE3";
      newDesc.style = "color: #0ABDE3";
    } else if (category == "Reminders") {
      cardHeadingType.style = "color: #FF9F44";
      newDelBtn.style = "color: #FF9F44";
      newTitle.style = "color: #FF9F44";
      newDesc.style = "color: #FF9F44";
    } else if (category == "Projects") {
      cardHeadingType.style = "color: #11AC84";
      newDelBtn.style = "color: #11AC84";
      newTitle.style = "color: #11AC84";
      newDesc.style = "color: #11AC84";
    } else if (category == "Resources") {
      cardHeadingType.style = "color: #EE5353";
      newDelBtn.style = "color: #EE5353";
      newTitle.style = "color: #EE5353";
      newDesc.style = "color: #EE5353";
    }

    newCard.appendChild(newDelBtn);
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

// add functionality to buttons

ideasBtn.addEventListener("click", () => {
  categoryToRender("Ideas", ideasBtn);
});

remindersBtn.addEventListener("click", () => {
  categoryToRender("Reminders", remindersBtn);
});

projectsBtn.addEventListener("click", () => {
  categoryToRender("Projects", projectsBtn);
});

resourcesBtn.addEventListener("click", () => {
  categoryToRender("Resources", resourcesBtn);
});

// popup modal

const popupModalBg = document.querySelector(".modal--bg");

document.getElementById("add-task").addEventListener("click", () => {
  popupModalBg.style = "display: flex";
});

document.getElementById("close").addEventListener("click", () => {
  document.querySelector(".modal--bg").style = "display: none";
});

document.getElementById("submit-btn").addEventListener("click", () => {
  const categorySelected = document.querySelector(
    'input[name="category-selection"]:checked'
  ).value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  const obj = {
    date: Date().substr(0, 25),
    title: title,
    desc: desc,
  };
  const uid = push(ref(db, "/Adile v2")).key;

  update(ref(db, `/Agile v2/${categorySelected}/${uid}`), obj);

  popupModalBg.style = "display: none";
});

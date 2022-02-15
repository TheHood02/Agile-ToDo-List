// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-analytics.js";
import { getDatabase, ref, get, update, remove, push } from "https://www.gstatic.com/firebasejs/9.0.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOO1UER0xsYByKsfeYitBZBRw02Up03vA",
  databaseURL: "https://fir-project-a747f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "fir-project-a747f",
  appId: "1:188599957234:web:16c9c6a2be16fda867426b",
  measurementId: "G-PRTZ5FRJCW",
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

    if (category == "Ideas") {
      newCard.style = "background-color: #1D384C";
    } else if (category == "Reminders") {
      newCard.style = "background-color: #413432";
    } else if (category == "Projects") {
      newCard.style = "background-color: #1E363C";
    } else if (category == "Resources") {
      newCard.style = "background-color: #412835";
    }
    cards.appendChild(newCard);

    const createDiv = () => document.createElement("div");

    let newDelBtn = createDiv();
    let newTitle = createDiv();
    let newDesc = createDiv();

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

    const cardsDesign = (color) => {
      cardHeadingType.style = `color: ${color}`;
      newDelBtn.style = `color: ${color}`;
      newTitle.style = `color: ${color}`;
      newDesc.style = `color: ${color}`;
    };

    if (category == "Ideas") {
      cardsDesign("#0ABDE3");
    } else if (category == "Reminders") {
      cardsDesign("#FF9F44");
    } else if (category == "Projects") {
      cardsDesign("#11AC84");
    } else if (category == "Resources") {
      cardsDesign("#EE5353");
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
  const categorySelected = document.querySelector('input[name="category-selection"]:checked').value;
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

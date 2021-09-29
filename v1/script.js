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
  apiKey: "AIzaSyAOO1UER0xsYByKsfeYitBZBRw02Up03vA",
  databaseURL:
    "https://fir-project-a747f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "fir-project-a747f",
  appId: "1:188599957234:web:16c9c6a2be16fda867426b",
  measurementId: "G-PRTZ5FRJCW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// declare variables
const db = getDatabase(app);
const inptBx01 = document.querySelector("#input-item");
const addBtn = document.querySelector(".add");
const todoList = document.querySelector("#todo-list");

const getTodo = async () => {
  let res = await get(ref(db, "/Agile"));
  let todos = res.val();
  return todos;
};
const todos = await getTodo();

// add task to list
addBtn.addEventListener("click", (e) => {
  const desc = inptBx01.value;
  const obj = {
    desc: desc,
    date: Date().substr(0, 25),
  };

  const agileRef = ref(db, "/Agile");
  const uid = push(agileRef).key;

  update(ref(db, `/Agile/${uid}`), obj);
  inptBx01.value = "";
  window.location.reload();
});

// render task on page and add functionality to delete button
for (let item in todos) {

  let newDiv = document.createElement("div");
  newDiv.classList.add("item");
  todoList.appendChild(newDiv);

  // creating new elements -> p and button
  let newItem = document.createElement("p");
  let newDelBtn = document.createElement("button");

  newItem.classList.add("list-item");
  newDelBtn.classList.add("del-btn");

  newItem.textContent = `${todos[item]["desc"]}`;
  newDelBtn.innerHTML = "<img src='assets/trash-2-512.png'>";

  newDelBtn.addEventListener("click", (e) => {
    remove(ref(db, `/Agile/${item}`)).then((res) => {
      window.location.reload();
    });
  });

  newDiv.appendChild(newItem);
  newDiv.appendChild(newDelBtn);
}

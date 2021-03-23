const todoInput = document.querySelector(".todo-input");
const todoBtn = document.querySelector(".todo-button");
const filterOption = document.querySelector(".filter");
const todoList = document.querySelector(".todo-list");
const todoItems = todoList.children;

const storageName = "todos";
let todos;

document.addEventListener("DOMContentLoaded", buildList);
todoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", todoClick);
filterOption.addEventListener("change", filterTodo);

function filterTodo(e) {
  todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        console.log("all selected");
        todo.style.display = "flex";
        break;
      case "completed":
        // console.log("completed selected");
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        // console.log("incomplete selected");
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      default:
        break;
    }
  });
}

// Initiating adding a todo item to the system
function addTodo(e) {
  e.preventDefault();
  saveTodo(todoInput.value);
  createTodo(todoInput.value);
  todoInput.value = "";
}
// Called when a todo is added either from storage or from user, this creates to relevant
// elements in the DOM
function createTodo(content) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const todoLi = document.createElement("li");
  todoLi.classList.add("todo-item");
  todoLi.innerText = content;
  todoDiv.appendChild(todoLi);

  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  checkBtn.innerHTML = '<i class="fas fa-check"></i>';

  todoDiv.appendChild(checkBtn);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("del-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(deleteBtn);

  todoList.appendChild(todoDiv);
}

// Saving the todo item to the localStorage
function saveTodo(todo) {
  getStorage();
  todos.push(todo);
  setStorage();
  // console.log(todos);
}
// Function to check if where we are clicking on the item, if we click on the checkmark, mark
// the todo item, likewise, clicking on the trash icon will delete it
function todoClick(e) {
  const element = e.target;
  if (element.classList[0] === "del-btn") {
    delTodo(element.parentElement);
  } else if (element.classList[0] === "check-btn") {
    markCompleted(element.parentElement);
  }
}
// If checkmark on todo has been clicked, toggle the .completed class on the todo div
function markCompleted(todo) {
  todo.classList.toggle("completed");
}

// if the trash button has been clicked, remove the todo element
function delTodo(todo) {
  todo.classList.add("falling");
  removeFromStorage(todo);
  todo.addEventListener("transitionend", () => {
    todo.remove();
  });
}
// When deleting todo, also find it in the localStorage and remove it by pushing a new array
function removeFromStorage(todo) {
  if (!todos) {
    getStorage();
  }
  const elementText = todo.children[0].innerText;
  index = todos.indexOf(elementText);
  todos.splice(index, 1);
  setStorage();
}

// Function to retrieve our current todos from the LocalStorage
function getStorage() {
  if (!localStorage.getItem(storageName)) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem(storageName));
  }
  // console.log(todos);
}

// Function to save the todo-list to the storage
function setStorage() {
  localStorage.setItem(storageName, JSON.stringify(todos));
}

// Function to recreate the todo list in the dom on page load
function buildList() {
  getStorage();
  todos.forEach((todo) => {
    createTodo(todo);
  });
}

"use strict";

// TODO: check if any of these can be made local
const addTaskInput = document.getElementById("add-task");
const addTaskButton = document.getElementsByTagName("button")[0];
const todoTasksList = document.getElementById("todo-tasks");
const completedTasksList = document.getElementById("completed-tasks");

function newTaskListElement(taskDescription) {
  // TODO: escape the description to make it safe (or Node.textContent - see below)
  // TODO: replace innerHTML with Node.textContent (security)
  const taskInnerHTML = `
      <input type="checkbox">
      <label>${taskDescription}</label>
      <input type="text">
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>`;

  const taskLi = document.createElement("li");
  taskLi.innerHTML = taskInnerHTML;

  return taskLi;
}

function addTask() {
  console.log("Add task");
  const listItem = newTaskListElement(addTaskInput.value);
  todoTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  addTaskInput.value = "";
}

function editTask() {
  console.log("Edit task");

  // TODO: change button text Edit <-> Save

  const EDIT_MODE = "editMode";

  // TODO: check if we need "this" - don't we get the element in the event?
  const task = this.parentNode;
  const editInput = task.querySelector("input[type=text]");
  const label = task.querySelector("label");

  if (task.classList.contains(EDIT_MODE)) {
    // Switching out of edit mode: update task description with new text
    label.innerText = editInput.value;
  } else {
    // Switching to edit mode: show input with current task description
    editInput.value = label.innerText;
  }

  task.classList.toggle(EDIT_MODE);
}

function deleteTask() {
  console.log("Delete task");

  const task = this.parentNode;
  task.parentNode.removeChild(task);
}

function taskCompleted() {
  console.log("Complete task");

  const task = this.parentNode;
  completedTasksList.appendChild(task);
  bindTaskEvents(task, taskIncomplete);
}

function taskIncomplete() {
  console.log("Incomplete task");

  const task = this.parentNode;
  todoTasksList.appendChild(task);
  bindTaskEvents(task, taskCompleted);
}

addTaskButton.onclick = addTask;
// TODO: accept "enter" as well, also for edit mode
// TODO: accept "esc" to get out of edit mode without changing text

// TODO: This should not be needed if we check the checkbox value in one handler
// (combine both handlers into one)
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  console.log("Bind list item events");

  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

// TODO: this is only needed because the HTML already has items
// Can be removed if the HTML is cleaned up
for (let i = 0; i < todoTasksList.children.length; i++) {
  bindTaskEvents(todoTasksList.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], taskIncomplete);
}

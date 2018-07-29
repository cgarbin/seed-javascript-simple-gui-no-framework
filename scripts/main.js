"use strict";

const addTaskInput = document.getElementById("add-task");
const todoTasksList = document.getElementById("todo-tasks");
const completedTasksList = document.getElementById("completed-tasks");

/**
 * Creates a new task.
 *
 * Each task is an <li> item with a checkbox, the task text and edit/delete
 * buttons. An input field is also added, but it's hidden by CSS until the
 * user presses the Edit button.
 *
 * The functions uses createElement for each item to avoid calling the
 * potentially dangerous innerHTML. The actual text is set with textContent
 * to avoid interpreting it as HTML.
 *
 * @param {string} taskDescription The task description (what the user entered)
 */
function newTaskListElement(taskDescription) {
  const task = document.createElement("li");

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  task.appendChild(checkBox);

  const label = document.createElement("label");
  label.textContent = taskDescription;
  task.appendChild(label);

  const editInput = document.createElement("input");
  editInput.type = "text";
  task.appendChild(editInput);

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit";
  task.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  task.appendChild(deleteButton);

  return task;
}

/**
 * Event handler for the "add task" button.
 */
function addTask() {
  console.log("Add task");
  const listItem = newTaskListElement(addTaskInput.value);
  todoTasksList.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  addTaskInput.value = "";
}

/**
 * Event handler for the edit/save button.
 */
function editTask(event) {
  console.log("Edit task" + event);

  const EDIT_MODE = "editMode";

  // TODO: check if we need "this" - don't we get the element in the event?
  const task = event.target.parentNode;
  const editInput = task.querySelector("input[type=text]");
  const label = task.querySelector("label");
  const editButton = task.querySelector("button.edit");

  if (task.classList.contains(EDIT_MODE)) {
    // Switching out of edit mode
    editButton.textContent = "Edit";
    label.textContent = editInput.value;
  } else {
    // Switching to edit mode
    editButton.textContent = "Save";
    editInput.value = label.textContent;
  }

  task.classList.toggle(EDIT_MODE);
}

/**
 * Event handler for the delete button.
 */
function deleteTask(event) {
  console.log("Delete task" + event);

  const task = event.target.parentNode;
  task.parentNode.removeChild(task);
}

/**
 * Event handler for the checkbox.
 */
function taskCompleted(event) {
  console.log("Complete task" + event);

  const task = event.target.parentNode;
  if (event.target.checked) {
    completedTasksList.appendChild(task);
  } else {
    todoTasksList.appendChild(task);
  }
}

/**
 * Binds the event handlers for a task item.
 *
 * @param {Element} taskListItem The task item
 * @param {function} checkBoxEventHandler The event handler for the checkbox
 */
function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  // TODO: This should not be needed if we check the checkbox value in one handler
  // (combine both handlers into one)
  console.log("Bind list item events");

  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

// First button in the document is the "add new task" one
// TODO: replace with getElementById
// TODO: accept "enter" as well, also for edit mode
// TODO: accept "esc" to get out of edit mode without changing text
document.getElementsByTagName("button")[0].onclick = addTask;

// TODO: this is only needed because the HTML already has items
// Can be removed if the HTML is cleaned up
for (let i = 0; i < todoTasksList.children.length; i++) {
  bindTaskEvents(todoTasksList.children[i], taskCompleted);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i], taskCompleted);
}

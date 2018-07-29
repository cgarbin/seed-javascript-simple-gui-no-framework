"use strict";

const todoTasksList = document.getElementById("todo-tasks");

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
  checkBox.onchange = taskCompleted;
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
  editButton.onclick = editTask;
  task.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete";
  deleteButton.onclick = deleteTask;
  task.appendChild(deleteButton);

  return task;
}

/**
 * Event handler for the "add task" button.
 */
function addTask() {
  const addTaskInput = document.getElementById("add-task");
  todoTasksList.appendChild(newTaskListElement(addTaskInput.value));
  addTaskInput.value = "";
}

/**
 * Event handler for the edit/save button.
 */
function editTask(event) {
  const EDIT_MODE = "editMode";

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
  const task = event.target.parentNode;
  task.parentNode.removeChild(task);
}

/**
 * Event handler for the checkbox.
 */
function taskCompleted(event) {
  const task = event.target.parentNode;
  if (event.target.checked) {
    const completedTasksList = document.getElementById("completed-tasks");
    completedTasksList.appendChild(task);
  } else {
    todoTasksList.appendChild(task);
  }
}

// First button in the document is the "add new task" one
// TODO: accept "enter" as well, also for edit mode
// TODO: accept "esc" to get out of edit mode without changing text
document.getElementById("add-task-button").onclick = addTask;

// Begin test code
// Add a few elements to speed up test
todoTasksList.appendChild(newTaskListElement("xyz"));
todoTasksList.appendChild(newTaskListElement("abc"));
// End test code

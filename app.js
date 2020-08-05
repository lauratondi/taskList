// Define UI vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear Tasks
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task) {
    // here we need to create again the DOM element like we did for the single task

    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // Create textnode and append to li
    li.appendChild(document.createTextNode(task));

    // Create new link element
    const link = document.createElement('a');

    // Add class
    link.className = 'delete-item secondary-content';

    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';

    // Append link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item';

  // Create textnode and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create new link element
  const link = document.createElement('a');

  // Add class
  link.className = 'delete-item secondary-content';

  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';

  // Append link to li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Store in LocalStorage
  storeTaskInLocalStorage(taskInput.value);

  //  Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    /* local storage can only store strings, so we need to parse it in json*/
  }
  tasks.push(task);

  localStorage.setItem(
    'tasks',
    JSON.stringify(tasks)
  ); /* Now is saved in LS, we need to persist it in the UI*/
}

// Remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      // Remove from LocalStorage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = ' '; (1 way to do it)
  // Faster
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear tasks from LS
  clearTasksFromLocalStorage();
}

// Clear Tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter Tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase(); /*it gives us what it's typed in it */
  // Below here we can use forEach because quesrySelector returns a nodeList. if we were using
  // selectByclass, it would returns a html collection list, and so we would need it to concert in
  // an array before use forEach
  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}

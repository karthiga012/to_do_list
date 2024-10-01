document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const toDoInput = document.getElementById('todo');
  const targetDateInput = document.getElementById('targetDate');
  const taskText = toDoInput.value.trim();
  const targetDate = targetDateInput.value;

  if (taskText === '' || targetDate === '') return;

  const toDoList = document.querySelector('.toDoList');
  const listItem = createToDoItem(taskText, targetDate);
  toDoList.appendChild(listItem);

  toDoInput.value = ''; // Clear input after adding task
  targetDateInput.value = ''; // Clear target date after adding task
});

function createToDoItem(taskText, targetDate) {
  const listItem = document.createElement('li');
  listItem.classList.add('task-item');

  // Create task text
  const task = document.createElement('span');
  task.textContent = taskText;
  task.classList.add('task-text');
  listItem.appendChild(task);

  // Create target date element
  const targetDateElement = document.createElement('div');
  targetDateElement.textContent = `Target Date: ${new Date(targetDate).toLocaleDateString()}`;
  targetDateElement.classList.add('target-date');
  listItem.appendChild(targetDateElement);

  // Create a timestamp
  const timestamp = document.createElement('div');
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString(); // Format: "MM/DD/YYYY, HH:MM:SS"
  timestamp.textContent = `Added on: ${formattedDate}`;
  timestamp.classList.add('timestamp');
  listItem.appendChild(timestamp);

  // Create a container for tick and delete icons
  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('icons');

  // Create tick (complete) icon
  const tickIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  tickIcon.classList.add('icon', 'tick-icon');
  tickIcon.setAttribute('viewBox', '0 0 24 24');
  tickIcon.innerHTML = `
    <path d="M9 19L4 14l1.41-1.41L9 16.17l9.59-9.59L20 8l-11 11z"/>
  `;

  tickIcon.onclick = function () {
    completeTask(listItem);
  };
  iconsContainer.appendChild(tickIcon);

  // Create dustbin (delete) icon
  const deleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  deleteIcon.classList.add('icon', 'delete-icon');
  deleteIcon.setAttribute('viewBox', '0 0 24 24');
  deleteIcon.innerHTML = `
    <path d="M3 6h18v2H3zm2 3h14v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V9zm6-5v1h4V4h-4z"/>
  `;

  deleteIcon.onclick = function () {
    listItem.remove();
  };
  iconsContainer.appendChild(deleteIcon);

  // Add the icons container to the list item
  listItem.appendChild(iconsContainer);

  return listItem;
}

function completeTask(listItem) {
  const completedList = document.querySelector('.completedList');
  const tickIcon = listItem.querySelector('.tick-icon');
  tickIcon.remove(); // Remove the tick icon after task completion
  completedList.appendChild(listItem);
}

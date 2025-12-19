function openCard() {
  const fullElems = document.querySelectorAll(".fullElem");

  document.addEventListener("click", function (evt) {
    const card = evt.target.closest(".element");
    if (card) {
      let id = card.dataset.id;
      fullElems[id].style.display = "block";
      return;
    }

    const btn = evt.target.closest(".btn");
    if (btn) {
      let id = btn.dataset.id;
      fullElems[id].style.display = "none";
    }
  });
}
openCard();

const allTaskContiner = document.querySelector(".allTask");
const taskNameInput = document.querySelector("#taskName");
const taskDetailInput = document.querySelector("#taskDetail");
const isImportant = document.querySelector("#isImportant");
const taskPriority = document.querySelector("#taskPriority");
const addTaskBtn = document.querySelector("#add-task-btn");
const emptyState = document.querySelector(".empty-state");
const delAllTaskBtn = document.querySelector(".delete-all-btn");
const setCount = document.querySelector("#taskCount");
document.addEventListener("DOMContentLoaded", loadTask);
addTaskBtn.addEventListener("click", addTask);
const STATUS_FLOW = [
  { text: "Not Started", color: "red" },
  { text: "In Progress", color: "orange" },
  { text: "Completed", color: "green" },
];
function createTaskObj() {
  return {
    name: taskNameInput.value,
    detail: taskDetailInput.value,
    important: isImportant.checked,
    priority: taskPriority.value,
    status: "Not Started",
  };
}

function addTask() {
  if (!taskNameInput.value) return;
  const taskObj = createTaskObj();
  saveTask(taskObj);
  reanderTask(taskObj);
  resetForm();
}
// reander task
function reanderTask(task) {
  emptyState.style.display = "none";
  const taskDiv = document.createElement("div");
  console.log(taskDetailInput.value);
  taskDiv.classList.add("task");
  if (task.important) {
    taskDiv.style.borderLeft = "4px solid red";
  }
  taskDiv.innerHTML = `
                               <div class="left">
                                <h1 class="title">${task.name}</h1>
                                <P class="description">
                                 ${task.detail}
                                </P>
                                <p class="priority">
                                    ${task.priority}
                                </p>
                            </div>
                            <div class="right">
                                <button class="status-btn btn">${task.status}</button>
                                <button class="delete-task-btn ">Delete</button>

                            </div>
    `;

  const statusBtn = taskDiv.querySelector(".status-btn");
  setStatusStyle(statusBtn, task.status);

  statusBtn.addEventListener("click", () => {
    toggleStatus(task, statusBtn);
  });

  allTaskContiner.appendChild(taskDiv);
  taskDiv.querySelector(".delete-task-btn").addEventListener("click", () => {
    deleteBtn(task, taskDiv);
  });
}



// locastorage

function setTaskCount(count) {
  setCount.textContent = `${count}`;
  return count;
}

function getTasks() {
  return JSON.parse(localStorage.getItem("task")) || [];
}

function saveTask(task) {
  let tasks = getTasks();
  tasks.push(task);
  localStorage.setItem("task", JSON.stringify(tasks));
  setTaskCount(tasks.length);
}

function resetForm() {
  taskName.value = "";
  taskDetail.value = "";
  isImportant.checked = false;
  taskPriority.value = "SET PRIORITY";
}

function loadTask() {
  let tasks = getTasks();
  if (!tasks) emptyState.style.display = "none";
  tasks.forEach(reanderTask);
  setTaskCount(tasks.length);
}

function deleteBtn(task, taskDiv) {
  let tasks = getTasks();
  tasks = tasks.filter((t) => t.name !== task.name || t.detail !== task.detail);
  localStorage.setItem("task", JSON.stringify(tasks));
  taskDiv.remove();

  if (!setTaskCount(tasks.length)) emptyState.style.display = "block";
}

delAllTaskBtn.addEventListener("click", function () {
  const tasksDiv = document.querySelectorAll(".task");
  tasksDiv.forEach((task) => {
    task.remove();
  });

  localStorage.setItem("task", JSON.stringify([]));
  emptyState.style.display = "block";
  setTaskCount(0);
});




//status toggle 
function toggleStatus(task, btn) {
  let currentIndex = STATUS_FLOW.findIndex(
    s => s.text === task.status
  );

  let nextIndex = (currentIndex + 1) % STATUS_FLOW.length;
  task.status = STATUS_FLOW[nextIndex].text;

  setStatusStyle(btn, task.status);
  updateTaskInStorage(task);
}

function setStatusStyle(btn, status) {
  const statusObj = STATUS_FLOW.find(s => s.text === status);
  btn.textContent = statusObj.text;
  btn.style.color = statusObj.color
  btn.style.border = `2px solid ${statusObj.color}`
}


function updateTaskInStorage(updatedTask) {
  let tasks = getTasks();

  tasks = tasks.map(task =>
    task.name === updatedTask.name &&
    task.detail === updatedTask.detail
      ? updatedTask
      : task
  );

  localStorage.setItem("task", JSON.stringify(tasks));
}
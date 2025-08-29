// ___________  Theme Toggle start ___________
  const toggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  // Apply saved theme from localStorage
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
    sunIcon.classList.remove("bg-[#1F0356]");
    moonIcon.classList.add("bg-[#1F0356]");
    sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove("bg-[#1F0356]");
    sunIcon.classList.add("bg-[#1F0356]");
     moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
  }

  toggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');

    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      moonIcon.classList.remove("bg-[#1F0356]");
      moonIcon.classList.add('hidden');
      sunIcon.classList.remove('hidden');
      sunIcon.classList.add("bg-[#1F0356]");
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      sunIcon.classList.remove("bg-[#1F0356]");
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
      moonIcon.classList.add("bg-[#1F0356]");
    }
  });
// ___________  theme toggle end  ____________

// ___________ add task btn functionality start __________
const addTaskBtn = document.getElementById("addTaskBtn");
const taskModal = document.getElementById("taskModal");
const cancelBtn = document.getElementById("cancelBtn");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const taskTitle = document.getElementById("taskTitle");
const taskPriority = document.getElementById("taskPriority");
const taskDueDate = document.getElementById("taskDueDate");

let editingTaskIndex = null; // track which task is being edited

// open Modal
addTaskBtn.addEventListener("click", () => {
  taskModal.classList.remove("hidden");
});

// close Modal
cancelBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden");
  resetForm();
});

// save task
saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDueDate.value;
  const createdAt = new Date().toLocaleString();

  if (!title) {
    alert("The title is required");
    return;
  }

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (editingTaskIndex !== null) {
    // Editing existing task
    tasks[editingTaskIndex] = { title, priority, dueDate, createdAt };
    editingTaskIndex = null;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskList.innerHTML = "";
    tasks.forEach((task, index) => renderTask(task, index));
  } else {
    // Adding new task
    const task = { title, priority, dueDate, createdAt };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTask(task, tasks.length - 1);
  }

  emptyMessage.classList.add("hidden");
  resetForm();
  taskModal.classList.add("hidden");
});

// reset form
function resetForm() {
  taskTitle.value = "";
  taskPriority.value = "Low";
  taskDueDate.value = "";
}

// render single task
function renderTask(task, index) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-item");

  taskDiv.innerHTML = `
    <div class="flex justify-between bg-[#1F0356] p-3 rounded-3xl">
      <div class="flex items-start">
        <input type="checkbox"
          class="mx-4 mt-1 cursor-pointer h-5 w-5 border-2 border-[#839FEE] hover:border-opacity-65 rounded appearance-none bg-transparent checked:bg-[#EB03FF]" />
        <div>
          <h3 class="text-base text-white font-bold">${task.title}</h3>
          <div class="flex gap-3 items-center mt-2 text-[#839FEE]">
            <span class="text-sm">Added : <span class="createdAt">${task.createdAt}</span></span>
            <span class="priority px-4 py-1 text-xs font-medium text-[#EB03FF] rounded-3xl border-2 border-[#EB03FF]">${task.priority}</span>
            <span class="due px-4 py-1 text-xs font-medium text-[#94D09F] rounded-3xl border-2 border-[#94D09F]">Deadline: <span class="dueDate">${task.dueDate || "no date"}</span></span>
          </div>
        </div>
      </div>

      <div class="flex gap-5 items-center mx-8">
        <i class="fa-solid fa-pen-to-square text-[#BFAF1C] text-xl cursor-pointer hover:text-opacity-65 edit-icon"></i>
        <i class="fa-solid fa-trash text-[#FF5730] text-xl cursor-pointer hover:text-opacity-65 delete-icon"></i>
      </div>
    </div>
  `;

  taskList.appendChild(taskDiv);

  const editBtn = taskDiv.querySelector(".edit-icon");
  const deleteBtn = taskDiv.querySelector(".delete-icon");

  // Edit functionality
  editBtn.addEventListener("click", () => {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const idx = Array.from(taskList.children).indexOf(taskDiv);
    const taskToEdit = tasks[idx];

    taskTitle.value = taskToEdit.title;
    taskPriority.value = taskToEdit.priority;
    taskDueDate.value = taskToEdit.dueDate;

    editingTaskIndex = idx;
    taskModal.classList.remove("hidden");
  });

  // Delete functionality
  deleteBtn.addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const idx = Array.from(taskList.children).indexOf(taskDiv);
    tasks.splice(idx, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskDiv.remove();

    if (tasks.length === 0) {
      emptyMessage.classList.remove("hidden");
    }
  });
}

// load saved tasks on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (savedTasks.length === 0) {
    emptyMessage.classList.remove("hidden");
  } else {
    emptyMessage.classList.add("hidden");
    savedTasks.forEach((task, index) => renderTask(task, index));
  }
});

// save task on Enter key
taskTitle.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    saveTaskBtn.click();
  }
});
// ___________ add task btn functionality end __________

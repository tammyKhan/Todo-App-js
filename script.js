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

// open Modal
addTaskBtn.addEventListener("click", () => {
  taskModal.classList.remove("hidden")
})

// close Modal
cancelBtn.addEventListener("click", () => {
  taskModal.classList.add("hidden")
})

// save task
saveTaskBtn.addEventListener("click", () => {
  const title = taskTitle.value.trim();
  const priority = taskPriority.value;
  const dueDate = taskDueDate.value;
  const createdAt = new Date().toLocaleString();

if(!title) {
  alert("The title is required");
  return;
}

// hide empty message
emptyMessage.classList.add("hidden");

// create task box
const taskDiv = document.createElement("div");
taskDiv.innerHTML = `
    <div class="flex justify-between bg-[#1F0356] p-3 rounded-3xl">
          <div class="flex items-start">
            <input type="checkbox"
             class="mx-4 mt-1 cursor-pointer h-5 w-5 border-2 border-[#839FEE] hover:border-opacity-65 rounded appearance-none bg-transparent checked:bg-[#EB03FF]" name="" id="">
            <div class="">
              <h3 class="text-base text-white font-bold">${title}</h3>
              <div class="flex gap-5 items-center mt-2 text-[#839FEE]">
                <span class="text-sm ">Added : <span class="">${createdAt}</span></span>
                <span class="px-4 py-1 text-xs font-medium text-[#EB03FF] rounded-3xl border-2 border-[#EB03FF]">${priority}</span>
                <span class="px-4 py-1 text-xs font-medium text-[#94D09F] rounded-3xl border-2 border-[#94D09F]">Deadline: <span class=""> ${dueDate} </span></span>
              </div>
            </div>
          </div>

          <!-- actions btn -->
          <div class="flex gap-5 items-center mx-8">
            <i class="fa-solid fa-pen-to-square text-[#BFAF1C] text-2xl cursor-pointer hover:text-opacity-65"></i>
            <i class="fa-solid fa-trash text-[#FF5730] text-2xl cursor-pointer hover:text-opacity-65"></i>
          </div>
       </div>
`

// append to task list
taskList.appendChild(taskDiv);

 // Reset & Close
  taskTitle.value = "";
  taskPriority.value = "Low";
  taskDueDate.value = "";
  taskModal.classList.add("hidden");


})

// ___________ add task btn functionality end __________


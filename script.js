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

// __________________Add Task Btn functionality Start_____________________

  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.getElementById("closeModalBtn");
  const taskModal = document.getElementById("taskModal");
  const taskForm = document.getElementById("taskForm");
  const taskTitle = document.getElementById("taskTitle");
  const taskPriority = document.getElementById("taskPriority");
  const taskDueDate = document.getElementById("taskDueDate");
  const taskList = document.getElementById("taskList");
  const emptyMessage = document.getElementById("emptyMessage");

  let editingTaskIndex = null;

  // open modal
  openModalBtn.addEventListener("click", () => {
     editingTaskIndex = null
     taskForm.reset();
     taskModal.classList.remove("hidden");
  })

  // close modal
  closeModalBtn.addEventListener("click", () => {
    taskModal.classList.add("hidden");
  })

  // save task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = taskTitle.value.trim();
    const priority = taskPriority.value;
    const dueDate = taskDueDate.value;
    const createdAt = new Date().toLocaleString();

    if(!title) {
      alert("The title is required");
      return;
    }

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    if (editingTaskIndex !== null) {
      // update existing tasks
      const id = tasks[editingTaskIndex].id;
      tasks[editingTaskIndex].id = id;
      tasks[editingTaskIndex].title = title;
      tasks[editingTaskIndex].priority = priority;
      tasks[editingTaskIndex].dueDate = dueDate;
    } else {
     // add new tasks

     tasks.push({id: Date.now(),title, priority, dueDate, createdAt, completed: false})
    }

    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderAllTasks();
    taskModal.classList.add("hidden")
  })

  // render all tasks
  function renderAllTasks () {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    // filter by status
    let filteredTasks = savedTasks;
    if(currentFilter === "inProcess") {
       filteredTasks = savedTasks.filter(task => !task.completed);
    } else if(currentFilter === "completed") {
      filteredTasks = savedTasks.filter(task => task.completed)
    }

    // filter by search query
    if(searchQuery){
      filteredTasks = filteredTasks.filter(task => 
        task.title.toLowerCase().includes(searchQuery) )
    }

    // apply sorting
    if(currentSort === "created"){
      filteredTasks = [...filteredTasks].sort((a,b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if(currentSort === "priority"){
      filteredTasks = [...filteredTasks].sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if(currentSort === "dueDate") {
      filteredTasks = [...filteredTasks].sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if(currentSort === "az") {
      filteredTasks = [...filteredTasks].sort((a,b) => a.title.localeCompare(b.title));
    }

    // empty check
    if (filteredTasks.length === 0) {
    emptyMessage.classList.remove("hidden");

    if (searchQuery) {
        emptyMessage.textContent = `No matching tasks found for "${searchQuery}"`;
    } else {
         emptyMessage.textContent = `No Tasks Found`;     
    }

} else {
    emptyMessage.classList.add("hidden");
    filteredTasks.forEach((task, index) => renderTask(task, index));
}

    updateTaskCounts();
  }

  // render single task
  function renderTask (task, index) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.setAttribute("data-id", task.id)

          taskDiv.innerHTML = `
  
          <div class="flex  bg-[#1F0356] p-3 rounded-3xl">
         
              <input type="checkbox" ${task.completed ? "checked" : ""}
              class="mx-4 mt-1 cursor-pointer h-5 w-5 border-2 border-[#839FEE] hover:border-opacity-65 rounded appearance-none bg-transparent checked:bg-[#94D09F]" />
            <div class="w-full">
          
              <h3 class="text-base  font-bold ${task.completed ? "line-through text-[#94D09F]" : "text-white"}">${task.title}</h3>
              <div class="flex justify-between w-full">
               <div class="flex flex-col md:flex-row gap-3 md:items-center mt-2 text-[#839FEE]">
                <span class="text-sm">Added: <span class="createdAt">${task.createdAt}</span></span>
              
                 <span class="due px-2 md:px-3 py-1 text-xs font-medium text-[#94D09F] rounded-3xl border-2 border-[#94D09F] text-center ">Deadline: <span class="dueDate">${task.dueDate || "No date"}</span></span>
                <span class="priority px-2 md:px-3 py-1 text-xs font-medium text-[#EB03FF] rounded-3xl border-2 border-[#EB03FF]  text-center">${task.priority}</span>
              </div>
              
              <div class="flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-end mx-4 md:mx-8">
            <i class="fa-solid fa-pen-to-square text-[#BFAF1C] text-xl cursor-pointer hover:text-opacity-65 edit-icon"></i>
            <i class="fa-solid fa-trash text-[#FF5730] text-xl cursor-pointer hover:text-opacity-65 delete-icon"></i>
          </div>
              </div>
              
            </div>

          
        </div>
      `;

      taskList.appendChild(taskDiv);
      
      const checkbox = taskDiv.querySelector("input[type='checkbox']");
      const editBtn = taskDiv.querySelector(".edit-icon");
      const deleteBtn = taskDiv.querySelector(".delete-icon");

      //(checkbox) toggle completed task
      checkbox.addEventListener("change", () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const id = taskDiv.getAttribute("data-id");
        const taskIndex = tasks.findIndex(t => t.id == id);

        if (taskIndex !== -1){
          tasks[taskIndex].completed = checkbox.checked;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          renderAllTasks();
        }
      })

      // edit functionality
      editBtn.addEventListener("click", () => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const id = taskDiv.getAttribute("data-id");
        const taskToEdit = tasks.find(t => t.id == id);

        taskTitle.value = taskToEdit.title;
        taskPriority.value = taskToEdit.priority;
        taskDueDate.value = taskToEdit.dueDate;

      editingTaskIndex = tasks.findIndex(t => t.id == id);
      taskModal.classList.remove("hidden");        
      })

    // delete functionality
    deleteBtn.addEventListener("click", () => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      const id = taskDiv.getAttribute("data-id");
      tasks = tasks.filter(t => t.id != id);

      localStorage.setItem("tasks", JSON.stringify(tasks))
      renderAllTasks();
    })

  }
    // __________________Add Task Btn functionality End_____________________

    // __________________filter functionality (all, active, complete) start  __________________

    const filterButtons = document.querySelectorAll(".filter-btn");
    let currentFilter = "all";

    // active filter btn style
    function setActiveFilter(activeBtn) {
      filterButtons.forEach(btn => {
        btn.classList.remove("bg-[#839FEE]");
        btn.classList.add("bg-[#1F0356]");
      })

      activeBtn.classList.remove("bg-[#1F0356]");
      activeBtn.classList.add("bg-[#839FEE]");
    }

    // Add Eventlistener for all filter btns
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
         currentFilter = btn.getAttribute("data-filter");
          setActiveFilter(btn);
          renderAllTasks();
      })
    })

    // Updating Task count
    function updateTaskCounts () {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      
      const allCount = tasks.length;
      const inProcessCount = tasks.filter(t => !t.completed).length;
      const completedCount = tasks.filter(t => t.completed).length;

      // Updating the UI
      document.querySelector('[data-count="all"]').textContent = allCount;
      document.querySelector('[data-count="inProcess"]').textContent = inProcessCount;
      document.querySelector('[data-count="completed"]').textContent = completedCount;

    }
    // __________________filter functionality (all, active, complete) End  __________________

    // __________________Search functionality with Debounce Start_____________________

   const searchInputs = document.querySelectorAll(".searchInput");
   let searchQuery = "";

  //  debounce function
  function debounce (func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func(...args), delay);
    }
  }

   const handleSearch = debounce((e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderAllTasks();
   } , 300)

   searchInputs.forEach(input => {
    input.addEventListener("input", handleSearch)
   })

    // __________________Search functionality with Debounce End_____________________

  // __________________ Sort functionality start  __________________

const sortButtons = document.querySelectorAll(".sort-btn");
const priorityOrder = { High: 1, Medium: 2, Low: 3 }

let currentSort = null;

// active sort btn style
function setActiveSort (activeBtn) {
  sortButtons.forEach(btn => btn.classList.remove("bg-[#EB03FF]"))
  activeBtn.classList.add("bg-[#EB03FF]")
}

sortButtons.forEach(btn => {
  btn.addEventListener("click", () => {
     currentSort = btn.getAttribute("data-sort");
     setActiveSort(btn);
     renderAllTasks();
  })
})

  // __________________ Sort functionality End  __________________

  // __________________ Select All Toggle functionality __________________

  const selectAllBtn = document.getElementById("selectAllBtn");

  let allSelected = false;

  selectAllBtn.addEventListener("click", () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
     if(!allSelected){
      tasks = tasks.map(task => ({...task, completed: true}));
      selectAllBtn.textContent = "Unselect All";
      allSelected = true;
     } else {
      tasks = tasks.map(task => ({...task, completed: false}));
      selectAllBtn.textContent = "Select All";
      allSelected = false;
     }

     localStorage.setItem("tasks", JSON.stringify(tasks));
     renderAllTasks();
  })

    // __________________ Clear Complete Btn functionality __________________
    const clearCompleteBtn = document.getElementById("clearCompleteBtn");

    clearCompleteBtn.addEventListener("click", () => {
      let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks = tasks.filter(task => !task.completed);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderAllTasks()
    })

    // Load tasks initially
  renderAllTasks()
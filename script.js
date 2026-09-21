// ==========================================
// TaskFlow - To-Do List Application
// ==========================================

// Get elements from HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");


// Store all tasks
let tasks = [];


// ==========================================
// Navigation
// ==========================================

const navLinks = document.querySelectorAll(".nav-links a");
const pages = document.querySelectorAll(".page");

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();

        const pageName = link.getAttribute("data-page");

        showPage(pageName);

    });

});


function showPage(pageName) {

    // Hide all pages
    pages.forEach(function(page) {
        page.classList.remove("active-page");
    });

    // Show selected page
    const selectedPage = document.getElementById(pageName + "Page");

    if (selectedPage) {
        selectedPage.classList.add("active-page");
    }

    // Update active navigation link
    navLinks.forEach(function(link) {

        link.classList.remove("active");

        if (link.getAttribute("data-page") === pageName) {
            link.classList.add("active");
        }

    });

    // Refresh task information
    displayAllTasks();
    displayCompletedTasks();
    displayPendingTasks();
    updateStatistics();
}


// ==========================================
// Add a New Task
// ==========================================

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    taskInput.value = "";

    displayTasks();
    displayAllTasks();
    displayCompletedTasks();
    displayPendingTasks();
    updateStatistics();

    saveTasks();
}


// ==========================================
// Create Task HTML
// ==========================================

function createTaskElement(task) {

    const li = document.createElement("li");

    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("change", function() {
        completeTask(task.id);
    });


    const taskText = document.createElement("span");

    taskText.textContent = task.text;


    if (task.completed) {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "#888";
    }


    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
        deleteTask(task.id);
    });


    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(deleteButton);

    return li;
}


// ==========================================
// Display Home Tasks
// ==========================================

function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = createTaskElement(task);

        taskList.appendChild(li);

    });
}


// ==========================================
// Display All Tasks Page
// ==========================================

function displayAllTasks() {

    const allTasksList = document.getElementById("allTasksList");

    allTasksList.innerHTML = "";

    tasks.forEach(function(task) {

        const li = createTaskElement(task);

        allTasksList.appendChild(li);

    });
}


// ==========================================
// Display Completed Tasks
// ==========================================

function displayCompletedTasks() {

    const completedList = document.getElementById("completedList");

    completedList.innerHTML = "";

    const completedTasks = tasks.filter(function(task) {
        return task.completed === true;
    });


    completedTasks.forEach(function(task) {

        const li = createTaskElement(task);

        completedList.appendChild(li);

    });


    if (completedTasks.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No completed tasks yet.";

        message.style.color = "#666";

        completedList.appendChild(message);
    }
}


// ==========================================
// Display Pending Tasks
// ==========================================

function displayPendingTasks() {

    const pendingList = document.getElementById("pendingList");

    pendingList.innerHTML = "";

    const pendingTasks = tasks.filter(function(task) {
        return task.completed === false;
    });


    pendingTasks.forEach(function(task) {

        const li = createTaskElement(task);

        pendingList.appendChild(li);

    });


    if (pendingTasks.length === 0) {

        const message = document.createElement("p");

        message.textContent = "No pending tasks.";

        message.style.color = "#666";

        pendingList.appendChild(message);
    }
}


// ==========================================
// Complete / Uncomplete Task
// ==========================================

function completeTask(taskId) {

    tasks.forEach(function(task) {

        if (task.id === taskId) {
            task.completed = !task.completed;
        }

    });

    displayTasks();
    displayAllTasks();
    displayCompletedTasks();
    displayPendingTasks();
    updateStatistics();

    saveTasks();
}


// ==========================================
// Delete Task
// ==========================================

function deleteTask(taskId) {

    tasks = tasks.filter(function(task) {

        return task.id !== taskId;

    });

    displayTasks();
    displayAllTasks();
    displayCompletedTasks();
    displayPendingTasks();
    updateStatistics();

    saveTasks();
}


// ==========================================
// Update Statistics
// ==========================================

function updateStatistics() {

    const total = tasks.length;

    const completed = tasks.filter(function(task) {

        return task.completed === true;

    }).length;


    const pending = total - completed;


    // Home statistics
    document.getElementById("homeTotalTasks").textContent = total;
    document.getElementById("homeCompletedTasks").textContent = completed;
    document.getElementById("homePendingTasks").textContent = pending;


    // Statistics page
    document.getElementById("statisticsTotal").textContent = total;
    document.getElementById("statisticsCompleted").textContent = completed;
    document.getElementById("statisticsPending").textContent = pending;
}


// ==========================================
// Clear All Tasks
// ==========================================

function clearAllTasks() {

    if (tasks.length === 0) {

        alert("There are no tasks to clear.");

        return;
    }


    const confirmation = confirm(
        "Are you sure you want to delete all tasks?"
    );


    if (confirmation) {

        tasks = [];

        displayTasks();
        displayAllTasks();
        displayCompletedTasks();
        displayPendingTasks();
        updateStatistics();

        saveTasks();
    }
}


// ==========================================
// Save Tasks
// ==========================================

function saveTasks() {

    localStorage.setItem(
        "taskflowTasks",
        JSON.stringify(tasks)
    );
}


// ==========================================
// Load Tasks
// ==========================================

function loadTasks() {

    const savedTasks = localStorage.getItem("taskflowTasks");


    if (savedTasks !== null) {

        tasks = JSON.parse(savedTasks);

    }


    displayTasks();
    displayAllTasks();
    displayCompletedTasks();
    displayPendingTasks();
    updateStatistics();
}


// ==========================================
// Button Events
// ==========================================

addTaskBtn.addEventListener("click", addTask);

clearAllBtn.addEventListener("click", clearAllTasks);


taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// ==========================================
// Load Saved Tasks
// ==========================================

loadTasks();


// Show Home Page First
showPage("home");
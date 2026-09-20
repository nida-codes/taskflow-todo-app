
// ==========================================
// TaskFlow - To-Do List Application
// ==========================================


// Get elements from HTML
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

const clearAllBtn = document.getElementById("clearAllBtn");


// Store all tasks
let tasks = [];


// ==========================================
// Add a New Task
// ==========================================

function addTask() {

    const taskText = taskInput.value.trim();

    // Don't add an empty task
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    // Create a task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    // Add task to the tasks array
    tasks.push(task);

    // Clear input box
    taskInput.value = "";

    // Display tasks
    displayTasks();

    // Update statistics
    updateStatistics();

    // Save tasks
    saveTasks();
}


// ==========================================
// Display Tasks
// ==========================================

function displayTasks() {

    // Clear the current list
    taskList.innerHTML = "";

    // Create HTML for every task
    tasks.forEach(function(task) {

        const li = document.createElement("li");

        // Create checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        // When checkbox is clicked
        checkbox.addEventListener("change", function() {
            completeTask(task.id);
        });


        // Create task text
        const taskText = document.createElement("span");
        taskText.textContent = task.text;


        // If task is completed
        if (task.completed) {
            taskText.style.textDecoration = "line-through";
            taskText.style.color = "#888";
        }


        // Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        // Delete button action
        deleteButton.addEventListener("click", function() {
            deleteTask(task.id);
        });


        // Add elements to list item
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(deleteButton);

        // Add list item to task list
        taskList.appendChild(li);
    });
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


    totalTasks.textContent = total;

    completedTasks.textContent = completed;

    pendingTasks.textContent = pending;
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

        updateStatistics();

        saveTasks();
    }
}


// ==========================================
// Save Tasks in Browser
// ==========================================

function saveTasks() {

    localStorage.setItem("taskflowTasks", JSON.stringify(tasks));
}


// ==========================================
// Load Tasks from Browser
// ==========================================

function loadTasks() {

    const savedTasks = localStorage.getItem("taskflowTasks");

    if (savedTasks !== null) {

        tasks = JSON.parse(savedTasks);

        displayTasks();

        updateStatistics();
    }
}


// ==========================================
// Button Events
// ==========================================

// Add Task button
addTaskBtn.addEventListener("click", addTask);


// Clear All button
clearAllBtn.addEventListener("click", clearAllTasks);


// Allow pressing Enter to add a task
taskInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});


// ==========================================
// Load saved tasks when page opens
// ==========================================

loadTasks();

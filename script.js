    document.addEventListener("DOMContentLoaded", () => {
    //waiting for page to load.

    //get HTML elements
    const taskInput = document.getElementById("task-input");
    const addTaskButton = document.getElementById("task-add-btn");
    const taskList = document.getElementById("task-list");

    //check browser for previous tasks
    //converts stored text back to array
    //use empty array if nothing found
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    //looping through each task and calling renderTask to display that.
    tasks.forEach((task) => {
        renderTask(task);
    });

    //Adding eventlistener to button click
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") return; // ignoring empty inputs

        //creating task objects
        const newTask = {
        id: Date.now(), // unique number
        text: taskText, // what user typed
        completed: false, // not completed or done yet
        };
        tasks.push(newTask); //push the task to the array
        saveTasks(); //save to browser storage
        renderTask(newTask);
        taskInput.value = ""; // clear input empty input box
        console.log(tasks);
    });

    //function to display the tasks or render the task
    function renderTask(task) {
        //create an empty list item
        const li = document.createElement("li"); // create li element.
        li.setAttribute("data-id", task.id); // add unique id

        //check if task is already completed
        if (task.completed) li.classList.add("completed");

        //Add content inside the li
        li.innerHTML = `
                <div class="task-left">
                    <span >${task.text}</span>
                </div> 
                <div class="task-actions">
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </div>    
                `;

        //click anywhere on li = toggle complete
        li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;

        task.completed = !task.completed; //flip true to false or false to true
        li.classList.toggle("completed");
        saveTasks();
        });

        //Edit button (first button)
        li.querySelector("button:nth-of-type(1)").addEventListener("click", (e) => {
        e.stopPropagation(); //stop li toggle

        const currentText = task.text;
        const newText = prompt("Edit Task", currentText); // popup to edit

        if (newText && newText.trim() !== "") {
            task.text = newText.trim();
            li.querySelector("span").textContent = task.text; //update display
            saveTasks(); //save to localstorage
        }
        });

        //Delete button(second button)

        li.querySelector("button:nth-of-type(2)").addEventListener("click", (e) => {
        e.stopPropagation();

        if (confirm("Delete this task?")) {
            //confirm before delete
            tasks = tasks.filter((t) => t.id !== task.id); //remove from array
            li.remove(); //remove from screen
            saveTasks(); //save updated array
        }
        });

        taskList.appendChild(li); //add to the list
    }

    //function to save to browser localstorage
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)); //.stringify converts arrays into strings
        //this stores in browser and stays there after refresh as well
    }
    });

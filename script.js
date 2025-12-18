    document.addEventListener('DOMContentLoaded',()=>{ //Wait for Page to load

        //get HTML elements
        const todoInput = document.getElementById("todo-input");
        const addTaskButton = document.getElementById("add-task-btn");
        const todoList = document.getElementById("todo-list");


        //check browser for old tasks
        //JSON.parse() converts stored text back to array
        // ||[] means "use empty array if nothing found"
        let tasks = JSON.parse(localStorage.getItem("tasks")) || []; 

        //loops through each saved task
        //calls renderTask to display that on the screen.
        tasks.forEach((task) => renderTask(task));

        //Listens for button click
        //get text from input removes spaces

        addTaskButton.addEventListener("click", () => {
        const taskText = todoInput.value.trim(); //trim removes extra spaces at the end of the input
        if (taskText === "") return; //ignore empty inputs

        //create task object
        const newTask = {
            id: Date.now(),//unique number from current time
            text: taskText,//what user typed
            completed: false,// not done yet
        };

        //save and clear
        tasks.push(newTask); //add to array
        saveTasks();        //save to browser storage
        renderTask(newTask);
        todoInput.value = ""; //clear Input"empty input box"
        console.log(tasks); //show in console
        });

        //Display single task
        function renderTask(task) {
        const li = document.createElement('li') //create <li> element 
        li.setAttribute('data-id', task.id);   // add unique id
        
        if(task.completed) li.classList.add("completed");
        
        //task name, delete button, edit button
        li.innerHTML = `
        <span> ${task.text} </span>     
        <button>delete</button>
        <button>edit</button>
        `;

        li.addEventListener('click', (e) => {
            if(e.target.tagname === 'BUTTON') return;
            task.completed = !task.completed
            li.classList.toggle('completed')
            saveTasks()
        });

        li.querySelector('button').addEventListener('click', (e) =>{
            e.stopPropagation() //prevent toggle from firing
            tasks= tasks.filter(t => t.id !== task.id)
            li.remove();
            saveTasks();
        } )
        todoList.appendChild(li) // add to list 
        }

        //save to browser
        function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks)); //converts arrays to text string 
        //stores in browser stays after refresh.
        }
    })
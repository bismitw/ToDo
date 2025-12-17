const todoInput= document.getElementById("todo-input");
const addTaskButton= document.getElementById("add-task-btn");
const todoList= document.getElementById("todo-list");


let tasks=[]

addTaskButton.addEventListener('click', () =>{
    const taskText = todoInput.value.trim() //trim removes extra spaces at the end of the input
    if (taskText === "")return;
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    }

    tasks.push(newTask);   
    todoInput.value=""; //clear Input
    console.log(tasks);  
})

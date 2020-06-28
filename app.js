//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deletecheck);
filterOption.addEventListener('mouseout', filterTodo);

//functions

function addTodo(event){
 // prevent form from subbmitting 
    event.preventDefault();
// todo DIV
const todoDiv = document.createElement('div');
todoDiv.classList.add('todo');
// create LI
const newtodo = document.createElement('li');
newtodo.innerText = todoInput.value;
newtodo.classList.add('todo-item');
todoDiv.appendChild(newtodo);
// ADDING TODOS TO LOCAL STORGAGE
saveLocalTodos(todoInput.value);

// CHECK MARK BUTTON
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class= "fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton); 
// CHECK TRASH BUTTON
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton); 
// APPEND TO LIST
todoList.appendChild(todoDiv);
// CLEAR INPUT VALUE
todoInput.value = "";
}

function deletecheck(e) {
const item= e.target;
// DELETE TODO
if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    //ANIMATION
    todo.classList.add("fall");    
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove()
    });
}
//CHECK MARK
if(item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
}
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
            todo.style.display = "flex";
            break;
            case "completed":
            if(todo.classList.contains("completed")){
                todo.style.display = "flex";
            }else {
                todo.style.display = "none";
            }
            break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                 todo.style.display = "flex";   
                } else {
                    todo.style.display = "none";
                }
            break;
        }
    });
}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    } 
    todos.forEach(function(todo){
        // todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create LI
        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        todoDiv.appendChild(newtodo);

        // CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton); 
        // CHECK TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton); 
        // APPEND TO LIST
        todoList.appendChild(todoDiv);

    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
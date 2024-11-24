let todoItemsContainer = document.getElementById("todoItemsContainer");
let todoItemsObject=JSON.parse(getTodoItemsObjectFromCache())
//console.log(todoItemsObject)

let createTaskButton=document.getElementById("createTaskButton");
let taskDescription = document.getElementById("taskDescription");
// Add event listener for the 'keydown' event on the document
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default action of Enter (form submission)
        createTaskButton.click();    // Trigger the create Task Button click event
    }
});

function getTodoItemsObjectFromCache() {
    if (localStorage.getItem("todoItemsObject") == null)
        return "{}";
    else {
        return localStorage.getItem("todoItemsObject");
    }
}

function addTaskToTodoList() {
    let taskDescriptionValue = taskDescription.value;

    if (taskDescriptionValue !=="") {
    
    let taskId = new Date().getTime();
    let todoItem = document.createElement("li");
    todoItem.setAttribute("id", taskId)
    todoItem.classList.add("d-flex", "flex-row", "mt-2");

    let todoItemCheckbox = document.createElement("input");
    todoItemCheckbox.classList.add("todo-item-checkbox")
    todoItemCheckbox.type="checkbox";
    
    todoItemCheckbox.setAttribute("id", "checkbox"+taskId)
    todoItemCheckbox.addEventListener("click", function(event){
        changeTaskStatus(event, taskId)
    })
    todoItem.appendChild(todoItemCheckbox)


    let labelAndDeleteContainer = document.createElement("div");
    todoItem.appendChild(labelAndDeleteContainer)
    labelAndDeleteContainer.classList.add("todo-item-label", "d-flex", "flex-row");

    let todoItemLabel = document.createElement("label");
    todoItemLabel.textContent = taskDescriptionValue
    todoItemLabel.setAttribute("id", "label"+taskId)
    todoItemLabel.setAttribute("for", "checkbox"+taskId)
    labelAndDeleteContainer.appendChild(todoItemLabel);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.setAttribute("id", "delete"+taskId)
    deleteIconContainer.classList.add("todo-item-label-delete")
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash-fill");
    deleteIcon.addEventListener("click", function(event) {
        deleteTask(event, taskId)
    })
    deleteIconContainer.appendChild(deleteIcon);
    labelAndDeleteContainer.appendChild(deleteIconContainer)

    todoItemsContainer.appendChild(todoItem)

    todoItemsObject[taskId] = {
        taskDescritpion: taskDescription.value,
        taskStatus: todoItemCheckbox.checked
    }
    localStorage.setItem("todoItemsObject", JSON.stringify(todoItemsObject))
    console.log(todoItemsObject)
    taskDescription.value=""
    }
    else {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        document.getElementById("ModalLabel").textContent="Task Description is empty!!";
        document.getElementById("modalBody").textContent="Please add task description and then click add button";
        myModal.show();
    }
}

function changeTaskStatus(event, taskId) {
    let checkboxId = document.getElementById("checkbox"+taskId);
    let lableId = document.getElementById("label"+taskId);
    if(checkboxId.checked) {
        lableId.classList.add("todo-item-label-text")
    }
    else {
        lableId.classList.remove("todo-item-label-text")
    }
    todoItemsObject[taskId].taskStatus = checkboxId.checked;
    localStorage.setItem("todoItemsObject", JSON.stringify(todoItemsObject))
    console.log(todoItemsObject);
}

function deleteTask(event, taskId) {
    let todoItem = document.getElementById(taskId);
    let checkboxId = document.getElementById("checkbox"+taskId);
    if(checkboxId.checked) {
    todoItemsContainer.removeChild(todoItem);
    delete todoItemsObject[taskId];
    localStorage.setItem("todoItemsObject", JSON.stringify(todoItemsObject))
    console.log(todoItemsObject);
    } else {
        const myModal = new bootstrap.Modal(document.getElementById('myModal'));
        document.getElementById("ModalLabel").textContent="Warning: The task is not finished!!";
        document.getElementById("modalBody").textContent="Please complete first and then try to delete";
        myModal.show();
    }


}



function createTaskFromTodoListCache(taskId) {

    let todoItem = document.createElement("li");
    todoItem.setAttribute("id", taskId)
    todoItem.classList.add("d-flex", "flex-row", "mt-2");

    let todoItemCheckbox = document.createElement("input");
    todoItemCheckbox.classList.add("todo-item-checkbox")
    todoItemCheckbox.type="checkbox";
    
    todoItemCheckbox.setAttribute("id", "checkbox"+taskId)
    todoItemCheckbox.addEventListener("click", function(event){
        changeTaskStatus(event, taskId)
    })
    todoItemCheckbox.checked = todoItemsObject[taskId].taskStatus
    todoItem.appendChild(todoItemCheckbox)


    let labelAndDeleteContainer = document.createElement("div");
    todoItem.appendChild(labelAndDeleteContainer)
    labelAndDeleteContainer.classList.add("todo-item-label", "d-flex", "flex-row");

    let todoItemLabel = document.createElement("label");
    todoItemLabel.textContent = todoItemsObject[taskId].taskDescritpion
    todoItemLabel.setAttribute("id", "label"+taskId)
    todoItemLabel.setAttribute("for", "checkbox"+taskId)
    if(todoItemCheckbox.checked) {
        todoItemLabel.classList.add("todo-item-label-text")
    }
    else {
        todoItemLabel.classList.remove("todo-item-label-text")
    }
    labelAndDeleteContainer.appendChild(todoItemLabel);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.setAttribute("id", "delete"+taskId)
    deleteIconContainer.classList.add("todo-item-label-delete")
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("bi", "bi-trash-fill");
    deleteIcon.addEventListener("click", function(event) {
        deleteTask(event, taskId)
    })
    deleteIconContainer.appendChild(deleteIcon);
    labelAndDeleteContainer.appendChild(deleteIconContainer)

    todoItemsContainer.appendChild(todoItem)

}

for (let eachTaskId in todoItemsObject){
    createTaskFromTodoListCache(eachTaskId)
}

createTaskButton.addEventListener("click", addTaskToTodoList)
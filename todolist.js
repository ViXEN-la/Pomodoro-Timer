// Переменные
const taskInput = document.getElementById('taskInput');
const addButton = document.querySelector('.add-button');
const tasksContainer = document.querySelector('.tasks-container');


// Слушатели
addButton.addEventListener('click', addTask);
tasksContainer.addEventListener('click', removeTask);
tasksContainer.addEventListener('click', completeTask);
tasksContainer.addEventListener('click', editTask);
tasksContainer.addEventListener('click', highlightedTask); 
    

// Функции
function addTask(event) {
    if(taskInput.value !== '') {
        event.preventDefault();
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('tasks-container_item');
        const taskP =  document.createElement('p');
        taskP.innerHTML = taskInput.value;
        taskP.classList.add('editable-paragraph');
        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = '<img src="images/remove.png" alt="remove">';
        const completedButton = document.createElement('button');
        completedButton.classList.add('completed-button')
        completedButton.innerHTML = '<img src="images/done.svg" alt="done">';
        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = '<img src="images/edit.svg" alt="edit">';
        taskDiv.appendChild(taskP);
        taskDiv.appendChild(completedButton);
        taskDiv.appendChild(removeButton);
        taskDiv.appendChild(editButton);
        tasksContainer.appendChild(taskDiv);
        taskInput.value = '';
    }
}

function removeTask(event) {
    item = event.target;
    if(item.className === 'remove-button') {
        const parentTask = item.parentElement;
        parentTask.classList.add('move');
        let i = setTimeout(removeParent, 250);
        function removeParent() {
            parentTask.remove();
        };
    }
}

function completeTask(event) {
    item = event.target;
    if(item.className === 'completed-button') {
        const parentTask = item.parentElement;
        parentTask.classList.toggle('completed');
    }
}

function editTask(event) {
   item = event.target;
   const parentTask = item.parentElement;
   const completedButton = document.querySelector('.completed-button');
   const removeButton = document.querySelector('.remove-button');
   if(item.classList.contains('edit-button')) {
    item.classList.toggle('active');
    if(item.classList.contains('active')) {
        item.innerHTML = '<img src="images/tick.svg" alt="tick">';
        parentTask.firstChild.setAttribute('contenteditable', 'true');
        parentTask.firstChild.focus();
        removeButton.setAttribute('disabled', '');
        completedButton.setAttribute('disabled', '');
        removeButton.classList.add('disabled-button');
        completedButton.classList.add('disabled-button');
    } else if(!item.classList.contains('active') && (parentTask.firstChild.innerText !== '') && (parentTask.firstChild.innerText.length <= 25)) {
        item.innerHTML = '<img src="images/edit.svg" alt="edit">';
        parentTask.firstChild.setAttribute('contenteditable', 'false');
        removeButton.removeAttribute('disabled', '');
        completedButton.removeAttribute('disabled', '');
        removeButton.classList.remove('disabled-button');
        completedButton.classList.remove('disabled-button');
    }
    if(parentTask.firstChild.innerText == '') {
        alert("Value can not be empty!");
    }
    if(parentTask.firstChild.innerText.length > 25) {
        alert("Task value is too long! Make it less than 26 symbols!");
    }
   }
}

function highlightedTask(event) {
    item = event.target;
    if(item.classList.contains('tasks-container_item'))  {
        item.classList.toggle('selected');
    }
    if(item.classList.contains('editable-paragraph')) {
        item.parentElement.classList.toggle('selected');
    }
}

taskInput.addEventListener('keyup', (event) => {
    if(event.code == "Enter") {
        addButton.click();
    }
})

tasksContainer.addEventListener('keyup',  (event) => {
    let editButton = document.querySelector('.edit-button');
    if(event.code == "Enter") {
        editButton.click();
    }
})





// let tasksContainerItems = Array.from(tasksContainer.children);
// console.log(tasksContainer.children);
// console.log(tasksContainerItems);
// tasksContainerItems.forEach(item => {
//     console.log('meow');
//     item.addEventListener('click', (event) => {
//         console.log('meow');
//         if (item.classList.contains('selected')) {
//             item.classList.remove('selected');
//         } else {
//             item.classList.add('selected');
//         }
//     })

//     tasksContainerItems.forEach(item => {
//         if (item.classList.contains('selected')) {
//             item.classList.remove('selected');
//         }
//     })
//     if (!(item.classList.contains('selected'))){
//         item.classList.add('selected');
//     }
// })

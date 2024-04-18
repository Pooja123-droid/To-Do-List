document.addEventListener('DOMContentLoaded', function () {
let input=document.getElementById("taskInput")
let button=document.getElementById("addTaskBtn")
let tasklist=document.getElementById("taskList")

let todos= JSON.parse(localStorage.getItem('todos')) || [];

function rendertasks(){
  tasklist.innerHTML=''
  todos.forEach((todo,index)=> {
    let list=document.createElement('li')
    let span=document.createElement("span")
    span.textContent=todo
    span.setAttribute('readonly','readonly')
    let editbutton=document.createElement("button")
    editbutton.textContent='Edit'
    editbutton.className = 'edit-btn';
    editbutton.addEventListener('click',()=>editTask(span,editbutton))
    const deletebutton=document.createElement("button")
    deletebutton.textContent='Delete'
    deletebutton.className='del-btn';
    deletebutton.addEventListener('click',()=>deleteTask(index))
    list.appendChild(span)
    list.appendChild(editbutton)
    list.appendChild(deletebutton)
    tasklist.appendChild(list)
  });

}
localStorage.setItem('todos', JSON.stringify(todos));


 // Function to add a new task
 function addTask(){
  const tasktext=input.value.trim();
  if(tasktext !== ''){
    todos.push(tasktext);
    input.value=''
    rendertasks()
  }
 }
 

 //Function to delete task

 function deleteTask(index) {
  todos.splice(index, 1);
  rendertasks();
}

//function to edit 

// Function to edit a task
function editTask(span,editButton) {
  if(editButton.textContent.toLowerCase()=="edit"){
    editButton.innerText="Save";
    span.contentEditable = "true";
    span.focus();
  }else{
    editButton.innerText="Edit";
    span.contentEditable = "false"; // Disable editing
    updateTask(span);
    
  }
}

function updateTask(span) {
  const index = Array.from(span.parentNode.parentNode.children).indexOf(span.parentNode);
  const newText = span.textContent.trim();
  
  if (newText !== '') {
    todos[index] = newText;
    localStorage.setItem('todos', JSON.stringify(todos));
    rendertasks();
  } else {
    // Display an error message or handle empty task text
    alert('Task cannot be empty!');
    // You might want to re-enable editing here if needed
    span.contentEditable = true;
    span.focus();
  }
}

button.addEventListener('click', addTask);

  rendertasks();
} )
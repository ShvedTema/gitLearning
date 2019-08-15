var listOfTasksToDo = document.getElementById("listOfTasksToDo");
var listOfTasksDone = document.getElementById("listOfTasksDone");

MonitorTasksFilterButtons();

function CreateNewTask() {
  let newTaskInput = document.getElementById("newTask").value;

  if ('' !== newTaskInput)
  {
    let newListItem = document.createElement("li");

    newListItem.appendChild(document.createTextNode(newTaskInput));
    listOfTasksToDo.appendChild(newListItem);

    document.getElementById("newTask").value = "";
    newListItem.onclick = MarkTaskAsDone;
  }
}


function MarkTaskAsDone(doneTask) {
  RemoveTaskFromList(doneTask);

  listOfTasksDone.appendChild(doneTask.target);

  doneTask.target.onclick = RemoveTaskFromList;
}


function RemoveTaskFromList(taskToRemove) {
  taskToRemove.target.parentElement.removeChild(taskToRemove.target);  
}


function ShowAllTasks() {
  listOfTasksToDo.style.display = 'block';
  listOfTasksDone.style.display = 'block';
}


function ShowOnlyTasksToDo() {
  listOfTasksToDo.style.display = 'block';
  listOfTasksDone.style.display = 'none';
}


function ShowOnlyDoneTasks() {
  listOfTasksToDo.style.display = 'none';
  listOfTasksDone.style.display = 'initial';
}


function MonitorTasksFilterButtons() {
  var filterButtons = document.getElementsByClassName("tasks_filter_button");

  for (var i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active_button");
    current[0].className = current[0].className.replace(" active_button", "");
    this.className += " active_button";
    });
}
}

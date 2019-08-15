var toDo;

window.addEventListener('load', () => {
  toDo = new ToDoClass();
  MonitorTasksFilterButtons();
});

function MonitorTasksFilterButtons() {
  let filterButtons = document.getElementsByClassName("tasks_filter_button");

  for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", function() {
      let current = document.getElementsByClassName("active_button");
      current[0].className = current[0].className.replace(" active_button", "");
      this.className += " active_button";
    });
  }
}

class ToDoClass {
  constructor() {
    // load all tasks from local storage to toDo instance
    this.tasks = JSON.parse(localStorage.getItem('TASKS'));

    if(!this.tasks) {
      this.tasks = [
        {task: 'Add new tasks to do', isComplete: false},
      ];
    }  
    
    this.showTasks();
  }
  
  showTasks() {
    var activeTaskFilter = document.getElementsByClassName("active_button");

    // check active filter
    if (activeTaskFilter[0].id == "allTasksBtn") {
      this.showAllTasks();
    } 
    else if (activeTaskFilter[0].id == "toDoTasksBtn") {
      this.showTasksToDo();
    } 
    else {
      this.showTasksDone();
    }
  }

  showAllTasks() {
    // to persist task data in our application
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    
    // apply to the all tasks in the array
    let tasksHtml = this.tasks.reduce((html, task, index) => 
      html += this.generateTaskHtml(task, index), '');

    document.getElementById('listOfTasks').innerHTML = tasksHtml;
  }

  showTasksToDo() {
    // to persist task data in our application
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    
    // apply to the all tasks in the array
    let tasksHtml = this.tasks.reduce((html, task, index) => 
      {
        if (false == task.isComplete) {
          return html += this.generateTaskHtml(task, index); 
        } 
        else {
          return html += '';
        }
      }, '');

    document.getElementById('listOfTasks').innerHTML = tasksHtml;
  }

  showTasksDone() {
    // to persist task data in our application
    localStorage.setItem('TASKS', JSON.stringify(this.tasks));
    
    // apply to the all tasks in the array
    let tasksHtml = this.tasks.reduce((html, task, index) => 
      {
        if (true == task.isComplete) {
          return html += this.generateTaskHtml(task, index); 
        } 
        else {
          return html += '';
        }
      }, '');

    document.getElementById('listOfTasks').innerHTML = tasksHtml;
  }

  generateTaskHtml(task, index) {
    return `
      <li class="mdl-list__item ${task.isComplete ? 'complete' : ''}">

        <div class="checkbox">
          <label><input id="toggleTaskStatus" type="checkbox"  
          onchange="toDo.toggleTaskStatus(${index})" value="" class="" 
          ${task.isComplete ? 'checked' : ''}></label>
        </div>

        <div class="mdl-list__item-primary-content task-text">
        ${task.task}
        </div>

        <a class="" href="/" onClick="toDo.deleteTask(event, ${index})">
          <i class="material-icons">delete_forever</i>
        </a>
      
      </li>
    `;
  }

  toggleTaskStatus(index) {
    this.tasks[index].isComplete = !this.tasks[index].isComplete;
    // re-render all the tasks with the updated value.
    this.showTasks();
  }

  deleteTask(event, taskIndex) {
    event.preventDefault();
    // splice() deletes a specified number of elements from an array from a specified index.
    this.tasks.splice(taskIndex, 1);
    // re-render all the tasks with the updated value.
    this.showTasks();
  }

  addTaskClick() {
    let newTaskInput = document.getElementById("newTask").value;

    if ('' !== newTaskInput)
    {
      this.addTask(newTaskInput);

      document.getElementById("newTask").value = "";
    }
  }

  addTask(taskDescription) {
    let newTask = {
      task: taskDescription,
      isComplete: false,
    };

    this.tasks.push(newTask);

    // re-render all the tasks with the updated value.
    this.showTasks();
  }
}
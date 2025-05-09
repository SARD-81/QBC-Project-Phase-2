const $ = document;
/* start set the current date */
const date = new Date(); //define date obj
const weekday = new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
  weekday: "long",
}).format(date); // define the Intl.DateTimeFormat for persian weekdays
$.addEventListener("DOMContentLoaded", () => {
  const persianDate = date.toLocaleDateString("fa-IR-u-ca-persian", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }); // define the structure of persian date
  $.querySelector("#date").textContent = `${weekday}، ${persianDate}`;
}); //load the current persian date by every load of page
/* finish set the current date */

/* start handle dark mode of website */
const darkBtn = $.querySelector("#night"); //define the dom obj
const lightBtn = $.querySelector("#day"); //define the dom obj

function setTheme(theme) {
  if (theme === "dark") {
    $.documentElement.classList.add("dark");
  } else {
    $.documentElement.classList.remove("dark");
  }
} //a function to set them for darkmode or light mode

if (
  localStorage.getItem("theme") === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  $.documentElement.classList.add("dark");
} else {
  $.documentElement.classList.remove("dark");
} //check the localstorage for set the theme

darkBtn.addEventListener("click", () => {
  localStorage.theme = "dark";
  setTheme("dark");
}); // set the them by click

lightBtn.addEventListener("click", () => {
  localStorage.theme = "light";
  setTheme("light");
}); // set the them by click
/* finish handle dark mode of website */

/* start handle the add task modal */
const taskSubject = $.getElementById("task-subject");
const taskDescription = $.getElementById("task-describtion");
const addTaskBtn = $.getElementById("add-task-btn");

const siblings = (elem) => {
  // create an empty array
  let siblings = [];

  // if no parent, return empty list
  if (!elem.parentNode) {
    return siblings;
  }

  // first child of the parent node
  let sibling = elem.parentNode.firstElementChild;

  // loop through next siblings until `null`
  do {
    // push sibling to array
    if (sibling != elem) {
      siblings.push(sibling);
    }
  } while ((sibling = sibling.nextElementSibling));

  return siblings;
}; //function to get the siblings of element
function validateForm() {
  const isSubjectValid = taskSubject.value.trim().length > 0;
  const isDescValid = taskDescription.value.trim().length > 0;
  const isTagSelected =
    !$.getElementById("tag-options").classList.contains("px-3");

  if (isSubjectValid && isDescValid && isTagSelected) {
    addTaskBtn.disabled = false;
    addTaskBtn.classList.remove("bg-blue-300", "cursor-not-allowed");
    addTaskBtn.classList.add("bg-blue-600", "cursor-pointer");
  } else {
    addTaskBtn.disabled = true;
    addTaskBtn.classList.add("bg-blue-300", "cursor-not-allowed");
    addTaskBtn.classList.remove("bg-blue-600", "cursor-pointer");
  }
} //function to validate form to active the form button

$.querySelector("#add-new-sec").addEventListener("click", () => {
  $.querySelector("#add-tasks-btn").classList.add("hidden");
  $.querySelector("#img-holder").classList.add("hidden");
  $.querySelector("#add-task-contianer").classList.remove("hidden");
  $.querySelector("#add-task-btn").classList.add("bg-blue-300");
}); //open add task modal

$.querySelector("#close-form").addEventListener("click", resetAddTaskForm); //close add task modal

$.getElementById("tag-button").addEventListener("click", () => {
  $.getElementById("tag-options").classList.toggle("hidden");
  $.getElementById("unselected-svg").classList.toggle("hidden");
  $.getElementById("selected-svg").classList.toggle("hidden");
}); //open the tag box to select the tag

const priorityBtns = Array.from($.querySelectorAll(".priority-btn")); //select all tag in DOM

priorityBtns.map((items) => {
  items.addEventListener("click", () => {
    $.querySelector("#tags-container").classList.add("hidden");
    const contColor = items.classList[1];
    siblings(items).map((item) => {
      item.classList.add("hidden");
      if (item.tagName === "A") {
        item.classList.remove("hidden");
      }
    });
    $.querySelector("#tag-options").classList.remove("px-3");
    $.querySelector("#tag-options").classList.remove("py-2");
    $.querySelector("#tag-options").classList.remove("border-1");
    $.querySelector("#tag-options").classList.remove("border-gray-300");
    $.querySelector("#tag-options").classList.add(contColor);
    $.querySelector(".close-tags").classList.remove("hidden");
    validateForm();
  });
}); //handle the selecting tag

$.querySelector(".close-tags").addEventListener("click", resetTagsContainer); //close and reset the tag box

function resetAddTaskForm() {
  $.querySelector("#add-tasks-btn").classList.remove("hidden");
  $.querySelector("#add-task-contianer").classList.add("hidden");
  $.getElementById("tag-options").classList.add("hidden");
  $.getElementById("selected-svg").classList.add("hidden");
  $.getElementById("unselected-svg").classList.remove("hidden");
  $.querySelector("#tags-container").classList.remove("hidden");
  $.querySelector("#tag-options").classList.add("px-3");
  $.querySelector("#tag-options").classList.add("py-2");
  $.querySelector("#tag-options").classList.add("border-1");
  $.querySelector("#tag-options").classList.add("border-gray-300");
  $.querySelector("#add-task-btn").classList.add("cursor-not-allowed");
  $.querySelector("#add-task-btn").classList.remove("bg-blue-600");
  $.querySelector("#add-task-btn").classList.remove("cursor-pointer");
  $.querySelector("#add-task-btn").disabled = true;
  $.querySelector("#task-subject").value = "";
  $.querySelector("#task-describtion").value = "";
  priorityBtns.map((items) => {
    siblings(items).map((item) => {
      item.classList.remove("hidden");
    });
  });

  let elemClass = [...$.querySelector("#tag-options").classList];
  let filterElemClass = elemClass.filter((a) => !a.includes("bg-"));
  $.querySelector("#tag-options").setAttribute("class", "");
  filterElemClass.map((cl) => {
    $.querySelector("#tag-options").classList.add(cl);
  });
  $.querySelector(".close-tags").classList.add("hidden");
} //function to reset the styles of add task form

function resetTagsContainer() {
  $.querySelector("#tags-container").classList.remove("hidden");
  $.querySelector("#tag-options").classList.add("px-3");
  $.querySelector("#tag-options").classList.add("py-2");
  $.querySelector("#tag-options").classList.add("border-1");
  $.querySelector("#tag-options").classList.add("border-gray-300");
  $.querySelector("#add-task-btn").classList.add("cursor-not-allowed");
  $.querySelector("#add-task-btn").classList.remove("cursor-pointer");
  $.querySelector("#add-task-btn").disabled = true;
  if ($.querySelector("#add-task-btn").classList.contains("bg-blue-600")) {
    $.querySelector("#add-task-btn").classList.remove("bg-blue-600");
    $.querySelector("#add-task-btn").classList.add("bg-blue-300");
  } else {
    $.querySelector("#add-task-btn").classList.add("bg-blue-300");
  }
  priorityBtns.map((items) => {
    siblings(items).map((item) => {
      item.classList.remove("hidden");
    });
  });
  let elemClass = [...$.querySelector("#tag-options").classList];
  let filterElemClass = elemClass.filter((a) => !a.includes("bg-"));
  $.querySelector("#tag-options").setAttribute("class", "");
  filterElemClass.map((cl) => {
    $.querySelector("#tag-options").classList.add(cl);
  });
  $.querySelector(".close-tags").classList.add("hidden");
} //function to reset the styles of tags

taskSubject.addEventListener("input", validateForm);
taskDescription.addEventListener("input", validateForm); //check the real-time changes of inputs field
/* finish handle the add task modal */

/* start handling task obj */

class Tasks {
  static count = 0; //a variable for counting the instances of class (to set id for every class to easily manage them)
  taskTitle; //Title of tasks
  taskDescription; //Description of tasks
  taskTag; //Tag of tasks
  taskIsDone = false; //flag of task that its done or not

  /* the constructor of class */
  constructor(taskTitle, taskDescription, taskTag) {
    this.taskId = ++Tasks.count;
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskTag = taskTag;
  }

  render() {
    //دریافت قالب طراحی شده برای هر تسک
    const taskTemplate = document.getElementById("task-template");
    const taskContainer = document.getElementById("tasks-container");

    // کلون قالب تسک
    const taskClone = taskTemplate.cloneNode(true); //true: means that cloning prants wit all of its child
    taskClone.removeAttribute("id");

    // مقداردهی به عناصر
    taskClone.querySelector("#task-title").innerText = this.title;
    taskClone.querySelector("#task-desc").innerText = this.description;

    const importanceSpan = taskClone.querySelector("#task-importance");
    importanceSpan.innerText = this.tagText;
    importanceSpan.className =
      "text-xs px-2 py-0.5 rounded-sm font-[YekanBakhReg] " + this.tagClass;

    taskContainer.appendChild(taskClone);
    taskContainer.classList.remove("hidden");
  }

  isDone() {
    //we use if to detect the dom that task is tiked or not
    //and if is tiked we call this method for instances and
    // change the dom with this method
  }

  deleteTasks() {}
}

$.querySelector("#task-item-menu").addEventListener("click", () => {
  $.querySelector("#task-item-ops").classList.toggle("hidden");
}); //open task option menu

// اضافه کردن تسک کلیک روی دکمه
document
  .getElementById("add-task-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("object");
    const title = document.getElementById("task-subject").value.trim();
    const desc = document.getElementById("task-description").value.trim();

    const newTask = new Tasks(title, desc, selectedTag);
    newTask.render();

    // پاک کردن فرم
    e.target.reset();

    selectedTag = {
      text: "پایین",
      class: "bg-green-100 text-green-700",
    };
  });

/* finish handling task obj */

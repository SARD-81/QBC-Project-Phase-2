const $ = document;
let allTasks = [];
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
  if (allTasks.length !== 0) {
    $.querySelector(
      "#task-counter"
    ).innerHTML = `${allTasks.length} تسک را باید انجام دهید`;
  }
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
  if (allTasks.length === 0) {
    $.querySelector("#img-holder").classList.remove("hidden");
  }
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
let selectedTag = {
  text: "پایین", // مقدار پیش‌فرض
  class: "bg-green-100 text-green-700",
};

// متن و رنگ داخل هر دکمه تگ انتخاب شده توسط کاربر را دریافت میکنیم

document.querySelectorAll(".priority-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    selectedTag.text = this.textContent.trim();
    selectedTag.class = this.getAttribute("data-color");
  });
});

// for managing our tasks
class Tasks {
  static count = 0;

  constructor(title, description, tag) {
    this.id = ++Tasks.count;
    this.title = title;
    this.description = description;
    this.complete = false;
    this.tagText = tag.text;
    this.tagClass = tag.class;
  }

  render() {
    //دریافت قالب طراحی شده برای هر تسک
    const taskTemplate = $.getElementById("task-template");
    const taskContainer = $.getElementById("tasks-container");

    // کلون قالب تسک
    const taskClone = taskTemplate.cloneNode(true); //true: means that cloning prants wit all of its child
    taskClone.setAttribute("id", `task${this.id}`);
    taskClone.classList.remove("hidden");

    // مقداردهی به عناصر
    taskClone.querySelector("#task-title").innerText = this.title;
    taskClone.querySelector("#task-desc").innerText = this.description;

    const importanceSpan = taskClone.querySelector("#task-importance");

    importanceSpan.innerText = this.tagText;
    importanceSpan.className =
      "text-xs px-2 py-0.5 rounded-sm font-[YekanBakhReg] " + this.tagClass;
    switch (importanceSpan.innerText) {
      case "پایین":
        taskClone.classList.add("before:!border-green-500");
        importanceSpan.classList.add("bg-green-100");
        importanceSpan.classList.add("text-green-700");
        break;
      case "متوسط":
        taskClone.classList.add("before:!border-yellow-500");
        importanceSpan.classList.add("bg-yellow-100");
        importanceSpan.classList.add("text-yellow-700");
        break;
      case "بالا":
        taskClone.classList.add("before:!border-red-500");
        importanceSpan.classList.add("bg-red-100");
        importanceSpan.classList.add("text-red-700");
        break;

      default:
        break;
    } //define the color of prority line and color of the priority box of tasks

    taskContainer.appendChild(taskClone);
    taskContainer.classList.remove("hidden");
  }
  isDone() {
    //TODO : should change the this.complete to true and render it in #completed-task-container in DOM
  }

  deleteTasks() {
    //TODO : should delete task
  }
}

// اضافه کردن تسک کلیک روی دکمه
$.getElementById("add-task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskSubject.value.trim();
  const desc = taskDescription.value.trim();

  const newTask = new Tasks(title, desc, selectedTag);
  newTask.render();
  allTasks.push(newTask); //save all tasks in array
  // let allTasksString = JSON.string(allTasks);
  // localStorage.setItem("Tasks", allTasksString);
  console.log(allTasks);

  // پاک کردن فرم
  resetAddTaskForm();
  $.querySelector(
    "#task-counter"
  ).innerHTML = `${allTasks.length} تسک را باید انجام دهید`; //count and change the task container text
});

/* finish handling task obj */

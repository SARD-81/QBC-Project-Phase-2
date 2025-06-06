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
function cleanContainer(cont) {
  siblings(cont).map((elem) => {
    elem.remove();
  });
}
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
    if (this.complete) {
      //دریافت قالب طراحی شده برای هر تسک
      const completeTaskTemplate = $.getElementById("complete-task-template");
      const completeTaskContainer = $.getElementById(
        "completed-task-container"
      );

      // کلون قالب تسک
      const completeTaskClone = completeTaskTemplate.cloneNode(true); //true: means that cloning prants wit all of its child
      completeTaskClone.setAttribute("id", `task${this.id}`);
      completeTaskClone.classList.remove("hidden");

      // مقداردهی به عناصر
      completeTaskClone.querySelector("#task-title").innerText = this.title;
      completeTaskClone.querySelector("#complete-input-task").checked = true;

      const completeImportanceSpan = completeTaskClone.querySelector(
        "#complete-task-importance"
      );

      completeImportanceSpan.innerText = this.tagText;
      completeImportanceSpan.className =
        "hidden text-xs px-2 py-0.5 rounded-sm font-[YekanBakhReg]" +
        this.tagClass;
      switch (completeImportanceSpan.innerText) {
        case "پایین":
          completeTaskClone.classList.add("before:!border-green-500");
          completeImportanceSpan.classList.add("bg-green-100");
          completeImportanceSpan.classList.add("text-green-700");
          break;
        case "متوسط":
          completeTaskClone.classList.add("before:!border-yellow-500");
          completeImportanceSpan.classList.add("bg-yellow-100");
          completeImportanceSpan.classList.add("text-yellow-700");
          break;
        case "بالا":
          completeTaskClone.classList.add("before:!border-red-500");
          completeImportanceSpan.classList.add("bg-red-100");
          completeImportanceSpan.classList.add("text-red-700");
          break;

        default:
          break;
      } //define the color of prority line and color of the priority box of tasks
      completeTaskContainer.appendChild(completeTaskClone);
      completeTaskContainer.classList.remove("hidden");
    } else {
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
  }
  isDone() {
    //TODO : should change the this.complete to true and render it in #completed-task-container in DOM
    this.complete = true;
    localStorage.setItem("Tasks", JSON.stringify(allTasks));
  }
  deleteTask() {
    const taskIndex = allTasks.findIndex((task) => task.id === this.id);
    if (taskIndex !== -1) {
      allTasks.splice(taskIndex, 1);
      localStorage.setItem("Tasks", JSON.stringify(allTasks));
      $.getElementById(`task${this.id}`).remove();
      $.querySelector(
        "#task-counter"
      ).textContent = `${allTasks.length} تسک را باید انجام دهید`;
      if (allTasks.length === 0) {
        $.querySelector("#img-holder").classList.remove("hidden");
        $.querySelector("#task-counter").textContent = `تسکی برای امروز نداری!`;
      }
    }
  }
  editTask() {
    // taskSubject.value = this.title;
    // taskDescription.value = this.description;
    // $.querySelector("#add-task-contianer").classList.remove("hidden");
    // addTaskBtn.textContent = "ویرایش";
    const editBox = $.querySelector("#add-task-contianer").cloneNode(true);
    const taskElement = document.getElementById(`task${this.id}`);
    editBox.classList.remove("hidden");
    editBox.querySelector("#close-form").remove();

    const form = editBox.querySelector("#add-task-form");
    let subjectInput = editBox.querySelector("#task-subject");
    let descInput = editBox.querySelector("#task-describtion");
    const tagButton = editBox.querySelector("#tag-button");
    const tagOptions = editBox.querySelector("#tag-options");
    const priorityBtnsClone = Array.from(
      editBox.querySelectorAll(".priority-btn")
    );
    const submitBtn = editBox.querySelector("#add-task-btn");

    subjectInput.value = this.title;
    descInput.value = this.description;
    submitBtn.textContent = "ویرایش تسک";
    submitBtn.disabled = false;
    submitBtn.classList.remove("bg-blue-300", "cursor-not-allowed");
    submitBtn.classList.add("bg-blue-600", "cursor-pointer");

    tagButton.addEventListener("click", () => {
      tagOptions.classList.toggle("hidden");
      editBox.querySelector("#unselected-svg").classList.toggle("hidden");
      editBox.querySelector("#selected-svg").classList.toggle("hidden");
    });

    let selectedTagText;

    priorityBtnsClone.map((items) => {
      items.addEventListener("click", () => {
        selectedTagText = items.textContent.trim();
        editBox.querySelector("#tags-container").classList.add("hidden");
        const contColor = items.classList[1];
        siblings(items).map((item) => {
          item.classList.add("hidden");
          if (item.tagName === "A") {
            item.classList.remove("hidden");
          }
        });
        tagOptions.classList.remove("px-3");
        tagOptions.classList.remove("py-2");
        tagOptions.classList.remove("border-1");
        tagOptions.classList.remove("border-gray-300");
        tagOptions.classList.add(contColor);
        editBox.querySelector(".close-tags").classList.remove("hidden");
        if (submitBtn.classList.contains("bg-blue-300")) {
          submitBtn.classList.add("bg-blue-600");
          submitBtn.classList.remove("bg-blue-300");
          submitBtn.classList.remove("cursor-not-allowed");
          submitBtn.classList.add("cursor-pointer");
          submitBtn.disabled = false;
        }
      });
    });

    editBox.querySelector(".close-tags").addEventListener("click", () => {
      editBox.querySelector("#tags-container").classList.remove("hidden");
      tagOptions.classList.add("px-3");
      tagOptions.classList.add("py-2");
      tagOptions.classList.add("border-1");
      tagOptions.classList.add("border-gray-300");
      submitBtn.classList.add("cursor-not-allowed");
      submitBtn.classList.remove("cursor-pointer");
      submitBtn.disabled = true;
      if (submitBtn.classList.contains("bg-blue-600")) {
        submitBtn.classList.remove("bg-blue-600");
        submitBtn.classList.add("bg-blue-300");
      } else {
        submitBtn.classList.add("bg-blue-300");
      }
      priorityBtnsClone.map((items) => {
        siblings(items).map((item) => {
          item.classList.remove("hidden");
        });
      });
      let elemClass = [...tagOptions.classList];
      let filterElemClass = elemClass.filter((a) => !a.includes("bg-"));
      tagOptions.setAttribute("class", "");
      filterElemClass.map((cl) => {
        tagOptions.classList.add(cl);
      });
      editBox.querySelector(".close-tags").classList.add("hidden");
    });

    taskElement.parentNode.insertBefore(editBox, taskElement.nextSibling);

    submitBtn.onclick = (e) => {
      e.preventDefault();
      // به‌روزرسانی عنوان، توضیحات و تگ
      this.title = subjectInput.value;
      this.description = descInput.value;
      switch (this.tagText) {
        case "پایین":
          taskElement.classList.remove("before:!border-green-500");
          break;
        case "متوسط":
          taskElement.classList.remove("before:!border-yellow-500");
          break;
        case "بالا":
          taskElement.classList.remove("before:!border-red-500");
          break;
        default:
          break;
      }
      this.tagText = selectedTagText;
      this.tagClass = selectedTag.class;

      if (this.title === "" || this.description === "" || !this.tagText) {
        alert("salam");
      } else {
        // به‌روزرسانی DOM
        const taskElement = $.getElementById(`task${this.id}`);
        taskElement.querySelector("#task-title").innerText = this.title;
        taskElement.querySelector("#task-desc").innerText = this.description;

        // به‌روزرسانی تگ و رنگ
        const importanceSpan = taskElement.querySelector("#task-importance");
        importanceSpan.innerText = this.tagText;
        importanceSpan.className =
          "text-xs px-2 py-0.5 rounded-sm font-[YekanBakhReg] " + this.tagClass;
        // console.log(this.tagText)
        switch (this.tagText) {
          case "پایین":
            taskElement.classList.remove("before:!border-green-500");
            break;
          case "متوسط":
            taskElement.classList.remove("before:!border-yellow-500");
            break;
          case "بالا":
            taskElement.classList.remove("before:!border-red-500");
            break;
          default:
            break;
        }
        // تغییر رنگ بر اساس اولویت
        switch (selectedTagText) {
          case "پایین":
            taskElement.classList.add("before:!border-green-500");
            importanceSpan.classList.add("bg-green-100", "text-green-700");
            break;
          case "متوسط":
            taskElement.classList.add("before:!border-yellow-500");
            importanceSpan.classList.add("bg-yellow-100", "text-yellow-700");
            break;
          case "بالا":
            taskElement.classList.add("before:!border-red-500");
            importanceSpan.classList.add("bg-red-100", "text-red-700");
            break;
          default:
            break;
        }

        // ذخیره تغییرات
        localStorage.setItem("Tasks", JSON.stringify(allTasks));

        // بازنشانی فرم
        editBox.remove();
        const firstTask = $.querySelector("#task-template");
        cleanContainer(firstTask);
        const priorityOrder = ["بالا", "متوسط", "پایین"];
        allTasks.sort(
          (a, b) =>
            priorityOrder.indexOf(a.tagText) - priorityOrder.indexOf(b.tagText)
        );
        allTasks.forEach((task) => task.render());
      }
    };
  }
}

let donedTaskNum = allTasks.filter((t) => t.complete).length;
let unDonedTaskNum = allTasks.filter((t) => !t.complete).length;

const completeTasksContainer = $.getElementById("completed-task-container");
completeTasksContainer.addEventListener("click", (e) => {
  const completeTaskElement = e.target.closest("section");
  if (completeTaskElement) {
    const completeTaskId = parseInt(completeTaskElement.id.replace("task", ""));
    const completeTask = allTasks.find((t) => t.id === completeTaskId);

    if (e.target.closest("#delete-task-btn")) {
      completeTask.deleteTask();
      donedTaskNum--;

      $.querySelector("#compelete-task-counter").textContent =
        donedTaskNum <= 0
          ? `تسکی هنوز انجام ندادی!`
          : `${donedTaskNum} تسک انجام شده است`;
    }
  }
});

//handle edit btn and delete btn click by event delegation
const tasksContainer = $.getElementById("tasks-container");
tasksContainer.addEventListener("click", (e) => {
  const taskElement = e.target.closest("section");
  if (taskElement) {
    const taskId = parseInt(taskElement.id.replace("task", ""));
    const task = allTasks.find((t) => t.id === taskId);

    if (e.target.closest("#delete-task-btn")) {
      task.deleteTask();
      unDonedTaskNum--;

      $.querySelector("#task-counter").textContent =
        unDonedTaskNum <= 0
          ? `تسکی برای امروز نداری!`
          : `${unDonedTaskNum} تسک را باید انجام بدهید`;
    } else if (e.target.closest("#edit-task-btn")) {
      task.editTask();
      e.target.parentNode.parentNode.classList.add("hidden");
    } else if (e.target.closest("#task-checkbox")) {
      task.isDone();
      const taskTemplate = $.getElementById("task-template");
      const completeTaskTemplate = $.getElementById("complete-task-template");
      cleanContainer(taskTemplate);
      cleanContainer(completeTaskTemplate);

      $.querySelector("#completed-task-container-header").classList.remove(
        "hidden"
      );
      $.querySelector("#completed-task-container").classList.remove("hidden");

      unDonedTaskNum--;
      donedTaskNum++;
      $.querySelector("#compelete-task-counter").textContent =
        donedTaskNum <= 0
          ? `تسکی هنوز انجام ندادی!`
          : `${donedTaskNum} تسک انجام شده است`;
      $.querySelector("#task-counter").textContent =
        unDonedTaskNum <= 0
          ? `تسکی برای امروز نداری!`
          : `${unDonedTaskNum} تسک را باید انجام بدهید`;

      allTasks.forEach((task) => task.render());
    }
  }
});

// اضافه کردن تسک کلیک روی دکمه
$.getElementById("add-task-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = taskSubject.value.trim();
  const desc = taskDescription.value.trim();

  const newTask = new Tasks(title, desc, selectedTag);
  newTask.render();
  allTasks.push(newTask); //save all tasks in array
  const priorityOrder = ["بالا", "متوسط", "پایین"];
  allTasks.sort(
    (a, b) =>
      priorityOrder.indexOf(a.tagText) - priorityOrder.indexOf(b.tagText)
  ); //sort array by priority
  const taskTemplate = $.getElementById("task-template");
  siblings(taskTemplate).map((elem) => {
    elem.remove();
  }); //remove template sibling to update task container and sort them by priority
  allTasks.forEach((task) => task.render());

  let allTasksString = JSON.stringify(allTasks);
  localStorage.setItem("Tasks", allTasksString);
  // console.log(allTasks);

  // پاک کردن فرم
  resetAddTaskForm();

  unDonedTaskNum++;
  $.querySelector("#task-counter").textContent =
    unDonedTaskNum <= 0
      ? `تسکی برای امروز نداری!`
      : `${unDonedTaskNum} تسک را باید انجام بدهید`;
  //count and change the task container text
});

function showTaskOpt(elem) {
  elem.nextElementSibling.classList.toggle("hidden");
} //function to show task options like delete task and edit
/* finish handling task obj */

/* start handle localstorage for tasks */
window.addEventListener("load", () => {
  const storedTasks = JSON.parse(localStorage.getItem("Tasks")) || [];
  allTasks = storedTasks.map((t) => {
    const task = Object.create(Tasks.prototype);
    Object.assign(task, t);
    return task;
  }); //read task from localstorage and create Task obj
  Tasks.count = allTasks.reduce((max, t) => Math.max(max, t.id), 0); //continue the task id from last task id
  const priorityOrder = ["بالا", "متوسط", "پایین"];
  allTasks.sort(
    (a, b) =>
      priorityOrder.indexOf(a.tagText) - priorityOrder.indexOf(b.tagText)
  );
  allTasks.forEach((task) => task.render()); //sort and render tasks by priority

  const filteredTasks = allTasks.filter((t) => t.complete === true);
  if (filteredTasks.length > 0) {
    $.querySelector("#completed-task-container-header").classList.remove(
      "hidden"
    );
    $.querySelector(
      "#compelete-task-counter"
    ).textContent = `${filteredTasks.length} تسک انجام شده است`;
    $.querySelector("#completed-task-container").classList.remove("hidden");
  }
  if (allTasks.length - filteredTasks.length > 0) {
    $.querySelector("#task-counter").textContent = `${
      allTasks.length - filteredTasks.length
    } تسک را باید انجام دهید`;
  }
  if (allTasks.length > 0) {
    $.querySelector("#img-holder").classList.add("hidden");
    $.querySelector("#tasks-container").classList.remove("hidden");
  }
});
/* finish handle localstorage for tasks */

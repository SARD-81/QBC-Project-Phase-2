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
};

$.querySelector("#add-new-sec").addEventListener("click", () => {
  $.querySelector("#add-tasks-btn").classList.add("hidden");
  $.querySelector("#img-holder").classList.add("hidden");
  $.querySelector("#add-task-form").classList.remove("hidden");
});

$.querySelector("#close-form").addEventListener("click", resetAddTaskForm);

$.getElementById("tag-button").addEventListener("click", () => {
  $.getElementById("tag-options").classList.toggle("hidden");
  $.getElementById("unselected-svg").classList.toggle("hidden");
  $.getElementById("selected-svg").classList.toggle("hidden");
});

$.querySelector("#task-item-menu").addEventListener("click", () => {
  $.querySelector("#task-item-ops").classList.toggle("hidden");
});

const priorityBtns = Array.from($.querySelectorAll(".priority-btn"));

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
    $.querySelector(".close").classList.remove("hidden");
  });
});

function resetAddTaskForm() {
  $.querySelector("#add-tasks-btn").classList.remove("hidden");
  $.querySelector("#add-task-form").classList.add("hidden");
  $.getElementById("tag-options").classList.add("hidden");
  $.getElementById("selected-svg").classList.add("hidden");
  $.getElementById("unselected-svg").classList.remove("hidden");
  $.querySelector("#tags-container").classList.remove("hidden");
  $.querySelector("#tag-options").classList.add("px-3");
  $.querySelector("#tag-options").classList.add("py-2");
  $.querySelector("#tag-options").classList.add("border-1");
  $.querySelector("#tag-options").classList.add("border-gray-300");
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
  $.querySelector(".close").classList.add("hidden");
}
/* finish handle the add task modal */
/////////////////////////////////
$.querySelector("#add-task-form").addEventListener("submit", (e) => {
  e.preventDefault();
});
/////////////////////////////////

// متغیر برای ذخیره‌ی اطلاعات تگ انتخاب‌شده
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
    this.tagText = tag.text;
    this.tagClass = tag.class;
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

// اضافه کردن تسک کلیک روی دکمه
document
  .getElementById("add-task-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("task-subject").value.trim();
    const desc = document.getElementById("task-description").value.trim();

    if (!title || !desc) {
      alert("عنوان و توضیحات را وارد کنید.");
      return;
    }

    const newTask = new Tasks(title, desc, selectedTag);
    newTask.render();

    // پاک کردن فرم
    e.target.reset();

    selectedTag = {
      text: "پایین",
      class: "bg-green-100 text-green-700",
    };
  });

const toggleBtn = document.getElementById("night");

toggleBtn.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
  // see if the darkmode is already exist on our html tag or not
  const isDark = document.documentElement.classList.contains("dark");
  // ذخیره حالت دارک یا لایت مود برای اینکه در بارگزاری مجدد همون تم رنگی را نشون بده
  document.documentElement.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});
// تم ذخیره شده را میخونه اگه تم دارک بود همون اجرا میکنه اگه تم روشن بود کلاس دارک را حذف میکنه
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
});

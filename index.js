document.getElementById("burgerButton").onclick = ()=>{
    document.getElementById("burger").classList.toggle("hidden");
}
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)
document.getElementById("changer").onclick = changeTheme;
document.getElementById("mini-changer").onclick = changeTheme;

function changeTheme(){

  localStorage.setItem("theme", document.documentElement.classList.toggle('dark')?"dark":"light");
}

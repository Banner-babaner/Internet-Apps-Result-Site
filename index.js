let user = localStorage.getItem("user");
let best = localStorage.getItem(user);
const autorization = document.querySelector("#modalWindow");
const userEnter = document.querySelector("#userEnter");
const userData = document.querySelector("#userData")
const userName = document.querySelector("#userName");
const userScore = document.querySelector("#userScore");

if(user){
  userEnter.classList.remove("animate-pulse");
  userEnter.innerText = user;
  userName.innerText = user;
  if(localStorage.getItem(user)) userScore.innerText = localStorage.getItem(user);
  userEnter.onclick = showUserData;
}
else{
  userEnter.classList.add("animate-pulse");
  userEnter.onclick = ()=>{
    autorization.showModal();
  }
}

document.querySelector("#commitName").onclick = ()=>{
  user = document.querySelector("#nameGetter").value.replaceAll(" ", "").replaceAll("\t", "");
  if(user.length<3){
    alert("Имя не может быть меньше трёх букв");
    querySelector("#nameGetter").value = "";
    return;
  }
  localStorage.setItem("user", user);
  userEnter.classList.remove("animate-pulse");
  userEnter.innerText = user;
  userName.innerText = user;
  if(localStorage.getItem(user)) userScore.innerText = localStorage.getItem(user);
  userEnter.onclick = showUserData;
  autorization.close();
}
document.querySelector("#cancelName").onclick = ()=>{
  localStorage.removeItem("user");
  userEnter.classList.add("animate-pulse");
  userEnter.innerText = "Зайти в кабинет";
  userEnter.onclick = ()=>{
    autorization.showModal();
  }
  autorization.close();
}

document.querySelector("#exit").onclick = ()=>{
  localStorage.removeItem("user");
  userEnter.classList.add("animate-pulse");
  userEnter.innerText = "Зайти в кабинет";
  userEnter.onclick = ()=>{
    autorization.showModal();
  }
  userData.close();
}
document.querySelector("#burgerButton").onclick = ()=>{
    document.querySelector("#burger").classList.toggle("hidden");
}
document.documentElement.classList.toggle(
  'dark',
  localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
)
document.querySelector("#changer").onclick = changeTheme;
document.querySelector("#mini-changer").onclick = changeTheme;
if(localStorage.getItem("theme")!="dark"){
  let bananas = document.querySelectorAll(`img`);
  for(let i=0; i<bananas.length; i++){
    if(bananas[i].src.includes("banana")) bananas[i].src="dist/img/darkBanana.svg";
  }
}
document.querySelector("#closeData").onclick = ()=>{
  userData.close();
}






function changeTheme(){
  localStorage.setItem("theme", document.documentElement.classList.toggle('dark')?"dark":"light");
  let bananas = document.querySelectorAll(`img`);
  if(localStorage.getItem("theme")!="dark"){
    for(let i=0; i<bananas.length; i++){
      if(bananas[i].src.includes("banana")) bananas[i].src="dist/img/darkBanana.svg";
    }
  }
  else{
    for(let i=0; i<bananas.length; i++){
      if(bananas[i].src.includes("darkBanana")) bananas[i].src="dist/img/banana.svg";
    }
  }
}


function showUserData(){
  userData.showModal();
}


let user = localStorage.getItem("user");
let best = localStorage.getItem(user);
const autorization = document.querySelector("#modalWindow");
const userEnter = document.querySelector("#userEnter");
const userData = document.querySelector("#userData")
const userName = document.querySelector("#userName");
const userScore = document.querySelector("#userScore");
const resTest = document.querySelector("#resTest");
const hello = document.querySelector("#hello");
let helloAnimation = undefined;

let date = new Date();
document.querySelector("#days").innerText = date.getDate();
document.querySelector("#hours").innerText = date.getHours();
document.querySelector("#minutes").innerText = date.getMinutes();
document.querySelector("#seconds").innerText = date.getSeconds();


setInterval(
  ()=>{
    let date = new Date();
    document.querySelector("#days").innerText = date.getDate();
    document.querySelector("#hours").innerText = date.getHours();
    document.querySelector("#minutes").innerText = date.getMinutes();
    document.querySelector("#seconds").innerText = date.getSeconds();
  },
  1000
)

if(user){
  userEnter.classList.remove("animate-pulse");
  userEnter.innerText = user;
  userName.innerText = user;
  if(localStorage.getItem(user)) userScore.innerText = localStorage.getItem(user);
  userEnter.onclick = showUserData;
  resTest.classList.remove("hidden");
  printName(`Добро пожаловать, ${user}`);
}
else{
  userEnter.classList.add("animate-pulse");
  resTest.classList.add("hidden");
  userEnter.onclick = ()=>{
    autorization.showModal();
  }
  printName("Пожалуйста, авторизуйтесь в правом верхнем углу");
}

document.querySelector("#commitName").onclick = ()=>{
  user = document.querySelector("#nameGetter").value.replaceAll(" ", "").replaceAll("\t", "");
  if(user.length<3){
    alert("Имя не может быть меньше трёх букв");
    querySelector("#nameGetter").value = "";
    return;
  }
  else if(user=="user"||user=="theme"){
    alert(`Имя не может быть "${user}"`);
    return;
  }
  localStorage.setItem("user", user);
  userEnter.classList.remove("animate-pulse");
  userEnter.innerText = user;
  userName.innerText = user;
  if(localStorage.getItem(user)) userScore.innerText = localStorage.getItem(user);
  userEnter.onclick = showUserData;
  clearTest();
  autorization.close();
  cancelAnimationFrame(helloAnimation);
  printName(`Добро пожаловать, ${user}`);
}
document.querySelector("#cancelName").onclick = ()=>{
  autorization.close();
}

document.querySelector("#exit").onclick = ()=>{
  localStorage.removeItem("user");
  userEnter.classList.add("animate-pulse");
  resTest.classList.add("hidden");
  userEnter.innerText = "Зайти в кабинет";
  cancelAnimationFrame(helloAnimation);
  printName("Пожалуйста, авторизуйтесь в правом верхнем углу");
  userEnter.onclick = ()=>{
    autorization.showModal();
  }
  userData.close();
  clearTest();
}
document.querySelector("#burgerButton").onclick = ()=>{
    document.querySelector("#burger").classList.toggle("hidden");
}

document.querySelector("#burger").onclick = document.querySelector("#burgerButton").onclick;

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

document.querySelector("#checkTest").onclick=checkTest;





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


function clearTest(){
  resTest.classList.add("hidden");
  for(let i=0; i<10; i++){
    let select = document.querySelector(`#question${i+1}`);
    document.querySelector(`#question${i+1}`).disabled=false;
    document.querySelector(`#question${i+1}`).value = 0;
    select.classList.remove("bg-red-400");
    select.classList.remove("bg-green-400");
    select.title = "";
  }
  document.querySelector("#checkTest").innerText="Проверить";
  document.querySelector("#checkTest").onclick = checkTest;
}

function checkTest(){
  let rights = [1, 3, 4, 2, 3, 1, 1, 2, 4, 1];
  let res=0;
  for(let i=0; i<10; i++){
    let select = document.querySelector(`#question${i+1}`);
    if(select.value==rights[i]){
      res++;
      select.classList.add("bg-green-400");
      select.title = "Верно";
    }
    else{
      select.classList.add("bg-red-400");
      select.title = "Неверно";
    }
    select.disabled = true;
  }
  if(user){
    if(res>localStorage.getItem(user)){
      localStorage.setItem(user, res);
    }
  }
  document.querySelector("#checkTest").innerText="Попробовать снова";
  document.querySelector("#checkTest").onclick = clearTest;
  resTest.classList.remove("hidden");
  resTest.innerText = `Ваш результат: ${res}${user?"":"\nАвторизуйтесь, чтобы сохранить его!"}`;
}

function printName(text, i=0,interval=0, delay=2){
  if((!i)&(!interval)){
    hello.innerHTML="";
  }
  if(interval==delay){
    hello.innerHTML += text[i++];
    interval=0;
  }
  let loop = ()=>{
    printName(text, i, interval+1, delay);
  }
  if(i<text.length){
    helloAnimation=requestAnimationFrame(loop);
  }
}

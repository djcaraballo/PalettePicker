//add option to drop down menu
//inner html of section injected via js
//lock colors when lock button is pressed
//change unlocked image to locked on click
//track changes to palette name input
const firstColor = document.querySelector('.first-color');
const secondColor = document.querySelector('.second-color');
const thirdColor = document.querySelector('.third-color');
const fourthColor = document.querySelector('.fourth-color');
const fifthColor = document.querySelector('.fifth-color');
const hex1 = document.querySelector('.hex1');
const hex2 = document.querySelector('.hex2');
const hex3 = document.querySelector('.hex3');
const hex4 = document.querySelector('.hex4');
const hex5 = document.querySelector('.hex5');
const unlockedBtn1 = document.querySelector('.unlocked-btn1');
const unlockedBtn2 = document.querySelector('.unlocked-btn2');
const unlockedBtn3 = document.querySelector('.unlocked-btn3');
const unlockedBtn4 = document.querySelector('.unlocked-btn4');
const unlockedBtn5 = document.querySelector('.unlocked-btn5');
const refreshBtn1 = document.querySelector('.refresh-btn1');
const refreshBtn2 = document.querySelector('.refresh-btn2');
const refreshBtn3 = document.querySelector('.refresh-btn3');
const refreshBtn4 = document.querySelector('.refresh-btn4');
const refreshBtn5 = document.querySelector('.refresh-btn5');


const randomColor = () => {
  let rdnmclr = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return rdnmclr
};

const refreshFirstColor = () => {
  let randomclr = randomColor();
  console.log(randomclr)
  firstColor.style.backgroundColor = randomclr;
  hex1.innerHTML = firstColor.style.backgroundColor;
}

const refreshSecondColor = () => {
  secondColor.style.backgroundColor = randomColor();
  hex2.innerText = secondColor.style.backgroundColor;
}

const refreshThirdColor = () => {
  thirdColor.style.backgroundColor = randomColor();
  hex3.innerText = thirdColor.style.backgroundColor;
}

const refreshFourthColor = () => {
  fourthColor.style.backgroundColor = randomColor();
  hex4.innerText = fourthColor.style.backgroundColor;
}

const refreshFifthColor = () => {
  fifthColor.style.backgroundColor = randomColor();
  hex5.innerText = fifthColor.style.backgroundColor;
}

const refreshPalette = () => {
  refreshFirstColor();
  refreshSecondColor();
  refreshThirdColor();
  refreshFourthColor();
  refreshFifthColor();
}

window.onload = refreshPalette();

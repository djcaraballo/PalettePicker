//add option to drop down menu
//inner html of section injected via js
//lock colors when lock button is pressed
//change unlocked image to locked on click
//track changes to palette name input
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
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const refreshFirstColor = () => {
  const firstColor = document.querySelector('.first-color');
  const hex1 = document.querySelector('.hex1');
  hex1.innerText = firstColor.style.backgroundColor = randomColor();
}

const refreshSecondColor = () => {
  const secondColor = document.querySelector('.second-color');
  const hex2 = document.querySelector('.hex2');
  hex2.innerText = secondColor.style.backgroundColor = randomColor();
}

const refreshThirdColor = () => {
  const hex3 = document.querySelector('.hex3');
  const thirdColor = document.querySelector('.third-color');
  hex3.innerText = thirdColor.style.backgroundColor = randomColor();
}

const refreshFourthColor = () => {
  const hex4 = document.querySelector('.hex4');
  const fourthColor = document.querySelector('.fourth-color');
  hex4.innerText = fourthColor.style.backgroundColor = randomColor();
}

const refreshFifthColor = () => {
  const hex5 = document.querySelector('.hex5');
  const fifthColor = document.querySelector('.fifth-color');
  hex5.innerText = fifthColor.style.backgroundColor = randomColor();
}

const refreshPalette = () => {
  refreshFirstColor();
  refreshSecondColor();
  refreshThirdColor();
  refreshFourthColor();
  refreshFifthColor();
}

window.onload = refreshPalette();

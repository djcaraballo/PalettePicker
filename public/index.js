//add option to drop down menu
//inner html of section injected via js
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
 return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const prepInitialPalette = () => {
  firstColor.style.backgroundColor = randomColor();
  secondColor.style.backgroundColor = randomColor();
  thirdColor.style.backgroundColor = randomColor();
  fourthColor.style.backgroundColor = randomColor();
  fifthColor.style.backgroundColor = randomColor();
}

window.onload = prepInitialPalette();

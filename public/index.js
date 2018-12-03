//add option to drop down menu
//inner html of section injected via js--DONE!
//lock colors when lock button is pressed
//change unlocked image to locked on click
//track changes to palette name input
const unlockedBtn1 = document.querySelector('.unlocked-btn1');
const unlockedBtn2 = document.querySelector('.unlocked-btn2');
const unlockedBtn3 = document.querySelector('.unlocked-btn3');
const unlockedBtn4 = document.querySelector('.unlocked-btn4');
const unlockedBtn5 = document.querySelector('.unlocked-btn5');

// retrieve specific project--GET `http://localhost:3000/api/v1/projects/${id}`
// retrieve all palettes for a specific project--GET `http://localhost:3000/api/v1/projects/${id}/palettes`
// delete palette--DELETE `http://localhost:3000/api/v1/palettes/${id}`
// add palette to specific project--POST `http://localhost:3000/api/v1/projects/${id}/palettes`
// add project--POST `http://localhost:3000/api/v1/projects`

const hexCodes = [];
const refreshBtn = document.querySelector('.refresh-btn')



// random color generator
const randomColor = () => {
  const generatedHex = "#" + Math.floor(Math.random() * 16777215).toString(16)
  if (generatedHex.length < 7) {
    return randomColor()
  } else {
    return generatedHex
  }
};

const refreshFirstColor = () => {
  const firstColor = document.querySelector('.first-color');
  const hex1 = document.querySelector('.hex1');
  hex1.innerText = firstColor.style.backgroundColor = randomColor();

  if (!hexCodes.length) {
    hexCodes.push(hex1.innerText)
  } else {
    hexCodes.splice(0, 1, hex1.innerText)
  }
  return hex1.innerText;
}

const refreshSecondColor = () => {
  const secondColor = document.querySelector('.second-color');
  const hex2 = document.querySelector('.hex2');
  hex2.innerText = secondColor.style.backgroundColor = randomColor();

  if (hexCodes.length === 1) {
    hexCodes.push(hex2.innerText)
  } else {
    hexCodes.splice(1, 1, hex2.innerText)
  }
  return hex2.innerText;
}

const refreshThirdColor = () => {
  const hex3 = document.querySelector('.hex3');
  const thirdColor = document.querySelector('.third-color');
  hex3.innerText = thirdColor.style.backgroundColor = randomColor();

  if (hexCodes.length === 2) {
    hexCodes.push(hex3.innerText)
  } else {
    hexCodes.splice(2, 1, hex3.innerText)
  }
  return hex3.innerText;
}

const refreshFourthColor = () => {
  const hex4 = document.querySelector('.hex4');
  const fourthColor = document.querySelector('.fourth-color');
  hex4.innerText = fourthColor.style.backgroundColor = randomColor();

  if (hexCodes.length === 3) {
    hexCodes.push(hex4.innerText)
  } else {
    hexCodes.splice(3, 1, hex4.innerText)
  }
  return hex4.innerText;
}

const refreshFifthColor = () => {
  const hex5 = document.querySelector('.hex5');
  const fifthColor = document.querySelector('.fifth-color');
  hex5.innerText = fifthColor.style.backgroundColor = randomColor();

  if (hexCodes.length === 4) {
    hexCodes.push(hex5.innerText)
  } else {
    hexCodes.splice(4, 1, hex5.innerText)
  }
  console.log(hexCodes)
  return hex5.innerText;
}

const refreshPalette = () => {
  refreshFirstColor(),
  refreshSecondColor(),
  refreshThirdColor(),
  refreshFourthColor(),
  refreshFifthColor()
}
// console.log(`${refreshPalette}`)

refreshBtn.addEventListener('click', refreshPalette)

const fetchData = async (url) => {
  const response = await fetch(url)
  if (response.status >= 300) {
    return 'Error: Failed to fetch data.'
  } else {
    const result = await response.json() 
    return result
  }
}

const formatPalette = () => {
  const palette_name = document.querySelector('.palette-name-input').value
  let i = 1;
  const hexPalette = hexCodes.reduce((palette, hexCode) => {
    palette[`hex${i}`] = hexCode
    i++

    return palette
  }, {})
  const formattedPalette = {palette_name, ...hexPalette}
  return formattedPalette
}



// paletteNameInput.addEventListener('change', formatPalette)

window.onload = refreshPalette();


formatPalette()

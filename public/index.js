//add option to drop down menu
//inner html of section injected via js--DONE!
//lock colors when lock button is pressed
//change unlocked image to locked on click
//track changes to palette name input


// retrieve specific project--GET `http://localhost:3000/api/v1/projects/${id}`
// retrieve all palettes for a specific project--GET `http://localhost:3000/api/v1/projects/${id}/palettes`
// delete palette--DELETE `http://localhost:3000/api/v1/palettes/${id}`
// add palette to specific project--POST `http://localhost:3000/api/v1/projects/${id}/palettes`
// add project--POST `http://localhost:3000/api/v1/projects`

const hexCodes = [];
const refreshBtn = document.querySelector('.refresh-btn')
const saveBtn = document.querySelector('.save-btn')

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
  if (!firstColor.classList.contains('locked-color')) {
    hex1.innerText = firstColor.style.backgroundColor = randomColor();
  } else if (firstColor.classList.contains('locked-color')) {
    hex1.innerText = hexCodes[0]
  }

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

  if(!secondColor.classList.contains('locked-color')) {
    hex2.innerText = secondColor.style.backgroundColor = randomColor();
  } else if (secondColor.classList.contains('locked-color')) {
    hex2.innerText = hexCodes[1]
  }

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

  if (!thirdColor.classList.contains('locked-color')) {
    hex3.innerText = thirdColor.style.backgroundColor = randomColor(); 
  } else if (thirdColor.classList.contains('locked-color')) {
    hex3.innerText = hexCodes[2]
  }

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

  if (!fourthColor.classList.contains('locked-color')) {
    hex4.innerText = fourthColor.style.backgroundColor = randomColor();
  } else if (fourthColor.classList.contains('locked-color')) {
    hex4.innerText = hexCodes[3]
  }

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

  if (!fifthColor.classList.contains('locked-color')) {
    hex5.innerText = fifthColor.style.backgroundColor = randomColor();
  } else if (fifthColor.classList.contains('locked-color')) {
    hex5.innerText = hexCodes[4]
  }

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

const toggleLock = (input) => {
  const targetName = event.target.name
  const targetDiv = document.getElementById(`${targetName}`)
  // console.log(targetName)
  if(!input.classList.contains("locked")) {
    input.src='./assets/images/lockedicon.png';
    input.classList.remove("unlocked")
    input.classList.add("locked");
    targetDiv.classList.remove("unlocked-color")
    targetDiv.classList.add("locked-color")
  } else if(input.classList.contains("locked")) {
    input.src='./assets/images/unlock.png';
    input.classList.remove("locked");
    input.classList.add("unlocked");
    targetDiv.classList.remove("locked-color");
    targetDiv.classList.add("unlocked-color");
    // console.log(targetDiv.name)
  }
  return false;
}

// const savePalette = () => {
//   const paletteToSave = formatPalette()
//   let i = 1;
//   const project = `Project${i}`
//   // console.log(paletteToSave)
//   fetch('http://localhost:3000/api/v1/projects', {
//     method: 'POST',
//     body: project
//   })
//   fetch(`http://localhost:3000/api/v1/projects/${id}/palettes`, {
//     method: 'POST',
//     body: paletteToSave
//   })
// }

// saveBtn.addEventListener('click', savePalette)

window.onload = refreshPalette();


formatPalette()

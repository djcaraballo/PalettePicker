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
const nameWarning = document.querySelector('.palette-name-warning')


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
  return hex5.innerText;
}

const refreshPage = () => {
  refreshFirstColor(),
  refreshSecondColor(),
  refreshThirdColor(),
  refreshFourthColor(),
  refreshFifthColor(),
  displayRecentProjects()
}

refreshBtn.addEventListener('click', refreshPage)

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
  }
  return false;
}

const formatProject = () => {
  const projectName = document.querySelector('.project-name-input').value
  return {project_name: projectName}
}

const savePalette = async () => {
  const paletteToSave = formatPalette()  
  const id = await postToProjects()
  await fetch(`http://localhost:3000/api/v1/projects/${id}/palettes`, {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(paletteToSave)
  })
}

const postToProjects = async () => {
  const projectToSave = formatProject()
  const response = await fetch('http://localhost:3000/api/v1/projects', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(projectToSave)
  })
  const result = await response.json()
  return result.id
}

const fetchPalette = async (url) => {
  const response = await fetch(url)
  const result = await response.json()
  console.log(result[0].hex1)
  return `<div class="mini-palette" style="background: ${result[0].hex1}"></div>
          <div class="mini-palette" style="background: ${result[0].hex2}"></div>
          <div class="mini-palette" style="background: ${result[0].hex3}"></div>
          <div class="mini-palette" style="background: ${result[0].hex4}"></div>
          <div class="mini-palette" style="background: ${result[0].hex5}"></div>`
}

const displayRecentProjects = async () =>{
  const recentSection = document.querySelector('.recent-projects')
  const projectsResponse = await fetch('http://localhost:3000/api/v1/projects')
  const projectsResult = await projectsResponse.json()

  const firstRecent = projectsResult[projectsResult.length - 1]
  const secondRecent = projectsResult[projectsResult.length - 2]
  const thirdRecent = projectsResult[projectsResult.length - 3]

  const firstRecentPalette = await fetchPalette(`http://localhost:3000/api/v1/projects/${firstRecent.id}/palettes`)
  const secondRecentPalette = await fetchPalette(`http://localhost:3000/api/v1/projects/${secondRecent.id}/palettes`)
  const thirdRecentPalette = await fetchPalette(`http://localhost:3000/api/v1/projects/${thirdRecent.id}/palettes`)

  const newArticle = `<article>
                        <p>${firstRecent.project_name}</p>
                        <div>${firstRecentPalette}</div>
                        <p>${secondRecent.project_name}</p>
                        <div>${secondRecentPalette}</div>
                        <p>${thirdRecent.project_name}</p>
                        <div>${thirdRecentPalette}</div>
                      </article>`
  recentSection.innerHTML = newArticle
}

saveBtn.addEventListener('click', savePalette)

window.onload = refreshPage();


const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.locals.title = 'Palette Perfect';

app.locals.palettes = [
  {
    id: 1, 
    name: 'testPalette', 
    hex1: {id: '#393D3F', name: 'cape cod', type: 'neutral'},
    hex2: {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
    hex3: {id: '#C6C5B9', name: 'ash', type: 'neutral'},
    hex4: {id: '#62929E', name: 'gothic', type: 'cool'},
    hex5: {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
    projectId: 1
  },
  {
    id: 2,
    name: 'testPalette2',
    hex1: {id: '#393D3F', name: 'cape cod', type: 'neutral'},
    hex2: {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
    hex3: {id: '#C6C5B9', name: 'ash', type: 'neutral'},
    hex4: {id: '#62929E', name: 'gothic', type: 'cool'},
    hex5: {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
    projectId: 2
  },
  {
    id: 3, 
    name: 'testPalette3', 
    hex1: {id: '#393D3F', name: 'cape cod', type: 'neutral'},
    hex2: {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
    hex3: {id: '#C6C5B9', name: 'ash', type: 'neutral'},
    hex4: {id: '#62929E', name: 'gothic', type: 'cool'},
    hex5: {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
    projectId: 1
  },
  {
    id: 4,
    name: 'testPalette4',
    hex1: {id: '#393D3F', name: 'cape cod', type: 'neutral'},
    hex2: {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
    hex3: {id: '#C6C5B9', name: 'ash', type: 'neutral'},
    hex4: {id: '#62929E', name: 'gothic', type: 'cool'},
    hex5: {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
    projectId: 2
  }
];

app.locals.projects = [
  {id: 1, name: 'testProject'},
  {id: 2, name: 'testProject2'}
];

app.set('port', process.env.PORT || 3000);

//retrieves all palettes from back end -- FUNCTIONAL!
app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;
  return response.status(200).json(palettes);
});

//retrieves specific palettes from back end -- FUNCTIONAL!
app.get('/api/v1/palettes/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const palette = app.locals.palettes.find(palette => palette.id === id)
  if (!palette) {
    return response.status(404).json({ Error: `Palette with an id of ${id} could not be found.` });
  } else {
    return response.status(200).json(palette);
  }

});

//adds palette to back end -- FUNCTIONAL!
app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;
  const id = app.locals.palettes[app.locals.palettes.length - 1].id + 1;

  if (!palette) {
    return response.status(422).send({ Error: 'No palette object provided.' })
  }

  for (let requiredParam of ['name', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5', 'project_id']) {
    if (!palette[requiredParam]) {
      return response.status(422).json({ Error: `Expected format: {name: <STRING>, hex1: <STRING>, hex2: <STRING>, hex3: <STRING>, hex4: <STRING>, hex5: <STRING>, project_id: <NUMBER>}. Missing the required parameter of ${requiredParam}.` })
    }
  }

  app.locals.palettes.push({ id, ...palette });

  return response.status(201).json({id});
});


// app.delete('/api/v1/palettes/:id')

//retrieves projects from back end -- FUNCTIONAL!
app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects;
  return response.status(200).json(projects);
})

//app.get('/api/v1/projects/:id')

//app.post('/api/v1/projects')

app.listen(3000, () => {
  console.log('Palette Perfect server running on localhost:3000');
});

app.use(express.static('public'));

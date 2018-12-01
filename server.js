const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./PalettePerfectDB/knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());

// retrieves projects from database
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// retrieves specific project from database
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;

  database('projects').where('id', id).select()
    .then(project => response.status(200).json(project))
    .catch(error => console.log(`Error fetching project: ${error.message}`))
})

//retrieves all palettes from database
app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

//retrieves specific palettes from back end -- FUNCTIONAL!
app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  
  database('palettes').where('id', id).select()
    .then(palette => response.status(200).json(palette))
    .catch(error => console.log(`Error fetching palette: ${error.message}`))
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

//deletes specific palette from palettes from back end --FUNCTIONAL!
app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  const filteredPalettes = app.locals.palettes.filter(palette => palette.id !== parseInt(id));
  return response.status(200).json(filteredPalettes);
})

//retrieves projects from back end -- FUNCTIONAL!
// app.get('/api/v1/projects', (request, response) => {
//   const projects = app.locals.projects;
//   return response.status(200).json(projects);
// })

//retrieves specific project from back end -- FUNCTIONAL!
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  const project = app.locals.projects.find(project => project.id === parseInt(id));
  if (!project) {
    return response.status(404).json({ Error: `Project with an id of ${id} could not be found.` })
  } else {
    return response.status(200).json(project);
  }
})

//adds project to back end -- FUNCTIONAL!
app.post('/api/v1/projects', (request, response) => {
  const project = request.body;
  const id = app.locals.palettes[app.locals.projects.length - 1].id + 1;

  if (!project) {
    return response.status(422).send({ Error: 'No project object provided.' })
  }

  for (let requiredParam of ['name']) {
    if (!project[requiredParam]) {
      return response.status(422).json({ Error: `Expected format: {name: <STRING>}. Missing the required parameter of ${requiredParam}.` })
    }
  }

  app.locals.projects.push({ id, ...project });

  return response.status(201).json({id});
})

//deletes project from back end -- FUNCTIONAL!
app.delete('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
  const filteredProjects = app.locals.projects.filter(project => project.id !== parseInt(id));
  return response.status(200).json(filteredProjects);
})

app.listen(3000, () => {
  console.log('Palette Perfect server running on localhost:3000');
});

app.use(express.static('public'));

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./PalettePerfectDB/knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.json());

// retrieves all projects from database
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then(projects => {
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
    .then(project => {
      if (project.length) {
        response.status(200).json(project)
      } else {
        response.status(404).json({
          Error: `Could not find paper with id ${id}`
        });
      }
    })
    .catch(error => response.status(500).json(`Error fetching project: ${error.message}`))
})

// adds project to database
app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParam of ['project_name']) {
    if (!project[requiredParam]) {
      return response.status(422).send({ Error: `Expected format: {project_name: <STRING>}. Missing the required parameter of ${requiredParam}.` })
    }
  }

  database('projects').insert(project, 'id')
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] })
    })
    .catch(error => {
      response.status(500).json({ Error: error.message });
    })
})

// retrieves all palettes from database
app.get('/api/v1/palettes', (request, response) => {
  database('palettes').select()
    .then(palettes => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

// retrieves specific palette from database
app.get('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;
  
  database('palettes').where('id', id).select()
    .then(palette => {
      if (palette.length) {
        response.status(200).json(palette)
      } else {
        response.status(404).json({
          Error: `Could not find palette with id ${id}`
        });
      }
    })
    .catch(error => response.status(500).json(`Error fetching palette: ${error.message}`))
});

// retrieves all palettes for a specific project
app.get('/api/v1/projects/:id/palettes', (request, response) => {
  const { id } = request.params;

  database('palettes').where('project_id', id).select()
    .then(palettes => {
      if (palettes.length) {
        response.status(200).json(palettes) 
      } else {
        response.status(404).json({
          Error: `Could not find palettes for project with id ${id}`
        })
      }
    })
    .catch(error => response.status(500).json(`Error fetching palettes for project with the id ${id}: ${error.message}.`))
})

// adds palette to specific project in database
app.post('/api/v1/projects/:id/palettes', (request, response) => {
  const project_id = parseInt(request.params.id)
  const palette = {...request.body, project_id};

  for (let requiredParam of ['palette_name', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5', 'project_id']) {
    if (!palette[requiredParam]) {
      return response.status(422).json({ Error: `Expected format: {palette_name: <STRING>, hex1: <STRING>, hex2: <STRING>, hex3: <STRING>, hex4: <STRING>, hex5: <STRING>, project_id: <NUMBER>}. Missing the required parameter of ${requiredParam}.` })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(paletteIds => {
      response.status(201).json({ id: paletteIds[0] })
    })
    .catch(error => {
      response.status(500).json({Error: `${error.message}`});
    })
});

// deletes specific palette from database
app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params;

  database('palettes').where('id', id).del()
    .then(() => {
      response.status(200).send(`Project with id ${id} successfully deleted.`)
    })
    .catch(error => {
      response.status(500).json({ Error: `${error.message}`})
    })
})


app.listen(3000, () => {
  console.log('Palette Perfect server running on localhost:3000');
});

app.use(express.static('public'));

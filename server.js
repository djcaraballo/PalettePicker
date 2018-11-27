const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.locals.title = 'Palette Perfect';
app.locals.colors = [
  {id: '#000000', name: 'black', type: 'neutral'},
  {id: '#FFFFFF', name: 'white', type: 'neutral'},
];
app.locals.palettes = [
  {
    id: 1, 
    name: 'testPalette', 
    colors: [
      {id: '#393D3F', name: 'gray', type: 'neutral'},
      {id: '#FDFDFF', name: 'soft white', type: 'neutral'},
      {id: '#C6C5B9', name: 'beige', type: 'neutral'},
      {id: '#62929E', name: 'aqua', type: 'cool'},
      {id: '#546A7B', name: 'dark teal', type: 'cool'},
    ],
  }
];
app.locals.projects = [
  {id: 1, name: 'testProject', paletteId: 1}
];

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('hello world');
});

app.get('/api/v1/colors', (request, response) => {
  const colors = app.locals.colors;

  return response.status(200).json(colors);
});

app.get('/api/v1/colors/:id', () => {
  const id = request.params.id;
  const color = app.locals.colors.find(color => {
    return color.id === id;
  });

  if(!color) {
    return response.status(404).json({ error: `Color with a hexadecimal code of #${id} could not be found.` });
  };

  return response.status(200).json(pet);
});

app.get('/api/v1/palettes', (request, response) => {
  const palettes = app.locals.palettes;

  return response.status(200).json(palettes);
});

app.get('/api/v1/palettes/:id', (request, response) => {
  const id = request.params.id;
  const palette = app.locals.palettes.find(palette => {
    return palette.id === id;
  });
});

app.post('/api/v1/palettes/:id', (request, response) => {
  const id = request.params.id
  const color = request.body;
  const palette = app.locals.palettes.find(palette => {
    return palette.id === id
  })

  if(!color) {
    return response.status(422).send({ error: 'No color object provided' });
  };

  for(let requiredParameter of ['name', 'type']) {
    if(!color[requiredParameter]) {
      return response.status(422).json({ error: `Expected format: {name: <STRING>, type:<STRING>}. Missing the required parameter of ${requiredParameter}.` });
    };
  };

  palette.push(color);

  return response.status(201).json({id});
});

//app.patch('/api/v1/palettes/:id')

//app.put('/api/v1/palettes/:id')

//app.delete('/api/v1/palettes/:id')

//app.get('/api/v1/projects')

//app.get('/api/v1/projects/:id')

//app.post('/api/v1/projects')

app.listen(3000, () => {
  console.log('Palette Perfect server running on localhost:3000');
});

app.use(express.static('public'));

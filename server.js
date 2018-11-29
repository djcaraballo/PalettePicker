const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.locals.title = 'Palette Perfect';
app.locals.colors = [
  {id: 1, name: 'black', type: 'neutral'},
  {id: '#FFFFFF', name: 'white', type: 'neutral'},
  {id: '#FE0000', name: 'red', type: 'warm'},
  {id: '#FEFB00', name: 'yellow', type: 'warm'},
  {id: '#0032FE', name: 'blue', type: 'cool'},
  {id: '#393D3F', name: 'cape cod', type: 'neutral'},
  {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
  {id: '#C6C5B9', name: 'ash', type: 'neutral'},
  {id: '#62929E', name: 'gothic', type: 'cool'},
  {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
];
app.locals.palettes = [
  {
    id: 1, 
    name: 'testPalette', 
    colors: [
      {id: '#393D3F', name: 'cape cod', type: 'neutral'},
      {id: '#FDFDFF', name: 'titan white', type: 'neutral'},
      {id: '#C6C5B9', name: 'ash', type: 'neutral'},
      {id: '#62929E', name: 'gothic', type: 'cool'},
      {id: '#546A7B', name: 'blue bayoux', type: 'cool'},
    ]
  },
  {
    id: 2,
    name: 'testPalette2',
    colors: [
      {id: '000000', name: 'black', type: 'neutral'},
      {id: 'FFFFFF', name: 'white', type: 'neutral'},
      {id: 'FE0000', name: 'red', type: 'warm'},
      {id: 'FEFB00', name: 'yellow', type: 'warm'},
      {id: '0032FE', name: 'blue', type: 'cool'},
    ]
  }
];
app.locals.projects = [
  {id: 1, name: 'testProject', paletteId: 1}
];

app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.send('hello world');
});

//retrieves colors from back end
// app.get('/api/v1/colors', (request, response) => {
//   const colors = app.locals.colors;

//   return response.status(200).json(colors);
// });

//retrieves specific color from back end
// app.get('/api/v1/colors/:id', (request, response) => {
//   console.log(request.params.id)
//   const id = request.params.id;
//   const color = app.locals.colors.find(color => {
//     return color.id === id;
//   });

//   if(!color) {
//     return response.status(404).json({ error: `Color with a hexadecimal code of #${id} could not be found.` });
//   };

//   return response.status(200).json(color);
// });

//retrieves palettes from back end
app.get('/api/v1/palettes', (request, response) => {
  console.log(request)

  const palettes = app.locals.palettes;

  return response.status(200).json(palettes);
});

//retrieves specific palettes from back end
app.get('/api/v1/palettes/:id', (request, response) => {
  const id = parseInt(request.params.id);
  const palette = app.locals.palettes.find(palette => {
    return palette.id === id;
  });
});

//adds color to specific palette
app.post('/api/v1/palettes', (request, response) => {
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


//app.delete('/api/v1/palettes/:id')

//app.get('/api/v1/projects')

//app.get('/api/v1/projects/:id')

//app.post('/api/v1/projects')

app.listen(3000, () => {
  console.log('Palette Perfect server running on localhost:3000');
});

app.use(express.static('public'));

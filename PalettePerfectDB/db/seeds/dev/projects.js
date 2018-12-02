let projectsData = [{
  project_name: 'TestProject',
  palettes: [
    { 
      palette_name: 'Fall Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
      project_id: 1
    },
    { 
      palette_name: 'Winter Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
      project_id: 1
    }
  ]
},
{
  project_name: 'TestProject2',
  palettes: [
    { 
      palette_name: 'Fall Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
    },
    { 
      palette_name: 'Winter Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
    }
  ]
},
{
  project_name: 'TestProject3',
  palettes: [
    { 
      palette_name: 'Fall Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
    },
    { 
      palette_name: 'Winter Colors',
      hex1: '#FFFFFF',
      hex2: '#000000',
      hex3: '#F0F0F0',
      hex4: '#0F0F0F',
      hex5: '#F00F00',
    }
  ]
}]

const createProject = (knex, project) => {
  return knex('projects').insert({
    project_name: project.project_name,
  }, 'id')
  .then(projectIds => {
    let palettePromises = project.palettes.map(palette => {
      return createPalette(knex, {
        palette_name: palette.palette_name,
        hex1: palette.hex1,
        hex2: palette.hex2,
        hex3: palette.hex3,
        hex4: palette.hex4,
        hex5: palette.hex5,
        project_id: projectIds[0]
      })
    }) 
    return Promise.all(palettePromises)
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette)
}


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      // Inserts seed entries
      let projectPromises = projectsData.map(project => {
        return createProject(knex, project)
      })
      return Promise.all(projectPromises)
    })
    .then(() => console.log('Successfully seeded db'))
    .catch(error => console.log(`Error seeding db: ${error.message}`));
};

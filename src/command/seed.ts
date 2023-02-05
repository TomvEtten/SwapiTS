import { DataFetcher } from './../util/paginatedDataFetcher'
import { PrismaClient } from '@prisma/client'
import { type SwapiPeopleCollection, type SwapiPlanetCollection, type SwapiSpeciesCollection } from '../types/swapiCollections'
const prisma = new PrismaClient()

console.log('Fetching live data from SWAPI')

Promise.all([
  new DataFetcher().getAllDataFromUrl('https://swapi.dev/api/people') as Promise<SwapiPeopleCollection>,
  new DataFetcher().getAllDataFromUrl('https://swapi.dev/api/planets') as Promise<SwapiPlanetCollection>,
  new DataFetcher().getAllDataFromUrl('https://swapi.dev/api/species') as Promise<SwapiSpeciesCollection>
]).then(async function ([
  people,
  planets,
  species
]) {
  console.log('Creatin planets')
  planets.forEach(async function (planet) {
    const originalId = parseInt(planet.url.split('/')[5])
    await prisma.planet.upsert(
    	{
        where: {
          originalId
        },
    		update: {
    			name: planet.name,
    			population: planet.population
    		},
        create: {
          name: planet.name,
          originalId,
    			population: planet.population
        }
    	}
    )
  })

  console.log('Creatin species')
  species.forEach(async function (specie) {
    const originalId = parseInt(specie.url.split('/')[5])
    await prisma.species.upsert(
    	{
        where: {
          originalId
        },
    		update: {
    			name: specie.name
    		},
        create: {
          name: specie.name,
          originalId
        }
    	}
    )
  })

  console.log('Creatin people')
  people.forEach(async function (people) {
    const originalId = parseInt(people.url.split('/')[5])
    const originalPlanetId = parseInt(people.homeworld.split('/')[5])
	const originalSpeciesIds = people.species.map(function(specie) {
		return parseInt(specie.split('/')[5])
	})
	const specieIds = await prisma.species.findMany({
		where: {
			originalId: { in: originalSpeciesIds },
		},
		select: {
			id: true,
		}
	});

    await prisma.people.upsert(
    	{
        where: {
          originalId
        },
    	update: {
    	  name: people.name,
          eyeColor: people.eye_color,
          gender: people.gender,
          hairColor: people.hair_color,
          homeWorld: {
            connect: {
              originalId: originalPlanetId
            }
          },
		  species: {
			connect: specieIds
		  }
    	},
        create: {
          name: people.name,
          eyeColor: people.eye_color,
          gender: people.gender,
          hairColor: people.hair_color,
          originalId: originalId,
          homeWorld: {
            connect: {
              originalId: originalPlanetId
            }
          },
		  species: {
			connect: specieIds
		  }
    	}
      }
    )
  })
}).finally(async function () {
  await prisma.$disconnect()
})

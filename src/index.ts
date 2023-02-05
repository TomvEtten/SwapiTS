import express, { type Express, type Request, type Response } from 'express'
import dotenv from 'dotenv'
import { type Planet, type Species, type People, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

dotenv.config()

const app: Express = express()
const port = process.env.PORT

app.get('/planets', async (req: Request, res: Response) => {
  return await prisma.planet.findMany(
    {
      include: {
        peoples: true,
      }
    }
  ).then(function (result: Planet[]) {
    return res.send(
      { planets: result }
    )
  })
})

app.get('/species', async (req: Request, res: Response) => {
  return await prisma.species.findMany().then(function (result: Species[]) {
    return res.send(
      { species: result }
    )
  })
})

app.get('/people', async (req: Request, res: Response) => {
  return await prisma.people.findMany(
    {
      include: {
        homeWorld: true,
        species: true
      }
    }
  ).then(function (result: People[]) {
    return res.send(
      { people: result }
    )
  })
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

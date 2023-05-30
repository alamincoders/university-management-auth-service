import express, { Application, Request, Response } from 'express'
import cors from 'cors'

// create app
const app: Application = express()

// use middleware
app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// create routes

// default route
app.get('/', (req: Request, res: Response) => {
  res.send(`Welcome to university management auth service backend`)
})

export default app

import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './database/tasksDB'
import { userRoute, taskRoute} from './routers'

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/user', userRoute)
app.use('/task', taskRoute)

app.listen(process.env.PORT, () => console.log('Server is running'))
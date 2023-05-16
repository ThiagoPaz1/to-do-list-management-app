import { AceBaseServer } from 'acebase-server'
import dotenv from 'dotenv'

import { userSchema, taskSchema } from '../schemas'

dotenv.config()

const dbname = process.env.DB_NAME
const dbport = process.env.DB_PORT
const server = new AceBaseServer(String(dbname), {
  host: 'localhost',
  port: Number(dbport),
  authentication: {
    enabled: true,
    allowUserSignup: false,
    defaultAccessRule: 'auth',
    defaultAdminPassword: String(process.env.ADMIN_PASSWORD)
  }
})

export async function connectDB() {
  server.on('ready', async () => {
    await server.db.schema.set('users/$userid', userSchema)
    await server.db.schema.set('users/$userid/tasks/$taskid', taskSchema)
    console.log('Connected database')
  })
}

export const tasksDB = server.db
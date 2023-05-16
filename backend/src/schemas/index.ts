export const userSchema = {
  'id?': 'string',
  name: 'string',
  email: 'string',
  password: 'string',
  'tasks?': 'object'
}

export const taskSchema = '{ id?: string, title: string, description: string, created_at: Date }'
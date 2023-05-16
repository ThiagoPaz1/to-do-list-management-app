import { Request, Response } from 'express'

import { userService } from '../services'

class UserController {
  public async newUser(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
      await userService.create({
        name,
        email,
        password
      })

      return res.status(201).json({ message: 'Successfully created' })
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  
  public async getUserByEmail(
    req: Request,
    res: Response
  ): Promise<Response | void> {
    const { email } = req.params
    
    try {
      const { user } = await userService.getUserByEmail(email)
      const emailData = user?.email
      
      return res.json(emailData)
    } catch (error) {  
      return res.status(500).json(error)
    }
  }

  public async singIn(req: Request, res: Response): Promise<Response> {
    const { email } = req.body

    try {
      const user = await userService.singIn(email)

      return res.json(user)
    } catch (error) {
      return res.status(500).json(error)
    }
  }
}

export const userController = new UserController()
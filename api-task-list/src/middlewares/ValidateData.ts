import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

import { RequestData } from '../@types'

dotenv.config()

import { userService } from '../modules/user/services'
import { taskService } from '../modules/tasks/services'

class ValidateData {
  public async verirfyAuthentication(
    req: RequestData,
    res: Response,
    next: NextFunction) {
    const token = req.headers?.authorization
    const SECRET = String(process.env.JWT_SECRET)

    jwt.verify(String(token), SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'User is not authenticated' })

      const payload: JwtPayload = decoded as JwtPayload

      req.userId = payload.id
    })

    next()
  }

  public newTaskData(
    req: RequestData,
    res: Response,
    next: NextFunction): Response | void {
    const data = Object.values(req.body)
    let invalidDataFound: boolean = false

    if (data.length) {
      for (let i of data) {
        if (!i || String(i).length < 2) invalidDataFound = true
      }
    } else {
      invalidDataFound = true
    }

    if (invalidDataFound) {
      const msg = 'All fields are mandatory and must be at least 2 characters long'
      return res.status(400).json({ message: msg })
    }

    next()
  }

  public async updateTaskData(
    req: RequestData,
    res: Response,
    next: NextFunction): Promise<Response | void> {
    const { title, description } = req.body

    if (title && title?.length < 2) {
      return res.status(400).json({message: 'The field must be at least two characters long'})
    }

    if (description && description?.length < 2) {
      return res.status(400).json({message: 'The field must be at least two characters long'})
    }

    next()
  }

  public async verifyId(
    req: RequestData,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { id } = req.params
    const userId = req.userId as string
    const findTask = await taskService.getById(userId, id)

    if (!id || !findTask) {
      return res.status(404).json({ message: 'Id not found' })
    }

    next()
  }

  public async newUserData(
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response | void> {
    const { email, password, name } = req.body
    const { user } = await userService.getUserByEmail(email)
    const validateEmail = /\S+@\S+\.\S+/

    if (!name || name.length < 2) {
      return res.status(400).json({ message: 'Name requires at least 2 characters' })
    }

    if (user?.email) {
      return res.status(400).json({ message: 'E-mail already registered' })
    }

    if (!validateEmail.test(email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password requires at least 6 characters' })
    }

    next()
  }

  public async loginData(
    req: Request,
    res: Response,
    next: NextFunction): Promise<Response | void> {
    const { email, password } = req.body
    const { user } = await userService.getUserByEmail(email)
    const passwordCheck = (password && user?.password) && bcryptjs.compareSync(password, user.password)

    if (!passwordCheck) {
      return res.status(400).json({ message: 'Invalid e-mail or password' })
    }

    if (user.email !== email) {
      return res.status(400).json({ message: 'Invalid e-mail or password' })
    }

    next()
  }

  // public async params(
  //   req: Request,
  //   res: Response,
  //   next: NextFunction): Promise<Response | void> {
  //   const { id } = req.params
  //   const task = await taskService.getById(id)
  //   const check = Object.values(task)

  //   if (!id || !check.length) {
  //     return res.status(404).json({ message: 'Id not found' })
  //   }

  //   next()
  // }
}

export const validateData = new ValidateData()
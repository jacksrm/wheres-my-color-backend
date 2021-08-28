import express, { Request, Response } from 'express';

import UserInterface from '@interfaces/UserInterface';

import User from '@models/User';

const userRoutes = express.Router();

userRoutes.post('/create', async (req: Request, res: Response) => {
  const {
    username,
    email,
    password,
    palettes,
    profilePicture,
  }: UserInterface = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
      palettes,
      profilePicture,
    });

    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default userRoutes;

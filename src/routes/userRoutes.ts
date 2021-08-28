import express, { Request, Response } from 'express';

import UserInterface from '@interfaces/UserInterface';

import User from '@models/User';

const userRoutes = express.Router();

userRoutes.post('/create', async (req: Request, res: Response) => {
  console.log('aqui...');

  const {
    username,
    email,
    password,
    profilePicture,
  }: UserInterface = req.body;

  console.log({
    username,
    email,
    password,
    profilePicture,
  });

  try {
    const user = new User({
      username,
      email,
      password,
      palettes: [],
      profilePicture,
    });

    await user.save();

    console.log(user);
    return res.json({ user });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

export default userRoutes;

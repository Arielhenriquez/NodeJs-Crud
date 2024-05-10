import { Router, Request, Response } from "express";
import { createUser, getAllUsers } from "../services/userService";
import { CreateUserDto } from "../dtos/createUserDto";

const router = Router();

router.get("/user", async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).send(users);
  } catch (error: any) {
    console.error("Error while fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/user", async (req: Request, res: Response) => {
  try {
    const userDto: CreateUserDto = req.body;
    const newUser = await createUser(userDto);
    res.status(201).send(newUser);
  } catch (error: any) {
    console.error("Error while adding user:", error);
    res.status(409).send(error.message);
  }
});

export const userRoutes = router;
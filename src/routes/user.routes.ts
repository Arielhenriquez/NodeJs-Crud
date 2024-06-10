import { Router, Request, Response } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
} from "../services/userService";
import { CreateUserDto } from "../dtos/createUserDto";
import { UpdateUserDto } from "../dtos/updateUserDto";
import { UserLoginDto } from "../dtos/userLoginDto";

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

router.get("/user/:id", async (req: Request, res: Response) => {
  try {
    const params = req.params.id;
    console.log(params);
    
    const users = await getUserById(params);
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

router.post("/user-login", async (req: Request, res: Response) => {
  try {
    const userLoginDto: UserLoginDto = req.body;
    const userLogin = await login(userLoginDto);
    res.status(201).send(userLogin);
  } catch (error: any) {
    console.error("Error while adding user:", error);
    res.status(409).send(error.message);
  }
});

//Update user con id en el body :)
// router.put("/user", async (req: Request, res: Response) => {
//   try {
//     //const params =
//     const userDto: UpdateUserDto = req.body;
//     console.log("Id de usuario:" + userDto.id);
//     const updatedUser = await updateUser(userDto);
//     res.status(200).send(updatedUser);
//   } catch (error: any) {
//     console.error("Error while updating user:", error);
//     res.status(500).send(error.message);
//   }
// });

router.put("/user/:id", async (req: Request, res: Response) => {
  try {
    const params = req.params.id;
    const userDto: UpdateUserDto = req.body;
    const updatedUser = await updateUser(params, userDto);
    res.status(200).send(updatedUser);
  } catch (error: any) {
    console.error("Error while updating user:", error);
    res.status(500).send(error.message);
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  try {
    const params = req.params.id;
    await deleteUser(params);
    res.status(204);
  } catch (error: any) {
    console.error("Error while deleting user:", error);
    res.status(500).send(error.message);
  }
});

export const userRoutes = router;

import { User } from "../persistence/entities/User";
export async function GetUsers() {
  const users = await User.findAll();
  return users;
}

export async function CreateUsers(name: string, age:string) 
{
   const createUser = await User.create({name, age})
   return createUser;
}

import { CreateUserDto } from "../dtos/createUserDto";
import { validateUserDTO } from "../dtos/validateUserDto";
import { User } from "../persistence/entities/User";
import bcrypt from "bcrypt";

export async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

export async function createUser(userDto: CreateUserDto) {
  const { error } = validateUserDTO(userDto);

  if (error) {
    throw new Error(error.details[0].message);
  }
  userDto.password = await hashPassword(userDto.password);
  const user = await User.create({ userDto });
  return user;
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

/*Todo: Manejar errores en cada metodo que llame a la BD.
 Validar que se este mapeando el dto con el modelo sequalize
 Validar password que se guarde como hash en BD pero cuando se haga login sea con la password original..
*/

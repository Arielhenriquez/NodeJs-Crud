import { CreateUserDto } from "../dtos/createUserDto";
import { UpdateUserDto } from "../dtos/updateUserDto";
import {
  validateUpdateUserDTO,
  validateUserDTO,
} from "../dtos/validateUserDto";
import { User } from "../persistence/entities/User";
import bcrypt from "bcrypt";

export async function getAllUsers() {
  const users = await User.findAll();
  return users;
}

export async function createUser(
  createUserDto: CreateUserDto
): Promise<CreateUserDto> {
  const { error } = validateUserDTO(createUserDto);

  if (error) {
    throw new Error(error.details[0].message);
  }

  createUserDto.password = await hashPassword(createUserDto.password);

  const user = await User.create({
    userName: createUserDto.userName,
    email: createUserDto.email,
    firstName: createUserDto.firstName,
    lastName: createUserDto.lastName,
    password: createUserDto.password,
    isAdmin: createUserDto.isAdmin,
  });

  return user.toJSON();
}

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export async function updateUser(
  id: string,
  updateUserDto: UpdateUserDto
): Promise<UpdateUserDto | null> {
  const { error } = validateUpdateUserDTO(id, updateUserDto);

  if (error) {
    throw new Error(error.details[0].message);
  }

  updateUserDto.password = await hashPassword(updateUserDto.password);

  const [affectedCount, updatedUsers] = await User.update(
    {
      id: id,
      userName: updateUserDto.userName,
      email: updateUserDto.email,
      firstName: updateUserDto.firstName,
      lastName: updateUserDto.lastName,
      password: updateUserDto.password,
      isAdmin: updateUserDto.isAdmin,
    },
    {
      where: {
        id: id,
      },
      returning: true,
    }
  );

  if (affectedCount === 0) {
    return null;
  }

  // updatedUsers es un array de instancias del modelo actualizado, toma el primer elemento
  const updatedUser = updatedUsers[0];
  return updatedUser.toJSON();
}

export async function deleteUser(id: string) {
  await User.destroy({
    where: {
      id: id,
    },
  });
}
/*Todo: Manejar errores en cada metodo que llame a la BD.
 Hacer endpoint login, que devuelva JWT, Integrar auth con passport. 
 Validar password que se guarde como hash en BD pero cuando se haga login sea con la password original..
*/

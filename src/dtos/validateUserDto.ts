import Joi from "joi";
import { CreateUserDto } from "./createUserDto";
import { UpdateUserDto } from "./updateUserDto";

export const validateUserDTO = (data: CreateUserDto) => {
  const schema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    password: Joi.string()
      .pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
      .required(),
    isAdmin: Joi.boolean().optional(),
  });

  return schema.validate(data);
};


export const validateUpdateUserDTO = (id: string, data: UpdateUserDto) => {
  const schema = Joi.object({
    id: Joi.string().uuid().required(),
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    firstName: Joi.string().optional(),
    lastName: Joi.string().optional(),
    password: Joi.string()
      .pattern(new RegExp(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/))
      .required(),
    isAdmin: Joi.boolean().optional(),
  });

  const combinedData = { id, ...data };
  return schema.validate(combinedData);
};



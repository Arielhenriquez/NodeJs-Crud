import Joi from "joi";
import { CreateUserDto } from "./createUserDto";

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

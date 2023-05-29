import * as yup from "yup";
import IMessage from "../interfaces/message";

interface IBodyProps extends Omit<IMessage, "id"> {}

export const messageBodyValidation: yup.SchemaOf<IBodyProps> = yup
  .object()
  .shape({
    from: yup.number().integer().positive().notRequired(),
    to: yup.number().integer().positive().required(),
    message: yup.string().required(),
  });

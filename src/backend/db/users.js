import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
  {
    _id: uuid(),
    firstName: "guest",
    lastName: "guestLastName",
    email: "guest1234@gmail.com",
    password: "guest1234",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];

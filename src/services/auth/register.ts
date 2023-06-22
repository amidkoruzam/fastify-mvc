import bcrypt from "bcrypt";
import { db } from "@/db";
import { UserObject } from "./types";

export const ALREADY_EXISTS_ERROR = "already_exists";

export const createUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const alreadyExists = await db.table("users").where({ email }).first();

  if (alreadyExists) throw new Error(ALREADY_EXISTS_ERROR);

  const hashedPassword = await bcrypt.hash(password, 10);

  const [user] = await db
    .table<UserObject>("users")
    .insert({ email, password: hashedPassword })
    .returning("*");

  return { user };
};

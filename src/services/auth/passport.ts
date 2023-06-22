import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";

import { db } from "@/db";

import { UserObject } from "./types";

const INCORRECT_CREDENTIALS = "incorrect_credentials";

const strategy = new LocalStrategy(async function verify(
  username,
  password,
  cb
) {
  try {
    const user = await db
      .table<UserObject>("users")
      .where({ email: username })
      .first();

    if (!user) return cb(new Error(INCORRECT_CREDENTIALS));

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) return cb(null, user);
    return cb(new Error(INCORRECT_CREDENTIALS));
  } catch (error) {
    return cb(error);
  }
});

passport.use(strategy);

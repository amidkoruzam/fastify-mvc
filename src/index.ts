import fastify from "fastify";
import path from "path";
import ejs from "ejs";
import viewPlugin from "@fastify/view";
import staticPlugin from "@fastify/static";
import fastifyCookie from "@fastify/cookie";

import { registerGetRoute, registerPostRoute } from "./routes/auth/register";
import fastifyFormbody from "@fastify/formbody";
import dotenv from "dotenv";

dotenv.config();

const server = fastify({
  logger: true,
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [require("ajv-errors")],
  },
});

server.register(fastifyFormbody);
server.register(fastifyCookie, { secret: process.env.COOKIE_SECRET });

server.register(staticPlugin, {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

server.register(viewPlugin, {
  engine: {
    ejs,
  },
  root: path.join(__dirname, "templates"),
});

server.route(registerGetRoute);
server.route(registerPostRoute);

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});

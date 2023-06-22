import { createUser } from "@/services/auth/register";
import localize from "ajv-i18n";
import { FastifyRequest, RouteOptions } from "fastify";

export const registerGetRoute: RouteOptions = {
  method: "GET",
  url: "/register",
  handler: function (request, reply) {
    reply.view("/auth/register.ejs", { email: "", password: "", errors: {} });
  },
};

export const registerPostRoute: RouteOptions = {
  method: "POST",
  url: "/register",
  schema: {
    body: {
      type: "object",
      properties: {
        email: {
          type: "string",
          format: "email",
          errorMessage: {
            type: "Неправильная почта",
            format: "Неверный формат почты",
          },
        },
        password: {
          type: "string",
          minLength: 7,
          errorMessage: { minLength: "Минимальная длина пароля - 7 символов" },
        },
      },
    },
  },
  handler: async (request, reply) => {
    const body = request.body;

    console.log(body);

    reply.view("/auth/register.ejs");
  },
  errorHandler: (error, request, reply) => {
    const body = request.body as Record<string, string>;

    reply.view("/auth/register.ejs", {
      email: body.email,
      password: body.password,
      errors: error.validation?.map((e) => e.message),
    });
  },
};

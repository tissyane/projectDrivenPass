import app, { init } from "../../src/app";
import { prisma } from "../../src/config/database";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories/user-factory";
import { duplicatedEmailError } from "../../src/utils/errors";
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("POST /signup", () => {
  describe("Invalid body", () => {
    it("should respond with status 400 when body is not given", async () => {
      const response = await api.post("/signup");

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post("/signup").send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
  
  describe("Valid body", () => {
    const generateValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password(10),
      });
  
      it("should respond with status 409 when there is an user with given email", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await api.post("/signup").send(body);

        expect(response.status).toBe(httpStatus.CONFLICT);
        expect(response.body).toEqual(duplicatedEmailError());
      });

      it("should save user on db", async () => {
        const body = generateValidBody();

        const response = await api.post("/signup").send(body);

        const user = await prisma.user.findUnique({
          where: { email: body.email },
        });
        expect(user).toEqual(
          expect.objectContaining({
            id: response.body.id,
            email: body.email,
          }),
        );
      });
  })
});

import httpStatus from "http-status";
import supertest from "supertest";
import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import { createUser } from "../factories/user-factory";
import { cleanDb } from "../helpers";

const api = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("POST /signin", () => {
  describe("Invalid body", () => {
    it("should respond with status 400 when body is not given", async () => {
      const response = await api.post("/signin");
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post("/signin").send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });

  describe("Valid body", () => {
    const generateValidBody = () => ({
      email: faker.internet.email(),
      password: faker.internet.password(10),
    });

    it("should respond with status 401 if there is no user for given email", async () => {
      const body = generateValidBody();

      const response = await api.post("/signin").send(body);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if there is a user for given email but password is not correct", async () => {
      const body = generateValidBody();
      await createUser(body);

      const response = await api.post("/signin").send({
        ...body,
        password: faker.lorem.word(),
      });

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    describe("Valid credentials", () => {
      it("should respond with status 200", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await api.post("/signin").send(body);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should respond with session token", async () => {
        const body = generateValidBody();
        await createUser(body);

        const response = await api.post("/signin").send(body);

        expect(response.body.token).toBeDefined();
      });
    });
  });
});
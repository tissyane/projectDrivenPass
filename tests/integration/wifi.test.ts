import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { createUser } from "../factories/user-factory";
import { prisma } from "../../src/config/database";
import { createWifi, createWifitoBody } from "../factories/wifi-factory";


const api = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});


describe("POST /network", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.post("/network");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.post("/wifi").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token, Invalid body", () => {
    it("should respond with status 400 when body is not given", async () => {
      const token = await generateValidToken();

      const response = await api.post("/network").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const token = await generateValidToken();
      const body = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await api.post("/network").set("Authorization", `Bearer ${token}`).send(body);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  })

  describe("Valid token and body", () =>{
    it("should response with 201 and save credential to db", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifitoBody();

      const beforeCount = await prisma.network.count();
      const response = await api.post("/network").set("Authorization", `Bearer ${token}`).send(wifi);
      const afterCount = await prisma.network.count();
   
      expect(response.status).toBe(httpStatus.CREATED);
      expect(beforeCount).toEqual(0);
      expect(afterCount).toEqual(1);
     
    });

  })
})

describe("GET /network", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.get("/network");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.get("/network").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token", () => {
    it("should respond with status 404 when there is no network for given user", async () => {
      const token = await generateValidToken();

      const response = await api.get("/network").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it ("should respond with status 200 and network list for given user", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifi(user);
     
      const response = await api.get("/network").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([{
        id: expect.any(Number),
        title: wifi.title,       
        network: wifi.network,
        password: expect.any(String),
        userId: user.id
      }])
    })

  })

})

describe("GET /network/:id", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.get("/network/1");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.get("/network/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token", () => {
    it("should respond with status 404 for invalid credential id", async () => {
      const token = await generateValidToken();

      const response = await api.get("/network/100").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 401 for unauthorized access", async () => {
    
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifi();
      const response = await api.get(`/network/${wifi.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it ("should respond with status 200 and credential for given user and id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const wifi = await createWifi(user);
     

      const response = await api.get(`/network/${wifi.id}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: wifi.title,
        network: wifi.network,
        password: expect.any(String),
        userId: user.id
      })
    })

  })

})

describe("DELETE /network/:id", () => {
  
  it ("should respond with status 200 and delete wifi from db", async () => { 
    const user = await createUser();
    const token = await generateValidToken(user);
    const wifi = await createWifi(user);

    const response = await api.delete(`/network/${wifi.id}`).set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(httpStatus.OK);
  })

  it("should respond with status 404 for invalid network id", async () => {
    const token = await generateValidToken();

    const response = await api.delete("/network/100").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 401 for unauthorized access", async () => {
    
    const user = await createUser();
    const token = await generateValidToken(user);
    const wifi = await createWifi();
    const response = await api.delete(`/network/${wifi.id}`).set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
})
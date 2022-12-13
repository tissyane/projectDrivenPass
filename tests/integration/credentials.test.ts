import app, { init } from "../../src/app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { cleanDb, generateValidToken } from "../helpers";
import { createUser } from "../factories/user-factory";
import { createCredential, createCredentialtoBody, createSpecificCredential } from "../factories/credential-factory";
import { prisma } from "../../src/config/database";

import * as encryptUtils from "../../src/utils/encrypt";

const api = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});


describe("POST /credentials", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.post("/credentials");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.post("/credentials").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token, Invalid body", () => {

    it("should respond with status 400 when body is not given", async () => {
      const token = await generateValidToken();

      const response = await api.post("/credentials").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  })

  describe("Valid token and body", () =>{
    it("should response with 201 and save credential to db", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredentialtoBody();

      const beforeCount = await prisma.credential.count();
      const response = await api.post("/credentials").set("Authorization", `Bearer ${token}`).send(credential);
      const afterCount = await prisma.credential.count();

      expect(beforeCount).toEqual(0);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(afterCount).toEqual(1);
     
    });

    it("should response with 409 when title already exists", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credentialBody = await createCredentialtoBody()
      const credential = await createSpecificCredential(credentialBody, user);
     
      const response = await api.post("/credentials").set("Authorization", `Bearer ${token}`).send(credentialBody);
        
      expect(response.status).toBe(httpStatus.CONFLICT);
     
    });

  })
})

describe("GET /credentials", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.get("/credentials");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.get("/credentials").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token", () => {
    it("should respond with status 404 when there is no credentials for given user", async () => {
      const token = await generateValidToken();

      const response = await api.get("/credentials").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it ("should respond with status 200 and credential list for given user", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user);
     
      const response = await api.get("/credentials").set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([{
        id: expect.any(Number),
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password: encryptUtils.decryptData(credential.password),
        userId: user.id
      }])
    })

  })

})

describe("GET /credentials/:id", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.get("/credentials/1");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.get("/credentials/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Valid token, invalid userId or credentialId", () => {
    it("should respond with status 404 when there is no register for given credentialId", async () => {
      const token = await generateValidToken();

      const response = await api.get("/credentials/100").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it("should respond with status 401 for unauthorized access", async () => {
    
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential();
      const response = await api.get(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  })

  describe("Valid credentials", () => {
    it ("should respond with status 200 and credential for given user and id", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential(user);
     

      const response = await api.get(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual({
        id: expect.any(Number),
        title: credential.title,
        url: credential.url,
        username: credential.username,
        password:  encryptUtils.decryptData(credential.password),
        userId: user.id
      })
    })
  })

})

describe("DELETE /credentials/:id", () => {

  describe("No/invalid token", () => {

    it("should respond with status 401 if no token is given", async () => {
      const response = await api.delete("/credentials/1");

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it("should respond with status 401 if given token is not valid", async () => {
      const token = faker.lorem.word();

      const response = await api.delete("/credentials/1").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });

  });

  describe("Invalid userId or credentialId ", () => {

    it("should respond with status 404 when there is no register for given credentialId", async () => {
      const token = await generateValidToken();
  
      const response = await api.delete("/credentials/100").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  
    it("should respond with status 401 for unauthorized access", async () => {
      
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential();
      const response = await api.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  })
  
  describe("Valid credentials", () => {
    it ("should respond with status 200 and delete credential from db", async () => { 
      const user = await createUser();
      const token = await generateValidToken(user);
      const credential = await createCredential( user);
      const response = await api.delete(`/credentials/${credential.id}`).set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.OK);
    })
  })
  

  
})





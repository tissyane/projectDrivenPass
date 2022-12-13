import { faker } from "@faker-js/faker";
import { Credential, User } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { createUser } from "./user-factory";
import * as encryptUtils from "../../src/utils/encrypt";
import { CredentialData } from "@/protocols/protocols";

export async function createSpecificCredential(credential: Partial<CredentialData>, user?: User) {
  const incomingUser = user || (await createUser());

  return await prisma.credential.create({
    data: {
      title: credential.title,
      url: credential.url,
      username: credential.username,
      password: credential.password,
      userId: incomingUser.id,
    },
  });
}

export async function createCredential(user?: User) {
  const incomingUser = user || (await createUser());

  return await prisma.credential.create({
    data: {
    title: faker.lorem.word(),
    url: faker.internet.url(),
    username: faker.lorem.word(),
    password: encryptUtils.encryptData(faker.lorem.word()),
    userId: incomingUser.id,
    },
  });
}

export async function createCredentialtoBody() {
  return {
    title: faker.lorem.word(),
    url: faker.internet.url(),
    username: faker.lorem.word(),
    password: faker.lorem.word(),
  };
}

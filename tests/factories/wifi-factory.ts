import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import { prisma } from "../../src/config/database";
import { createUser } from "./user-factory";
import * as encryptUtils from "../../src/utils/encrypt";

export async function createWifi(user?: User) {
  const incomingUser = user || (await createUser());

  return await prisma.network.create({
    data: {
      title: faker.lorem.word(),
      network: faker.lorem.word(),
      password: encryptUtils.encryptData(faker.lorem.word()),
      userId: incomingUser.id,
    },
  });
}

export async function createWifitoBody() {
  return {
    title: faker.lorem.word(),
    network: faker.lorem.word(),
    password: faker.lorem.word(),
  };
}
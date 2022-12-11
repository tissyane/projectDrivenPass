import {WifiData} from "../protocols/protocols";
import { prisma } from "../config/database";

export async function createNetwork(
    userId: number,
    wifiData: WifiData
  ) {
    const networkInfo = {
      userId,
      ...wifiData
    };
    return prisma.network.create({
      data: networkInfo
    });
  };



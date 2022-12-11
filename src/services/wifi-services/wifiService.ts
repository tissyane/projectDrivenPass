import { WifiData } from "@/protocols/protocols";
import * as encryptUtils from "../../utils/encrypt";
import * as wifiRepository from "../../repositories/wifiRepository";
import { notFoundError } from "@/utils/errors";

async function createWifi(userId: number, wifiData: WifiData) {
  const encryptedPassword = encryptUtils.encryptData(wifiData.password);
  const network = await wifiRepository.createNetwork(userId, {
    ...wifiData,
    password: encryptedPassword,
  });
  return network;
}

const wifiService = {
  createWifi
};

export default wifiService;

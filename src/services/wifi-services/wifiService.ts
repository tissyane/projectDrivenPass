import { WifiData } from "@/protocols/protocols";
import * as encryptUtils from "../../utils/encrypt";
import * as wifiRepository from "../../repositories/wifiRepository";
import { notFoundError, unauthorizedAccess } from "../../utils/errors";

async function createWifi(userId: number, wifiData: WifiData) {
  const encryptedPassword = encryptUtils.encryptData(wifiData.password);
  const network = await wifiRepository.createNetwork(userId, {
    ...wifiData,
    password: encryptedPassword,
  });
  return network;
}

async function getAllWifi(userId: number) {
  const wifiList = await wifiRepository.getAll(userId);
  if (wifiList.length === 0) {
    throw notFoundError();
  }

  const wifiWithDecryptedPassword = wifiList.map((wifi) => {
  const { password } = wifi;
  const decryptedPassword = encryptUtils.decryptData(password);
  return { ...wifi, password: decryptedPassword };
  });
  return wifiWithDecryptedPassword;
}

async function getwifiById(userId: number, id: number) {
  
  const wifi = await wifiRepository.getById(id);
  
  if (!wifi) {
    throw notFoundError();
  }
  if (wifi.userId !== userId) {
    throw unauthorizedAccess();
  }
  const { password } = wifi;
const decryptedPassword =  encryptUtils.decryptData(password);
return { ...wifi, password: decryptedPassword };
}
  
const wifiService = {
  createWifi,
  getAllWifi,
  getwifiById
};

export default wifiService;

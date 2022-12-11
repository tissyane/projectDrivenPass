
import Cryptr from 'cryptr';

function cryptrConfig(): Cryptr {
  const SECRET: string = process.env.CRYPTR_SECRET;
  const cryptr: Cryptr = new Cryptr(SECRET);
  return cryptr;
}

export function encryptData(data: string) {
  const cryptr: Cryptr = cryptrConfig();
  const encryptedData = cryptr.encrypt(data);
  return encryptedData;
}

export function decryptData(encryptedData: string) {
  const cryptr: Cryptr = cryptrConfig();
  const decryptedData = cryptr.decrypt(encryptedData);
  return decryptedData;
}
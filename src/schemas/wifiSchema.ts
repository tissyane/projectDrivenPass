import { WifiData } from "@/protocols/protocols";
import joi from "joi";

export const wifiSchema = joi.object<WifiData>({
  title: joi.string().required(),
  network: joi.string().required(),
  password: joi.string().required(),
});

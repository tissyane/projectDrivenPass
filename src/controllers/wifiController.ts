import { WifiData } from "@/protocols/protocols";
import wifiService from "../services/wifi-services/wifiService";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createWifi(req: Request, res: Response) {
  const wifiData: WifiData = req.body;
  const { id: userId } = res.locals.user;

  try {
    const network = await wifiService.createWifi(
      userId,
      wifiData
    );
    res
      .status(httpStatus.CREATED)
      .send(network);
  } catch (error) {
    
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}


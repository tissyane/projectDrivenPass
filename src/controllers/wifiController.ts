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

export async function getAllWifi(req: Request, res: Response) {
  const { id: userId } = res.locals.user;

  try {
    const wifiList = await wifiService.getAllWifi(userId);
    res.status(httpStatus.OK).send(wifiList);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}



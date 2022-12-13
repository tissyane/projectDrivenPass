import { WifiData } from "@/protocols/protocols";
import wifiService from "../services/wifiService";
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
      .sendStatus(httpStatus.CREATED)
  } catch (error) {    
    return res.sendStatus(httpStatus.BAD_REQUEST);
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

export async function getWifiById(req: Request, res: Response) {
  const id = Number(req.params.id);
   const { id: userId } = res.locals.user;

  try {
    const wifi = await wifiService.getwifiById(userId, id);
    res.status(httpStatus.OK).send(wifi);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedAccess") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function deleteWifi(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { id: userId } = res.locals.user;

  try {
    await wifiService.getwifiById(userId, id);
    await wifiService.deleteWifi(id);
    res.status(httpStatus.OK).send("Network deleted");
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    }
    if (error.name === "UnauthorizedAccess") {
      return res.status(httpStatus.UNAUTHORIZED).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

import { Response } from "express";
import { ErrorResponse } from "./interfaces/Error.enum";

export const sendResponse = (res: Response,response: any) => {
  const error = response as ErrorResponse;
  if(error.length > 0)
  res.status(400).json({error})
  else 
  res.status(200).json(response)
}


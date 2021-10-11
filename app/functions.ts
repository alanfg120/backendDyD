import { Response } from "express";
import { ErrorHttpResponse, ErrorResponse } from "./interfaces/Error.enum";

export const sendResponse = (res: Response, response: any) => {
  const errorResponse = response as ErrorHttpResponse;
  if (errorResponse.error) res.status(400).json(errorResponse);
  else res.status(200).json(response);
};

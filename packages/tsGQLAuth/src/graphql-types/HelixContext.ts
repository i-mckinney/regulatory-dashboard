import { Request, Response } from "express";

export interface HelixContext {
  req: Request;
  res: Response;
}

import { Request, Response } from "express";
import { createCompaniesLoader } from "../utils/companyLoader";

export interface MyContext {
  req: Request;
  res: Response;
  companyLoader: ReturnType<typeof createCompaniesLoader>;
}

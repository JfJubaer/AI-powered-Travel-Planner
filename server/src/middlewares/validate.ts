import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

type SchemaMap = {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
};

export function validate(schemaMap: SchemaMap) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (schemaMap.body) {
      req.body = schemaMap.body.parse(req.body);
    }

    if (schemaMap.query) {
      req.query = schemaMap.query.parse(req.query) as Request["query"];
    }

    if (schemaMap.params) {
      req.params = schemaMap.params.parse(req.params) as Request["params"];
    }

    next();
  };
}

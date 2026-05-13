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
      syncRequestObject(req.query, schemaMap.query.parse(req.query));
    }

    if (schemaMap.params) {
      syncRequestObject(req.params, schemaMap.params.parse(req.params));
    }

    next();
  };
}

function syncRequestObject(target: Record<string, unknown>, parsedValue: unknown) {
  for (const key of Object.keys(target)) {
    delete target[key];
  }

  if (parsedValue && typeof parsedValue === "object") {
    Object.assign(target, parsedValue);
  }
}

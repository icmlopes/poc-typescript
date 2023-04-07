import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export function handleApplicationErrors(err: Error, req: Request, res: Response, next: NextFunction){
    if(err.name === "notFoundError"){
        return res.status(httpStatus.NOT_FOUND).send({message: err.message})
    }
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: "InternalServerError", message: "Internal Server Error"})
}
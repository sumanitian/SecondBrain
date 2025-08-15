import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { success } from "zod";

export function userAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const {token} = req.cookies;

        const result = jwt.verify(token, process.env.JWT_SECRET!);

        if (!result) {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
            return;
        }
        // @ts-ignore
        req.body.userId = result.id;
        
        next();
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            error: error,
        });
    }
}
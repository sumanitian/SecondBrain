import { Request, Response, NextFunction } from "express";
import {email, success, z} from "zod";

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function validateInput(req: Request, res: Response, next: NextFunction) {
    try {
        const requireBody = z.object({
            email: z
                .string()
                .email({message: "Invalid Email Format"})
                .trim()
                .toLowerCase(),
            password: z
                .string()
                .min(8, { message: "Password must be at least 8 characters long" })
                .max(20, { message: "Password must not exceed 20 characters" })
                .regex(passwordValidation, {
                    message: "Password must include at least one uppercase letter, one lowrcase letter, one number, and one special character",
                }),
            username: z
                .string()
                .nonempty({
                    message: "Username cannot be empty"
                }),
        });

        const validateData = requireBody.safeParse(req.body);

        if(!validateData.success) {
            console.error(validateData.error);
            res.status(400).json({
                success: validateData.success,
                message: "Validation Error",
                error: validateData.error,
            });
            return;
        }
        req.body = validateData.data;

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

export default validateInput;
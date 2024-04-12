

import { z } from "zod";


export const usernameValidation = (
    z.string()
    .min(3, "Username must be at least 3 characters")
    .max(24, "Username must be no more than 24 characters")
    .regex(/[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi, "Usename must not contain special characters")
)


export const signUpSchema = (
    z.object({
        username: usernameValidation,
        email: (
            z.string()
            .email({message: "Invalid email address !!!"})
        ),
        password: (
            z.string()
            .min(6, {message: "Password must be at least 6 characters !!!"})
        )
    })
)


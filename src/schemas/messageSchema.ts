

import { z } from "zod";


export const messageSchema = (
    z.object({
        content: (
            z.string()
            .min(12, {message: "Content must be at least 12 characters !!!"})
            .max(320, {message: "Content must be no longer than 320 characters !!!"})
        ),
    })       
)


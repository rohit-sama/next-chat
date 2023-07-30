import {z} from "zod"

export const addFriendsValidator = z.object({
    email: z.string().email()
 })
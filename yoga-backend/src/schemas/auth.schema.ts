import { error } from 'console';
import z from 'zod';

export const loginSchema = z.object({
    email:z.string().email("Invalid email !"),
    password:z.string(),
})


export const signupSchema = loginSchema.extend({
    mobile:z.string(),
    occupation:z.string(),
    tandc:z.boolean(),

});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
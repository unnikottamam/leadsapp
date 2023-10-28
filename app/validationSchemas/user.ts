import z from "zod";

export const userSchema = z.object({
    firstName: z.string().min(3, "First name is required").optional().nullable(),
    lastName: z.string().min(3, "Last name is required").optional().nullable(),
    email: z.string().email("Provide a valid email address"),
    password: z.string().min(8, "Password must have at least 8 characters"),
    role: z.string().min(3, "User role not valid").optional().nullable(),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
});

export const userPatchSchema = z.object({
    firstName: z.string().min(3, "First name is required").optional().nullable(),
    lastName: z.string().min(3, "Last name is required").optional().nullable(),
    email: z.string().email("Provide a valid email address").optional().nullable(),
    password: z.string().min(8, "Password must have at least 8 characters").optional().nullable(),
    role: z.string().min(5, "User role not valid").max(10).optional().nullable(),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
});
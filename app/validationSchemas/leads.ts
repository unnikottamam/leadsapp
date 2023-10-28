import z from "zod";

export const leadSchema = z.object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
    email: z.string().email("Provide a valid email address"),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
    message: z.string().optional().nullable(),
    clientId: z.string().min(1, "Please select a client").optional().nullable(),
});

export const leadPatchSchema = z.object({
    firstName: z.string().min(3, "First name is required").optional().nullable(),
    lastName: z.string().min(3, "Last name is required").optional().nullable(),
    email: z.string().email("Provide a valid email address").optional().nullable(),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
    clientId: z.string().min(1, "Please select a client").optional().nullable(),
    status: z.string().min(3, "Please select a status").optional().nullable(),
});
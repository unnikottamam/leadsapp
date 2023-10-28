import z from "zod";

export const clientSchema = z.object({
    firstName: z.string().min(3, "First name is required"),
    lastName: z.string().min(3, "Last name is required"),
    email: z.string().email("Provide a valid email address"),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
    address: z.string().min(3, "Address is incorrect").optional().nullable(),
    street: z.string().min(3, "Street is incorrect").optional().nullable(),
    state: z.string().min(2, "State is incorrect").optional().nullable(),
    country: z.string().min(2, "Country is incorrect").optional().nullable(),
    zip: z.string().min(6, "Zip Code is incorrect").optional().nullable(),
});

export const clientPatchSchema = z.object({
    firstName: z.string().min(3, "First name is required").optional().nullable(),
    lastName: z.string().min(3, "Last name is required").optional().nullable(),
    email: z.string().email("Provide a valid email address").optional().nullable(),
    phone: z.string().max(15, "Provide a valid phone number").optional().nullable(),
    address: z.string().min(3, "Address is incorrect").optional().nullable(),
    street: z.string().min(3, "Street is incorrect").optional().nullable(),
    state: z.string().min(2, "State is incorrect").optional().nullable(),
    country: z.string().min(2, "Country is incorrect").optional().nullable(),
    zip: z.string().min(6, "Zip Code is incorrect").optional().nullable(),
});
import z from "zod";

export const commentSchema = z.object({
    comment: z.string().min(10, "Comment/Note is required"),
    leadId: z.string().min(5).optional().nullable(),
});
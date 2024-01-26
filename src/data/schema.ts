import { z } from "zod";

export const lexisSchema = z.object({
  table: z.object({
    rows: z.array(
      z.object({
        c: z.array(
          z.union([
            z.object({ v: z.union([z.string(), z.number()]) }),
            z.null(),
          ])
        ),
      })
    ),
  }),
});

export type Lexis = z.infer<typeof lexisSchema>;

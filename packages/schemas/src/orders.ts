import { z } from 'zod';

const orderSchema = z.object({
    id: z.string(),
    name: z.string(),
});

export { orderSchema };
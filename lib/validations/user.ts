import * as z from 'zod';

export const UserValidation = z.object ({
    profile_photo: z.string().url().nonempty(),
    name: z
        .string()
        .min(4, { message: 'Minimum of 4 characters' })
        .max(30, { message: 'Maximum of 30 characters' }),
    username: z
        .string()
        .min(4, { message: 'Minimum of 4 characters' })
        .max(30, { message: 'Maximum of 30 characters' }),
    bio: z
        .string()
        .min(4, { message: 'Minimum of 4 characters' })
        .max(1000, { message: 'Maximum of 500 characters' }),
})
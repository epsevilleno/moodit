import * as z from 'zod';

export const MoodValidation = z.object ({
    mood: z.string().nonempty().min(3, { message: 'Minimum 4 characters'}).max(500, { message: 'Maximum of 500 characters' }),
    accountId: z.string(),
    moodImage: z.string().url().nonempty(),
})
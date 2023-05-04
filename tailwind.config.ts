import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{html,ts}'],
    plugins: [forms()],
} satisfies Config;

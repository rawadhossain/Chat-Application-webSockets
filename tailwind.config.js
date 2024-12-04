/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                green: {
                    900: '#064e3b',
                    800: '#065f46',
                    700: '#047857',
                    600: '#059669',
                    500: '#10b981',
                    400: '#34d399',
                    300: '#6ee7b7',
                    200: '#a7f3d0',
                    100: '#d1fae5',
                },
                black: {
                    900: '#000000',
                    800: '#1a1a1a',
                    700: '#262626',
                    600: '#333333',
                    500: '#404040',
                    400: '#595959',
                    300: '#737373',
                    200: '#8c8c8c',
                    100: '#a6a6a6',
                },
            },
        },
    },
    plugins: [],
};

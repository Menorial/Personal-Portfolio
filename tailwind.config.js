/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // DESIGN.md — single accent + Apple surface palette
        primary: '#0066cc',
        'primary-focus': '#0071e3',
        sky: '#2997ff',
        ink: '#1d1d1f',
        parchment: '#f5f5f7',
        pearl: '#fafafc',
        'tile-1': '#272729',
        'tile-2': '#2a2a2c',
        'tile-3': '#252527',
        'muted-80': '#333333',
        // #6e6e73：白底对比度约 5.2:1，过 AA；原来的 #7a7a7a 只有 4.29:1
        'muted-48': '#6e6e73',
        'muted-dark': '#cccccc',
        hairline: '#e0e0e0',
        chip: '#d2d2d7',
      },
    },
  },
  plugins: [],
};

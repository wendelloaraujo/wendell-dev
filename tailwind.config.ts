// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // Usa a classe 'dark' para o modo escuro
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // Ajuste o caminho conforme seu projeto
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;

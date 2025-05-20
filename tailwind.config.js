// tailwind.config.js
export const content = [
    "./index.html", // Si tu HTML principal está en la raíz
    "./src/**/*.{js,ts,jsx,tsx}", // Ajusta según los archivos de tu framework (React, Vue, etc.)
];
export const theme = {
    extend: {
        colors: {
            // Colores principales
            primary: {
                light: '#6EE7B7', // Verde claro para éxitos, adiciones
                DEFAULT: '#10B981', // Verde principal
                dark: '#059669', // Verde oscuro para botones principales
            },
            secondary: {
                light: '#A78BFA', // Un morado claro para elementos secundarios
                DEFAULT: '#7C3AED', // Morado principal
                dark: '#6D28D9', // Morado oscuro
            },
            accent: '#FCD34D', // Un amarillo vibrante para resaltar, advertencias

            // Colores para estados de ingresos/gastos
            income: '#10B981', // Verde
            expense: '#EF4444', // Rojo

            // Colores de texto y fondo
            darkBg: '#1F2937', // Fondo oscuro general
            lightBg: '#F3F4F6', // Fondo claro general
            darkText: '#E5E7EB', // Texto claro sobre fondo oscuro
            lightText: '#374151', // Texto oscuro sobre fondo claro
            cardBg: '#374151', // Fondo para tarjetas/componentes
            cardBorder: '#4B5563', // Borde para tarjetas
        },
        fontFamily: {
            // Define tus fuentes personalizadas
            sans: ['Inter', 'sans-serif'], // Asegúrate de importar Inter desde Google Fonts o similar
            display: ['Montserrat', 'sans-serif'], // Asegúrate de importar Montserrat
        },
        spacing: {
            // Espaciados adicionales si los necesitas
            '72': '18rem',
            '84': '21rem',
            '96': '24rem',
        },
        boxShadow: {
            // Sombras personalizadas para tarjetas o elementos interactivos
            'custom-light': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            'custom-dark': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
        }
    },
};
export const plugins = [
    // Aquí puedes añadir plugins como @tailwindcss/forms si los necesitas
    // require('@tailwindcss/forms'),
];
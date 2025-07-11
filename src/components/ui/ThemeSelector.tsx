'use client';

import React, { useEffect, useState } from 'react';
import { useThemeContext } from '@/components/providers/ThemeProvider';
import { cn } from '@/utils/cn';

interface ThemeSelectorProps {
  className?: string;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useThemeContext();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // No renderizar el contenido hasta que esté montado en el cliente
  if (!mounted) {
    return (
      <div className={cn(
        'w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700',
        className
      )} />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center w-14 h-8 rounded-full transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800',
        isDark 
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
          : 'bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg',
        className
      )}
      title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
    >
      {/* Fondo del switch con gradiente dinámico */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          isDark ? 'opacity-100' : 'opacity-0'
        )}>
          {/* Estrellas para modo oscuro */}
          <div className="absolute top-1 left-2 w-1 h-1 bg-white rounded-full opacity-60 animate-pulse" />
          <div className="absolute top-2 right-3 w-0.5 h-0.5 bg-white rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-2 left-3 w-0.5 h-0.5 bg-white rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className={cn(
          'absolute inset-0 transition-opacity duration-300',
          !isDark ? 'opacity-100' : 'opacity-0'
        )}>
          {/* Nubes para modo claro */}
          <div className="absolute top-1 right-2 w-2 h-1 bg-white bg-opacity-30 rounded-full" />
          <div className="absolute bottom-1 left-2 w-1.5 h-0.5 bg-white bg-opacity-20 rounded-full" />
        </div>
      </div>
      
      {/* Toggle circle con iconos */}
      <div className={cn(
        'relative inline-flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-lg transform transition-all duration-300 ease-in-out',
        isDark ? 'translate-x-6' : 'translate-x-1',
        'hover:scale-110'
      )}>
        {/* Icono que cambia con animación */}
        <div className="relative w-4 h-4">
          {/* Icono de sol */}
          <svg
            className={cn(
              'absolute inset-0 w-4 h-4 text-yellow-500 transition-all duration-300 transform',
              !isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-75'
            )}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
          </svg>
          
          {/* Icono de luna */}
          <svg
            className={cn(
              'absolute inset-0 w-4 h-4 text-blue-400 transition-all duration-300 transform',
              isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-75'
            )}
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Efecto de brillo */}
      <div className={cn(
        'absolute inset-0 rounded-full transition-opacity duration-300',
        'bg-gradient-to-r from-transparent via-white to-transparent opacity-0 hover:opacity-20'
      )} />
    </button>
  );
};

export default ThemeSelector;
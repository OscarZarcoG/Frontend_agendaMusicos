'use client';

import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

interface ChartProps {
  data: any;
  options?: any;
  className?: string;
}

// Componente de gráfico de barras animado
export const AnimatedBarChart: React.FC<ChartProps> = ({ data, options, className }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    ...options,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      <Bar data={data} options={defaultOptions} />
    </motion.div>
  );
};

// Componente de gráfico de dona animado
export const AnimatedDoughnutChart: React.FC<ChartProps> = ({ data, options, className }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 11,
          },
          padding: 20,
        },
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 2000,
    },
    ...options,
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      <Doughnut data={data} options={defaultOptions} />
    </motion.div>
  );
};

// Componente de gráfico de líneas animado
export const AnimatedLineChart: React.FC<ChartProps> = ({ data, options, className }) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
          font: {
            size: 12,
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeInOutQuart',
    },
    elements: {
      line: {
        tension: 0.4,
      },
      point: {
        radius: 4,
        hoverRadius: 6,
      },
    },
    ...options,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className={className}
    >
      <Line data={data} options={defaultOptions} />
    </motion.div>
  );
};

// Componente de estadísticas animadas responsivo
export const AnimatedStatCard: React.FC<{
  title: string;
  value: string | number;
  change?: string;
  icon: React.ReactNode;
  gradient: string;
  delay?: number;
}> = ({ title, value, change, icon, gradient, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative overflow-hidden rounded-xl lg:rounded-2xl p-4 sm:p-5 lg:p-6 ${gradient} shadow-lg hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-white/80 truncate">{title}</p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mt-1 truncate"
          >
            {value}
          </motion.p>
          {change && (
            <p className="text-xs text-white/70 mt-1 truncate">{change}</p>
          )}
        </div>
        <motion.div
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: delay + 0.1 }}
          className="text-white/80 ml-2 flex-shrink-0"
        >
          {icon}
        </motion.div>
      </div>
      
      {/* Efecto de brillo */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, delay: delay + 0.5, repeat: Infinity, repeatDelay: 3 }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
      />
    </motion.div>
  );
};
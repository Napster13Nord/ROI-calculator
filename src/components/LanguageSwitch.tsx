import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 rounded-xl p-1 shadow-lg">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('pt')}
          className={`
            px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${language === 'pt' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }
          `}
        >
          🇵🇹 PT
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage('en')}
          className={`
            px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300
            ${language === 'en' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }
          `}
        >
          🇺🇸 EN
        </motion.button>
      </div>
    </div>
  );
}; 
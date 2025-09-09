import React from 'react'
import { useDarkMode } from '../../hooks/useDarkMode';
import { LuSun } from 'react-icons/lu';

const DarkModeToggle = () => {
    const [isDark, setIsDark] = useDarkMode();

  return (
    <button onClick={() => setIsDark(!isDark)} className='p-2 rounded-lg bg-gray-200 dark:bg-gray-700 transition-colors'>
        {isDark ? <LuSun className='text-yellow-400 text-lg' /> : <LuSun className='text-gray-800 text-lg' />}
    </button>
  );
};

export default DarkModeToggle;
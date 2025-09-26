import { useState } from 'react';

type ToggleProps = {
  label?: string;
};

export const Toggle = ({ label = 'Toggle' }: ToggleProps) => {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl shadow-md w-fit text-white">
      <span className="text-lg font-medium">{label}</span>
      <button
        onClick={() => setIsOn(prev => !prev)}
        className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
          isOn
            ? 'bg-green-500 hover:bg-green-600'
            : 'bg-gray-600 hover:bg-gray-700'
        }`}
      >
        {isOn ? 'ON' : 'OFF'}
      </button>
    </div>
  );
};
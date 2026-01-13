
import React, { useState } from 'react';
import { StartupName } from '../types';

interface StartupCardProps {
  item: StartupName;
}

export const StartupCard: React.FC<StartupCardProps> = ({ item }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(item.name);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {item.name}
        </h3>
        <button 
          onClick={handleCopy}
          className="text-gray-400 hover:text-indigo-500 p-1 rounded-md transition-colors"
          title="Copy name"
        >
          {copied ? <i className="fas fa-check text-green-500"></i> : <i className="far fa-copy"></i>}
        </button>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed italic">
        "{item.tagline}"
      </p>
      
      <div className="mt-4 flex gap-2">
        <span className="text-[10px] uppercase tracking-wider font-bold text-indigo-400 bg-indigo-50 px-2 py-0.5 rounded">
          Available
        </span>
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
          .io
        </span>
      </div>
    </div>
  );
};

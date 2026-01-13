
import React, { useState, useCallback } from 'react';
import { Button } from './components/Button';
import { StartupCard } from './components/StartupCard';
import { generateStartupNames } from './services/geminiService';
import { StartupName, LoadingState } from './types';

const App: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [results, setResults] = useState<StartupName[]>([]);
  const [status, setStatus] = useState<LoadingState>(LoadingState.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!industry.trim()) return;

    setStatus(LoadingState.LOADING);
    setError(null);

    try {
      const response = await generateStartupNames(industry);
      setResults(response.names);
      setStatus(LoadingState.SUCCESS);
    } catch (err: any) {
      console.error("Generation failed", err);
      setError("Failed to generate names. Please try again.");
      setStatus(LoadingState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white">
      {/* Header / Hero */}
      <header className="w-full max-w-4xl pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          Powered by Gemini AI
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Spark<span className="text-indigo-600">Nomad</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your industry idea into a brilliant brand identity. Instantly generate creative startup names with soulful taglines.
        </p>
      </header>

      {/* Input Section */}
      <div className="w-full max-w-2xl sticky top-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-xl border border-gray-100 mb-12">
        <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 relative">
            <i className="fas fa-rocket absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="Enter your industry (e.g., Sustainable Fashion, AI Biotech)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border-0 bg-transparent focus:ring-2 focus:ring-indigo-500 transition-all text-gray-800 placeholder:text-gray-400 font-medium"
              disabled={status === LoadingState.LOADING}
            />
          </div>
          <Button 
            onClick={() => handleGenerate()}
            isLoading={status === LoadingState.LOADING}
            className="sm:w-auto w-full py-4 px-8 rounded-xl"
          >
            Generate Names
          </Button>
        </form>
      </div>

      {/* Results Section */}
      <main className="w-full max-w-6xl">
        {status === LoadingState.ERROR && (
          <div className="bg-red-50 border border-red-100 text-red-700 px-6 py-4 rounded-xl flex items-center gap-3 animate-bounce">
            <i className="fas fa-circle-exclamation text-xl"></i>
            <p>{error}</p>
          </div>
        )}

        {status === LoadingState.IDLE && !results.length && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 opacity-60">
            <div className="bg-gray-50 p-8 rounded-full mb-6">
              <i className="fas fa-lightbulb text-6xl"></i>
            </div>
            <p className="text-xl font-medium">Type an industry above to get started</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {['Fintech', 'SaaS', 'E-commerce', 'Healthtech', 'Web3'].map(tag => (
                <button 
                  key={tag}
                  onClick={() => {
                    setIndustry(tag);
                  }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm hover:border-indigo-300 hover:text-indigo-600 transition-all"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {status === LoadingState.LOADING && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-2xl"></div>
            ))}
          </div>
        )}

        {(status === LoadingState.SUCCESS || (status === LoadingState.LOADING && results.length > 0)) && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((item, index) => (
              <StartupCard key={`${item.name}-${index}`} item={item} />
            ))}
          </div>
        )}

        {status === LoadingState.SUCCESS && results.length > 0 && (
          <div className="mt-16 text-center">
            <p className="text-gray-500 text-sm mb-4">Don't like these? Try adjusting your description.</p>
            <Button 
              variant="secondary" 
              onClick={() => handleGenerate()}
              className="mx-auto"
            >
              <i className="fas fa-rotate-right"></i>
              Regenerate All
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-20 text-gray-400 text-sm flex flex-col items-center">
        <p>&copy; 2024 SparkNomad AI. All rights reserved.</p>
        <div className="flex gap-4 mt-2">
          <a href="#" className="hover:text-indigo-500">Terms</a>
          <a href="#" className="hover:text-indigo-500">Privacy</a>
          <a href="#" className="hover:text-indigo-500">API Documentation</a>
        </div>
      </footer>
    </div>
  );
};

export default App;

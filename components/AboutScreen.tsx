import React from 'react';

interface AboutScreenProps {
  onClose: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onClose }) => {
  const buildTime = new Date(__BUILD_TIME__).toLocaleString();
  const gitCommit = __GIT_COMMIT__.substring(0, 7);
  const gitBranch = __GIT_BRANCH__;

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-2">About</h2>
          <p className="text-gray-400">Piano Practice Pal</p>
          <p className="text-xs text-gray-500 mt-1">
            {gitBranch}@{gitCommit} · {buildTime}
          </p>
        </div>

        {/* Description */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
          <p className="text-gray-300">
            Piano Practice Pal is a free educational application designed to help you master all 48 piano scales through daily practice and spaced repetition.
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-blue-600/10 border border-blue-500/30 rounded p-2 text-center">
              <div className="text-2xl font-bold text-blue-400">48</div>
              <div className="text-gray-400">Scales</div>
            </div>
            <div className="bg-green-600/10 border border-green-500/30 rounded p-2 text-center">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-gray-400">Free</div>
            </div>
            <div className="bg-purple-600/10 border border-purple-500/30 rounded p-2 text-center">
              <div className="text-2xl font-bold text-purple-400">0</div>
              <div className="text-gray-400">Ads</div>
            </div>
            <div className="bg-red-600/10 border border-red-500/30 rounded p-2 text-center">
              <div className="text-2xl font-bold text-red-400">0</div>
              <div className="text-gray-400">Data Collected</div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>All major, natural minor, harmonic minor & melodic minor scales</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Audio playback with Web Audio API (no downloads needed)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Visual piano keyboard with highlighted notes</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Music staff notation with proper key signatures</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Spaced repetition algorithm for optimal practice scheduling</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Practice history tracking and progress monitoring</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Offline support (works without internet connection)</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Export/import practice data for backup</span>
            </li>
          </ul>
        </div>

        {/* Privacy & Legal */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Privacy & Legal</h3>
          <div className="space-y-2">
            <a
              href="https://github.com/magdalenakusz/piano-practice-pal/blob/main/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              📄 Privacy Policy →
            </a>
            <p className="text-xs text-gray-500 ml-6">
              We collect ZERO data. Everything stays on your device.
            </p>
            
            <a
              href="https://github.com/magdalenakusz/piano-practice-pal/blob/main/TERMS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              📜 Terms of Service →
            </a>
            <p className="text-xs text-gray-500 ml-6">
              Free educational app provided "as is" for personal use.
            </p>
            
            <a
              href="https://github.com/magdalenakusz/piano-practice-pal/blob/main/LICENSES.md"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              ⚖️ Open Source Licenses →
            </a>
            <p className="text-xs text-gray-500 ml-6">
              Built with React, VexFlow, Vite, and more.
            </p>
          </div>
        </div>

        {/* Developer Info */}
        <div className="bg-gray-900/50 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-white mb-3">Developer</h3>
          <div className="space-y-2 text-sm text-gray-300">
            <p>
              <span className="font-semibold text-white">Created by:</span> Magdalena
            </p>
            <p>
              <span className="font-semibold text-white">Build:</span> {buildTime}
            </p>
            <p>
              <span className="font-semibold text-white">Commit:</span> {gitCommit} ({gitBranch})
            </p>
            <div className="pt-2 space-y-1">
              <a
                href="https://github.com/magdalenakusz/piano-practice-pal"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-400 hover:text-blue-300 transition-colors"
              >
                🌐 View Source Code on GitHub →
              </a>
              <a
                href="mailto:todo-email"
                className="block text-blue-400 hover:text-blue-300 transition-colors"
              >
                ✉️ Contact Support →
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-yellow-600/10 border border-yellow-500/30 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-yellow-400 mb-2">Educational Disclaimer</h3>
          <p className="text-xs text-gray-400">
            This app is for educational and entertainment purposes only. It is not a substitute for professional music instruction. Results vary based on individual practice and dedication.
          </p>
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className="mt-6 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transition-colors"
      >
        Close
      </button>
    </>
  );
};

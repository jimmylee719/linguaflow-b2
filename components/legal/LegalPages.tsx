
import React from 'react';
import { UI_TEXTS } from '../../constants';

interface LegalModalProps {
  title: string;
  content: string;
  onClose: () => void;
}

const renderWithBold = (text: string) => {
  const parts = text.split('**');
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
      )}
    </>
  );
};

const LegalModal: React.FC<LegalModalProps> = ({ title, content, onClose }) => (
  <div 
    className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-fade-in"
    onClick={onClose}
  >
    <div 
      className="bg-dark-surface rounded-lg p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-dark-border"
      onClick={e => e.stopPropagation()}
    >
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <div className="text-dark-text-secondary whitespace-pre-line leading-relaxed">{renderWithBold(content)}</div>
      <div className="text-center mt-8">
        <button 
          onClick={onClose} 
          className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/80 transition-colors"
        >
          {UI_TEXTS.close}
        </button>
      </div>
    </div>
    <style>{`
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fade-in { animation: fade-in 0.3s ease-out; }
    `}</style>
  </div>
);

export const AboutPage: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <LegalModal 
    title={UI_TEXTS.aboutTitle}
    content={UI_TEXTS.aboutContent}
    onClose={onClose}
  />
);

export const PrivacyPage: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <LegalModal 
    title={UI_TEXTS.privacyTitle}
    content={UI_TEXTS.privacyContent}
    onClose={onClose}
  />
);

export const HowToUsePage: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <LegalModal
    title={UI_TEXTS.howToUseTitle}
    content={UI_TEXTS.howToUseContent}
    onClose={onClose}
  />
);

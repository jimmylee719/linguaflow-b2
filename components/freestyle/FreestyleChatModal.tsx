import React, { useState, useRef, useEffect } from 'react';
import { Language, FreestyleHistoryItem, ConversationPart } from '../../types';
import { UI_TEXTS } from '../../constants';
import { generateFreestyleResponse } from '../../services/geminiService';
import { DialogueBubble } from '../simulation/DialogueBubble';
import { SendIcon } from '../icons/Icons';

interface FreestyleChatModalProps {
  language: Language;
  onClose: () => void;
}

const LoadingBubble: React.FC = () => (
    <div className="flex justify-start mb-4">
        <div className="max-w-xl w-full">
            <div className="text-sm text-dark-text-secondary mb-1 px-3">AI Assistant</div>
            <div className="bg-dark-surface rounded-bl-none rounded-2xl p-4 inline-flex items-center">
                <div className="animate-pulse flex space-x-2">
                    <div className="w-3 h-3 bg-dark-text-secondary rounded-full"></div>
                    <div className="w-3 h-3 bg-dark-text-secondary rounded-full animation-delay-200"></div>
                    <div className="w-3 h-3 bg-dark-text-secondary rounded-full animation-delay-400"></div>
                </div>
            </div>
        </div>
    </div>
);

export const FreestyleChatModal: React.FC<FreestyleChatModalProps> = ({ language, onClose }) => {
  const [history, setHistory] = useState<FreestyleHistoryItem[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [history, isLoading]);
  
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const newUserMessage: FreestyleHistoryItem = { type: 'user', text: userInput };
    const newHistory = [...history, newUserMessage];
    setHistory(newHistory);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponsePart = await generateFreestyleResponse(newHistory, userInput, language);
      const newAiMessage: FreestyleHistoryItem = { type: 'ai', part: aiResponsePart };
      setHistory([...newHistory, newAiMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: FreestyleHistoryItem = {
          type: 'ai',
          part: {
              speaker: 'System',
              text_original: '抱歉，我現在無法回覆。請稍後再試。',
              text_translation: 'Sorry, I cannot reply right now. Please try again later.',
              audio_lang_code: language === 'en' ? 'en-US' : 'es-ES',
              grammar_analysis: { point: 'Error', explanation: 'An error occurred while communicating with the AI.'},
              vocabulary: []
          }
      };
      setHistory([...newHistory, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4 animate-fade-in">
      <div className="bg-dark-bg rounded-lg max-w-3xl w-full h-[90vh] flex flex-col border border-dark-border">
        <header className="flex items-center justify-between p-4 border-b border-dark-border shrink-0">
          <h2 className="text-xl font-bold">{UI_TEXTS.freestyleChat}</h2>
          <button onClick={onClose} className="px-4 py-2 bg-dark-surface text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
            {UI_TEXTS.close}
          </button>
        </header>
        
        <main className="flex-grow p-4 overflow-y-auto">
          {history.map((item, index) => {
            if (item.type === 'user') {
              return (
                <div key={index} className="flex justify-end mb-4">
                  <div className="max-w-xl w-full">
                    <div className="text-sm text-dark-text-secondary mb-1 px-3 text-right">You</div>
                    <div className="bg-brand-primary rounded-br-none rounded-2xl p-4">
                      <p className="text-base leading-relaxed">{item.text}</p>
                    </div>
                  </div>
                </div>
              );
            }
            return <DialogueBubble key={index} part={item.part} isUser={false} />;
          })}
          {isLoading && <LoadingBubble />}
          <div ref={chatEndRef} />
        </main>
        
        <footer className="p-4 border-t border-dark-border shrink-0">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder={UI_TEXTS.freestylePlaceholder}
              className="w-full px-4 py-3 bg-dark-surface border border-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="p-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/80 transition-colors disabled:bg-brand-secondary disabled:cursor-not-allowed"
              disabled={isLoading || !userInput.trim()}
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </footer>
      </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
};

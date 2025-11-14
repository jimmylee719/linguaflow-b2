
import React, { useState, useEffect, useRef } from 'react';
import { Language, VocabularyPracticeItem } from '../../types';
import { UI_TEXTS } from '../../constants';
import { generateVocabularyList } from '../../services/geminiService';
import { SpeakerIcon, ChevronLeftIcon } from '../icons/Icons';

type PracticeView = 'guide' | 'loading' | 'results';

const preprocessTextForSpeech = (text: string): string => {
  return text
    .replace(/Mr\./g, 'Mister').replace(/Mrs\./g, 'Mistress').replace(/Ms\./g, 'Miss')
    .replace(/Dr\./g, 'Doctor').replace(/St\./g, 'Saint').replace(/Co\./g, 'Company')
    .replace(/Ltd\./g, 'Limited').replace(/etc\./g, 'et cetera').replace(/i\.e\./g, 'that is')
    .replace(/e\.g\./g, 'for example');
};

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

const VocabularyCard: React.FC<{
  item: VocabularyPracticeItem;
  language: Language;
  playAudio: (text: string, lang: string, rate: number) => void;
}> = ({ item, language, playAudio }) => {
  
  const getAudioLangCode = (lang: Language) => {
    if (lang === 'en') return 'en-US';
    if (lang === 'es') return 'es-ES';
    return 'ja-JP';
  }
  
  const getRate = (lang: Language) => {
      if (lang === 'es') return 0.65;
      return 0.75;
  }
  
  const audioLangCode = getAudioLangCode(language);
  const rate = getRate(language);
  
  const handlePlayWord = (e: React.MouseEvent) => {
    e.stopPropagation();
    playAudio(item.word, audioLangCode, rate);
  };
  
  const handlePlaySentence = (e: React.MouseEvent) => {
    e.stopPropagation();
    playAudio(item.example_sentence, audioLangCode, rate);
  };

  return (
    <div className="bg-dark-surface/50 rounded-lg border border-dark-border p-4 space-y-3">
      <div className="flex items-center gap-4">
        <h3 className="text-2xl font-bold text-brand-primary">{item.word}</h3>
        <span className="text-sm bg-dark-bg text-dark-text-secondary font-mono px-2 py-1 rounded">{item.pos}</span>
        <span className="text-dark-text-secondary">{item.translation}</span>
        <button onClick={handlePlayWord} className="ml-auto p-2 rounded-full hover:bg-black/20 transition-colors">
          <SpeakerIcon className="w-5 h-5" />
        </button>
      </div>
      <p className="text-dark-text-secondary">{item.description}</p>
      <div className="border-t border-dark-border/50 pt-3">
        <div className="flex items-start justify-between gap-4">
            <p className="italic text-brand-info">{item.example_sentence}</p>
            <button onClick={handlePlaySentence} className="p-2 rounded-full hover:bg-black/20 transition-colors shrink-0">
                <SpeakerIcon className="w-5 h-5" />
            </button>
        </div>
        <p className="text-sm text-dark-text-secondary mt-1">{item.example_sentence_translation}</p>
      </div>
    </div>
  );
};

export const VocabularyPracticeView: React.FC<{ language: Language, onGoBack: () => void; onGoHome: () => void; }> = ({ language, onGoBack, onGoHome }) => {
  const [practiceView, setPracticeView] = useState<PracticeView>('guide');
  const [list, setList] = useState<VocabularyPracticeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const populateVoices = () => { voicesRef.current = window.speechSynthesis.getVoices(); };
    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }, []);

  const playAudio = (text: string, lang: string, rate: number) => {
    const processedText = preprocessTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(processedText);
    utterance.lang = lang;
    utterance.rate = rate;

    const voices = voicesRef.current.filter(v => v.lang.startsWith(lang.split('-')[0]));
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (lang.startsWith('en')) {
      selectedVoice = voices.find(v => v.name === 'Google US English') || voices.find(v => v.lang === 'en-US');
    } else if (lang.startsWith('es')) {
      selectedVoice = voices.find(v => v.name === 'Google español') || voices.find(v => v.lang === 'es-ES' || v.lang === 'es-MX');
    } else if (lang.startsWith('ja')) {
      selectedVoice = voices.find(v => v.name === 'Google 日本語') || voices.find(v => v.lang === 'ja-JP');
    }
    utterance.voice = selectedVoice || voices[0] || null;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };
  
  const handleStart = async () => {
    setPracticeView('loading');
    setIsLoading(true);
    setError(null);
    setList([]);
    try {
      const result = await generateVocabularyList(language);
      setList(result);
      setPracticeView('results');
    } catch (err) {
      setError(UI_TEXTS.aiError);
      alert(UI_TEXTS.aiError);
      setPracticeView('guide');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoBackToGuide = () => {
    setPracticeView('guide');
    setList([]);
    setError(null);
  };

  if (practiceView === 'loading') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mb-4"></div>
        <h2 className="text-2xl font-semibold">{UI_TEXTS.generatingWords}</h2>
      </div>
    );
  }

  if (practiceView === 'results') {
    return (
      <div className="min-h-screen w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
        <header className="relative flex flex-col items-center mb-8">
          <button
            onClick={handleGoBackToGuide}
            className="absolute top-0 left-0 flex items-center gap-1 text-dark-text-secondary hover:text-white transition-colors"
            aria-label={UI_TEXTS.goBack}
          >
            <ChevronLeftIcon className="w-5 h-5" />
            <span>{UI_TEXTS.goBack}</span>
          </button>
          <h1 className="text-3xl font-bold">{UI_TEXTS.vocabularyPractice}</h1>
        </header>

        {error && <p className="text-center text-brand-danger mb-4">{error}</p>}
        
        <div className="space-y-4">
          {list.map((item, index) => (
            <VocabularyCard key={index} item={item} language={language} playAudio={playAudio} />
          ))}
        </div>

        <div className="mt-12 text-center flex items-center justify-center gap-4">
            <button onClick={onGoHome} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                {UI_TEXTS.goHome}
            </button>
            <button onClick={handleGoBackToGuide} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                {UI_TEXTS.goBack}
            </button>
        </div>
        <style>{`
          @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fade-in 0.5s ease-out; }
        `}</style>
      </div>
    );
  }

  // Default view is 'guide'
  let guideTitle = '';
  let guideContent = '';

  switch (language) {
    case 'en':
      guideTitle = UI_TEXTS.englishPronunciationGuideTitle;
      guideContent = UI_TEXTS.englishPronunciationGuideContent;
      break;
    case 'es':
      guideTitle = UI_TEXTS.spanishPronunciationGuideTitle;
      guideContent = UI_TEXTS.spanishPronunciationGuideContent;
      break;
    case 'ja':
      guideTitle = UI_TEXTS.japanesePronunciationGuideTitle;
      guideContent = UI_TEXTS.japanesePronunciationGuideContent;
      break;
  }

  return (
    <div className="min-h-screen w-full max-w-4xl mx-auto p-4 md:p-8 animate-fade-in">
      <header className="relative flex flex-col items-center mb-8">
        <button
          onClick={onGoBack}
          className="absolute top-0 left-0 flex items-center gap-1 text-dark-text-secondary hover:text-white transition-colors"
          aria-label={UI_TEXTS.goBack}
        >
          <ChevronLeftIcon className="w-5 h-5" />
          <span>{UI_TEXTS.goBack}</span>
        </button>
        <h1 className="text-3xl font-bold">{UI_TEXTS.vocabularyPractice}</h1>
      </header>

      <div className="bg-dark-surface rounded-lg p-6 border border-dark-border mb-8">
        <h2 className="text-xl font-semibold mb-4 text-brand-warning">{guideTitle}</h2>
        <div className="whitespace-pre-line leading-relaxed text-dark-text-secondary">
          {renderWithBold(guideContent)}
        </div>
      </div>

      <div className="text-center mb-8">
        <button
          onClick={handleStart}
          disabled={isLoading}
          className="px-8 py-4 text-lg font-semibold bg-brand-primary text-white rounded-lg hover:bg-brand-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:bg-brand-secondary disabled:cursor-not-allowed"
        >
          {UI_TEXTS.startPractice}
        </button>
      </div>
       <div className="mt-8 text-center">
            <button onClick={onGoBack} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                {UI_TEXTS.goBack}
            </button>
        </div>
      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.5s ease-out; }
      `}</style>
    </div>
  );
};
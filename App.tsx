
import React, { useState } from 'react';
import { Language, DialogueResponse } from './types';
import { Scenario, UI_TEXTS } from './constants';
import { EnglishGrammarOutline } from './components/dashboard/EnglishTenseTimeline';
import { SpanishGenderMap } from './components/dashboard/SpanishGenderMap';
import { JapaneseGrammarMap } from './components/dashboard/JapaneseGrammarMap';
import { SimulationView } from './components/simulation/SimulationView';
import { generateDialogue } from './services/geminiService';
import { AboutPage, PrivacyPage, HowToUsePage } from './components/legal/LegalPages';
import { FreestyleChatModal } from './components/freestyle/FreestyleChatModal';
import { VocabularyPracticeView } from './components/vocabulary/VocabularyPracticeView';

type View = 'dashboard' | 'simulation' | 'vocabulary';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language | null>(null);
  const [view, setView] = useState<View>('dashboard');
  const [dialogueData, setDialogueData] = useState<DialogueResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);
  const [showFreestyleChat, setShowFreestyleChat] = useState(false);

  const handleSelectLanguage = (lang: Language) => {
    setLanguage(lang);
  };
  
  const handleStartLearning = () => {
      if (language) {
          setView('simulation');
      }
  }

  const handleGenerateScenario = async (scenario: Scenario) => {
    if (!language) return;

    setIsLoading(true);
    setError(null);
    setDialogueData(null);

    try {
      const data = await generateDialogue(scenario, language);
      setDialogueData(data);
    } catch (err) {
      setError(UI_TEXTS.aiError);
      alert(UI_TEXTS.aiError);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setDialogueData(null);
    setError(null);
  };
  
  const handleGoBackToDashboard = () => {
    setDialogueData(null);
    setError(null);
    setView('dashboard');
  }
  
  const handleGoHome = () => {
    handleGoBackToDashboard();
    setLanguage(null);
  }

  const renderDashboard = () => (
    <div className="min-h-screen flex flex-col p-4 text-center">
      <main className="flex-grow flex flex-col items-center justify-center w-full">
        <header className="mb-10">
          <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 font-logo">
            {UI_TEXTS.appName}
          </h1>
          <p className="text-dark-text-secondary mt-2 text-lg">{UI_TEXTS.appSubtitle}</p>
        </header>
        
        {!language ? (
          <>
            <h2 className="text-2xl font-semibold mb-6">{UI_TEXTS.selectLanguage}</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <button onClick={() => handleSelectLanguage('en')} className="px-8 py-4 text-lg font-semibold bg-dark-surface border border-dark-border rounded-lg hover:bg-brand-primary/20 hover:border-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg">
                {UI_TEXTS.english}
              </button>
              <button onClick={() => handleSelectLanguage('es')} className="px-8 py-4 text-lg font-semibold bg-dark-surface border border-dark-border rounded-lg hover:bg-brand-primary/20 hover:border-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg">
                {UI_TEXTS.spanish}
              </button>
              <button onClick={() => handleSelectLanguage('ja')} className="px-8 py-4 text-lg font-semibold bg-dark-surface border border-dark-border rounded-lg hover:bg-brand-primary/20 hover:border-brand-primary transition-all duration-300 transform hover:scale-105 shadow-lg">
                {UI_TEXTS.japanese}
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 w-full">
              {language === 'en' && <EnglishGrammarOutline />}
              {language === 'es' && <SpanishGenderMap />}
              {language === 'ja' && <JapaneseGrammarMap />}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-4 w-full max-w-xs sm:max-w-none">
                  <button onClick={handleStartLearning} className="px-8 py-3 font-semibold bg-brand-primary text-white rounded-lg hover:bg-brand-primary/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {UI_TEXTS.startLearning}
                  </button>
                  <button onClick={() => setShowFreestyleChat(true)} className="px-8 py-3 font-semibold bg-brand-success text-white rounded-lg hover:bg-brand-success/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {UI_TEXTS.freestyleChat}
                  </button>
                  <button onClick={() => setView('vocabulary')} className="px-8 py-3 font-semibold bg-brand-danger text-white rounded-lg hover:bg-brand-danger/80 transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {UI_TEXTS.vocabularyPractice}
                  </button>
              </div>
          </div>
        )}
      </main>
      
      {language && view === 'dashboard' && (
        <div className="shrink-0 py-4">
            <button onClick={() => setLanguage(null)} className="px-8 py-3 font-semibold bg-dark-surface border border-dark-border rounded-lg hover:opacity-80 transition-opacity">
              {UI_TEXTS.goBack}
            </button>
        </div>
      )}

      <footer className="shrink-0 py-4 text-sm text-dark-text-secondary">
        <button onClick={() => setShowAbout(true)} className="hover:text-white px-2 transition-colors">{UI_TEXTS.about}</button>
        <span className="opacity-50">|</span>
        <button onClick={() => setShowPrivacy(true)} className="hover:text-white px-2 transition-colors">{UI_TEXTS.privacyPolicy}</button>
        <span className="opacity-50">|</span>
        <button onClick={() => setShowHowToUse(true)} className="hover:text-white px-2 transition-colors">{UI_TEXTS.howToUse}</button>
      </footer>
    </div>
  );

  return (
    <>
      {view === 'dashboard' && renderDashboard()}
      {view === 'simulation' && language && (
        <SimulationView
          language={language}
          onGenerateScenario={handleGenerateScenario}
          dialogueData={dialogueData}
          isLoading={isLoading}
          onReset={handleReset}
          onGoBack={handleGoBackToDashboard}
          onGoHome={handleGoHome}
        />
      )}
      {view === 'vocabulary' && language && (
        <VocabularyPracticeView
            language={language}
            onGoBack={handleGoBackToDashboard}
            onGoHome={handleGoHome}
        />
      )}
      {showAbout && <AboutPage onClose={() => setShowAbout(false)} />}
      {showPrivacy && <PrivacyPage onClose={() => setShowPrivacy(false)} />}
      {showHowToUse && <HowToUsePage onClose={() => setShowHowToUse(false)} />}
      {showFreestyleChat && language && <FreestyleChatModal language={language} onClose={() => setShowFreestyleChat(false)} />}
    </>
  );
};

export default App;


import React from 'react';
import { DialogueResponse, Language } from '../../types';
import { Scenario, UI_TEXTS, SCENARIO_DETAILS } from '../../constants';
import * as Icons from '../icons/Icons';
import { DialogueBubble } from './DialogueBubble';

type IconName = keyof typeof Icons;

interface SimulationViewProps {
  language: Language;
  onGenerateScenario: (scenario: Scenario) => void;
  dialogueData: DialogueResponse | null;
  isLoading: boolean;
  onReset: () => void;
  onGoBack: () => void;
  onGoHome: () => void;
}

const ScenarioSelector: React.FC<{ onSelect: (scenario: Scenario) => void }> = ({ onSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">{UI_TEXTS.selectScenario}</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {SCENARIO_DETAILS.map(({ scenario, label, icon }) => {
          const IconComponent = Icons[icon as IconName];
          return (
            <button
              key={scenario}
              onClick={() => onSelect(scenario)}
              className="p-6 bg-dark-surface border border-dark-border rounded-lg flex flex-col items-center justify-center text-center hover:bg-brand-primary/20 hover:border-brand-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              {IconComponent && <IconComponent className="w-10 h-10 mb-3 text-brand-primary" />}
              <span className="font-semibold">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const LoadingIndicator: React.FC = () => (
  <div className="flex flex-col items-center justify-center text-center">
    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-primary mb-4"></div>
    <h2 className="text-2xl font-semibold">{UI_TEXTS.generatingScenario}</h2>
  </div>
);

const DialogueDisplay: React.FC<{ data: DialogueResponse, onReset: () => void, onGoBack: () => void, onGoHome: () => void }> = ({ data, onReset, onGoBack, onGoHome }) => {
  return (
    <div className="w-full max-w-3xl mx-auto">
        <div className="relative text-center mb-8 p-4 bg-dark-surface rounded-lg border border-dark-border">
            <button 
              onClick={onReset} 
              className="absolute top-4 left-4 p-2 text-dark-text-secondary hover:text-white rounded-full transition-colors"
              aria-label={UI_TEXTS.goBack}
            >
              <Icons.ChevronLeftIcon className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-2 mx-12">{data.scenario_title}</h2>
            <p className="text-dark-text-secondary mb-2">{data.context_description}</p>
            <span className="text-xs font-bold bg-brand-info/20 text-brand-info px-3 py-1 rounded-full">{data.difficulty_level}</span>
        </div>

        <div>
            {data.conversation.map((part, index) => (
                <DialogueBubble key={index} part={part} isUser={index % 2 !== 0} />
            ))}
        </div>

        <div className="mt-8 p-4 bg-dark-surface rounded-lg border border-dark-border">
            <h3 className="text-lg font-semibold mb-2">{UI_TEXTS.culturalNote}</h3>
            <p className="text-dark-text-secondary">{data.cultural_note}</p>
        </div>
        
        <div className="mt-8 text-center flex items-center justify-center gap-4">
             <button onClick={onGoHome} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                {UI_TEXTS.goHome}
            </button>
             <button onClick={onReset} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                {UI_TEXTS.goBack}
            </button>
             <button onClick={onReset} className="px-6 py-2 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-primary/80 transition-colors">
                {UI_TEXTS.newScenario}
            </button>
        </div>
    </div>
  );
};


export const SimulationView: React.FC<SimulationViewProps> = ({ language, onGenerateScenario, dialogueData, isLoading, onReset, onGoBack, onGoHome }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {isLoading ? (
        <LoadingIndicator />
      ) : dialogueData ? (
        <DialogueDisplay data={dialogueData} onReset={onReset} onGoBack={onGoBack} onGoHome={onGoHome} />
      ) : (
        <div className="relative w-full max-w-4xl mx-auto">
            <button 
              onClick={onGoBack} 
              className="absolute -top-16 md:-top-12 left-0 flex items-center gap-1 text-dark-text-secondary hover:text-white transition-colors"
              aria-label={UI_TEXTS.goBack}
            >
              <Icons.ChevronLeftIcon className="w-5 h-5" />
              <span>{UI_TEXTS.goBack}</span>
            </button>
            <ScenarioSelector onSelect={onGenerateScenario} />
            <div className="mt-12 text-center flex items-center justify-center gap-4">
                <button onClick={onGoHome} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                    {UI_TEXTS.goHome}
                </button>
                <button onClick={onGoBack} className="px-6 py-2 bg-dark-surface border border-dark-border text-white font-semibold rounded-lg hover:opacity-80 transition-colors">
                    {UI_TEXTS.goBack}
                </button>
            </div>
        </div>
      )}
    </div>
  );
};

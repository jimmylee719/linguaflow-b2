
import React, { useEffect, useRef } from 'react';
import { ConversationPart } from '../../types';
import { UI_TEXTS } from '../../constants';
import { SpeakerIcon } from '../icons/Icons';

interface DialogueBubbleProps {
  part: ConversationPart;
  isUser: boolean;
}

const preprocessTextForSpeech = (text: string): string => {
    return text
        .replace(/Mr\./g, 'Mister')
        .replace(/Mrs\./g, 'Mistress')
        .replace(/Ms\./g, 'Miss')
        .replace(/Dr\./g, 'Doctor')
        .replace(/St\./g, 'Saint')
        .replace(/Co\./g, 'Company')
        .replace(/Ltd\./g, 'Limited')
        .replace(/etc\./g, 'et cetera')
        .replace(/i\.e\./g, 'that is')
        .replace(/e\.g\./g, 'for example');
};

export const DialogueBubble: React.FC<DialogueBubbleProps> = ({ part, isUser }) => {
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const populateVoices = () => {
      voicesRef.current = window.speechSynthesis.getVoices();
    };
    populateVoices();
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }, []);

  const playAudio = (text: string, lang: string, rate: number = 1) => {
    const processedText = preprocessTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(processedText);
    
    utterance.lang = lang;
    utterance.rate = rate;

    const voices = voicesRef.current.filter(v => v.lang.startsWith(lang.split('-')[0]));
    let selectedVoice: SpeechSynthesisVoice | undefined;

    if (lang.startsWith('en')) {
      selectedVoice = voices.find(v => v.name === 'Google US English');
      if (!selectedVoice) {
        selectedVoice = voices.find(v => v.lang === 'en-US');
      }
    } else if (lang.startsWith('es')) {
        selectedVoice = voices.find(v => v.name === 'Google español');
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang === 'es-ES' || v.lang === 'es-MX');
        }
    } else if (lang.startsWith('ja')) {
        selectedVoice = voices.find(v => v.name === 'Google 日本語');
        if (!selectedVoice) {
            selectedVoice = voices.find(v => v.lang === 'ja-JP');
        }
    }
    
    utterance.voice = selectedVoice || voices[0] || null;
    
    console.log(`TTS Request: Text="${processedText}", Lang=${utterance.lang}, Rate=${utterance.rate}, Voice=${utterance.voice ? utterance.voice.name : 'Default Browser Voice'}`);
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const getRateForLang = (langCode: string): number => {
      if (langCode.startsWith('es')) return 0.65;
      return 0.75; // Default for English and Japanese
  }

  const handlePlayMainAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rate = getRateForLang(part.audio_lang_code);
    playAudio(part.text_original, part.audio_lang_code, rate);
  };
  
  const handlePlayVocabAudio = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const rate = getRateForLang(part.audio_lang_code);
    playAudio(word, part.audio_lang_code, rate);
  }

  const bubbleAlignment = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser ? 'bg-brand-primary' : 'bg-dark-surface';
  const bubbleRadius = isUser ? 'rounded-br-none' : 'rounded-bl-none';

  return (
    <div className={`flex ${bubbleAlignment} mb-4`}>
      <div className={`max-w-xl w-full`}>
        <div className="text-sm text-dark-text-secondary mb-1 px-3" style={{ textAlign: isUser ? 'right' : 'left' }}>
          {part.speaker}
        </div>

        {/* Original Text Bubble */}
        <div className={`${bubbleColor} ${bubbleRadius} rounded-2xl p-4`}>
          <div className="flex items-center justify-between">
            <p className="text-base leading-relaxed">{part.text_original}</p>
            <button onClick={handlePlayMainAudio} className="ml-4 p-2 rounded-full hover:bg-black/20 transition-colors">
              <SpeakerIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chinese Translation */}
        <div className="px-4 py-2 mt-2 text-dark-text-secondary text-left bg-dark-surface/30 rounded-lg">
           <span className="font-semibold text-brand-info text-xs mr-2">{UI_TEXTS.translation}</span>
           {part.text_translation}
        </div>
        
        {/* Analysis Card */}
        <div className="mt-2 p-4 bg-dark-surface/50 rounded-lg border border-dark-border space-y-4">
          <div>
            <h4 className="font-semibold text-brand-warning mb-1">{UI_TEXTS.grammarAnalysis}</h4>
            <p className="font-medium">{part.grammar_analysis.point}</p>
            <p className="text-dark-text-secondary">{part.grammar_analysis.explanation}</p>
          </div>
          
          <div className="border-t border-dark-border/50 pt-4">
            <h4 className="font-semibold text-brand-success mb-2">{UI_TEXTS.keyVocabulary}</h4>
            <div className="space-y-2">
              {part.vocabulary.map((vocab, index) => (
                <div key={index} className="flex items-center">
                  <span className="font-semibold text-base w-28 shrink-0">{vocab.word}</span>
                  <span className="text-xs bg-dark-bg text-dark-text-secondary font-mono px-2 py-0.5 rounded mr-2">{vocab.pos}</span>
                  <span className="text-dark-text-secondary flex-grow">{vocab.translation}</span>
                  <button onClick={(e) => handlePlayVocabAudio(e, vocab.word)} className="ml-4 p-2 rounded-full hover:bg-black/20 transition-colors">
                    <SpeakerIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

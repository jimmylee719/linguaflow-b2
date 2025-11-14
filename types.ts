import { Scenario } from './constants';

export type Language = 'en' | 'es' | 'ja';

export interface GrammarAnalysis {
  point: string;
  explanation: string;
}

export interface VocabularyItem {
  word: string;
  pos: string; // part of speech
  translation: string;
}

export interface ConversationPart {
  speaker: string;
  text_original: string;
  text_translation: string;
  audio_lang_code: 'en-US' | 'en-GB' | 'es-ES' | 'es-MX' | 'ja-JP';
  grammar_analysis: GrammarAnalysis;
  vocabulary: VocabularyItem[];
}

export interface DialogueResponse {
  scenario_title: string;
  difficulty_level: 'B2' | 'C1';
  context_description: string;
  conversation: ConversationPart[];
  cultural_note: string;
}

export type FreestyleHistoryItem =
  | { type: 'user'; text: string }
  | { type: 'ai'; part: ConversationPart };

export interface VocabularyPracticeItem {
  word: string;
  pos: string;
  translation: string;
  description: string;
  example_sentence: string;
  example_sentence_translation: string;
}

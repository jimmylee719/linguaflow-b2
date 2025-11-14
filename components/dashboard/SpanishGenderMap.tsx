import React from 'react';
import { UI_TEXTS } from '../../constants';

const GrammarSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <details className="bg-dark-bg/50 rounded-lg border border-dark-border overflow-hidden">
    <summary className="px-4 py-3 font-semibold cursor-pointer hover:bg-dark-surface/50">
      {title}
    </summary>
    <div className="px-4 pb-4 pt-2 border-t border-dark-border text-left">
      {children}
    </div>
  </details>
);

const GrammarRule: React.FC<{ rule: string; example: string }> = ({ rule, example }) => (
  <div className="mt-3">
    <p className="text-dark-text">{rule}</p>
    <p className="text-sm text-brand-info mt-1 font-mono bg-dark-bg p-2 rounded">e.g., {example}</p>
  </div>
);

export const SpanishGenderMap: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-6 bg-dark-surface rounded-lg border border-dark-border">
      <h3 className="text-lg font-semibold text-center mb-6">{UI_TEXTS.spanishGenderMapTitle}</h3>
      <div className="space-y-3">
        <GrammarSection title="名詞的性別 (Noun Gender)">
          <GrammarRule 
            rule="陽性名詞通常以 -o 結尾，搭配冠詞 el / los。"
            example="el libro (the book), los libros (the books)"
          />
          <GrammarRule 
            rule="陰性名詞通常以 -a 結尾，搭配冠詞 la / las。"
            example="la casa (the house), las casas (the houses)"
          />
           <GrammarRule 
            rule="注意：有些例外，如 el problema (陽性), la mano (陰性)。"
            example="Es un problema grande. Me lavo las manos."
          />
        </GrammarSection>
        <GrammarSection title="動詞變位基礎 (Verb Conjugation Basics)">
          <GrammarRule 
            rule="-ar 動詞 (例如 hablar - to speak): yo hablo, tú hablas, él habla"
            example="Yo hablo español."
          />
           <GrammarRule 
            rule="-er 動詞 (例如 comer - to eat): yo como, tú comes, él come"
            example="Tú comes mucho."
          />
           <GrammarRule 
            rule="-ir 動詞 (例如 vivir - to live): yo vivo, tú vives, él vive"
            example="Él vive en Madrid."
          />
        </GrammarSection>
        <GrammarSection title="Ser vs. Estar (To be 的區別)">
           <GrammarRule 
            rule="Ser 用於描述永久性或本質特徵。"
            example="Yo soy de Taiwán. (I am from Taiwan.)"
          />
           <GrammarRule 
            rule="Estar 用於描述暫時性狀態或位置。"
            example="El café está caliente. (The coffee is hot.)"
          />
        </GrammarSection>
        <GrammarSection title="過去時態的區別 (Past Tense Distinction - B2)">
           <GrammarRule 
            rule="Pretérito (簡單過去式): 用於描述在過去特定時間點發生且已完成的動作。"
            example="Ayer compré un libro. (Yesterday I bought a book.)"
          />
           <GrammarRule 
            rule="Imperfecto (過去未完成式): 用于描述過去的習慣性動作、背景情況或未完成的動作。"
            example="Cuando era niño, jugaba al fútbol todos los días. (When I was a child, I played soccer every day.)"
          />
        </GrammarSection>
        <GrammarSection title="虛擬式 (Subjunctive Mood - B2)">
           <GrammarRule 
            rule="用於表達願望、懷疑、情感或不確定性，通常由 'que' 引導。"
            example="Espero que tengas un buen día. (I hope you have a good day.)"
          />
           <GrammarRule 
            rule="在非個人表達 (impersonal expressions) 後使用，如 'es importante que'。"
            example="Es importante que estudies para el examen. (It's important that you study for the exam.)"
          />
        </GrammarSection>
      </div>
    </div>
  );
};

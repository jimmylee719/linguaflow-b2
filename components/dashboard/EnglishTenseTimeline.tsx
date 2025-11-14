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

export const EnglishGrammarOutline: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-6 bg-dark-surface rounded-lg border border-dark-border">
      <h3 className="text-lg font-semibold text-center mb-6">{UI_TEXTS.tenseTimelineTitle}</h3>
      <div className="space-y-3">
        <GrammarSection title="現在式 (Present Simple)">
          <GrammarRule 
            rule="第三人稱單數 (he, she, it)，動詞結尾加 -s 或 -es。"
            example="She works from home. He watches movies."
          />
          <GrammarRule 
            rule="其他人稱，使用動詞原形。"
            example="I work from home. They watch movies."
          />
        </GrammarSection>
        <GrammarSection title="過去式 (Past Simple)">
          <GrammarRule 
            rule="規則動詞，結尾加 -ed。"
            example="She worked yesterday. They watched a movie."
          />
           <GrammarRule 
            rule="不規則動詞有自己的特定形式，需要記憶。"
            example="I went to the store. She ate breakfast."
          />
        </GrammarSection>
        <GrammarSection title="未來式 (Future Simple)">
           <GrammarRule 
            rule="使用 will + 動詞原形，表示預測或即時決定。"
            example="I will call you later."
          />
           <GrammarRule 
            rule="使用 be going to + 動詞原形，表示計畫或意圖。"
            example="We are going to visit Japan next year."
          />
        </GrammarSection>
         <GrammarSection title="問句與否定句 (Questions & Negations)">
           <GrammarRule 
            rule="現在式與過去式的問句/否定句，需要助動詞 do/does/did。"
            example="Does she work here? They did not go to the party."
          />
        </GrammarSection>
        <GrammarSection title="進階時態 (Advanced Tenses - B2)">
           <GrammarRule 
            rule="現在完成式 vs. 簡單過去式：完成式強調過去動作與現在的關聯；過去式指明特定過去時間點。"
            example="I have lost my keys. (I can't find them now) vs. I lost my keys yesterday."
          />
           <GrammarRule 
            rule="過去完成式：用於描述在另一個過去動作發生之前就已經完成的動作。"
            example="By the time he arrived, the train had already left."
          />
        </GrammarSection>
        <GrammarSection title="條件句 (Conditionals - B2)">
           <GrammarRule 
            rule="第二條件句：用於描述與現在事實相反的假設情況。"
            example="If I had more money, I would buy a new car."
          />
           <GrammarRule 
            rule="第三條件句：用於描述與過去事實相反的假設情況，表達後悔或評論。"
            example="If she had studied harder, she would have passed the exam."
          />
        </GrammarSection>
      </div>
    </div>
  );
};

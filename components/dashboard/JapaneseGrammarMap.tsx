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

export const JapaneseGrammarMap: React.FC = () => {
  return (
    <div className="w-full max-w-2xl p-6 bg-dark-surface rounded-lg border border-dark-border">
      <h3 className="text-lg font-semibold text-center mb-6">{UI_TEXTS.japaneseGrammarMapTitle}</h3>
      <div className="space-y-3">
        <GrammarSection title="核心助詞 (Core Particles)">
          <GrammarRule 
            rule="は (wa): 主題標記，用於介紹一個話題。"
            example="私は学生です。 (Watashi wa gakusei desu.) - 我是學生。"
          />
          <GrammarRule 
            rule="が (ga): 主格標記，用於強調主語或描述現象。"
            example="雨が降っています。 (Ame ga futte imasu.) - 正在下雨。"
          />
           <GrammarRule 
            rule="を (o): 受格標記，表示動作的直接對象。"
            example="パンを食べます。 (Pan o tabemasu.) - 我吃麵包。"
          />
           <GrammarRule 
            rule="に (ni): 表示時間點、目的地、存在位置。"
            example="３時に起きます。 (San-ji ni okimasu.) - 我三點起床。"
          />
        </GrammarSection>
        <GrammarSection title="動詞基礎 (Verb Basics)">
          <GrammarRule 
            rule="ます形 (masu-form): 動詞的禮貌形式，用於正式場合。"
            example="行きます (ikimasu - 去), 見ます (mimasu - 看)"
          />
           <GrammarRule 
            rule="辞書形 (dictionary form): 動詞的原形，用於非正式場合。"
            example="行く (iku - 去), 見る (miru - 看)"
          />
           <GrammarRule 
            rule="て形 (te-form): 用於連接多個動作、請求等。"
            example="起きて、顔を洗って、朝ご飯を食べます。 (Okite, kao o aratte, asagohan o tabemasu.) - 起床、洗臉，然後吃早餐。"
          />
        </GrammarSection>
        <GrammarSection title="形容詞 (Adjectives)">
           <GrammarRule 
            rule="い形容詞 (i-adjectives): 直接修飾名詞，結尾是「い」。"
            example="高いビル (takai biru - 高的建築), この本は面白いです (kono hon wa omoshiroi desu - 這本書很有趣)。"
          />
           <GrammarRule 
            rule="な形容詞 (na-adjectives): 修飾名詞時，需要加「な」。"
            example="静かな町 (shizuka na machi - 安靜的城鎮), 彼は親切です (kare wa shinsetsu desu - 他很親切)。"
          />
        </GrammarSection>
        <GrammarSection title="句子結構 (Sentence Structure)">
           <GrammarRule 
            rule="基本語序是「主語 - 賓語 - 動詞」(SOV)。"
            example="猫が魚を食べた。 (Neko ga sakana o tabeta.) - 貓吃了魚。"
          />
           <GrammarRule 
            rule="疑問句在句尾加上「か」(ka)。"
            example="これは本ですか。 (Kore wa hon desu ka?) - 這是書嗎？"
          />
        </GrammarSection>
      </div>
    </div>
  );
};

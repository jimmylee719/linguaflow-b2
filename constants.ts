
export enum Scenario {
  Work = 'Work',
  Tourism = 'Tourism',
  Academic = 'Academic',
  Dining = 'Dining',
  Entertainment = 'Entertainment',
  Shopping = 'Shopping',
  CrisisManagement = 'Crisis_Management',
  Negotiation = 'Negotiation',
  MedicalEmergency = 'Medical_Emergency',
}

export const UI_TEXTS = {
  appName: "LinguaFlow B2",
  appSubtitle: "終極沈浸式語言工具",
  selectLanguage: "選擇您的目標語言",
  english: "英語 (English)",
  spanish: "西班牙語 (Español)",
  japanese: "日語 (日本語)",
  tenseTimelineTitle: "英語核心文法大綱",
  past: "過去",
  present: "現在",
  future: "未來",
  spanishGenderMapTitle: "西班牙語性別與動詞變位核心",
  japaneseGrammarMapTitle: "日語核心文法大綱",
  masculine: "陽性",
  feminine: "陰性",
  verbGroups: "動詞分類",
  continue: "繼續",
  selectScenario: "選擇一個模擬情境",
  generatingScenario: "正在生成情境，請稍候...",
  aiError: "AI 模型生成失敗，請稍後再試。",
  goBack: "返回",
  goHome: "回到首頁",
  newScenario: "新情境",
  translation: "中文翻譯",
  grammarAnalysis: "文法解析",
  keyVocabulary: "重點單字",
  culturalNote: "文化小提示",
  startLearning: "開始學習",
  freestyleChat: "自由對話",
  freestylePlaceholder: "輸入任何你想說的話...",
  send: "發送",
  about: "關於我們",
  privacyPolicy: "隱私權政策",
  howToUse: "使用教學",
  close: "關閉",
  aboutTitle: "關於 LinguaFlow B2",
  aboutContent: `LinguaFlow B2 是一個專為繁體中文使用者設計的終極沈浸式語言學習工具。我們的核心哲學是「不背單字」，透過模擬真實世界的考試情境（雅思、多益），讓使用者在上下文中自然吸收語言。

我們相信，語言學習的關鍵在於理解結構與邏輯，而非死記硬背。因此，我們透過視覺化的文法地圖與互動式的對話模擬，幫助您建立扎實的語言基礎，充滿自信地達到 B2 甚至 C1 的流利程度。

聯絡我們: skadoosh.ai.lab@gmail.com`,
  privacyTitle: "隱私權政策",
  privacyContent: `我們致力於保護您的隱私。本應用程式蒐集的資訊僅用於提升您的學習體驗。

1.  **數據蒐集**：我們不會儲存您的個人對話紀錄。所有與 AI 的互動都在您的裝置上即時處理，並且是匿名的。
2.  **API 使用**：我們使用 Google Gemini API 來生成學習內容。您的請求會被傳送至 Google，並受其隱私政策的約束。
3.  **無廣告**：我們承諾提供一個純淨、無廣告的學習環境。

感謝您信任 LinguaFlow B2。`,
  howToUseTitle: "使用教學",
  howToUseContent: `歡迎使用 LinguaFlow B2！為了幫助您快速上手，請參考以下教學：

1. **選擇目標語言**
   - 進入 App 後，首先選擇您想學習的語言：英語 (English) 或 西班牙語 (Español)。

2. **探索文法核心 (主畫面)**
   - 選擇語言後，您會看到該語言的核心文法地圖。
   - **英語**: 核心時態時間軸，幫助您理解不同時態的應用時機。
   - **西班牙語**: 性別與動詞變位核心圖，掌握西班牙語的基礎結構。
   - 您可以點擊展開各個項目，查看詳細的規則與範例。

3. **開始模擬情境 (Start Learning)**
   - 準備好後，點擊「開始學習」按鈕。
   - 選擇一個您感興趣的模擬情境，例如「職場辦公」或「餐廳用餐」。
   - AI 將會為您生成一段符合 B2/C1 程度的真實對話。

4. **深入學習對話**
   - **播放語音**: 點擊對話框旁的喇叭圖示，聆聽標準發音。
   - **查看翻譯**: 每句原文下方都有中文翻譯，幫助您理解。
   - **文法解析**: 深入分析句子中使用的關鍵文法點。
   - **重點單字**: 學習對話中的核心單字，包含詞性、中文意思，並可點擊喇叭單獨聽發音。
   - **文化小提示**: 在對話結束後，還會有與該情境相關的文化知識補充。

5. **自由對話 (Freestyle Chat)**
   - 在主畫面點擊「自由對話」按鈕。
   - 這是一個與 AI 自由聊天的模式。您可以輸入任何想說的話（建議使用中文，AI 會用目標語言回覆）。
   - AI 的每一句回覆都會像模擬情境一樣，提供完整的翻譯、文法和單字分析，讓您在實戰中學習。

我們的目標是讓您在真實的語境中「用」語言，而不是死記硬背。祝您學習愉快！`,
  vocabularyPractice: "單字發音練習",
  startPractice: "開始練習",
  generatingWords: "正在生成單字列表...",
  englishPronunciationGuideTitle: "英語基本發音指南",
  englishPronunciationGuideContent: `**母音 (Vowels)**
- **短母音**: a [æ] (cat), e [ɛ] (bed), i [ɪ] (sit), o [ɒ] (hot), u [ʌ] (cup)
- **長母音**: a [eɪ] (cake), e [iː] (see), i [aɪ] (bike), o [oʊ] (go), u [juː] (use)

**子音 (Consonants)**
- **th**: [θ] (think) - 舌頭輕觸上排牙齒，送氣 / [ð] (this) - 舌頭輕觸上排牙齒，聲帶振動
- **r**: [r] - 舌頭捲起，但不觸碰口腔任何部位
- **l**: [l] - 舌尖抵住上排牙齒後面

**語調 (Intonation)**
- **問句**: Yes/No 問句語調上揚，Wh- 問句語調下降。
- **陳述句**: 語調通常在句尾下降。`,
  spanishPronunciationGuideTitle: "西班牙語基本發音指南",
  spanishPronunciationGuideContent: `**母音 (Vowels)**
- a, e, i, o, u 的發音固定，不像英文有多種變化。
- **a**: [a] (casa) | **e**: [e] (mesa) | **i**: [i] (libro) | **o**: [o] (foto) | **u**: [u] (uno)

**特殊子音 (Special Consonants)**
- **ñ**: [ɲ] - 類似中文的 "ㄋㄧ" (España)
- **ll/y**: [ʝ] - 類似中文的 "ㄧ" 或 "ㄐ" (calle, yo)
- **rr**: [r] - 彈舌音 (perro)
- **c**: 在 e, i 前發 [θ] (cielo)，其他情況發 [k] (casa)
- **z**: [θ] - (zapato)
- **j / g** (e,i前): [x] - 喉音 (jamón, gente)

**重音 (Stress)**
- **母音或 n, s 結尾**: 重音在倒數第二個音節。
- **子音結尾 (n, s 除外)**: 重音在最後一個音節。
- **有重音符號**: 重音直接落在標示的母音上。`,
  japanesePronunciationGuideTitle: "日語基本發音指南",
  japanesePronunciationGuideContent: `**母音 (Vowels)**
- **あ (a), い (i), う (u), え (e), お (o)** 的發音單純且固定。
- **あ [a]**: 嘴巴張大 (akai - 紅色)
- **い [i]**: 嘴角向兩側拉 (inu - 狗)
- **う [u]**: 嘴唇稍微前嘟，但不像英文 "oo" 那麼圓 (ushi - 牛)
- **え [e]**: 類似英文 "egg" 的 "e" (eki - 車站)
- **お [o]**: 嘴型圓，類似英文 "oh" (ongaku - 音樂)

**子音 (Consonants)**
- 大多數子音與英文相似，但有幾個特別注意：
- **ら行 (r)**: 發音介於英文的 r 和 l 之間，舌尖輕彈上顎 (sakura - 櫻花)
- **ふ (fu)**: 不是用牙齒咬下唇，而是雙唇間吹氣發音 (fune - 船)
- **ん (n)**: 鼻音，根據後面的音會變化 (sensei - 老師)

**特殊音 (Special Sounds)**
- **長音 (Long Vowels)**: 母音拉長一拍，意思會改變。例：おばさん (obasan - 阿姨) vs. おばあさん (obaasan - 奶奶)
- **促音 (Sokuon)**: 用小「っ」(tsu) 表示，是個停頓，使後面的子音聽起來更重。例：きて (kite - 來) vs. きって (kitte - 郵票)
- **拗音 (Yōon)**: 「き、し、ち...」等い段音後面接小「ゃ、ゅ、ょ」。例：びょういん (byōin - 醫院)

**音調高低 (Pitch Accent)**
- 日語單字有高低音之分，類似音樂的旋律，這會影響單字的意義。
- 例：はし (HAshi - 筷子) vs. はし (haSHI - 橋)`,
};

export const SCENARIO_DETAILS: { scenario: Scenario; label: string; icon: string; }[] = [
  { scenario: Scenario.Work, label: '職場辦公', icon: 'Work' },
  { scenario: Scenario.Negotiation, label: '商業談判', icon: 'Negotiation' },
  { scenario: Scenario.Academic, label: '學術研究', icon: 'Academic' },
  { scenario: Scenario.Tourism, label: '觀光旅遊', icon: 'Tourism' },
  { scenario: Scenario.Dining, label: '餐廳用餐', icon: 'Dining' },
  { scenario: Scenario.Shopping, label: '購物消費', icon: 'Shopping' },
  { scenario: Scenario.Entertainment, label: '休閒娛樂', icon: 'Entertainment' },
  { scenario: Scenario.CrisisManagement, label: '危機處理', icon: 'Crisis' },
  { scenario: Scenario.MedicalEmergency, label: '醫療緊急情況', icon: 'Medical' },
];
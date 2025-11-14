
import { GoogleGenAI, Type } from "@google/genai";
import { DialogueResponse, Language, ConversationPart, FreestyleHistoryItem, VocabularyPracticeItem } from "../types";
import { Scenario } from "../constants";

// FIX: Use process.env.API_KEY for the API key as per the guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const singleConversationPartSchema = {
    type: Type.OBJECT,
    properties: {
        speaker: { type: Type.STRING, description: "說話者的角色, 固定為 'AI Assistant'" },
        text_original: { type: Type.STRING, description: "原始的英語、西班牙語或日語句子" },
        text_translation: { type: Type.STRING, description: "句子的繁體中文翻譯" },
        audio_lang_code: { type: Type.STRING, enum: ["en-US", "en-GB", "es-ES", "es-MX", "ja-JP"], description: "用於語音合成的語言代碼" },
        grammar_analysis: {
        type: Type.OBJECT,
        properties: {
            point: { type: Type.STRING, description: "文法要點，例如：'Present Perfect Continuous'。請明確指出使用的時態 (tense)。" },
            explanation: { type: Type.STRING, description: "對文法要點的繁體中文解釋，請保持簡短扼要。" }
        },
        required: ["point", "explanation"]
        },
        vocabulary: {
        type: Type.ARRAY,
        description: "從 text_original 中挑選出兩個最重要的單字。",
        items: {
            type: Type.OBJECT,
            properties: {
                word: { type: Type.STRING, description: "單字本身" },
                pos: { type: Type.STRING, description: "詞性 (例如: '動詞', '名詞', '形容詞')" },
                translation: { type: Type.STRING, description: "該單字在此句中的繁體中文意思" }
            },
            required: ["word", "pos", "translation"]
        }
        }
    },
    required: ["speaker", "text_original", "text_translation", "audio_lang_code", "grammar_analysis", "vocabulary"]
};


const responseSchema = {
  type: Type.OBJECT,
  properties: {
    scenario_title: { type: Type.STRING, description: "情境的標題，例如：'Negotiating a Supplier Contract'" },
    difficulty_level: { type: Type.STRING, enum: ["A1", "A2", "B1", "B2", "C1"], description: "隨機選擇的難度等級" },
    context_description: { type: Type.STRING, description: "對情況的繁體中文描述" },
    conversation: {
      type: Type.ARRAY,
      items: singleConversationPartSchema
    },
    cultural_note: { type: Type.STRING, description: "與情境相關的文化提示（繁體中文）" }
  },
  required: ["scenario_title", "difficulty_level", "context_description", "conversation", "cultural_note"]
};

export const generateDialogue = async (scenario: Scenario, language: Language): Promise<DialogueResponse> => {
    let langName: string;
    let examName: string;

    switch (language) {
        case 'en':
            langName = 'English';
            examName = 'IELTS/TOEIC';
            break;
        case 'es':
            langName = 'Spanish';
            examName = 'DELE';
            break;
        case 'ja':
            langName = 'Japanese';
            examName = 'JLPT';
            break;
    }
  
  const systemInstruction = `You are a strict language examiner for ${examName}. Your task is to generate a realistic, challenging dialogue for a Traditional Chinese speaker learning ${langName}.
- For each request, randomly choose a difficulty level between A1 and B2 to ensure variety.
- The entire output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting.
- The entire conversation (all 'text_original' fields) MUST be in ${langName}. Do not mix in any other languages. For Spanish, this means the entire conversation is in Spanish. For Japanese, this means the entire conversation is in Japanese.
- For each turn, provide exactly two key vocabulary words. Ensure significant variation in grammar and vocabulary in each generated dialogue.
- The dialogue should consist of 4 to 6 turns. Each turn MUST be brief and conversational. Strictly avoid long sentences or monologues.
- Avoid common greetings or overly simplistic phrases unless contextually essential for a beginner-level dialogue.
- All descriptive text for the user MUST be in Traditional Chinese (繁體中文).`;

  const userPrompt = `Generate a dialogue for the following scenario:
Scenario: ${scenario}
Language: ${langName}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.9,
      }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as DialogueResponse;
  } catch (error) {
    console.error("Error generating dialogue from Gemini:", error);
    throw new Error("Failed to generate dialogue.");
  }
};


export const generateFreestyleResponse = async (history: FreestyleHistoryItem[], userInput: string, language: Language): Promise<ConversationPart> => {
    let langName: string;
    switch (language) {
        case 'en': langName = 'English'; break;
        case 'es': langName = 'Spanish'; break;
        case 'ja': langName = 'Japanese'; break;
    }

    const systemInstruction = `You are a friendly and helpful AI language tutor for a Traditional Chinese speaker. Your goal is to have a natural conversation in ${langName} at a B2/C1 level.
- The user will provide their message in Traditional Chinese. You MUST respond in ${langName}.
- Vary your sentence structures and vocabulary to keep the conversation engaging. Introduce new idioms or colloquialisms where appropriate.
- Your entire output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting.
- Your response (text_original) should be a natural, conversational reply. Keep it brief and engaging, ideally under 15 words.
- For your response, provide a concise grammar analysis and exactly two key vocabulary words.
- All descriptive text MUST be in Traditional Chinese (繁體中文).`;
    
    const conversationContext = history.map(item => {
        if (item.type === 'user') {
            return `User (in Chinese): "${item.text}"`;
        } else {
            return `AI (in ${langName}): "${item.part.text_original}"`;
        }
    }).join('\n');

    const userPrompt = `Here is the conversation history:\n${conversationContext}\n\nNow, the user says (in Chinese): "${userInput}"\n\nPlease provide your response in ${langName} as a valid JSON object.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: singleConversationPartSchema,
                temperature: 0.8,
            }
        });

        const jsonText = response.text.trim();
        const data = JSON.parse(jsonText);
        return data as ConversationPart;

    } catch (error) {
        console.error("Error generating freestyle response from Gemini:", error);
        throw new Error("Failed to generate freestyle response.");
    }
};

const vocabularyListSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      word: { type: Type.STRING, description: "單字本身" },
      pos: { type: Type.STRING, description: "詞性 (例如: '動詞', '名詞')" },
      translation: { type: Type.STRING, description: "該單字的繁體中文意思" },
      description: { type: Type.STRING, description: "對該單字的簡短繁體中文介紹" },
      example_sentence: { type: Type.STRING, description: `使用該單字的原語言例句` },
      example_sentence_translation: { type: Type.STRING, description: "例句的繁體中文翻譯" },
    },
    required: ["word", "pos", "translation", "description", "example_sentence", "example_sentence_translation"]
  }
};

export const generateVocabularyList = async (language: Language): Promise<VocabularyPracticeItem[]> => {
    let langName: string;
    let examName: string;
    switch (language) {
        case 'en':
            langName = 'English';
            examName = 'IELTS/TOEIC';
            break;
        case 'es':
            langName = 'Spanish';
            examName = 'DELE';
            break;
        case 'ja':
            langName = 'Japanese';
            examName = 'JLPT';
            break;
    }
  
  const systemInstruction = `You are an expert language curriculum designer for Traditional Chinese speakers. Your task is to generate a list of 8 essential vocabulary words for a learner of ${langName}.
- The words MUST be highly practical and frequently appear in proficiency exams (${examName}).
- Generate a list with the difficulty randomly distributed across A1, A2, B1, and B2 levels. Ensure a good mix.
- CRITICAL: Do NOT include extremely common words like 'hello', 'goodbye', 'yes', 'no', 'hola', 'adiós', 'こんにちは'. Focus on more substantial vocabulary.
- The list must include a mix of nouns, verbs, adjectives, and adverbs.
- The entire output MUST be a single, valid JSON array of objects that strictly adheres to the provided schema. Do not include any markdown formatting.
- All translations and descriptions MUST be in Traditional Chinese (繁體中文).`;

  const userPrompt = `Generate 8 essential, exam-relevant ${langName} vocabulary words with varied difficulty.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: vocabularyListSchema,
        temperature: 0.9,
      }
    });

    const jsonText = response.text.trim();
    const data = JSON.parse(jsonText);
    return data as VocabularyPracticeItem[];
  } catch (error) {
    console.error("Error generating vocabulary list from Gemini:", error);
    throw new Error("Failed to generate vocabulary list.");
  }
};

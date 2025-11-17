
import { GoogleGenAI, Type } from "@google/genai";
import { DialogueResponse, Language, ConversationPart, FreestyleHistoryItem, VocabularyPracticeItem } from "../types";
import { Scenario } from "../constants";

let aiInstance: GoogleGenAI | null = null;

const getAiInstance = () => {
    if (!aiInstance) {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
            const userFriendlyMessage = "AI服務未設定。\n\n請部署此專案的擁有者在 Vercel 的專案設定中，新增一個名為 VITE_GEMINI_API_KEY 的環境變數，並填入有效的 Google Gemini API 金鑰。";
            alert(userFriendlyMessage);
            console.error("VITE_GEMINI_API_KEY environment variable not set.");
            throw new Error("VITE_GEMINI_API_KEY environment variable not set.");
        }
        aiInstance = new GoogleGenAI({ apiKey });
    }
    return aiInstance;
};

// --- Schemas for AI responses ---

const singleConversationPartSchema = {
    type: Type.OBJECT,
    properties: {
        speaker: { type: Type.STRING, description: "The speaker's role, e.g., 'AI Assistant', 'User', 'Examiner'." },
        text_original: { type: Type.STRING, description: "The original sentence in English, Spanish, or Japanese." },
        text_translation: { type: Type.STRING, description: "The Traditional Chinese translation of the sentence." },
        audio_lang_code: { type: Type.STRING, description: "The language code for text-to-speech. Must be one of: en-US, en-GB, es-ES, es-MX, ja-JP." },
        grammar_analysis: {
        type: Type.OBJECT,
        properties: {
            point: { type: Type.STRING, description: "The grammatical point, e.g., 'Present Perfect Continuous'. Must specify the tense." },
            explanation: { type: Type.STRING, description: "A brief explanation of the grammar point in Traditional Chinese." }
        },
        required: ["point", "explanation"]
        },
        vocabulary: {
        type: Type.ARRAY,
        description: "Exactly two of the most important vocabulary words from the text_original.",
        items: {
            type: Type.OBJECT,
            properties: {
                word: { type: Type.STRING, description: "The vocabulary word." },
                pos: { type: Type.STRING, description: "Part of speech (e.g., 'Verb', 'Noun', 'Adjective')." },
                translation: { type: Type.STRING, description: "The word's meaning in this context in Traditional Chinese." }
            },
            required: ["word", "pos", "translation"]
        }
        }
    },
    required: ["speaker", "text_original", "text_translation", "audio_lang_code", "grammar_analysis", "vocabulary"]
};

const dialogueResponseSchema = {
  type: Type.OBJECT,
  properties: {
    scenario_title: { type: Type.STRING, description: "The title of the scenario, e.g., 'Negotiating a Supplier Contract'." },
    difficulty_level: { type: Type.STRING, description: "The difficulty level, which must be either 'B2' or 'C1'." },
    context_description: { type: Type.STRING, description: "A description of the situation in Traditional Chinese." },
    conversation: {
      type: Type.ARRAY,
      description: "A dialogue with 4 to 6 turns.",
      items: singleConversationPartSchema
    },
    cultural_note: { type: Type.STRING, description: "A cultural tip related to the scenario in Traditional Chinese." }
  },
  required: ["scenario_title", "difficulty_level", "context_description", "conversation", "cultural_note"]
};

const vocabularyListSchema = {
  type: Type.ARRAY,
  description: "A list of exactly 8 vocabulary items.",
  items: {
    type: Type.OBJECT,
    properties: {
      word: { type: Type.STRING, description: "The vocabulary word." },
      pos: { type: Type.STRING, description: "Part of speech (e.g., 'Verb', 'Noun')." },
      translation: { type: Type.STRING, description: "The word's meaning in Traditional Chinese." },
      description: { type: Type.STRING, description: "A brief introduction to the word in Traditional Chinese." },
      example_sentence: { type: Type.STRING, description: `An example sentence using the word in its original language.` },
      example_sentence_translation: { type: Type.STRING, description: "The Traditional Chinese translation of the example sentence." },
    },
    required: ["word", "pos", "translation", "description", "example_sentence", "example_sentence_translation"]
  }
};


// --- API Functions ---

const callGemini = async (systemInstruction: string, userPrompt: string, responseSchema: object, temperature: number) => {
  try {
    const ai = getAiInstance();
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
        temperature,
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a valid response from the AI model.");
  }
}

const getLanguageConfig = (language: Language) => {
    switch (language) {
        case 'en': return { langName: 'English', examName: 'IELTS/TOEIC' };
        case 'es': return { langName: 'Spanish', examName: 'DELE' };
        case 'ja': return { langName: 'Japanese', examName: 'JLPT' };
        default: return { langName: 'English', examName: 'IELTS/TOEIC' };
    }
}

export const generateDialogue = async (scenario: Scenario, language: Language): Promise<DialogueResponse> => {
  const { langName, examName } = getLanguageConfig(language);
  
  const systemInstruction = `You are a strict language examiner for ${examName}. Your task is to generate a realistic, challenging dialogue for a Traditional Chinese speaker learning ${langName}.
- For each request, randomly choose a difficulty level between B2 and C1 to ensure variety.
- The entire output MUST be a single, valid JSON object that strictly adheres to the provided schema. Do not include any markdown formatting.
- The entire conversation (all 'text_original' fields) MUST be in ${langName}.
- For each turn, provide exactly two key vocabulary words.
- The dialogue should consist of 4 to 6 turns. Each turn MUST be brief and conversational.
- Avoid common greetings or overly simplistic phrases.
- All descriptive text for the user MUST be in Traditional Chinese (繁體中文).`;

  const userPrompt = `Generate a dialogue for the following scenario:\nScenario: ${scenario}\nLanguage: ${langName}`;
  
  return callGemini(systemInstruction, userPrompt, dialogueResponseSchema, 0.9);
};

export const generateFreestyleResponse = async (history: FreestyleHistoryItem[], userInput: string, language: Language): Promise<ConversationPart> => {
  const { langName } = getLanguageConfig(language);

  const systemInstruction = `You are a friendly and helpful AI language tutor for a Traditional Chinese speaker. Your goal is to have a natural conversation in ${langName} at a B2/C1 level.
- The user will provide their message in Traditional Chinese. You MUST respond in ${langName}.
- Vary your sentence structures and vocabulary.
- Your entire output MUST be a single, valid JSON object that strictly adheres to the provided schema.
- Your response (text_original) should be a natural, conversational reply, ideally under 15 words.
- All descriptive text MUST be in Traditional Chinese (繁體中文).`;

  const conversationContext = history.map((item) => {
      if (item.type === 'user') { return `User (in Chinese): "${item.text}"`; } 
      else { return `AI (in ${langName}): "${item.part.text_original}"`; }
  }).join('\n');

  const userPrompt = `Here is the conversation history:\n${conversationContext}\n\nNow, the user says (in Chinese): "${userInput}"\n\nPlease provide your response in ${langName} as a valid JSON object.`;

  return callGemini(systemInstruction, userPrompt, singleConversationPartSchema, 0.8);
};

export const generateVocabularyList = async (language: Language): Promise<VocabularyPracticeItem[]> => {
  const { langName, examName } = getLanguageConfig(language);

  const systemInstruction = `You are an expert language curriculum designer for Traditional Chinese speakers. Your task is to generate a list of 8 essential vocabulary words for a learner of ${langName}.
- The words MUST be highly practical and frequently appear in proficiency exams (${examName}).
- Generate a list with the difficulty randomly distributed across A1, A2, B1, and B2 levels.
- CRITICAL: Do NOT include extremely common words like 'hello', 'hola', 'こんにちは'. Focus on more substantial vocabulary.
- The list must include a mix of nouns, verbs, adjectives, and adverbs.
- The entire output MUST be a single, valid JSON array of objects that strictly adheres to the provided schema.
- All translations and descriptions MUST be in Traditional Chinese (繁體中文).`;
  
  const userPrompt = `Generate 8 essential, exam-relevant ${langName} vocabulary words with varied difficulty.`;

  return callGemini(systemInstruction, userPrompt, vocabularyListSchema, 0.9);
};

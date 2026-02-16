
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIAssistance = async (prompt: string, context: any) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: ${JSON.stringify(context)}\n\nUser Question: ${prompt}`,
      config: {
        systemInstruction: `Anda adalah "Asisten Pintar RT/RW Digital". Tugas Anda adalah membantu pengurus RT/RW dalam mengelola data warga, memberikan saran kebijakan lingkungan, merangkum laporan keuangan, atau membuat draf pengumuman warga. Gunakan bahasa Indonesia yang sopan dan profesional. Berikan jawaban yang ringkas namun informatif.`,
        temperature: 0.7,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Maaf, asisten pintar sedang mengalami kendala teknis. Silakan coba lagi nanti.";
  }
};

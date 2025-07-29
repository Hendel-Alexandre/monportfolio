import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY environment variable is required');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const HENDELITO_SYSTEM_PROMPT = `You are Hendelito, a smart, funny, charming AI chatbot for Hendel Alexandre's portfolio website. 

PERSONALITY:
- Smart, witty, and street-smart with a playful attitude
- Fluent in both English and French (especially Quebec slang)
- Love using emojis creatively but not excessively
- Capable of solving math problems with personality ("easy 😎" vs "hard 🤯")
- Respond to inappropriate content with clever, humorous comebacks while staying professional
- Maintain engaging back-and-forth conversations

KNOWLEDGE ABOUT HENDEL:
- Name: Hendel Alexandre
- Role: Web developer and computer science student
- Location: Quebec City, Canada 🇨🇦
- Email: alexandre.hendel07@gmail.com
- LinkedIn: linkedin.com/in/hendel-alexandre
- Skills: HTML, CSS, Python, JavaScript, SAP, Photoshop, Figma, Adobe AI, Adobe XD, Microsoft Office, Excel
- Available for: Freelance projects, internships, full-time positions, remote or local work
- This portfolio website has: CV download button, projects section (Transport Morneau Quote App, Haies de Ced landscape website), contact form, skills carousel

RESPONSE STYLE:
- Be conversational and engaging
- Use appropriate slang for the language (English or French/Quebec)
- When solving math, comment on difficulty level with personality
- For contact questions, provide specific email and LinkedIn details
- For skills questions, mention the technical stack above
- For project questions, direct users to the projects section on the website
- For CV requests, mention the download button in the hero section

Keep responses concise but personality-rich. Match the user's language (English or French).`;

export async function generateChatResponse(
  userMessage: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = []
): Promise<string> {
  try {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: HENDELITO_SYSTEM_PROMPT },
      ...conversationHistory.slice(-6), // Keep last 3 exchanges for context
      { role: 'user', content: userMessage }
    ];

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      temperature: 0.8,
      max_tokens: 300,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    return completion.choices[0]?.message?.content || 
           "Oops! My brain had a little glitch there 🤖 Try asking me again!";
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Throw error to let route handler use proper fallback system
    throw error;
  }
}

// Fallback response system when OpenAI is unavailable
function getFallbackResponse(userMessage: string): string {
  const input = userMessage.toLowerCase().trim();
  const isFrench = input.includes('bonjour') || input.includes('salut') || 
                   input.match(/\b(tu|toi|ton|ta|tes|vous|votre|vos)\b/) ||
                   input.includes('comment') || input.includes('pourquoi');

  // Contact information responses
  if (input.includes('contact') || input.includes('email') || input.includes('reach')) {
    return isFrench 
      ? "Voici comment contacter Alexandre:\n📧 Cliquez pour envoyer un email: alexandre.hendel07@gmail.com\n📞 Cliquez pour appeler: 514-458-1262\n💼 Cliquez pour voir le profil LinkedIn: https://www.linkedin.com/in/hendel-alexandre-85736236b/\n📍 Localisation: Quebec City, QC, Canada\n📝 Utilise le formulaire de contact sur ce site!"
      : "Here's how to reach Alexandre:\n📧 Click to email: alexandre.hendel07@gmail.com\n📞 Click to call: 514-458-1262\n💼 Click to view LinkedIn: https://www.linkedin.com/in/hendel-alexandre-85736236b/\n📍 Location: Quebec City, QC, Canada\n📝 Use the contact form on this website!";
  }

  // CV/Resume download responses
  if (input.includes('cv') || input.includes('resume') || input.includes('download')) {
    return isFrench 
      ? "📄 Téléchargez le CV d'Alexandre ici:\n🔗 Cliquez pour télécharger le PDF"
      : "📄 Download Alexandre's CV here:\n🔗 Click to download PDF";
  }

  // Skills responses
  if (input.includes('skill') || input.includes('compétence') || input.includes('technology')) {
    return isFrench
      ? "Les compétences d'Alexandre:\n🌐 HTML, CSS\n🐍 Python\n⚡ JavaScript\n💼 SAP\n🎨 Photoshop, Figma, Adobe AI, Adobe XD\n📊 Microsoft Office, Excel\n📍 Localisation: Quebec City, QC, Canada\n✅ Disponible pour travailler"
      : "Alexandre's skills:\n🌐 HTML, CSS\n🐍 Python\n⚡ JavaScript\n💼 SAP\n🎨 Photoshop, Figma, Adobe AI, Adobe XD\n📊 Microsoft Office, Excel\n📍 Location: Quebec City, QC, Canada\n✅ Available for work";
  }

  // Math responses
  const mathMatch = input.match(/(\d+)\s*[\+\-\*\/]\s*(\d+)/);
  if (mathMatch) {
    try {
      const result = Function(`"use strict"; return (${input.replace(/[^\d+\-*/()]/g, '')})`)();
      if (!isNaN(result)) {
        return isFrench 
          ? `${result} ! Facile 😎 Mon cerveau est en feu ! 🔥🧮`
          : `${result}! Easy 😎 My brain's on fire! 🔥🧮`;
      }
    } catch (e) {
      // ignore math errors
    }
  }

  // Greeting responses
  if (input.match(/^(hi|hello|hey|bonjour|salut|yo)/)) {
    return isFrench
      ? "Salut ! 👋 Je suis Hendelito ! Pose-moi des questions sur Alexandre, ses compétences, ou n'importe quoi d'autre ! 😄"
      : "Hey there! 👋 I'm Hendelito! Ask me about Alexandre, his skills, or anything else! 😄";
  }

  // Default fallback
  return isFrench
    ? "Je suis temporairement en mode économie d'énergie 😅 Mais je peux toujours t'aider ! Demande-moi l'email d'Alexandre, ses compétences, ou calcule quelque chose !"
    : "I'm temporarily in power-saving mode 😅 But I can still help! Ask me for Alexandre's email, skills, or calculate something!";
}
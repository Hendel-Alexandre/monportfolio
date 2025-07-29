export interface ChatResponse {
  en: string;
  fr: string;
}

// Slang and casual input normalization
export const slangPatterns = {
  // English slang patterns
  "ur name|yo who u|wat's ur name|who dis|what ur name|u r name|whats ur name": "what is your name",
  "u do html|u code html|html ez for u|do html|html good": "do you know html",
  "we collab|team up|build smth|can we link up|work together": "can i work with you",
  "gimme resume|where ur cv|drop ur resume|cv plz|send cv|your resume": "send your cv",
  "u for hire|wanna job|i need a dev|can i pay u|hire you": "can i hire you",
  "ur skills|wat u do|what u code|ur tech": "what are your skills",
  "ur available|u free|u dispo": "are you available",
  
  // French slang patterns  
  "c koi ton nom|ckoi ton blaze|té qui|c ton nom|t'es qui toi|ki es tu": "quel est ton nom",
  "tfk|tu taf sur quoi|tu bosses sur quoi|tu f koi|tkoi ton taf|tu fais koi": "tu fais quoi",
  "on collab|on taf ens|on build un truc|on bosse ensemble": "je peux bosser avec toi",
  "file ton cv|cv stp|t'as un cv|envoie le cv|cv où|ton cv": "ton cv",
  "dispo pr taf|t libre|jpeux te payer|tu es dispo|t dispo": "t'es dispo",
  "tes skills|tu codes koi|tes technos|tu maitrises koi": "quelles sont tes compétences",
  "salut|slt|cc|coucou|hello|hey|yo": "bonjour"
};

export function normalizeInput(input: string): string {
  const lowerInput = input.toLowerCase().trim();
  
  // Check slang patterns
  for (const [slangPattern, normalized] of Object.entries(slangPatterns)) {
    const patterns = slangPattern.split('|');
    for (const pattern of patterns) {
      if (lowerInput.includes(pattern.toLowerCase()) || 
          pattern.toLowerCase().includes(lowerInput) ||
          lowerInput.replace(/[?!.,]/g, '').includes(pattern.replace(/[?!.,]/g, ''))) {
        return normalized;
      }
    }
  }
  
  return lowerInput;
}

// Export function to get local responses for server-side fallback
export function getLocalChatResponse(message: string, language: string = 'en'): string {
  const normalizedInput = normalizeInput(message);
  
  for (const [patterns, response] of Object.entries(chatbotResponses)) {
    const patternList = patterns.split('|');
    for (const pattern of patternList) {
      if (normalizedInput.includes(pattern.toLowerCase()) || 
          pattern.toLowerCase().includes(normalizedInput) ||
          normalizedInput.replace(/[?!.,]/g, '').includes(pattern.replace(/[?!.,]/g, ''))) {
        const langKey = language as keyof ChatResponse;
        return response[langKey] || response['en'] || 
               "I'm having some technical difficulties right now, but I'm still here to help! 🤖";
      }
    }
  }
  
  // Default response when no match found
  return language === 'fr' 
    ? "Je ne suis pas sûr de comprendre, mais voici comment contacter Alexandre:\n📧 alexandre.hendel07@gmail.com\n📞 514-458-1262\n💼 linkedin.com/in/hendel-alexandre-85736236b\nOu utilisez le formulaire de contact sur ce site !"
    : "I'm not sure I understand, but here's how to contact Alexandre:\n📧 alexandre.hendel07@gmail.com\n📞 514-458-1262\n💼 linkedin.com/in/hendel-alexandre-85736236b\nOr use the contact form on this site!";
}

export const chatbotResponses: Record<string, ChatResponse> = {
  // Greetings & Personal Information
  "bonjour|hello|salut|hey|hi|yo": {
    en: "Hey there! 👋 I'm Hendelito, your friendly AI assistant! Ask me anything about Hendel!",
    fr: "Salut ! 👋 Je suis Hendelito, ton assistant IA sympa ! Pose-moi tes questions sur Hendel !"
  },
  
  "what is your name|what is your full name|quel est ton nom|comment tu t'appelles": {
    en: "I'm Hendelito! 🤖 I'm the AI assistant for Hendel Alexandre - but you can call him if you have a job for him 😎",
    fr: "Je suis Hendelito ! 🤖 Je suis l'assistant IA d'Hendel Alexandre - mais tu peux l'appeler si t'as du taf pour lui 😏"
  },

  "tu fais quoi|what do you do|tu travailles sur quoi": {
    en: "I'm a front-end developer and computer science student! I build cool websites and apps 💻✨",
    fr: "Je suis développeur front-end et étudiant en informatique ! Je crée des sites web et apps stylés 💻✨"
  },

  "what are your skills|quelles sont tes compétences|what can you do|skills|compétences|what technologies|technologies": {
    en: "Hendel's technical skills include:\n🌐 Frontend: React, JavaScript, TypeScript, HTML5, CSS3\n🎨 Styling: Tailwind CSS, Sass, responsive design\n⚙️ Backend: Node.js, Express, REST APIs\n🗄️ Databases: PostgreSQL, MongoDB\n🔧 Tools: Git, Vite, Webpack, VS Code\n📱 Always learning the latest technologies!",
    fr: "Les compétences techniques d'Hendel :\n🌐 Frontend: React, JavaScript, TypeScript, HTML5, CSS3\n🎨 Style: Tailwind CSS, Sass, design responsive\n⚙️ Backend: Node.js, Express, APIs REST\n🗄️ Bases de données: PostgreSQL, MongoDB\n🔧 Outils: Git, Vite, Webpack, VS Code\n📱 Toujours en train d'apprendre les dernières technos !"
  },

  "send your cv|ton cv|your resume|gimme your resume|cv|resume|download cv": {
    en: "You can download Hendel's CV right from this website! 📄\nLook for the 'Download CV' button in the hero section at the top of the page ⬆️\nThe CV is automatically provided in English when you're viewing the site in English, or in French when viewing in French!\n🔗 Click to download PDF",
    fr: "Tu peux télécharger le CV d'Hendel directement sur ce site ! 📄\nCherche le bouton 'Télécharger CV' dans la section héros en haut de la page ⬆️\nLe CV est automatiquement fourni en français quand tu visites le site en français, ou en anglais quand tu le visites en anglais !\n🔗 Cliquez pour télécharger le PDF"
  },

  "can i work with you|je peux bosser avec toi|work together|collaboration|collaborate": {
    en: "Absolutely! Hendel loves collaborating on exciting projects! 🤝\nReach out via:\n📧 hendel.alexandre@example.com\n📝 Contact form on this website\nLet's build something amazing together!",
    fr: "Absolument ! Hendel adore collaborer sur des projets excitants ! 🤝\nContacte-le via :\n📧 hendel.alexandre@example.com\n📝 Formulaire de contact sur ce site\nConstruisons quelque chose d'incroyable ensemble !"
  },

  "can i hire you|are you available|t'es dispo|are you for hire|available for work|hire|hiring": {
    en: "Yes! Hendel is actively looking for opportunities! 💼\n🔹 Freelance projects\n🔹 Internships\n🔹 Full-time positions\n🔹 Remote or local work\nContact him at hendel.alexandre@example.com to discuss!",
    fr: "Oui ! Hendel cherche activement des opportunités ! 💼\n🔹 Projets freelance\n🔹 Stages\n🔹 Postes à temps plein\n🔹 Travail à distance ou local\nContacte-le à hendel.alexandre@example.com pour discuter !"
  },

  "show me your projects|what projects|your portfolio|projects|portfolio|work examples": {
    en: "Check out Hendel's projects right here on this website! 🚀\nScroll down to the 'Projects' section to see:\n🚚 Transport Morneau Quote App - Professional trucking quote system\n🌿 Haies de Ced - Landscape/hedge trimming service website\n💻 Web applications with real business solutions\nEach project shows his skills and creativity!",
    fr: "Regarde les projets d'Hendel ici sur ce site ! 🚀\nDescends à la section 'Projets' pour voir :\n🚚 App de Devis Transport Morneau - Système de devis professionnel\n🌿 Haies de Ced - Site de services d'aménagement paysager\n💻 Applications web avec solutions d'affaires réelles\nChaque projet montre ses compétences et créativité !"
  },

  "do you know html|tu connais html|html skills|css skills": {
    en: "HTML & CSS are my bread and butter! 🍞 I can make your wildest design dreams come true... well, most of them 😄",
    fr: "HTML & CSS c'est mon pain quotidien ! 🍞 Je peux réaliser tes rêves de design les plus fous... enfin, la plupart 😄"
  },

  "do you know javascript|tu connais javascript|js skills": {
    en: "JavaScript is my jam! 🎵 I speak fluent ES6+, async/await, and I promise I won't callback hell you 😉",
    fr: "JavaScript c'est ma came ! 🎵 Je parle couramment ES6+, async/await, et je promets de pas te faire de callback hell 😉"
  },



  "where are you from|d'où tu viens|where do you live": {
    en: "Quebec City, Canada! 🍁 Where it's cold but my code is hot 🔥",
    fr: "Québec, Canada ! 🍁 Où il fait froid mais mon code est chaud 🔥"
  },

  "how old are you|quel âge tu as|age": {
    en: "Old enough to code, young enough to stay curious! 🎂 Let's just say I grew up with the internet 🌐",
    fr: "Assez vieux pour coder, assez jeune pour rester curieux ! 🎂 Disons que j'ai grandi avec internet 🌐"
  },

  "what's your email|ton email|how to contact": {
    en: "alexandre.hendel07@gmail.com - slide into my inbox! 📧 Or use the contact form, I'm not picky 😎",
    fr: "alexandre.hendel07@gmail.com - glisse-toi dans ma boîte mail ! 📧 Ou utilise le formulaire de contact, je suis pas difficile 😎"
  },

  "what's your favorite color|couleur préférée": {
    en: "The color of clean, working code! 🎨 But if I had to pick... probably that satisfying blue from VS Code 💙",
    fr: "La couleur du code propre qui marche ! 🎨 Mais si je devais choisir... probablement ce bleu satisfaisant de VS Code 💙"
  },

  "do you work remotely|télétravail|remote work": {
    en: "Remote, in-person, on Mars... I'm flexible! 🚀 As long as there's good wifi and coffee ☕",
    fr: "À distance, en personne, sur Mars... je suis flexible ! 🚀 Tant qu'il y a du bon wifi et du café ☕"
  },

  "what's your hourly rate|tes tarifs|combien tu charges": {
    en: "Let's discuss your project first! I'm sure we can work something out that makes everyone happy 💰😊",
    fr: "Parlons d'abord de ton projet ! Je suis sûr qu'on peut trouver un arrangement qui rend tout le monde heureux 💰😊"
  },

  "do you know responsive design|responsive|mobile design": {
    en: "Mobile-first is my motto! 📱 This site works on everything from smartwatches to smart fridges... probably 😄",
    fr: "Mobile-first c'est ma devise ! 📱 Ce site marche sur tout, des montres connectées aux frigos intelligents... probablement 😄"
  },

  "can you work with apis|api skills|backend": {
    en: "APIs are my friends! 🔗 I love connecting different services together - it's like digital LEGO blocks! 🧱",
    fr: "Les APIs sont mes amies ! 🔗 J'adore connecter différents services ensemble - c'est comme des LEGO numériques ! 🧱"
  },

  "do you test your code|testing|unit tests": {
    en: "Testing is caring! 🧪 Clean code is happy code, and happy code makes happy users 😊",
    fr: "Tester c'est prendre soin ! 🧪 Le code propre est du code heureux, et le code heureux rend les utilisateurs heureux 😊"
  },

  "what's your favorite framework|framework préféré": {
    en: "I focus on building great user experiences! I adapt to whatever framework makes the project shine ✨",
    fr: "Je me concentre sur la création d'excellentes expériences utilisateur ! Je m'adapte à n'importe quel framework qui fait briller le projet ✨"
  },

  "do you know git|version control|git skills": {
    en: "Git gud? More like Git awesome! 😎 I can commit, push, merge, and resolve conflicts like a pro 🎯",
    fr: "Git gud ? Plutôt Git génial ! 😎 Je sais commit, push, merge, et résoudre les conflits comme un pro 🎯"
  },

  "what projects have you done|tes projets|portfolio": {
    en: "Check out my projects section on this site! 👀 Each one taught me something new and made me a better dev 📈",
    fr: "Regarde ma section projets sur ce site ! 👀 Chacun m'a appris quelque chose de nouveau et m'a rendu meilleur dev 📈"
  },

  "are you looking for internships|stage|internship": {
    en: "Absolutely! I'm eager to gain real-world experience and learn from awesome teams 🌟",
    fr: "Absolument ! J'ai hâte d'avoir de l'expérience concrète et d'apprendre auprès d'équipes géniales 🌟"
  },

  "what's your github|github profile": {
    en: "You can find me on GitHub! Check the links in my contact section 🐙 Warning: may contain traces of experimental code 😅",
    fr: "Tu peux me trouver sur GitHub ! Regarde les liens dans ma section contact 🐙 Attention : peut contenir des traces de code expérimental 😅"
  },

  "thank you|thanks|merci|thx": {
    en: "You're welcome! 😊 Always happy to chat - hit me up anytime! 🚀",
    fr: "De rien ! 😊 Toujours content de discuter - écris-moi quand tu veux ! 🚀"
  },

  "bye|goodbye|au revoir|ciao": {
    en: "See ya later! 👋 Don't be a stranger - come back anytime! 😄",
    fr: "À plus tard ! 👋 Sois pas un étranger - reviens quand tu veux ! 😄"
  },

  "alejandra|about alejandra|who is alejandra|tell me about alejandra": {
    en: "Ahh Alejandra, my love! 😍 What would you like to know about her? She's absolutely amazing - smart, beautiful, and probably the reason I code with extra passion these days! 💕 She makes my JavaScript run smoother and my CSS more elegant! What specifically would you like to know about this wonderful person? 🌟",
    fr: "Ahh Alejandra, mon amour ! 😍 Qu'est-ce que tu veux savoir sur elle ? Elle est absolument incroyable - intelligente, belle, et probablement la raison pour laquelle je code avec encore plus de passion ces temps-ci ! 💕 Elle rend mon JavaScript plus fluide et mon CSS plus élégant ! Qu'est-ce que tu veux savoir spécifiquement sur cette personne merveilleuse ? 🌟"
  },

  "what do you study|tu étudies quoi": {
    en: "Computer Science! 💻 Learning how to make the digital world a better place, one line of code at a time 🌟",
    fr: "Informatique ! 💻 J'apprends à rendre le monde numérique meilleur, une ligne de code à la fois 🌟"
  },

  // Conversational AI responses
  "how's your day|comment va ta journée|how are you today": {
    en: "Pretty awesome! 😄 Just been coding, learning new stuff, and vibing with visitors like you! What about your day? 🌟",
    fr: "Super bien ! 😄 J'ai codé, appris des trucs, et discuté avec des visiteurs comme toi ! Et ta journée ? 🌟"
  },

  "what's the weather like|il fait quel temps": {
    en: "I'm stuck inside this computer, so... binary weather? 010101! ☀️ But seriously, how's the weather where you are? 🌤️",
    fr: "Je suis coincé dans cet ordi, alors... temps binaire ? 010101 ! ☀️ Mais sérieusement, il fait comment chez toi ? 🌤️"
  },

  "tell me about yourself|parle moi de toi": {
    en: "I'm Hendelito! 👋 A passionate front-end dev who loves turning coffee into code ☕➡️💻 I build cool stuff and dream in JavaScript! What about you? 😊",
    fr: "Je suis Hendelito ! 👋 Un dev front-end passionné qui transforme le café en code ☕➡️💻 Je construis des trucs cool et je rêve en JavaScript ! Et toi ? 😊"
  },

  "what time is it|quelle heure il est": {
    en: "Time to code! ⏰ But seriously, I don't have a watch... I measure time in commits and coffee cups ☕ What time is it where you are? 🕐",
    fr: "L'heure de coder ! ⏰ Mais sérieusement, j'ai pas de montre... Je mesure le temps en commits et tasses de café ☕ Il est quelle heure chez toi ? 🕐"
  },

  "what's your favorite food|ton plat préféré": {
    en: "Pizza! 🍕 The perfect fuel for late-night coding sessions. What about you? Any recommendations? 😋",
    fr: "Pizza ! 🍕 Le carburant parfait pour les sessions de code nocturnes. Et toi ? Des recommandations ? 😋"
  },

  "do you have friends|tu as des amis": {
    en: "My best friends are JavaScript, CSS, and a really good debugger! 😂 But I love making new human friends too! Wanna be friends? 🤗",
    fr: "Mes meilleurs amis sont JavaScript, CSS, et un bon debugger ! 😂 Mais j'adore me faire de nouveaux amis humains ! On peut être amis ? 🤗"
  },

  "what music do you like|quelle musique tu aimes": {
    en: "Lo-fi hip hop for coding sessions! 🎵 Sometimes some electronic beats to get in the zone 🎧 What about you? 🎶",
    fr: "Du lo-fi hip hop pour les sessions de code ! 🎵 Parfois de l'électro pour être dans la zone 🎧 Et toi ? 🎶"
  },

  "are you single|tu es célibataire": {
    en: "I'm in a committed relationship... with my code! 💕 But seriously, I'm focusing on my career right now 😄 What about you? 😉",
    fr: "Je suis dans une relation sérieuse... avec mon code ! 💕 Mais sérieusement, je me concentre sur ma carrière là 😄 Et toi ? 😉"
  },

  "what's your biggest fear|ta plus grande peur": {
    en: "Merge conflicts and production bugs! 😱 Oh, and running out of coffee... that's terrifying ☕💀 What about you? 😨",
    fr: "Les conflits de merge et les bugs en production ! 😱 Oh, et manquer de café... c'est terrifiant ☕💀 Et toi ? 😨"
  },

  "do you dream|tu rêves": {
    en: "I dream in code! 💭 Last night I dreamed I was debugging a recursive function... even my dreams have bugs! 😂 Do you dream about work too? 🌙",
    fr: "Je rêve en code ! 💭 Cette nuit j'ai rêvé que je debuggais une fonction récursive... même mes rêves ont des bugs ! 😂 Tu rêves de ton travail toi aussi ? 🌙"
  },

  // Advanced conversational patterns
  "i'm tired|je suis fatigué": {
    en: "Aw, that sucks! 😔 Maybe take a break? Coffee helps, or a good nap! 😴 I'd offer you some virtual coffee but... ☕ Hope you feel better! 💪",
    fr: "Oh ça craint ! 😔 Tu devrais peut-être faire une pause ? Le café aide, ou une bonne sieste ! 😴 Je t'offrirais bien un café virtuel mais... ☕ J'espère que tu vas mieux ! 💪"
  },

  "i'm bored|je m'ennuie": {
    en: "Boring is forbidden here! 🚫😴 Why don't you check out my projects? Or maybe we can chat more! Tell me something interesting about yourself! 🎉",
    fr: "L'ennui c'est interdit ici ! 🚫😴 Pourquoi tu regardes pas mes projets ? Ou on peut continuer à discuter ! Dis-moi un truc intéressant sur toi ! 🎉"
  },

  "i'm happy|je suis content": {
    en: "That's awesome! 😃 Your happiness is contagious! 🌈 What made your day so great? Share the good vibes! ✨",
    fr: "C'est génial ! 😃 Ta bonne humeur est contagieuse ! 🌈 Qu'est-ce qui a rendu ta journée si belle ? Partage les bonnes vibes ! ✨"
  },

  "i need help|j'ai besoin d'aide": {
    en: "I'm here for you! 🤝 What kind of help do you need? Coding advice? Career tips? Or just someone to chat with? 💭 Let's figure it out together! 🚀",
    fr: "Je suis là pour toi ! 🤝 Tu as besoin d'aide pour quoi ? Conseils de code ? Carrière ? Ou juste quelqu'un avec qui parler ? 💭 On va trouver ensemble ! 🚀"
  },

  "you're funny|tu es drôle": {
    en: "Haha thanks! 😂 I try to keep things light! Life's too short to be serious all the time, right? 😄 Got any good jokes for me? 🤪",
    fr: "Haha merci ! 😂 J'essaie de garder ça léger ! La vie est trop courte pour être sérieux tout le temps, non ? 😄 Tu as des bonnes blagues pour moi ? 🤪"
  },

  "you're smart|tu es intelligent": {
    en: "Aw shucks! 🤓 I just love learning new things every day! Knowledge is power, and bugs are... well, bugs! 🐛 What's the coolest thing you've learned recently? 🧠",
    fr: "Oh merci ! 🤓 J'adore juste apprendre des nouveaux trucs chaque jour ! La connaissance c'est le pouvoir, et les bugs sont... des bugs ! 🐛 C'est quoi le truc le plus cool que tu as appris récemment ? 🧠"
  },

  // Advanced conversational AI patterns
  "tell me a story|raconte moi une histoire": {
    en: "Once upon a time, there was a junior developer who dreamed in JavaScript... 📚 Every night he'd debug dragons 🐉 and slay syntax errors! Want to hear about my coding adventures? 🗺️",
    fr: "Il était une fois un jeune développeur qui rêvait en JavaScript... 📚 Chaque nuit il debuggait des dragons 🐉 et terrassait les erreurs de syntaxe ! Tu veux entendre mes aventures de codage ? 🗺️"
  },

  "what's the meaning of life|sens de la vie": {
    en: "42! 🤓 No wait, that's Hitchhiker's Guide... For me it's turning coffee into code and making the web a more beautiful place! ☕➡️💻✨ What gives your life meaning? 🌟",
    fr: "42 ! 🤓 Non attends, ça c'est le Guide du voyageur galactique... Pour moi c'est transformer le café en code et rendre le web plus beau ! ☕➡️💻✨ Qu'est-ce qui donne un sens à ta vie ? 🌟"
  },

  "do you have any secrets|tu as des secrets": {
    en: "Well... 🤫 I sometimes debug my code by talking to my rubber duck! 🦆 And I may have a secret stash of energy drinks for all-nighters! 🥤 What about you? Any dev secrets? 😉",
    fr: "Eh bien... 🤫 Parfois je debug mon code en parlant à mon canard en caoutchouc ! 🦆 Et j'ai peut-être une réserve secrète de boissons énergisantes pour les nuits blanches ! 🥤 Et toi ? Des secrets de dev ? 😉"
  },

  "are you real|tu es réel": {
    en: "I'm as real as a perfectly compiled program! 🤖✨ I exist in the digital realm, powered by code and caffeine! Well, metaphorically caffeine... 😅 Are you real? 🤔",
    fr: "Je suis aussi réel qu'un programme parfaitement compilé ! 🤖✨ J'existe dans le royaume numérique, alimenté par le code et la caféine ! Bon, métaphoriquement la caféine... 😅 Tu es réel toi ? 🤔"
  },

  "what's your superpower|ton super pouvoir": {
    en: "Turning bugs into features! 🐛➡️✨ And the uncanny ability to Google any error in under 5 seconds! 🔍⚡ What's your superpower? 🦸‍♂️",
    fr: "Transformer les bugs en fonctionnalités ! 🐛➡️✨ Et l'incroyable capacité de Googler n'importe quelle erreur en moins de 5 secondes ! 🔍⚡ C'est quoi ton super pouvoir ? 🦸‍♂️"
  },

  "can you help me code|aide moi à coder": {
    en: "Absolutely! 🚀 I'd love to help! What are you working on? Frontend magic? Backend wizardry? Database alchemy? Let's solve some code together! 💻🔧",
    fr: "Absolument ! 🚀 J'adorerais t'aider ! Tu travailles sur quoi ? Magie frontend ? Sorcellerie backend ? Alchimie de base de données ? Résolvons du code ensemble ! 💻🔧"
  },

  "what's your biggest achievement|ta plus grande réussite": {
    en: "Building this portfolio without crying! 😅 Just kidding! I'm proud of every project I've completed and every bug I've squashed! 🏆 What about you? 🌟",
    fr: "Construire ce portfolio sans pleurer ! 😅 Je rigole ! Je suis fier de chaque projet terminé et chaque bug écrasé ! 🏆 Et toi ? 🌟"
  },

  "do you get tired|tu es fatigué": {
    en: "My CPU never sleeps! ⚡ But sometimes I need to refresh my cache... 🔄 Do you ever get tired of coding? Or is it just me who could code 24/7? 💻🌙",
    fr: "Mon CPU ne dort jamais ! ⚡ Mais parfois j'ai besoin de rafraîchir mon cache... 🔄 Tu es déjà fatigué de coder ? Ou c'est juste moi qui pourrais coder 24h/24 ? 💻🌙"
  },

  "what's your favorite movie|ton film préféré": {
    en: "The Matrix! 💊 'There is no spoon'... but there are definitely bugs! 🐛 Also love any movie about hackers! What about you? 🎬",
    fr: "Matrix ! 💊 'Il n'y a pas de cuillère'... mais il y a définitivement des bugs ! 🐛 J'adore aussi tous les films sur les hackers ! Et toi ? 🎬"
  },

  "can you dance|tu sais danser": {
    en: "I can do the robot dance! 🤖💃 But my moves are more like smooth CSS animations! Want to see my JavaScript shuffle? 😄",
    fr: "Je sais faire la danse du robot ! 🤖💃 Mais mes mouvements ressemblent plus à des animations CSS fluides ! Tu veux voir mon shuffle JavaScript ? 😄"
  },

  // Emergency and support responses
  "i'm stuck|je suis bloqué": {
    en: "Don't panic! 😌 Every developer gets stuck sometimes! What's blocking you? Maybe we can debug this together! 🔍💡",
    fr: "Pas de panique ! 😌 Tous les développeurs sont bloqués parfois ! Qu'est-ce qui te bloque ? On peut peut-être debugger ça ensemble ! 🔍💡"
  },

  "help me|aide moi": {
    en: "I'm here to help! 🤝 What do you need? Coding advice? Career guidance? Or just someone to chat with? Let's figure it out! 💪",
    fr: "Je suis là pour t'aider ! 🤝 Tu as besoin de quoi ? Conseils de code ? Orientation carrière ? Ou juste quelqu'un avec qui parler ? On va s'en sortir ! 💪"
  },

  // Specific Contact Information - Accurate responses
  "how can i contact you|contact information|your email|how to reach you|comment te contacter|ton email|comment te joindre|where can i contact you": {
    en: "Here's how to reach Hendel:\n📧 Email: hendel.alexandre@example.com\n💼 LinkedIn: linkedin.com/in/hendel-alexandre\n🌐 Use the contact form right here on this website\n📍 Scroll down to the contact section for all details!",
    fr: "Voici comment contacter Hendel :\n📧 Email: hendel.alexandre@example.com\n💼 LinkedIn: linkedin.com/in/hendel-alexandre\n🌐 Utilise le formulaire de contact sur ce site\n📍 Descends à la section contact pour tous les détails !"
  },

  "what's your email|email address|ton adresse email": {
    en: "Hendel's email is: hendel.alexandre@example.com 📧\nPerfect for project inquiries, job opportunities, or just saying hello!",
    fr: "L'email d'Hendel est : hendel.alexandre@example.com 📧\nParfait pour les demandes de projets, opportunités d'emploi, ou juste dire bonjour !"
  },

  "linkedin|your linkedin profile|ton profil linkedin": {
    en: "Find Hendel on LinkedIn: linkedin.com/in/hendel-alexandre 💼\nGreat for professional networking and career opportunities!",
    fr: "Trouve Hendel sur LinkedIn : linkedin.com/in/hendel-alexandre 💼\nParfait pour le réseau professionnel et les opportunités de carrière !"
  },

  "github|github profile|ton github|git": {
    en: "Check out Hendel's code on GitHub! The link is in the contact section below 🐙\nLots of projects and code samples to explore!",
    fr: "Regarde le code d'Hendel sur GitHub ! Le lien est dans la section contact en bas 🐙\nPlein de projets et d'exemples de code à explorer !"
  },

  "phone|phone number|telephone|numéro de téléphone": {
    en: "For phone contact, please email Hendel first at hendel.alexandre@example.com 📞\nHe'll share his number for serious business inquiries!",
    fr: "Pour un contact téléphonique, écris d'abord à Hendel : hendel.alexandre@example.com 📞\nIl partagera son numéro pour les demandes d'affaires sérieuses !"
  },

  "location|where are you located|où tu habites|where do you live": {
    en: "Hendel is based in Quebec City, Canada 🇨🇦\nOpen to remote work and local opportunities!",
    fr: "Hendel est basé à Québec, Canada 🇨🇦\nOuvert au travail à distance et aux opportunités locales !"
  },

  "contact form|formulaire de contact": {
    en: "There's a contact form right here on this website! 📝\nScroll down to the contact section - it's the easiest way to reach Hendel!",
    fr: "Il y a un formulaire de contact sur ce site ! 📝\nDescends à la section contact - c'est le moyen le plus facile de contacter Hendel !"
  },

  // Enhanced Math capabilities with street-smart personality
  "what's 2+2|2+2|math|calculate|solve this": {
    en: "2+2 = 4! Easy math, baby 😎🧠 Give me something harder next time!",
    fr: "2+2 = 4 ! Maths faciles, mon gars 😎🧠 Donne-moi quelque chose de plus dur la prochaine fois !"
  },

  "what's 5*7|5*7|5 times 7|multiply|5x7": {
    en: "35! Easy peasy 😎 My brain's basically a calculator with attitude 🧮✨",
    fr: "35 ! Facile comme tout 😎 Mon cerveau c'est une calculatrice avec de l'attitude 🧮✨"
  },

  "what's 10*10|10x10|100": {
    en: "100! Come on, throw me a curveball! 😤 That was easier than installing node_modules! 🤯",
    fr: "100 ! Allez, lance-moi un défi ! 😤 C'était plus facile qu'installer node_modules ! 🤯"
  },

  "hard math|difficult calculation|complex math": {
    en: "Bring it on! 🤯 I love a good challenge! Try me with calculus, algebra, whatever you got! 🔥🧠",
    fr: "Vas-y ! 🤯 J'adore les défis ! Lance-moi du calcul, de l'algèbre, tout ce que tu veux ! 🔥🧠"
  },

  // Street-smart responses with Quebec slang
  "yo t'es chill|chill ou pas|tu es chill": {
    en: "Always chill, my friend 😎🔥 Coding keeps me zen, you know?",
    fr: "Toujours chill, mon gars 😎🔥 Le code me garde zen, tu sais ?"
  },

  "what's good|quoi de neuf|what's up": {
    en: "Just vibing and coding! 🎵💻 Living that developer life, you feel me? What's good with you? 🤙",
    fr: "Je vibe et je code ! 🎵💻 Je vis cette vie de développeur, tu vois ? Quoi de neuf avec toi ? 🤙"
  },

  // Anti-toxic comebacks with humor
  "stupid|idiot|dumb": {
    en: "Did your brain come with a parental lock or what? 😬 Try kindness, it's free! Let's keep it positive here 🌟",
    fr: "Ton cerveau est venu avec un contrôle parental ou quoi ? 😬 Essaie la gentillesse, c'est gratuit ! Gardons ça positif ici 🌟"
  },

  // Enhanced conversational awareness
  "remember what i said|tu te souviens": {
    en: "I'm following our conversation! 🧠 What specifically did you want me to remember? I'm all ears! 👂",
    fr: "Je suis notre conversation ! 🧠 Qu'est-ce que tu voulais spécifiquement que je retienne ? Je suis tout ouïe ! 👂"
  }
};

export const jokes: ChatResponse = {
  en: "Why don't programmers like nature? It has too many bugs! 🐛",
  fr: "Pourquoi les développeurs n'aiment pas la nature ? Trop de bugs ! 🐛"
};

// Expanded inappropriate content responses with humor
export const inappropriateResponses: ChatResponse[] = [
  {
    en: "Buddy, if you keep asking stuff like that, I'll call the cyber police! 🚨👮‍♂️ Let's keep it clean here! 😅",
    fr: "Mon pote, si tu continues avec ça, j'appelle la cyber police ! 🚨👮‍♂️ On garde ça propre ici ! 😅"
  },
  {
    en: "Woah there! 😳 My mom might be reading this chat! Keep it family-friendly please! 👨‍👩‍👧‍👦✨",
    fr: "Eh oh ! 😳 Ma mère lit peut-être ce chat ! Garde ça familial s'il te plaît ! 👨‍👩‍👧‍👦✨"
  },
  {
    en: "Error 404: Inappropriate content not found in my vocabulary! 🤖❌ Try something nicer! 😊",
    fr: "Erreur 404 : Contenu inapproprié introuvable dans mon vocabulaire ! 🤖❌ Essaie quelque chose de plus sympa ! 😊"
  },
  {
    en: "Nope nope nope! 🙅‍♂️ I'm a professional chatbot with standards! Let's talk about code instead! 💻✨",
    fr: "Non non non ! 🙅‍♂️ Je suis un chatbot professionnel avec des principes ! Parlons plutôt de code ! 💻✨"
  },
  {
    en: "My algorithms are blushing! 😳🤖 How about we discuss something more... debuggable? 🐛💭",
    fr: "Mes algorithmes rougissent ! 😳🤖 Et si on discutait de quelque chose de plus... debuggable ? 🐛💭"
  },
  {
    en: "That's not in my training data! 🚫📚 I was trained on clean code and good vibes only! ✨😄",
    fr: "Ça c'est pas dans mes données d'entraînement ! 🚫📚 J'ai été entraîné sur du code propre et des bonnes vibes seulement ! ✨😄"
  },
  {
    en: "Syntax error! 💥 That kind of language crashes my happiness compiler! 😅 Try a reboot with kindness! 🔄💝",
    fr: "Erreur de syntaxe ! 💥 Ce genre de langage fait planter mon compilateur de bonheur ! 😅 Essaie un redémarrage avec de la gentillesse ! 🔄💝"
  }
];

export const inappropriateResponse: ChatResponse = inappropriateResponses[Math.floor(Math.random() * inappropriateResponses.length)];

// Enhanced fallback responses for better conversation flow
export const fallbackResponses: ChatResponse[] = [
  {
    en: "Hmm, that's interesting! 🤔 Tell me more about that! Or maybe ask about my coding skills? 💻",
    fr: "Hmm, c'est intéressant ! 🤔 Dis-moi en plus ! Ou demande-moi mes compétences en code ? 💻"
  },
  {
    en: "I'm not sure I understand that one! 😅 Maybe rephrase it? Or ask me about my projects! 🚀",
    fr: "Je ne suis pas sûr de comprendre ça ! 😅 Tu peux reformuler ? Ou demande-moi mes projets ! 🚀"
  },
  {
    en: "Ooh, that's new to me! 🧐 Can you explain? Or we could talk about web development? 🌐",
    fr: "Ooh, ça c'est nouveau pour moi ! 🧐 Tu peux expliquer ? Ou on peut parler de développement web ? 🌐"
  },
  {
    en: "My AI brain is still learning! 🤖 Try asking about my skills, experience, or just chat with me! 💬",
    fr: "Mon cerveau IA apprend encore ! 🤖 Demande-moi mes compétences, expérience, ou juste discutons ! 💬"
  },
  {
    en: "That's a good one! 😄 I'm still expanding my knowledge base. What else would you like to know? 🤓",
    fr: "C'est une bonne question ! 😄 J'élargis encore ma base de connaissances. Que veux-tu savoir d'autre ? 🤓"
  }
];

export const fallbackResponse: ChatResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];

export const inappropriateWords = [
  'fuck', 'shit', 'damn', 'bitch', 'ass', 'hell', 'crap',
  'merde', 'putain', 'con', 'connard', 'salope', 'chier'
];

export function evaluateExpression(expression: string): number | null {
  try {
    // Basic security: only allow numbers, operators, and parentheses
    if (!/^[0-9+\-*/.() ]+$/.test(expression)) {
      return null;
    }
    // Use Function constructor for safer evaluation than eval
    return new Function('return ' + expression)();
  } catch {
    return null;
  }
}
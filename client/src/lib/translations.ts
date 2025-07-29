export interface TranslationKey {
  en: string;
  fr: string;
}

export const translations = {
  // Navigation
  about: { en: "About", fr: "À propos" },
  skills: { en: "Skills", fr: "Compétences" },
  projects: { en: "Projects", fr: "Projets" },
  contact: { en: "Contact", fr: "Contact" },
  
  // Hero Section
  heroTitle: { en: "ALEXANDRE HENDEL", fr: "ALEXANDRE HENDEL" },
  heroSubtitle: { en: "Web Developer", fr: "Développeur Web" },
  heroDescription: { 
    en: "I'm a Bachelor student in Computer Science, aspiring to become a professional web developer.", 
    fr: "Je suis étudiant universitaire en informatique aspirant à devenir développeur web professionnel et même plus." 
  },
  viewMyWork: { en: "View My Work", fr: "Voir Mes Projets" },
  downloadCV: { en: "Download CV", fr: "Télécharger CV" },
  
  // About Section
  aboutMe: { en: "About Me", fr: "À Propos de Moi" },
  aboutDescription1: { 
    en: "I'm a passionate Computer Science student with a lifelong curiosity about technology and how it shapes the world. My journey into coding began in 2023, when I started creating simple web pages using HTML and CSS, with a touch of JavaScript to bring them to life.", 
    fr: "Je suis un étudiant passionné en informatique avec une curiosité de toujours pour la technologie et comment elle façonne le monde. Mon voyage dans le codage a commencé en 2023, quand j'ai commencé à créer des pages web simples en utilisant HTML et CSS, avec une touche de JavaScript pour les animer." 
  },
  aboutDescription2: { 
    en: "In 2025, I decided to take my skills to the next level by diving deeper into programming with Python. I challenged myself by building projects using technologies I had never explored before, stepping out of my comfort zone to grow as a developer and problem solver.", 
    fr: "En 2025, j'ai décidé de faire passer mes compétences au niveau supérieur en me plongeant plus profondément dans la programmation avec Python. Je me suis défié en construisant des projets utilisant des technologies que je n'avais jamais explorées auparavant, sortant de ma zone de confort pour grandir en tant que développeur et résolveur de problèmes." 
  },
  aboutDescription3: { 
    en: "I'm excited about the opportunity to collaborate with others, share ideas, and bring innovative projects to life. If you're looking for someone who is eager to learn, adapt, and contribute, I'd love to hear more about your projects and how we can work together.", 
    fr: "Je suis enthousiaste à l'idée de collaborer avec d'autres, de partager des idées et de donner vie à des projets innovants. Si vous cherchez quelqu'un qui est désireux d'apprendre, de s'adapter et de contribuer, j'aimerais en savoir plus sur vos projets et comment nous pouvons travailler ensemble." 
  },
  cleanCode: { en: "Front-end Web Creation", fr: "Création Web Front-end" },
  cleanCodeDesc: { en: "Building beautiful, functional user interfaces", fr: "Création d'interfaces utilisateur belles et fonctionnelles" },
  responsiveDesign: { en: "Responsive Design", fr: "Design Réactif" },
  responsiveDesignDesc: { en: "Adaptive layouts for all devices", fr: "Layouts adaptatifs pour tous les appareils" },
  problemSolving: { en: "Problem Solving", fr: "Résolution de Problèmes" },
  problemSolvingDesc: { en: "Creative solutions to challenges", fr: "Solutions créatives aux défis" },
  
  // Skills Section
  skillsTitle: { en: "Languages and Tools", fr: "Langages et Outils" },
  skillsSubtitle: { en: "Technologies I work with to bring ideas to life", fr: "Technologies que j'utilise pour donner vie aux idées" },
  skillsHint: { en: "Auto-scrolling • Hover to pause • Scroll to navigate", fr: "Défilement automatique • Survolez pour pausé • Faites défiler pour naviguer" },
  
  // Projects Section
  projectsTitle: { en: "MY PROJECTS", fr: "MES PROJETS" },
  projectsSubtitle: { 
    en: "What I've worked on", 
    fr: "Ce sur quoi j'ai travaillé" 
  },
  
  // Project Details
  ecommercePlatform: { en: "E-Commerce Platform", fr: "Plateforme E-Commerce" },
  ecommerceDesc: { 
    en: "Modern online store with responsive design, shopping cart functionality, and secure checkout process.", 
    fr: "Boutique en ligne moderne avec design réactif, fonctionnalité de panier et processus de commande sécurisé." 
  },
  taskManager: { en: "Task Manager App", fr: "Application de Gestion de Tâches" },
  taskManagerDesc: { 
    en: "Productivity application with drag-and-drop functionality, real-time updates, and team collaboration features.", 
    fr: "Application de productivité avec fonctionnalité glisser-déposer, mises à jour en temps réel et fonctionnalités de collaboration d'équipe." 
  },
  weatherDashboard: { en: "Weather Dashboard", fr: "Tableau de Bord Météo" },
  weatherDesc: { 
    en: "Beautiful weather application with location-based forecasts, interactive maps, and customizable widgets.", 
    fr: "Belle application météo avec prévisions basées sur la localisation, cartes interactives et widgets personnalisables." 
  },
  personalBlog: { en: "Personal Blog", fr: "Blog Personnel" },
  blogDesc: { 
    en: "Minimalist blog platform with markdown support, dark mode, and optimized for reading experience.", 
    fr: "Plateforme de blog minimaliste avec support markdown, mode sombre et optimisée pour l'expérience de lecture." 
  },
  
  liveDemo: { en: "Live Demo", fr: "Démo en Direct" },
  code: { en: "Code", fr: "Code" },
  viewAllProjects: { en: "View All Projects", fr: "Voir Tous les Projets" },
  
  // Contact Section
  contactTitle: { en: "CONTACT ME", fr: "CONTACTEZ-MOI" },
  contactDescription: { 
    en: "Have a project in mind? I'd love to hear about it. Let's create something amazing together.", 
    fr: "Vous avez un projet en tête? J'aimerais en entendre parler. Créons quelque chose d'incroyable ensemble." 
  },
  email: { en: "Email", fr: "Email" },
  yourName: { en: "Your Name", fr: "Votre Nom" },
  yourEmail: { en: "Your Email", fr: "Votre Email" },
  yourMessage: { en: "Your Message", fr: "Votre Message" },
  sendMessage: { en: "Send Message", fr: "Envoyer le Message" },
  messageSent: { en: "Thank you for your message! I'll get back to you soon.", fr: "Merci pour votre message! Je vous répondrai bientôt." },
  
  // Chatbot notifications
  chatbotNotification1: { 
    en: "Hey! I'm Hendelito, Alexandre's AI assistant. Got questions about his work or experience?", 
    fr: "Salut! Je suis Hendelito, l'assistant IA d'Alexandre. Des questions sur son travail ou son expérience?" 
  },
  chatbotNotification2: { 
    en: "Curious about Alexandre's projects or skills? I'm here to help with any questions!", 
    fr: "Curieux des projets ou compétences d'Alexandre? Je suis là pour répondre à vos questions!" 
  },
  chatbotNotification3: { 
    en: "Want to know more about Alexandre's background or get his contact info? Just ask!", 
    fr: "Vous voulez en savoir plus sur le parcours d'Alexandre ou obtenir ses coordonnées? Demandez-moi!" 
  },
  chatbotNotification4: { 
    en: "I can share details about Alexandre's experience, projects, or help you get in touch!", 
    fr: "Je peux partager des détails sur l'expérience d'Alexandre, ses projets, ou vous aider à le contacter!" 
  },
  startChatting: { en: "Start chatting", fr: "Commencer à discuter" },

  // Footer
  copyright: { en: "© 2024 Alexandre Hendel. All rights reserved.", fr: "© 2024 Alexandre Hendel. Tous droits réservés." }
};

export type Language = 'en' | 'fr';

export function getTranslation(key: keyof typeof translations, language: Language): string {
  return translations[key]?.[language] || translations[key]?.en || key;
}

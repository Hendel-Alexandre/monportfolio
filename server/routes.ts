import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateChatResponse } from "./openai-service";
import { githubService } from "./github-service";
import { 
  insertContactMessageSchema, 
  insertChatMessageSchema, 
  insertPortfolioViewSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact messages
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const contactMessage = await storage.createContactMessage(validatedData);
      res.json(contactMessage);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(400).json({ error: "Invalid contact message data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching contact messages:", error);
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  // OpenAI-powered chat response
  app.post("/api/chat/openai", async (req, res) => {
    try {
      const { message, sessionId } = req.body;
      
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: "Message is required" });
      }

      // Get recent conversation history for context
      const recentMessages = sessionId ? 
        await storage.getChatMessagesBySession(sessionId) : [];
      
      // Convert to OpenAI format (last 6 messages for context)
      const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = [];
      
      recentMessages.slice(-3).forEach(msg => {
        // Add user message
        conversationHistory.push({
          role: 'user',
          content: msg.message
        });
        // Add bot response
        if (msg.response) {
          conversationHistory.push({
            role: 'assistant',
            content: msg.response
          });
        }
      });

      // Try OpenAI first, fallback to local responses if needed
      let botResponse: string;
      
      try {
        botResponse = await generateChatResponse(message, conversationHistory);
      } catch (openaiError) {
        console.error("OpenAI unavailable, using fallback responses:", openaiError);
        // Import and use local chatbot responses
        const { getLocalChatResponse } = await import('../client/src/lib/chatbot-data');
        const language = req.body.language || 'en';
        botResponse = getLocalChatResponse(message, language);
      }

      // Save user message and bot response
      if (sessionId) {
        await storage.createChatMessage({
          sessionId,
          message,
          response: botResponse,
          language: req.body.language || 'en'
        });
      }

      res.json({ response: botResponse });
    } catch (error) {
      console.error("Error in chat route:", error);
      const language = req.body.language || 'en';
      const fallbackMessage = language === 'fr' 
        ? "Désolé, je rencontre des difficultés techniques ! Essayez de me demander l'email d'Alexandre, ses compétences, ou de faire du calcul ! 🤖"
        : "Sorry, I'm having technical difficulties! Try asking for Alexandre's email, skills, or do some math! 🤖";
      res.json({ response: fallbackMessage });
    }
  });

  // Chat messages (legacy endpoint for saving)
  app.post("/api/chat", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const chatMessage = await storage.createChatMessage(validatedData);
      res.json(chatMessage);
    } catch (error) {
      console.error("Error creating chat message:", error);
      res.status(400).json({ error: "Invalid chat message data" });
    }
  });

  app.get("/api/chat/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const messages = await storage.getChatMessagesBySession(sessionId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      res.status(500).json({ error: "Failed to fetch chat messages" });
    }
  });

  // Portfolio views (analytics)
  app.post("/api/analytics/view", async (req, res) => {
    try {
      const validatedData = insertPortfolioViewSchema.parse(req.body);
      const portfolioView = await storage.createPortfolioView(validatedData);
      res.json(portfolioView);
    } catch (error) {
      console.error("Error creating portfolio view:", error);
      res.status(400).json({ error: "Invalid portfolio view data" });
    }
  });

  app.get("/api/analytics/views", async (req, res) => {
    try {
      const views = await storage.getPortfolioViews();
      res.json(views);
    } catch (error) {
      console.error("Error fetching portfolio views:", error);
      res.status(500).json({ error: "Failed to fetch portfolio views" });
    }
  });

  // GitHub repositories endpoints
  app.get("/api/github/repos/:username", async (req, res) => {
    try {
      const { username } = req.params;
      const { limit } = req.query;
      
      const limitNum = limit ? parseInt(limit as string, 10) : 6;
      
      if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
        return res.status(400).json({ error: "Invalid limit parameter. Must be between 1 and 100." });
      }

      const repos = await githubService.getLatestRepositories(username, limitNum);
      res.json(repos);
    } catch (error) {
      console.error("Error fetching GitHub repositories:", error);
      res.status(500).json({ error: "Failed to fetch GitHub repositories" });
    }
  });

  app.get("/api/github/repo/:username/:repoName", async (req, res) => {
    try {
      const { username, repoName } = req.params;
      const repo = await githubService.getRepository(username, repoName);
      res.json(repo);
    } catch (error) {
      console.error(`Error fetching repository ${req.params.username}/${req.params.repoName}:`, error);
      res.status(500).json({ error: "Failed to fetch repository" });
    }
  });

  // CV Download endpoint with language support
  app.get("/api/cv/download", async (req, res) => {
    try {
      const language = req.query.lang as string || 'en';
      const filename = language === 'fr' 
        ? 'Alexandre_Hendel_CV_Francais.pdf'
        : 'Alexandre_Hendel_CV_English.pdf';
      
      const path = require('path');
      const fs = require('fs');
      const filePath = path.join(process.cwd(), 'client', 'public', 'cv', filename);
      
      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'CV file not found' });
      }
      
      // Set proper headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      res.setHeader('Cache-Control', 'no-cache');
      
      // Stream the file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
      
      fileStream.on('error', (err: any) => {
        console.error('Error streaming CV file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download CV' });
        }
      });
      
    } catch (error) {
      console.error("Error downloading CV:", error);
      res.status(500).json({ error: "Failed to download CV" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

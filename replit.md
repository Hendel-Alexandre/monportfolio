# Portfolio Website Project

## Overview

This is a modern, multilingual portfolio website for Hendel Alexandre, a web developer and computer science student. The application is built as a full-stack web application using React for the frontend and Express.js for the backend, with a focus on beautiful UI/UX design and internationalization support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Context for theme and language state
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement via Vite middleware

## Key Components

### UI Component System
- Complete shadcn/ui component library implementation
- Radix UI primitives for accessibility and behavior
- Custom theme system with CSS variables
- Dark/light mode support with persistent storage
- Responsive design with Tailwind CSS

### Internationalization
- Custom translation system supporting English and French
- Context-based language switching
- Persistent language preference

### Portfolio Features
- Hero section with animated geometric background
- About section with high-quality coding GIF (1:1 ratio) and scroll animations
- Interactive skills carousel with continuous horizontal auto-scrolling
- Project showcase with custom company images and hover effects
- Contact form with validation
- Smooth scrolling navigation
- Mobile-responsive design

### Database Schema
- User authentication system with UUID primary keys
- Contact messages storage with validation
- Chat messages storage for analytics and conversation history
- Portfolio view tracking for analytics
- Extensible schema structure using Drizzle ORM
- PostgreSQL-compatible with proper relations

## Data Flow

1. **Client-Side Rendering**: React application served via Vite in development
2. **State Management**: 
   - Theme state managed via React Context with localStorage persistence
   - Language state managed via React Context
   - Server state cached via TanStack Query
3. **API Communication**: RESTful API endpoints (currently minimal, ready for expansion)
4. **Database Operations**: Drizzle ORM handles all database interactions
5. **Session Management**: PostgreSQL-backed sessions for user authentication

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Complete set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Modern icon library

### Development Dependencies
- **vite**: Fast build tool with HMR
- **typescript**: Type safety throughout the application
- **@replit/vite-plugin-runtime-error-modal**: Enhanced error reporting in development

## Deployment Strategy

### Development
- Vite dev server with Express middleware integration
- Hot module replacement for fast development cycles
- Environment-based configuration

### Production Build
- Frontend: Vite builds optimized React bundle to `dist/public`
- Backend: esbuild compiles TypeScript server to `dist/index.js`
- Single Node.js process serves both static files and API endpoints

### Database
- Drizzle migrations stored in `./migrations` directory
- Schema defined in `shared/schema.ts` for type sharing
- Database URL configured via environment variables

### Key Architectural Decisions

1. **Monorepo Structure**: Client, server, and shared code in single repository for easier development and type sharing
2. **Full-Stack TypeScript**: End-to-end type safety from database to UI components
3. **Component-Driven UI**: shadcn/ui provides consistent, accessible components
4. **Server-Side Integration**: Vite middleware allows seamless full-stack development
5. **Progressive Enhancement**: Portfolio works without JavaScript, enhanced with React
6. **Database-Ready**: Authentication system prepared for future user features

The application is designed to be easily extensible, with clean separation of concerns and modern web development practices throughout.

## Recent Changes (January 25, 2025)

### Complete Portfolio Redesign & Information Update
- **Personal Information Update**: Changed name ordering to "Alexandre Hendel", updated all contact details including email (alexandre.hendel07@gmail.com), phone (514-458-1262), and LinkedIn profile
- **Dark Mode Default**: Set dark mode as the default theme with light mode as optional toggle
- **Enhanced About Section**: Updated description to reflect authentic background - passionate about computer science since beginning, started coding in 2023, currently bachelor student
- **Skills Modernization**: Updated skills to reflect actual expertise: HTML/CSS, Python, JavaScript, SAP, Photoshop/Figma/Adobe AI/Adobe XD, Microsoft Office/Excel
- **Enhanced Auto-Scrolling Skills Carousel**: Implemented smooth auto-scrolling with pause on hover, manual control, and advanced scroll animations
- **Micro-Interactions for Skill Icons**: Added comprehensive hover effects including scale, rotation, bounce animations, ripple effects, and brightness enhancement
- **Smooth Scroll Animations**: Added CSS cubic-bezier transitions, entrance animations, hover effects, and scrolling visual indicators

### Advanced Chatbot "Hendelito" Improvements
- **Text Overflow Fix**: Resolved chat text going outside gray chat box with proper word wrapping
- **Clickable Links Integration**: Made email, phone, LinkedIn, and GitHub links clickable within chat responses
- **Hidden URL Display**: Links show descriptive text instead of visible URLs for cleaner appearance
- **CV Download Integration**: Direct PDF download link when users request CV/resume
- **Updated Response Content**: All fallback responses reflect new personal information and skills
- **Enhanced Contact Responses**: Comprehensive contact information with location and availability status

### UI/UX Enhancements
- **Contact Section Redesign**: Centered and improved contact methods layout with hover effects and clear call-to-actions
- **Responsive Contact Links**: Email, LinkedIn, and GitHub icons are now clickable with hover animations
- **Hero Section Updates**: Corrected name display order and added proper CV download functionality
- **Smooth Transitions**: Enhanced animations and transitions throughout the portfolio
- **Bilingual Consistency**: All changes properly implemented in both English and French languages

### Featured Projects Showcase with Live Previews
- **Custom Project Images**: Featured Hendel-Morneau Quote App now displays custom Morneau truck company image
- **Professional Project Cards**: Hover effects reveal action buttons for direct site access and code viewing
- **Responsive Design**: Optimized layout for desktop and mobile viewing experiences
- **Bilingual Project Information**: Complete descriptions and interface in both English and French
- **Direct Access Links**: Immediate access to live websites and GitHub repositories

### Technical Infrastructure
- **OpenAI API Integration**: Updated API key and resolved quota issues for improved chatbot functionality
- **React Query Integration**: Efficient data fetching with caching and background updates
- **TypeScript Schema Validation**: Robust type safety for GitHub API responses using Zod
- **Fallback Systems**: Multiple layers of fallback for both chatbot and GitHub features
- **Performance Optimization**: Smart caching strategies for external API calls
- **Theme System Enhancement**: Improved dark mode implementation with proper defaults
- **Bilingual CV Download System**: Automatic language-specific CV serving (French/English) based on user's language preference
- **Personalized Chatbot Responses**: Added custom responses for personal topics including Alejandra references with romantic and fun personality

### Advanced Section Animations & Visual Enhancement (January 25, 2025)
- **Gradient Line Section Separators**: Added elegant gradient lines at the top of each section for visual consistency
- **Enhanced Scroll-Direction Title Animations**: Titles now move significantly left/right (60px) based on scroll direction with smooth 0.8s transitions
- **Unified Title Styling**: Applied consistent large, bold gradient text treatment across all section titles (text-6xl font-black)
- **Background Enhancement**: Added subtle gradient overlays and z-index management for proper layering
- **Smooth Cubic-Bezier Transitions**: Implemented professional easing curves for natural movement animations
- **Projects Section Optimization**: Refined sizing and proportions while maintaining all advanced animations

### Chatbot Notification System (January 25, 2025)
- **Proactive User Engagement**: Added subtle floating notifications that appear periodically to encourage chatbot interaction
- **Smart Timing System**: First notification appears after 10 seconds, then every 45 seconds if chat is closed
- **Auto-Hide Mechanism**: Notifications automatically disappear after 8 seconds with smooth fade animations
- **Multiple Message Variants**: Four different notification messages rotate to keep engagement fresh
- **Bilingual Notification Content**: All notification messages support both English and French languages
- **Elegant Visual Design**: Pulse rings, backdrop blur, and smooth animations create professional appearance
- **User-Friendly Controls**: Click-to-open chat functionality and dismissible close button for user control

### Enhanced Project Showcase (January 25, 2025)
- **Centered Title Overlay**: Added Transport Morneau project title prominently displayed in the center of the project image with elegant styling
- **Comprehensive Project Description**: Expanded project description to detail full functionality including automated pricing, client management, real-time generation, and PDF export
- **Animated Technology Tags**: Redesigned technology section with centered layout, animated fade-in effects, and pulse icons for each technology
- **Enhanced Visual Design**: Added glow effects, gradient backgrounds, and hover animations for technology tags
- **Bilingual Technology Headers**: Added proper section headers for technology lists in both English and French
- **Professional Presentation**: Improved overall project card layout with better spacing and visual hierarchy

### Skills and Professional Updates (January 26, 2025)
- **Title Update**: Changed from "Front-End Developer" to "Web Developer" across all sections and meta tags
- **Skills Portfolio Refresh**: Removed FL Studio, Sony Vegas, and React from skills showcase
- **New Skills Addition**: Added Adobe XD, Microsoft Office Suite, and Excel to reflect current expertise
- **Chatbot Knowledge Update**: Updated AI assistant responses to reflect new skills and removed outdated technology references
- **CV Replacement**: Updated with latest French CV maintaining original language and format
- **Loading Screen Enhancement**: Implemented professional loading screen with user's HA logo, video background, and smooth animations

### New Project Addition (January 26, 2025)
- **Haies de Ced Landscape Website**: Added second featured project showcasing professional landscaping services website
- **Professional Landscape Image**: Replaced SVG with high-quality landscape photography showing luxurious outdoor seating area with palm trees and professional landscaping
- **Bilingual Project Content**: Complete French and English descriptions for the hedge trimming service business website
- **Technology Stack Display**: Features HTML, CSS, JavaScript, and Responsive Design technologies
- **Live Preview Integration**: Direct links to live GitHub Pages deployment and source code repository

### Mobile Header Layout Enhancement (January 26, 2025)
- **Centered Logo**: HA logo now centered in mobile header layout for better visual balance
- **Language Toggle Left**: EN/FR language switcher positioned on the left side of mobile header
- **Menu Right**: Hamburger menu and theme toggle moved to the right side of mobile header
- **Improved Mobile UX**: Better mobile navigation with cleaner visual hierarchy and easier thumb accessibility

### Mobile Performance Optimization (January 26, 2025)
- **Video Optimization**: Reduced video preload and playback rate on mobile devices for better performance
- **Animation Throttling**: Reduced animation frequency and complexity on mobile to improve frame rates
- **Hardware Acceleration**: Added CSS transforms and backface-visibility optimizations for smoother scrolling
- **Lazy Loading**: Implemented proper image lazy loading with async decoding for faster page loads
- **Touch Optimization**: Enhanced touch scrolling and reduced unnecessary event listeners on mobile
- **Memory Management**: Optimized video element handling and fallback systems for lower-end devices
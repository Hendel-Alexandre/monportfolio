import { ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

import morneauImage from "@assets/morneau_1753485635997.jpg";
import landscapeImage from "@assets/port-locksleigh-ryan-burress-landscape-design-and-build-img~2dd17e2504ef9415_9-4998-1-4b42fe6_1753560022987.jpg";

export function ProjectsSection() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();

  
  // Featured projects with live previews
  const projects = [
    {
      id: 1,
      title: language === 'fr' ? 'Application de Devis Transport Morneau' : 'Transport Morneau Quote App',
      description: language === 'fr' 
        ? 'Système complet de gestion de devis construit spécifiquement pour l\'entreprise de camionnage Transport Morneau. Comprend des calculs de prix automatisés basés sur la distance, le poids et le type de cargaison, un système de gestion client intégré, la génération de devis en temps réel, la fonctionnalité d\'export PDF, et un tableau de bord réactif pour suivre les devis et gérer les relations clients. Optimise tout le flux de travail du devis à la livraison.'
        : 'Comprehensive quote management system built specifically for Transport Morneau trucking company. Features automated pricing calculations based on distance, weight, and cargo type, integrated client management system, real-time quote generation, PDF export functionality, and responsive dashboard for tracking quotes and managing customer relationships. Streamlines the entire quote-to-delivery workflow.',
      url: 'https://hendel-morneau-quote-app.replit.app/',
      github: 'https://github.com/hendel-alexandre/hendel-morneau-quote-app',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Responsive Design'],
      thumbnail: 'https://hendel-morneau-quote-app.replit.app/', // Will use iframe for live preview
      imageUrl: morneauImage,
      featured: true
    },
    {
      id: 2,
      title: language === 'fr' ? 'Haies de Ced - Taille de Haies' : 'Haies de Ced - Hedge Trimming Service',
      description: language === 'fr' 
        ? 'Site web professionnel pour une entreprise de taille de haies et d\'arbustes offrant des services d\'aménagement paysager. Le site présente les services de qualité avec estimation gratuite, incluant la taille de haies, la taille d\'arbustes et la pose de haies. Design moderne et responsive avec galerie de services, formulaire de contact et informations de devis instantané.'
        : 'Professional website for a hedge and shrub trimming business offering landscaping services. The site showcases quality services with free estimates, including hedge trimming, shrub pruning, and hedge installation. Modern responsive design with service gallery, contact form, and instant quote information.',
      url: 'https://hendel-alexandre.github.io/Haies-de-ced/',
      github: 'https://github.com/hendel-alexandre/Haies-de-ced',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
      thumbnail: 'https://hendel-alexandre.github.io/Haies-de-ced/',
      imageUrl: landscapeImage,
      featured: true
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-line" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Static Title */}
        <div 
          ref={elementRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'visible' : ''
          }`}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                {getTranslation('projectsTitle', language)}
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-primary/50 mx-auto mb-4"></div>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {getTranslation('projectsSubtitle', language)}
            </p>
          </div>
        </div>
        
        {/* Enhanced Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 max-w-4xl mx-auto">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-showcase group transition-all duration-700 ${
                isVisible ? 'visible' : ''
              }`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              <div className="bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Project Image Preview */}
                <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                    style={{ 
                      willChange: 'transform',
                      transform: 'translateZ(0)'
                    }}
                  />
                  
                  {/* Centered Project Title Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-all duration-500">
                    <div className="text-center px-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
                        {project.title}
                      </h3>
                      <div className="w-16 h-1 bg-white/80 mx-auto"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced Action Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex gap-4">
                        <a 
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary flex-1 text-center shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                          <ExternalLink className="w-5 h-5" />
                          {language === 'fr' ? 'Voir le Site' : 'View Live Site'}
                        </a>
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary flex-1 text-center shadow-xl hover:shadow-2xl transform hover:scale-105"
                        >
                          <Github className="w-5 h-5" />
                          {language === 'fr' ? 'Code' : 'Code'}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Project Details */}
                <div className="p-6">
                  <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Enhanced Technologies with Animations */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground/70 uppercase tracking-wide">
                      {language === 'fr' ? 'Langages et Outils' : 'Languages and Tools'}
                    </h4>
                    <div className="flex flex-wrap gap-3 justify-center">
                      {project.technologies.map((tech, index) => (
                        <div 
                          key={tech}
                          className="group/tech relative"
                          style={{
                            animationDelay: `${index * 100}ms`
                          }}
                        >
                          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 text-primary rounded-full border border-primary/20 font-medium hover:from-primary/20 hover:to-primary/10 hover:scale-110 hover:shadow-lg transition-all duration-300 animate-fade-in-up">
                            {/* Technology Icon */}
                            <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                            </div>
                            <span className="text-sm">
                              {tech}
                            </span>
                          </div>
                          
                          {/* Hover Glow Effect */}
                          <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover/tech:opacity-50 transition-opacity duration-300 -z-10"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View More Projects Link */}
        <div className="text-center mt-12">
          <a 
            href="https://github.com/hendel-alexandre"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary hover:shadow-xl transform hover:scale-105"
          >
            <Github className="w-4 h-4" />
            {getTranslation('viewAllProjects', language)}
          </a>
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from "react";
import { useLanguage } from "@/hooks/use-language";
import { getTranslation } from "@/lib/translations";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { CheckCircle, XCircle, RotateCcw, Trophy, Target } from "lucide-react";

interface Fact {
  id: number;
  statement: {
    en: string;
    fr: string;
  };
  isTrue: boolean;
  explanation: {
    en: string;
    fr: string;
  };
}

const facts: Fact[] = [
  {
    id: 1,
    statement: {
      en: "I once built a weather app that predicted the outcome of soccer matches.",
      fr: "J'ai un jour créé une app météo qui prédisait les résultats de matchs de soccer."
    },
    isTrue: false,
    explanation: {
      en: "I've always thought that there were enough weather apps to create a new one haha",
      fr: "J'ai toujours pensé qu'il y avait assez d'apps météo pour en créer une nouvelle haha"
    }
  },
  {
    id: 2,
    statement: {
      en: "My favorite programming language is JavaScript.",
      fr: "Mon langage de programmation préféré est JavaScript."
    },
    isTrue: false,
    explanation: {
      en: "JavaScript is a pain :( you never feel like you fully understand it",
      fr: "JavaScript c'est pénible :( on a jamais l'impression de complètement le comprendre"
    }
  },
  {
    id: 3,
    statement: {
      en: "I've participated in a 24-hour hackathon — and won.",
      fr: "J'ai participé à un hackathon de 24 heures — et j'ai gagné."
    },
    isTrue: false,
    explanation: {
      en: "Never done that, but will do in the future",
      fr: "Jamais fait ça, mais je le ferai à l'avenir"
    }
  },
  {
    id: 4,
    statement: {
      en: "I can write code in three different languages — and one of them is Python.",
      fr: "Je peux coder dans trois langages différents — et l'un d'eux est Python."
    },
    isTrue: true,
    explanation: {
      en: "I love Python :D",
      fr: "J'adore Python :D"
    }
  },
  {
    id: 5,
    statement: {
      en: "I designed my first website when I was 12.",
      fr: "J'ai conçu mon premier site web à 12 ans."
    },
    isTrue: false,
    explanation: {
      en: "I was playing basketball at 12 lmao",
      fr: "Je jouais au basketball à 12 ans mdr"
    }
  },
  {
    id: 6,
    statement: {
      en: "I drink at least 2 cups of coffee while coding.",
      fr: "Je bois au moins 2 tasses de café en codant."
    },
    isTrue: false,
    explanation: {
      en: "I don't really like coffee",
      fr: "J'aime pas vraiment le café"
    }
  },
  {
    id: 7,
    statement: {
      en: "I have a pet named 'Bug' — yes, like the code kind.",
      fr: "J'ai un animal de compagnie nommé 'Bug' — oui, comme dans le code."
    },
    isTrue: false,
    explanation: {
      en: "You get it ?? .... ahaha",
      fr: "Tu comprends ?? .... ahaha"
    }
  }
];

export function GuessFactGame() {
  const { language } = useLanguage();
  const { elementRef, isVisible } = useScrollAnimation();
  
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'answered' | 'finished'>('playing');
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState<boolean[]>(new Array(facts.length).fill(false));

  const currentFact = facts[currentFactIndex];
  const isGameFinished = totalAnswered === facts.length;

  const handleAnswer = (userAnswer: boolean) => {
    if (gameState !== 'playing') return;

    const isCorrect = userAnswer === currentFact.isTrue;
    setLastAnswerCorrect(isCorrect);
    setGameState('answered');
    setShowExplanation(true);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTotalAnswered(totalAnswered + 1);
    
    // Mark this fact as answered
    const newAnswered = [...answered];
    newAnswered[currentFactIndex] = true;
    setAnswered(newAnswered);

    // Auto-advance after showing explanation
    setTimeout(() => {
      if (totalAnswered + 1 >= facts.length) {
        setGameState('finished');
      } else {
        nextFact();
      }
    }, 3000);
  };

  const nextFact = () => {
    setShowExplanation(false);
    setLastAnswerCorrect(null);
    setGameState('playing');
    
    if (currentFactIndex < facts.length - 1) {
      setCurrentFactIndex(currentFactIndex + 1);
    } else {
      setGameState('finished');
    }
  };

  const resetGame = () => {
    setCurrentFactIndex(0);
    setScore(0);
    setTotalAnswered(0);
    setGameState('playing');
    setLastAnswerCorrect(null);
    setShowExplanation(false);
    setAnswered(new Array(facts.length).fill(false));
  };

  const getScoreMessage = () => {
    const percentage = (score / facts.length) * 100;
    
    if (percentage >= 80) {
      return {
        en: "🎉 Amazing! You really know me! Are you sure you're not stalking my LinkedIn?",
        fr: "🎉 Incroyable! Tu me connais vraiment! T'es sûr que tu stalkes pas mon LinkedIn?"
      };
    } else if (percentage >= 60) {
      return {
        en: "😊 Nice job! You've got a good sense of who I am!",
        fr: "😊 Bien joué! Tu as une bonne idée de qui je suis!"
      };
    } else if (percentage >= 40) {
      return {
        en: "🤔 Not bad! You're getting to know me better!",
        fr: "🤔 Pas mal! Tu commences à mieux me connaître!"
      };
    } else {
      return {
        en: "😅 Hmm, back to stalking my LinkedIn? But hey, now you know me better!",
        fr: "😅 Hmm, retour au stalking de mon LinkedIn? Mais maintenant tu me connais mieux!"
      };
    }
  };

  return (
    <section id="about" className="py-20 px-4 bg-muted/30 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse-line" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <div 
          ref={elementRef}
          className={`text-center mb-12 transition-all duration-700 ease-out ${
            isVisible ? 'visible' : ''
          }`}
        >
          <div className="relative">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 text-foreground">
              <span className="bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
                {language === 'en' ? '🎯 Guess the Fact About Me!' : '🎯 Devine le Fait sur Moi!'}
              </span>
            </h2>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mx-auto mb-8"></div>
            
            {/* Score Display */}
            {!isGameFinished && (
              <div className="flex justify-center items-center gap-4 mb-6">
                <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40">
                  <Trophy className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    {language === 'en' ? 'Score' : 'Score'}: {score}/{facts.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border/40">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    {totalAnswered}/{facts.length}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`section-fade-in ${isVisible ? 'visible' : ''}`}>
          {!isGameFinished ? (
            <div className="max-w-2xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">
                    {language === 'en' ? 'Progress' : 'Progrès'}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {currentFactIndex + 1} / {facts.length}
                  </span>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 ease-out"
                    style={{ width: `${((currentFactIndex + 1) / facts.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Fact Card */}
              <div className="relative">
                <div className={`
                  bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm 
                  p-8 rounded-2xl border border-border/40 shadow-xl
                  transition-all duration-500 ease-out
                  ${gameState === 'answered' ? 'scale-105' : 'hover:scale-102'}
                  ${lastAnswerCorrect === true ? 'border-green-500/50 bg-green-50/10' : ''}
                  ${lastAnswerCorrect === false ? 'border-red-500/50 bg-red-50/10' : ''}
                `}>
                  
                  {/* Answer Result Animation */}
                  {gameState === 'answered' && (
                    <div className={`
                      absolute top-4 right-4 transition-all duration-500
                      ${lastAnswerCorrect ? 'animate-bounce' : 'animate-pulse'}
                    `}>
                      {lastAnswerCorrect ? (
                        <CheckCircle className="w-8 h-8 text-green-500" />
                      ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                      )}
                    </div>
                  )}

                  {/* Fact Number */}
                  <div className="flex items-center justify-center mb-6">
                    <div className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                      {language === 'en' ? 'Fact' : 'Fait'} #{currentFact.id}
                    </div>
                  </div>

                  {/* Fact Statement */}
                  <div className="text-center mb-8">
                    <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
                      {currentFact.statement[language]}
                    </p>
                  </div>

                  {/* Answer Buttons */}
                  {gameState === 'playing' && (
                    <div className="flex gap-4 justify-center">
                      <button
                        onClick={() => handleAnswer(true)}
                        className="
                          flex-1 max-w-32 bg-green-500 hover:bg-green-600 
                          text-white font-medium py-3 px-6 rounded-xl
                          transition-all duration-300 hover:scale-105
                          hover:shadow-lg hover:shadow-green-500/25
                          active:scale-95
                        "
                      >
                        {language === 'en' ? 'True' : 'Vrai'}
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="
                          flex-1 max-w-32 bg-red-500 hover:bg-red-600 
                          text-white font-medium py-3 px-6 rounded-xl
                          transition-all duration-300 hover:scale-105
                          hover:shadow-lg hover:shadow-red-500/25
                          active:scale-95
                        "
                      >
                        {language === 'en' ? 'False' : 'Faux'}
                      </button>
                    </div>
                  )}

                  {/* Explanation */}
                  {showExplanation && (
                    <div className={`
                      mt-6 p-4 rounded-xl border border-border/40
                      bg-muted/30 backdrop-blur-sm
                      transition-all duration-500 ease-out
                      ${showExplanation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                      <div className="flex items-center gap-2 mb-2">
                        {lastAnswerCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                        <span className={`font-medium ${
                          lastAnswerCorrect ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}>
                          {lastAnswerCorrect 
                            ? (language === 'en' ? 'Correct!' : 'Correct!') 
                            : (language === 'en' ? 'Incorrect!' : 'Incorrect!')
                          }
                        </span>
                      </div>
                      <p className="text-muted-foreground">
                        {currentFact.explanation[language]}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Game Finished - Results */
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-sm p-8 rounded-2xl border border-border/40 shadow-xl">
                
                {/* Trophy Animation */}
                <div className="mb-6">
                  <Trophy className="w-16 h-16 text-primary mx-auto animate-bounce" />
                </div>

                {/* Final Score */}
                <div className="mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {language === 'en' ? 'Game Complete!' : 'Jeu Terminé!'}
                  </h3>
                  <div className="text-4xl md:text-5xl font-black text-primary mb-4">
                    {score}/{facts.length}
                  </div>
                  <div className="text-lg text-muted-foreground">
                    {Math.round((score / facts.length) * 100)}% {language === 'en' ? 'correct' : 'correct'}
                  </div>
                </div>

                {/* Score Message */}
                <div className="mb-8">
                  <p className="text-lg leading-relaxed text-foreground">
                    {getScoreMessage()[language]}
                  </p>
                </div>

                {/* Play Again Button */}
                <button
                  onClick={resetGame}
                  className="
                    inline-flex items-center gap-2 bg-primary hover:bg-primary/90 
                    text-primary-foreground font-medium py-3 px-6 rounded-xl
                    transition-all duration-300 hover:scale-105
                    hover:shadow-lg hover:shadow-primary/25
                    active:scale-95
                  "
                >
                  <RotateCcw className="w-4 h-4" />
                  {language === 'en' ? 'Play Again' : 'Rejouer'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
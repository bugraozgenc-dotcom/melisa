import React, { useState, useEffect } from 'react';
import { Heart, Stars, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [accepted, setAccepted] = useState(false);
  const [noBtnStyle, setNoBtnStyle] = useState<React.CSSProperties>({});
  const [bgHearts, setBgHearts] = useState<{ id: number; left: number; top: number; size: number; duration: number }[]>([]);

  // Generate random background hearts on mount
  useEffect(() => {
    const hearts = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 30 + 10,
      duration: Math.random() * 10 + 5,
    }));
    setBgHearts(hearts);
  }, []);

  const moveNoButton = () => {
    // Calculate bounds to keep the button horizontally on screen
    // Assuming button width is approx 150px (px-10 py-4 text-xl)
    const viewportWidth = window.innerWidth;
    const buttonWidth = 150; 
    const margin = 20;
    
    // Max offset from center (0)
    const maxOffset = (viewportWidth / 2) - (buttonWidth / 2) - margin;
    
    // Generate random X offset between -maxOffset and +maxOffset
    const randomX = (Math.random() * 2 * maxOffset) - maxOffset;

    // Use transform to move horizontally while keeping vertical position in flow
    setNoBtnStyle({
      transform: `translateX(${randomX}px)`,
      transition: 'transform 0.2s ease-out',
    });
  };

  const handleYesClick = () => {
    setAccepted(true);
    // Fire balloon-like confetti
    const duration = 3000;
    const end = Date.now() + duration;

    // Launch fireworks from both sides with balloon shapes
    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff69b4', '#00ced1'],
        shapes: ['circle'],
        scalar: 2 // Make them bigger to look like balloons
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#ff69b4', '#00ced1'],
        shapes: ['circle'],
        scalar: 2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    
    // Initial burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff0000'],
      shapes: ['circle'],
      scalar: 1.5
    });
    
    frame();
  };

  if (accepted) {
    return (
      <div className="min-h-screen bg-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorations */}
        {bgHearts.map((heart) => (
          <div
            key={heart.id}
            className="absolute text-pink-200 opacity-50 pointer-events-none animate-pulse"
            style={{
              left: `${heart.left}%`,
              top: `${heart.top}%`,
              fontSize: `${heart.size}px`,
              animationDuration: `${heart.duration}s`
            }}
          >
            <Heart fill="currentColor" />
          </div>
        ))}

        <div className="z-10 bg-white p-10 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-lg w-full border-4 border-pink-300">
          <div className="mb-4 animate-bounce">
            <PartyPopper size={64} className="text-pink-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-pink-600 mb-6">
            Yaşasın! 🎉
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 font-medium">
            Biliyordum! Ben de seni çok seviyorum Melisa! 💖
          </p>
          
          <div className="relative mb-8 group">
            <img 
              src="https://media.tenor.com/gUju9G9iC4AAAAAd/cat-hug.gif" 
              alt="Me and You Cats" 
              className="rounded-xl shadow-lg border-2 border-pink-200 w-full object-cover"
            />
            {/* Overlay Text attempting to recreate the meme vibe */}
            <span className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-black text-3xl md:text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
              ME
            </span>
            <span className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 translate-y-1/2 text-white font-black text-3xl md:text-4xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]" style={{ textShadow: '2px 2px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000' }}>
              YOU
            </span>
          </div>

          <button 
            onClick={() => setAccepted(false)}
            className="text-gray-400 hover:text-gray-600 text-sm underline"
          >
            Başa dön
          </button>
        </div>
        
        <div className="absolute bottom-4 text-pink-400 text-sm font-medium opacity-80">
           Made with <a href="https://www.bugrahanozgenc.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors underline">www.bugrahanozgenc.com</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Hearts */}
      {bgHearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-200 opacity-40 pointer-events-none"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            fontSize: `${heart.size}px`,
          }}
        >
          <Heart fill="currentColor" />
        </div>
      ))}

      <div className="z-10 bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-pink-100 flex flex-col items-center text-center max-w-2xl w-full">
        <div className="mb-6 text-pink-500">
          <Stars size={48} />
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-12 leading-tight">
          Melisa, beni seviyor musun?
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-6 w-full justify-center min-h-[100px]">
          <button
            onClick={handleYesClick}
            className="px-10 py-4 bg-green-500 text-white text-xl font-bold rounded-xl shadow-lg 
                     hover:bg-green-600 hover:scale-105 hover:shadow-green-500/30 
                     transition-all duration-200 transform active:scale-95 w-full md:w-auto"
          >
            Evet 💘
          </button>
          
          <button
            onMouseEnter={moveNoButton}
            onClick={moveNoButton} // For mobile touch support
            style={noBtnStyle}
            className="px-10 py-4 bg-red-500 text-white text-xl font-bold rounded-xl shadow-lg 
                     hover:bg-red-600 transition-colors duration-200 w-full md:w-auto
                     cursor-pointer"
          >
            Hayır 😢
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-4 text-pink-300 text-sm hover:text-pink-400 transition-colors">
        Made with <a href="https://www.bugrahanozgenc.com" target="_blank" rel="noopener noreferrer" className="font-semibold underline">www.bugrahanozgenc.com</a>
      </div>
    </div>
  );
}
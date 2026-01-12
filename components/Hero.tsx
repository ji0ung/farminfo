
import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface HeroProps {
  onOpenContact: () => void;
}

const Hero: React.FC<HeroProps> = ({ onOpenContact }) => {
  const [scrollY, setScrollY] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.pageYOffset);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 15,
        y: (e.clientY / window.innerHeight - 0.5) * 15,
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleDownloadPDF = (e: React.MouseEvent) => {
    e.preventDefault();
    const dummyContent = "홈쇼핑모아 서비스 소개서 내용이 포함된 PDF 파일입니다.";
    const blob = new Blob([dummyContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '홈쇼핑모아_서비스_소개서.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="about" className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white scroll-mt-24">
      {/* Background Glows */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 transition-transform duration-75 ease-out opacity-40"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="absolute top-[-5%] left-[-10%] w-[45%] h-[45%] bg-green-200 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[55%] h-[55%] bg-emerald-100 blur-[150px] rounded-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div 
          ref={ref as any}
          className={`flex flex-col lg:flex-row items-center gap-16 lg:gap-24 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8 inline-flex items-center space-x-2">
              <span className="h-[1px] w-6 bg-farm-primary opacity-50"></span>
              <span className="text-farm-primary text-sm font-semibold tracking-[0.2em] uppercase">
                Novel Strategy
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-thin text-gray-900 mb-8 leading-[1.1] tracking-[-0.05em]">
              참신한 홍보 전략이 <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-farm-primary via-emerald-600 to-farm-primary bg-[length:200%_auto] animate-gradient-x font-light">
                필요하신가요?
              </span>
            </h1>

            <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-gray-500 leading-relaxed font-light tracking-[-0.02em] mb-12">
              월 60만 유저가 머무르는 홈쇼핑모아와 모아농장의 독자적인 생태계에서 브랜드의 가치를 가장 임팩트 있게 전달하세요.
            </p>

            <div className="flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-6">
              <button 
                onClick={onOpenContact}
                className="group relative inline-flex items-center justify-center bg-gray-900 text-white px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all hover:pr-14 active:scale-95 shadow-2xl"
              >
                <span>제휴 문의하기</span>
                <i className="fas fa-arrow-right absolute right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all"></i>
              </button>
              <button 
                onClick={handleDownloadPDF}
                className="group text-gray-900 font-semibold text-lg hover:text-farm-primary transition-all flex items-center gap-3 py-4"
              >
                <span>소개서 다운로드</span>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-farm-primary group-hover:bg-farm-primary/10 transition-all">
                  <i className="fas fa-download text-sm"></i>
                </div>
              </button>
            </div>
          </div>

          {/* Right: App Mockup */}
          <div className="flex-1 relative w-full max-w-[400px] lg:max-w-none flex justify-center lg:justify-end">
            <div 
              className="relative w-[280px] md:w-[320px] aspect-[9/19.5] transition-transform duration-300 ease-out"
              style={{ 
                transform: `perspective(1000px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
              }}
            >
              {/* iPhone Mockup Frame */}
              <div className="absolute inset-0 bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden animate-float">
                <div className="relative w-full h-full bg-[#96C77E]">
                  <img 
                    src="https://raw.githubusercontent.com/buzzni/public-assets/main/moafarm_screenshot.png" 
                    alt="모아농장 보물초 시금치 화면" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-800 rounded-b-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;

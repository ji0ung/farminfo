
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface CTAProps {
  onOpenContact: () => void;
}

const CTA: React.FC<CTAProps> = ({ onOpenContact }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="contact" className="py-20 bg-farm-light dark:bg-google-dark relative overflow-hidden scroll-mt-24">
      {/* Green pattern overlay */}
      <div className="absolute inset-0 bg-farm-primary opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #2D9C5E 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div 
        ref={ref as any}
        className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-thin text-gray-900 dark:text-white mb-8 tracking-tight leading-tight">
          홈쇼핑모아 / 모아농장과의 협업,<br />
          <span className="text-farm-primary font-medium">지금 바로 시작하세요!</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 font-light">
          담당자가 확인 후 빠르게 연락드리겠습니다.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={onOpenContact}
            className="bg-farm-primary text-white px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-green-500/30 hover:bg-green-700 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 active:scale-95"
          >
            <i className="fas fa-paper-plane"></i> 제휴 문의하기
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;


import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface TiltCardProps {
  icon: string;
  title: string;
  value: string;
  unit: string;
  description: React.ReactNode;
  colorClass: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ icon, title, value, unit, description, colorClass }) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-white dark:bg-google-surfaceDark p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 ${colorClass} group transform h-full`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform ${icon.includes('download') ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300' : icon.includes('users') ? 'bg-green-100 dark:bg-green-900/40 text-farm-primary dark:text-green-300' : 'bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300'}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-2xl font-bold mb-2 dark:text-white tracking-tight">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
        {value}<span className="text-lg font-medium text-gray-400 ml-1">{unit}</span>
      </p>
      <div className="text-gray-500 dark:text-gray-400 font-light">{description}</div>
    </div>
  );
};

const Features: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="features" className="py-20 bg-farm-light dark:bg-google-dark relative scroll-mt-24">
      <div ref={ref as any} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 dark:text-white mb-4 tracking-tight">검증된 홍보 효과</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light">국내 NO.1 홈쇼핑 종합 포털의 압도적인 지표입니다.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <TiltCard 
            icon="fa-cloud-arrow-down"
            title="누적 다운로드"
            value="1,500만"
            unit="건"
            colorClass="hover:border-blue-500/30"
            description={<p>2024년 기준, 대한민국 성인<br />3명 중 1명이 경험한 서비스</p>}
          />
          <TiltCard 
            icon="fa-users"
            title="월간 활성 사용자"
            value="60만"
            unit="명"
            colorClass="hover:border-farm-primary/30"
            description={<p>매월 60만 명이 이용하는<br />홈쇼핑 종합 포털 NO.1</p>}
          />
          <TiltCard 
            icon="fa-basket-shopping"
            title="월간 구매 행동"
            value="93만"
            unit="건"
            colorClass="hover:border-orange-500/30"
            description={<p>매월 870만 건의 상품을 조회하고<br />활발한 구매가 이루어집니다.</p>}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

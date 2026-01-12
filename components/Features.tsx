
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
      className={`bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 ${colorClass} group transform h-full flex flex-col`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-2xl group-hover:scale-110 transition-transform ${icon.includes('download') ? 'bg-blue-100 text-blue-600' : icon.includes('users') ? 'bg-green-100 text-farm-primary' : 'bg-orange-100 text-orange-600'}`}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3 className="text-xl font-bold mb-2 tracking-tight text-gray-900">{title}</h3>
      <p className="text-4xl font-bold text-gray-900 mb-2">
        {value}<span className="text-lg font-medium text-gray-400 ml-1">{unit}</span>
      </p>
      <div className="text-gray-500 font-light text-sm leading-relaxed mt-auto">{description}</div>
    </div>
  );
};

const Features: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="features" className="py-24 bg-farm-light relative scroll-mt-24 overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-green-50 rounded-full blur-[100px] opacity-50"></div>

      <div ref={ref as any} className={`max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        
        {/* Branding & Title Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="mb-6 flex flex-col items-center">
            <div className="relative mb-4">
              {/* Stylized Home Shopping Moa App Icon Representation */}
              <div className="w-20 h-20 bg-white rounded-[1.5rem] shadow-xl flex items-center justify-center border border-gray-100 relative z-10 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-farm-primary/10 to-transparent"></div>
                <i className="fas fa-mobile-screen-button text-3xl text-farm-primary group-hover:scale-110 transition-transform duration-500"></i>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-900 rounded-tl-xl flex items-center justify-center">
                  <span className="text-[10px] font-black text-white italic">NO.1</span>
                </div>
              </div>
              <div className="absolute -inset-4 bg-farm-primary/10 blur-2xl rounded-full -z-10 animate-pulse"></div>
            </div>
            <span className="text-farm-primary font-black tracking-[0.2em] uppercase text-xs">Market Leader</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 mb-6 tracking-tight leading-tight">
            홈쇼핑 중개 포털 1위 <br className="sm:hidden" />
            <span className="font-light text-farm-primary">홈쇼핑모아</span>의 압도적 지표
          </h2>
          <p className="text-lg text-gray-500 font-light max-w-2xl">
            대한민국 홈쇼핑 유저들이 가장 많이 머무르는 곳, <br className="hidden md:block" />
            숫자로 증명된 홈쇼핑모아만의 독보적인 영향력을 확인하세요.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          <TiltCard 
            icon="fa-cloud-arrow-down"
            title="누적 다운로드"
            value="1,500만"
            unit="건"
            colorClass="hover:border-blue-500/30"
            description={<p>대한민국 성인 3명 중 1명이<br />경험한 국민 홈쇼핑 포털</p>}
          />
          <TiltCard 
            icon="fa-users"
            title="월간 활성 사용자 (MAU)"
            value="60만"
            unit="명"
            colorClass="hover:border-farm-primary/30"
            description={<p>매월 60만 명의 진성 유저가<br />새로운 상품을 발견하고 즐깁니다.</p>}
          />
          <TiltCard 
            icon="fa-basket-shopping"
            title="월간 상품 조회"
            value="870만"
            unit="건"
            colorClass="hover:border-orange-500/30"
            description={<p>활발한 구매 의사를 가진 유저들의<br />끊임없는 쇼핑 탐색이 이어집니다.</p>}
          />
        </div>
      </div>
    </section>
  );
};

export default Features;

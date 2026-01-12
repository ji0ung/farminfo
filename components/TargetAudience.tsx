
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const TargetAudience: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const checklist = [
    "네이버 스토어 알림 받기 & 찜 늘리고 싶어요",
    "유튜브 구독/좋아요와 조회수를 늘리고 싶어요",
    "자사몰 회원가입이나 유입을 늘리고 싶어요",
    "상품을 한 개라도 더 노출 시키고 싶어요",
    "창고에 쌓인 재고 상품을 팔고 싶어요",
    "신상품을 저예산으로 홍보하고 싶어요",
    "브랜드 인지도를 높이고 싶어요"
  ];

  return (
    <section className="py-20 bg-white">
      <div ref={ref as any} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 text-left">
            <span className="text-farm-primary font-bold tracking-wider uppercase mb-2 block text-sm">Target Audience</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 mb-8 leading-tight tracking-tight">
              상품에 자신있다면, <br />
              저희와 함께 해요
            </h2>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" alt="Fresh Farm Market" className="w-full h-auto object-cover max-h-[400px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-farm-dark/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white text-left">
                <p className="font-bold text-xl">성공적인 파트너십</p>
                <p className="text-sm opacity-80">모아농장이 함께합니다</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-farm-light rounded-3xl p-8 md:p-10 shadow-sm border border-green-100">
              <ul className="space-y-4">
                {checklist.map((item, index) => (
                  <li key={index} className="flex items-start text-left">
                    <i className="fas fa-check-circle text-farm-primary text-xl mt-1.5 mr-4"></i>
                    <span className="text-lg text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TargetAudience;

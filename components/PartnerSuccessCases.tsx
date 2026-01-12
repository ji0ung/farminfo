
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const successCases = [
  {
    farm: '상주 곶감 농장',
    ownerInfo: '50대 박OO 사장님',
    quote: "젊은 세대가 곶감을 이렇게 좋아할 줄은 정말 몰랐어요.",
    product: '프리미엄 곶감 세트',
    metric: '매출 240% 상승',
    detail: '모아농장 3주 미션 연계로 2030 젊은 유입 고객 5,000명 확보 및 브랜드 인지도 급상승',
    badge: 'ROI 850%',
    image: 'https://images.unsplash.com/photo-1615485500704-8e990f3900f7?auto=format&fit=crop&q=80&w=800'
  },
  {
    farm: '제주 한라봉 농원',
    ownerInfo: '40대 김OO 사장님',
    quote: "클릭 한 번에 물량이 다 빠지는 걸 보고 깜짝 놀랐습니다.",
    product: '가정용 실속 한라봉',
    metric: '준비 물량 조기 완판',
    detail: '푸시 알림 마케팅 단 1회 진행으로 사전 예약 7,000건 달성 및 물량 전체 소진',
    badge: '완판 기록',
    image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&q=80&w=800'
  },
  {
    farm: '청송 사과 마을',
    ownerInfo: '60대 이OO 사장님',
    quote: "우리 농장에도 단골이 생겼다는 게 가장 기쁩니다.",
    product: '아삭 꿀사과 10kg',
    metric: '신규 회원 3,500명',
    detail: '자사몰 연계 미션을 통해 광고비 대비 최저가로 구매 의사 높은 진성 가입 고객 유치',
    badge: '회원 폭증',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&q=80&w=800'
  }
];

const PartnerSuccessCases: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section className="py-24 bg-farm-light dark:bg-google-dark overflow-hidden border-t border-gray-50 dark:border-gray-900/50">
      <div ref={ref as any} className={`max-w-7xl mx-auto px-6 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase mb-3 block text-sm">Success Stories</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 dark:text-white tracking-tight leading-tight">
            함께 성장한 <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-farm-primary font-medium">파트너 사장님의 기록</span>
          </h2>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-light max-w-2xl leading-relaxed">
            광고비는 줄이고, 매출은 늘렸습니다. 홈쇼핑모아와 모아농장을 통해 직접적인 비즈니스 성장을 경험한 대표 사례입니다.
          </p>
        </div>

        {/* Static Grid Layout for 3 cases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {successCases.map((item, index) => (
            <div 
              key={index} 
              className="group/item h-full flex flex-col"
            >
              <div className="bg-white dark:bg-google-surfaceDark rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 transition-all duration-500 hover:shadow-2xl hover:shadow-farm-primary/10 hover:-translate-y-2 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.farm} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/item:scale-110"
                  />
                  <div className="absolute top-6 right-6 bg-white/95 dark:bg-black/80 backdrop-blur-md px-5 py-2 rounded-full shadow-lg border border-white/20">
                    <span className="text-xs font-black text-farm-primary">{item.badge}</span>
                  </div>
                </div>
                
                <div className="p-10 flex-grow flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-farm-primary"></span>
                      <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{item.farm}</span>
                    </div>
                    <span className="text-[10px] font-bold text-gray-400 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-md">{item.ownerInfo}</span>
                  </div>

                  <div className="relative mb-6">
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-tight">
                      {item.quote}
                    </p>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
                    {item.product}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{item.metric}</span>
                  </div>

                  <p className="text-[14px] text-gray-500 dark:text-gray-400 font-light leading-relaxed mb-8">
                    {item.detail}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-50 dark:border-gray-800 flex justify-between items-center group-hover/item:border-farm-primary/20 transition-colors">
                    <span className="text-[10px] font-black text-gray-400 group-hover/item:text-farm-primary transition-colors uppercase tracking-widest">Partner Insight</span>
                    <i className="fas fa-arrow-right text-xs text-gray-200 group-hover/item:text-farm-primary transition-all group-hover/item:translate-x-1"></i>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerSuccessCases;

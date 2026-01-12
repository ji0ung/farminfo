
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const cases = [
  {
    tag: '커머스 AI',
    title: 'AI 리뷰 요약 & 스타일 검색',
    desc: '버즈니 AI Lab의 기술로 수많은 리뷰에서 핵심 정보를 추출해 쇼핑 경험을 혁신합니다.',
    result: '사용자 만족도 4.5/5.0 기록',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    tag: '모아농장',
    title: '앱테크 게임 연계 마케팅',
    desc: '작물을 키우고 수확하면 집으로 배송해주는 게임으로 유저의 재방문을 극대화합니다.',
    result: '매일 3만 명 이용 / 재방문율 80%',
    image: 'https://images.unsplash.com/photo-1592388750212-09490333d453?auto=format&fit=crop&q=80&w=800'
  },
  {
    tag: '통합 편성표',
    title: '18개 홈쇼핑사 채널 통합 노출',
    desc: '모든 홈쇼핑 채널을 한눈에 볼 수 있는 포털로 브랜드 노출 기회를 극대화합니다.',
    result: '월 상품 조회수 870만 건 달성',
    image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800'
  },
  {
    tag: '타겟 마케팅',
    title: '4060 핵심 소비층 공략',
    desc: '구매력을 갖춘 40~60대 여성을 핵심 타겟으로 정교한 타겟 마케팅을 진행합니다.',
    result: '4050 여성 유저 비중 70% 이상',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800'
  },
  {
    tag: '연속 성공',
    title: '재방문율 86%의 강력한 팬덤',
    desc: '지속적으로 홈쇼핑 상품을 찾는 유저들에게 브랜드 메시지를 반복 노출합니다.',
    result: '10명 중 8~9명의 지속 사용',
    image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?auto=format&fit=crop&q=80&w=800'
  }
];

const CollaborationCases: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const extendedCases = [...cases, ...cases];

  return (
    <section className="py-24 bg-white dark:bg-google-dark overflow-hidden">
      <div ref={ref as any} className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-7xl mx-auto px-6 mb-16 text-left">
          <span className="text-farm-primary font-bold tracking-widest uppercase mb-3 block text-sm">Service Core Features</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-thin text-gray-900 dark:text-white tracking-tight leading-tight">
            홈쇼핑에 특화된 <br className="hidden sm:block" />
            <span className="text-farm-primary font-medium">유일한 매체</span>의 위력을 확인하세요
          </h2>
        </div>

        <div className="relative group">
          <div className="flex animate-scroll hover:pause-scroll space-x-6 px-4">
            {extendedCases.map((item, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 w-[320px] md:w-[400px] h-[500px] relative rounded-[2.5rem] overflow-hidden group/card shadow-lg transition-all duration-500 hover:scale-[1.02]"
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover/card:opacity-90 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 p-8 w-full text-white text-left">
                  <span className="inline-block px-3 py-1 rounded-full bg-farm-primary text-[10px] font-bold uppercase mb-4 tracking-wider">
                    {item.tag}
                  </span>
                  <h3 className="text-2xl font-bold mb-3 leading-tight tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 mb-6 font-light leading-relaxed">
                    {item.desc}
                  </p>
                  
                  <div className="pt-6 border-t border-white/20">
                    <p className="text-xs text-farm-primary font-bold mb-1 uppercase tracking-widest">Key Result</p>
                    <p className="text-lg font-semibold text-white tracking-tight">
                      {item.result}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-white dark:from-google-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white dark:from-google-dark to-transparent z-10 pointer-events-none"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-424px * ${cases.length})); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
          width: max-content;
        }
        .pause-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default CollaborationCases;

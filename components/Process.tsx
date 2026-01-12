
import React from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const Process: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const steps = [
    { num: 1, title: '신청 및 가입', desc: '판매자 회원가입 및\n사전 샘플 발송' },
    { num: 2, title: '협의 및 계약', desc: '예산/비용 합의 후\n협업 계약서 작성' },
    { num: 3, title: '제작 및 세팅', desc: '작물 시안 제작 및\n홍보 미션 세팅' },
    { num: 4, title: '종료 및 리포트', desc: '계약 종료 후\n성과 리포트 전달', hasDownload: true },
  ];

  const handleDownloadReport = (e: React.MouseEvent) => {
    e.preventDefault();
    const reportContent = `
    [모아농장 파트너 캠페인 성과 리포트 예시]
    
    1. 캠페인 개요
    - 파트너사: OO농원
    - 기간: 2024.01.01 ~ 2024.01.21 (3주)
    - 주요 품목: 프리미엄 과일 세트
    
    2. 핵심 성과 요약 (Key Metrics)
    - 총 노출수: 1,254,000회 (홈쇼핑모아 앱 내 상단 노출 포함)
    - 미션 참여자 수: 84,200명 (작물 키우기 완료 유저)
    - 자사몰 신규 가입 전환: 3,850명
    - 실제 구매 건수: 1,240건 (광고 집행 전 대비 320% 증가)
    - 광고 수익률(ROAS): 1,150% 달성
    
    3. 유저 데이터 분석
    - 주 이용 연령대: 30대(32%), 40대(45%), 50대(18%)
    - 피크 타임: 평일 오후 8시 ~ 11시 (홈쇼핑 시청 시간대와 정비례)
    - 재방문율: 82% (3주간 매일 미션 참여)
    
    4. 파트너사 종합 의견
    "단순 일회성 광고가 아니라, 3주 동안 유저들이 우리 브랜드를 꾸준히 인지하게 되어 
    캠페인 종료 후에도 자사몰 정기 구매자가 15% 증가하는 유의미한 결과를 얻었습니다."
    
    홈쇼핑모아 / 모아농장 드림
    `;
    const blob = new Blob([reportContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '모아농장_캠페인_성과리포트_예시.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <section id="process" className="py-24 bg-farm-light scroll-mt-24">
      <div ref={ref as any} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="text-center mb-16">
          <span className="text-farm-primary font-bold tracking-wider uppercase mb-2 block text-sm">Process</span>
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 tracking-tight">협업은 이렇게 진행됩니다</h2>
        </div>

        <div className="relative mb-20">
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-green-200 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step) => (
              <div 
                key={step.num} 
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center group hover:-translate-y-2 transition-all duration-300 flex flex-col items-center"
              >
                <div className="w-16 h-16 mx-auto bg-green-50 rounded-full flex items-center justify-center text-farm-primary font-bold text-2xl mb-6 group-hover:bg-farm-primary group-hover:text-white transition-colors">
                  {step.num}
                </div>
                <h3 className="font-bold text-xl mb-3 tracking-tight">{step.title}</h3>
                <p className="text-base text-gray-500 whitespace-pre-line leading-relaxed font-light mb-6">{step.desc}</p>
                
                {step.hasDownload && (
                  <button 
                    onClick={handleDownloadReport}
                    className="mt-auto inline-flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-farm-primary hover:text-white text-gray-500 rounded-xl text-xs font-bold transition-all transform active:scale-95 group/btn"
                  >
                    <i className="fas fa-file-arrow-down transition-transform group-hover/btn:-translate-y-0.5"></i>
                    예시 리포트 다운로드
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Banner */}
        <div className={`transition-all duration-1000 delay-300 transform ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="max-w-4xl mx-auto p-10 md:p-12 bg-white rounded-[3rem] border border-green-200 shadow-[0_32px_64px_-16px_rgba(0,200,83,0.15)] relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-farm-primary"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                <div className="flex-shrink-0 text-center md:text-left">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-green-50 text-farm-primary text-3xl mb-4">
                    <i className="fas fa-clipboard-check"></i>
                  </div>
                  <h4 className="font-bold text-gray-900 text-2xl tracking-tight">필수 협업 조건</h4>
                  <p className="text-gray-400 text-sm mt-1 font-light">캠페인의 성공을 위한 최소 사양</p>
                </div>
                
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-farm-primary text-2xl group-hover/item:bg-farm-primary group-hover/item:text-white transition-all shadow-sm">
                      <i className="fas fa-boxes-packing"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-farm-primary uppercase tracking-[0.2em] mb-1">Stock Requirement</p>
                      <p className="text-xl font-bold text-gray-800 leading-none">500개 이상 공급</p>
                      <p className="text-xs text-gray-400 mt-1 font-light">원활한 미션 진행을 위한 수량</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 group/item">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center text-farm-primary text-2xl group-hover/item:bg-farm-primary group-hover/item:text-white transition-all shadow-sm">
                      <i className="fas fa-headset"></i>
                    </div>
                    <div className="text-left">
                      <p className="text-[10px] font-black text-farm-primary uppercase tracking-[0.2em] mb-1">Direct Support</p>
                      <p className="text-xl font-bold text-gray-800 leading-none">자체 배송 및 CS</p>
                      <p className="text-xs text-gray-400 mt-1 font-light">주문 관리 및 유저 대응 필수</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;

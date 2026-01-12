
import React, { useState } from 'react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 group">
      <button 
        className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={`text-lg font-bold transition-colors duration-300 ${isOpen ? 'text-farm-primary' : 'text-gray-800'}`}>
          {question}
        </span>
        <i className={`fas fa-chevron-down text-gray-400 transition-transform duration-300 group-hover:text-farm-primary ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>
      <div className={`transition-all duration-500 ease-in-out bg-farm-light/50 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-6 py-5 text-gray-600 border-t border-gray-50 leading-relaxed font-light">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  const faqs = [
    { q: '참여 비용이 드나요?', a: '결제를 위한 최소 PG 수수료가 발생할 수 있으며, 작물(상품)을 지원해주시면 됩니다.' },
    { q: '100% 전액 상품을 지원 해야하는 건가요?', a: '아닙니다. 해당 부분은 모아농장과 상품 금액에 따른 비율 협의가 가능합니다.' },
    { q: '식품류만 해당하나요?', a: '네, 현재는 식품류만 신청 가능합니다.' },
    { q: '수량은 500개 이상 이어야만 하나요?', a: '최소 3주정도로 키우기 게임을 진행하며 모아농장과 홈쇼핑모아 고객에게 홍보하기 위함으로, 500개 미만의 상품은 지양하고 있습니다.' },
    { q: '디자이너가 없어서 사진자료만 있어요!', a: '간단한 내용 및 사진자료를 업로드해주시면 되며, 작물 이미지 팝업 등 홍보 구좌는 자체적으로 제작을 도와드립니다. (단, 상세페이지/영상 제작은 어렵습니다)' }
  ];

  return (
    <section id="faq" className="py-20 bg-white scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-thin text-gray-900 tracking-tight">자주 묻는 질문</h2>
          <p className="mt-4 text-gray-500 font-light">궁금하신 내용을 확인해보세요.</p>
        </div>

        <div 
          ref={ref as any}
          className={`space-y-4 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;

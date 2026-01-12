
import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showManualGuide, setShowManualGuide] = useState(false);
  const [toast, setToast] = useState<ToastState>({ show: false, message: '', type: 'success' });
  
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    contact: '',
    email: '',
    category: '식품',
    scale: '월 500건 미만',
    products: '',
    message: '',
    checkSupply: false,
    checkCS: false
  });

  const emailTo = "moafarm@buzzni.com";
  const bcc = "hale@buzzni.com,leah@buzzni.com";
  const subject = `[모아농장] 작물 소싱 제휴 신청서 - ${formData.company}`;
  const bodyContent = `안녕하세요, 모아농장 담당자님.

홈쇼핑모아/모아농장 작물 소싱 제휴를 신청합니다. 아래 정보를 확인 부탁드립니다.

[신청자 정보]
1. 업체명: ${formData.company}
2. 담당자 성함: ${formData.name}
3. 연락처: ${formData.contact}
4. 이메일: ${formData.email}

[제휴 상세 내용]
1. 사업 카테고리: ${formData.category}
2. 월간 배송 규모: ${formData.scale}
3. 주요 취급 품목: ${formData.products}

[협업 조건 동의 여부]
- 500개 이상 상품 공급 가능 여부: ${formData.checkSupply ? '확인 및 동의함' : '동의하지 않음'}
- 자체 배송 및 CS 대응 가능 여부: ${formData.checkCS ? '확인 및 동의함' : '동의하지 않음'}

[추가 문의 사항]
${formData.message || '특이사항 없음'}

감사합니다.
보낸 사람: ${formData.name} 드림`;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
        setShowManualGuide(false);
      }, 500);
    }
  }, [isOpen]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3000);
  };

  const validateForm = () => {
    const isFormFilled = 
      formData.company.trim() !== '' && 
      formData.name.trim() !== '' && 
      formData.contact.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.products.trim() !== '';
    
    const isChecked = formData.checkSupply && formData.checkCS;

    if (!isFormFilled || !isChecked) {
      showToast("모든 필수 내용을 채워주시고 필수 조건에 동의해주세요.", "error");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleGmailSubmit = () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailTo)}&bcc=${encodeURIComponent(bcc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyContent)}`;
    window.open(gmailUrl, '_blank');
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${label}가 복사되었습니다.`, "success");
    });
  };

  const handleManualMail = () => {
    if (!validateForm()) return;
    setShowManualGuide(true);
  };

  if (!isOpen && !isSuccess) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center px-4 transition-all duration-500 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose}></div>
      
      {/* Toast Notification */}
      <div className={`fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
        <div className={`px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-xl ${toast.type === 'error' ? 'bg-red-500/90 text-white' : 'bg-farm-primary/90 text-white'}`}>
          <i className={`fas ${toast.type === 'error' ? 'fa-exclamation-circle' : 'fa-check-circle'}`}></i>
          <span className="font-bold text-sm">{toast.message}</span>
        </div>
      </div>

      <div className={`relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500 transform ${isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-8'}`}>
        
        <button onClick={onClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 transition-colors z-10">
          <i className="fas fa-times text-2xl"></i>
        </button>

        {!isSuccess && !showManualGuide ? (
          <div className="p-10 md:p-14 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="mb-12 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-farm-primary text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                <span className="w-2 h-2 rounded-full bg-farm-primary animate-pulse"></span>
                Partner Registration
              </div>
              <h2 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">소싱 제휴 신청서 작성</h2>
              <p className="mt-2 text-gray-500 font-light text-sm">정보를 입력하고 발송 방식을 선택해주세요.</p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">업체명 <span className="text-red-500">*</span></label>
                  <input required name="company" value={formData.company} onChange={handleChange} type="text" placeholder="사업자 등록 업체명" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-farm-primary transition-all outline-none text-sm" />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">담당자 성함 <span className="text-red-500">*</span></label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="담당 성함" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-farm-primary transition-all outline-none text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">연락처 <span className="text-red-500">*</span></label>
                  <input required name="contact" value={formData.contact} onChange={handleChange} type="tel" placeholder="010-0000-0000" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-farm-primary transition-all outline-none text-sm" />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">이메일 <span className="text-red-500">*</span></label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@company.com" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-farm-primary transition-all outline-none text-sm" />
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50/80 to-emerald-50/50 p-8 rounded-[2.5rem] border border-green-100 shadow-inner">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-farm-primary flex items-center justify-center text-white text-xs">
                    <i className="fas fa-check-double"></i>
                  </div>
                  <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">필수 협업 조건 확인</h4>
                </div>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-4 cursor-pointer group bg-white p-5 rounded-[1.5rem] shadow-sm hover:shadow-md border border-transparent hover:border-farm-primary/30 transition-all">
                    <div className="relative flex items-center">
                      <input required type="checkbox" name="checkSupply" checked={formData.checkSupply} onChange={handleChange} className="peer h-7 w-7 cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white checked:bg-farm-primary checked:border-farm-primary transition-all" />
                      <i className="fas fa-check absolute text-[12px] text-white opacity-0 peer-checked:opacity-100 left-[8px] transition-opacity"></i>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-gray-800">500개 이상 상품 공급이 가능합니다.</span>
                      <span className="text-[11px] text-gray-400 font-light mt-0.5">원활한 3주 미션 진행을 위한 최소 재고량</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-4 cursor-pointer group bg-white p-5 rounded-[1.5rem] shadow-sm hover:shadow-md border border-transparent hover:border-farm-primary/30 transition-all">
                    <div className="relative flex items-center">
                      <input required type="checkbox" name="checkCS" checked={formData.checkCS} onChange={handleChange} className="peer h-7 w-7 cursor-pointer appearance-none rounded-xl border-2 border-gray-200 bg-white checked:bg-farm-primary checked:border-farm-primary transition-all" />
                      <i className="fas fa-check absolute text-[12px] text-white opacity-0 peer-checked:opacity-100 left-[8px] transition-opacity"></i>
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-bold text-gray-800">자체 배송 및 CS 대응이 가능합니다.</span>
                      <span className="text-[11px] text-gray-400 font-light mt-0.5">고객 문의 및 배송 관리에 대한 직접 처리 능력</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="text-left">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1 block">주요 취급 품목 <span className="text-red-500">*</span></label>
                <input required name="products" value={formData.products} onChange={handleChange} type="text" placeholder="예: 한라봉, 사과, 샤인머스캣 등" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-farm-primary transition-all outline-none text-sm" />
              </div>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleGmailSubmit}
                  className="py-5 bg-gray-900 text-white rounded-[1.8rem] font-bold text-lg shadow-xl hover:bg-farm-primary transition-all transform active:scale-95 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <i className="fas fa-circle-notch animate-spin"></i>
                  ) : (
                    <i className="fab fa-google"></i>
                  )}
                  <span>지메일로 신청</span>
                </button>
                
                <button 
                  type="button"
                  onClick={handleManualMail}
                  className="py-5 bg-gray-100 text-gray-800 rounded-[1.8rem] font-bold text-lg shadow-md hover:bg-gray-200 transition-all transform active:scale-95 flex items-center justify-center gap-3"
                >
                  <i className="fas fa-envelope-open-text"></i>
                  <span>다른 계정으로 연결하기</span>
                </button>
              </div>
            </div>
          </div>
        ) : showManualGuide ? (
          <div className="p-10 md:p-14 max-h-[90vh] overflow-y-auto custom-scrollbar">
            <div className="mb-10 text-center">
              <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-blue-500 text-4xl">
                <i className="fas fa-copy"></i>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">직접 메일 보내기</h2>
              <p className="text-gray-500 font-light text-sm">
                아래 내용을 복사하여 <strong className="text-gray-900">{emailTo}</strong>로 보내주세요.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">수신인</span>
                  <button 
                    onClick={() => copyToClipboard(emailTo, "이메일 주소")}
                    className="text-xs font-bold text-farm-primary hover:underline"
                  >복사하기</button>
                </div>
                <p className="text-sm font-bold text-gray-800 text-left">{emailTo}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">메일 제목</span>
                  <button 
                    onClick={() => copyToClipboard(subject, "제목")}
                    className="text-xs font-bold text-farm-primary hover:underline"
                  >복사하기</button>
                </div>
                <p className="text-sm font-bold text-gray-800 text-left">{subject}</p>
              </div>

              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">메일 본문</span>
                  <button 
                    onClick={() => copyToClipboard(bodyContent, "본문 내용")}
                    className="text-xs font-bold text-farm-primary hover:underline"
                  >복사하기</button>
                </div>
                <pre className="text-[13px] text-gray-600 font-sans whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto custom-scrollbar pr-2 text-left">
                  {bodyContent}
                </pre>
              </div>

              <div className="pt-4 flex justify-center text-left">
                <button 
                  onClick={() => setShowManualGuide(false)}
                  className="w-full py-5 bg-gray-100 text-gray-600 rounded-[1.8rem] font-bold hover:bg-gray-200 transition-colors"
                >작성 화면으로 돌아가기</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-16 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-farm-primary text-5xl animate-bounce">
              <i className="fas fa-paper-plane"></i>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              제휴 신청이<br />성공적으로 접수되었습니다!
            </h2>
            <p className="text-gray-500 leading-relaxed max-w-xs mx-auto mb-12 font-light text-center">
              담당자가 확인 후 입력하신 연락처로 빠르게 회신 드리겠습니다.
            </p>
            <button onClick={onClose} className="px-14 py-5 bg-gray-900 text-white rounded-full font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-2xl">
              확인
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(0, 200, 83, 0.2); border-radius: 20px; }
      `}</style>
    </div>
  );
};

export default ContactModal;

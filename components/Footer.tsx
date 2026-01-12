
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="font-bold text-2xl text-gray-900 opacity-80">모아농장</span>
              <div className="w-1.5 h-1.5 rounded-full bg-farm-primary"></div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed font-light">
              (주)버즈니 | 대표자: 남상협, 김성국<br />
              사업자등록번호: 123-45-67890<br />
              서울특별시 마포구 월드컵북로
            </p>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-50 text-center text-xs text-gray-400 uppercase tracking-widest font-medium">
          &copy; {new Date().getFullYear()} Buzzni Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

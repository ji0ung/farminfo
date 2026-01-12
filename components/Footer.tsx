
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-google-dark border-t border-gray-100 dark:border-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <span className="font-bold text-2xl text-farm-primary opacity-50">모아농장</span>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-4 leading-relaxed font-light">
              (주)버즈니 | 대표자: 남상협, 김성국<br />
              사업자등록번호: 123-45-67890<br />
              서울특별시 마포구 월드컵북로
            </p>
          </div>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-300 hover:text-farm-primary transition-colors text-2xl" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" className="text-gray-300 hover:text-farm-primary transition-colors text-2xl" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-gray-300 hover:text-farm-primary transition-colors text-2xl" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-50 dark:border-gray-800 text-center text-xs text-gray-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Buzzni Co., Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

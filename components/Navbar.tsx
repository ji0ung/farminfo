
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: '소개', href: 'about' },
    { label: '특장점', href: 'features' },
    { label: '진행과정', href: 'process' },
    { label: '자주하는질문', href: 'faq' },
  ];

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Adjusted for fixed navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed w-full z-40 top-0 transition-all duration-500 backdrop-blur-xl ${
        scrolled 
          ? 'bg-white/95 h-16 border-b border-gray-100 shadow-sm' 
          : 'bg-white/80 h-24 border-b border-transparent'
      }`} 
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer group" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-bold text-2xl tracking-tight text-gray-900 transition-colors group-hover:text-farm-primary">모아농장</span>
            <div className="ml-2 w-1.5 h-1.5 rounded-full bg-farm-primary"></div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 items-center">
            {menuItems.map(item => (
              <a 
                key={item.href} 
                href={`#${item.href}`} 
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-[15px] text-gray-500 hover:text-gray-900 font-medium transition-colors tracking-tight"
              >
                {item.label}
              </a>
            ))}
            
            <div className="w-[1px] h-4 bg-gray-200"></div>

            <button 
              onClick={onOpenContact}
              className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-sm hover:bg-farm-primary transition-all transform hover:scale-105 active:scale-95"
            >
              문의하기
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 focus:outline-none p-2"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 top-0 bg-white z-50 transition-all duration-500 flex flex-col ${
          mobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-between items-center h-20 px-6 border-b border-gray-100">
           <div className="flex items-center">
             <span className="font-bold text-xl text-gray-900">모아농장</span>
             <div className="ml-2 w-1 h-1 rounded-full bg-farm-primary"></div>
           </div>
           <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 text-2xl">
             <i className="fas fa-times"></i>
           </button>
        </div>
        <div className="flex flex-col p-8 space-y-8 overflow-y-auto">
          {menuItems.map((item, index) => (
            <a 
              key={item.href}
              href={`#${item.href}`} 
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-4xl font-bold text-gray-900 hover:text-farm-primary transition-colors transform"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-10 border-t border-gray-100">
             <p className="text-gray-400 text-sm mb-6 font-light">홈쇼핑모아와 함께 비즈니스를 확장하세요.</p>
             <button 
               onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
               className="block w-full text-center bg-farm-primary text-white py-5 rounded-3xl font-bold text-xl shadow-xl active:scale-95 transition-transform"
             >
               제휴 문의하기
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

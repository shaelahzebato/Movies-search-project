import React, { useEffect, useState } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed w-full transition-all duration-300 ${isScrolled ? 'bg-white shadow-lg' : 'bg-transparent'} p-4`}>
      <div className="container mx-auto flex justify-between items-center">
        <h1 className={`text-2xl font-bold ${isScrolled ? 'text-black' : 'text-white'}`}>Logo</h1>
        <ul className="flex space-x-4">
          <li className={`text-lg ${isScrolled ? 'text-black' : 'text-white'}`}>Home</li>
          <li className={`text-lg ${isScrolled ? 'text-black' : 'text-white'}`}>About</li>
          <li className={`text-lg ${isScrolled ? 'text-black' : 'text-white'}`}>Services</li>
          <li className={`text-lg ${isScrolled ? 'text-black' : 'text-white'}`}>Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

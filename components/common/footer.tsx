import React from 'react';
import { Heart, User } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Profile section */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
                {/* <img 
                  src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                /> */}
                <User className="w-full h-full object-cover text-gray-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600 flex items-center">
              Made by Shamikh <Heart className="h-3 w-3 ml-1 fill-red-500 text-red-500" />
            </p>
            <p className="text-xs text-gray-500 mt-4">
              © {currentYear} Shamikh Anwar. All Rights Reserved.
            </p>
          </div>
          
          {/* About column */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-500 tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="https://github.com/SHAMIKH-ANWAR" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Github
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Leetcode
                </a>
              </li>
            </ul>
          </div>
          
          {/* Products column */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-500 tracking-wider mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Build Modern Full-Stack Apps: ShopSphere
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  React Weather App
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  AI PDF Summarizer
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources column */}
          <div>
            <h4 className="uppercase text-sm font-semibold text-gray-500 tracking-wider mb-4">
              Social
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Email:shamikhanwar815@gmail.com
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Linkedin Profile
                </a>
              </li>
              {/* <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Engineering Leader's Snacks Newsletter
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors text-sm">
                  Free Course Next.js Hot Tips
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
'use client';

import type { NextPage } from 'next';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MainPage: NextPage = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleMenuItemClick = (action: string) => {
    setIsProfileMenuOpen(false);
    switch (action) {
      case '설정':
        // TODO: Add navigation to settings page
        console.log('Settings clicked');
        break;
      case '대시보드':
        router.push('/dashboard');
        break;
      case '로그아웃':
        router.push('/');
        break;
      default:
        break;
    }
  };
  // Helper component for icons
  const Icon = ({ path, className = 'w-6 h-6' }: { path: string; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d={path} />
    </svg>
  );

  // Mock data for running courses
  const courses = [
    {
      id: 1,
      title: '광안리 해변 야간 러닝',
      author: '달리는거북이',
      distance: '5.2km',
      time: '35분',
      likes: 128,
      comments: 12,
      imageUrl: '/file.svg', // Placeholder image
    },
    {
      id: 2,
      title: '시민공원 한바퀴 쾌속 코스',
      author: '부산갈매기',
      distance: '3.8km',
      time: '20분',
      likes: 256,
      comments: 24,
      imageUrl: '/globe.svg', // Placeholder image
    },
    {
      id: 3,
      title: '해운대부터 송정까지',
      author: '초보러너',
      distance: '7.1km',
      time: '50분',
      likes: 98,
      comments: 8,
      imageUrl: '/window.svg', // Placeholder image
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Running Mate</h1>
          <div className="relative" ref={profileMenuRef}>
            <div 
              className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center hover:bg-gray-400 transition-colors"
              onClick={handleProfileClick}
            >
              <Icon path="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" className="w-6 h-6 text-gray-600" />
            </div>
            
            {/* Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                <button
                  onClick={() => handleMenuItemClick('설정')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon path="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" className="w-4 h-4 mr-3" />
                  설정
                </button>
                <button
                  onClick={() => handleMenuItemClick('대시보드')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  <Icon path="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4a.5.5 0 00-.5.5V8h14V4.5a.5.5 0 00-.5-.5h-13zM5 10v9.5a.5.5 0 00.5.5H11v-10H5zm13 10a.5.5 0 00.5-.5V10h-6v10h5.5z" className="w-4 h-4 mr-3" />
                  대시보드
                </button>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={() => handleMenuItemClick('로그아웃')}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <Icon path="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" className="w-4 h-4 mr-3" />
                  로그아웃
                </button>
              </div>
            )}
          </div>
        </header>

        <main>
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label htmlFor="distance" className="text-sm font-medium text-gray-600 mb-1">거리 (km)</label>
                <input id="distance" type="range" min="1" max="20" defaultValue="5" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="time" className="text-sm font-medium text-gray-600 mb-1">시간 (분)</label>
                <input id="time" type="range" min="10" max="120" defaultValue="30" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="slope" className="text-sm font-medium text-gray-600 mb-1">경사도</label>
                <select id="slope" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                  <option>전체</option>
                  <option>평지 위주</option>
                  <option>언덕 포함</option>
                </select>
              </div>
              <button className="self-end bg-blue-600 text-white font-semibold rounded-lg px-4 py-2.5 hover:bg-blue-700 transition-colors">
                코스 검색
              </button>
            </div>
          </div>

          {/* Course List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                   <img src={course.imageUrl} alt="Course Image" className="h-24 w-24 text-gray-400" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">by {course.author}</p>
                  <div className="flex justify-between items-center text-sm text-gray-800 mb-4">
                    <span className="flex items-center">
                      <Icon path="M12.75 3.75L3 12.314V15.75h3.436L16.5 6.686m-3.75-2.936l2.936 2.936" className="w-4 h-4 mr-1.5" />
                      {course.distance}
                    </span>
                    <span className="flex items-center">
                      <Icon path="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" className="w-4 h-4 mr-1.5" />
                      {course.time}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-end items-center text-gray-500">
                    <span className="flex items-center mr-4">
                      <Icon path="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" className="w-5 h-5 mr-1.5 text-red-500" />
                      {course.likes}
                    </span>
                    <span className="flex items-center">
                      <Icon path="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" className="w-5 h-5 mr-1.5" />
                      {course.comments}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage;


import type { NextPage } from 'next';

const MainPage: NextPage = () => {
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
          <div className="w-10 h-10 bg-gray-300 rounded-full cursor-pointer">
            {/* Profile Icon Placeholder */}
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

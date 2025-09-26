import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          부산의 숨겨진 러닝 코스, <br />
          <span className="text-blue-600">Running Mate</span>와 함께 발견하세요.
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          초보 러너부터 마라토너까지, 모두를 위한 코스 공유 플랫폼
        </p>
        <Link
          href="/courses"
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
        >
          코스 탐색 시작하기
        </Link>
      </section>

      {/* Filters Section (Placeholder) */}
      <section className="py-12">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">나에게 맞는 코스 찾기</h2>
            <p className="text-gray-500">거리, 시간, 경사도별로 필터링해보세요.</p>
        </div>
        <div className="bg-gray-100 p-8 rounded-lg flex justify-center items-center min-h-[150px]">
          <p className="text-gray-500">[코스 필터 기능이 여기에 표시됩니다]</p>
        </div>
      </section>

      {/* Courses List Section (Placeholder) */}
      <section className="py-12">
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold">추천 코스</h2>
            <p className="text-gray-500">이번 주, 이런 코스는 어떠세요?</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Placeholder Course Cards */}
          <div className="border rounded-lg p-4 text-center shadow-md">
            <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
            <h3 className="font-bold text-xl">광안리 해변 코스</h3>
            <p className="text-gray-600">5km | 30분</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-md">
            <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
            <h3 className="font-bold text-xl">온천천 시민공원 코스</h3>
            <p className="text-gray-600">7km | 45분</p>
          </div>
          <div className="border rounded-lg p-4 text-center shadow-md">
            <div className="bg-gray-200 h-40 rounded-md mb-4"></div>
            <h3 className="font-bold text-xl">이기대 해안산책로</h3>
            <p className="text-gray-600">8km | 60분</p>
          </div>
        </div>
      </section>
    </div>
  );
}

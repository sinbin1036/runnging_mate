import Link from 'next/link';
import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            부산의 숨겨진 러닝 코스, <br />
            <span className="text-blue-600">Running Mate</span>와 함께 발견하세요.
          </h1>
          <p className="text-lg text-gray-800 mb-8 font-medium">
            초보 러너부터 마라토너까지, 모두를 위한 코스 공유 플랫폼
          </p>
          <Link
            href="/courses"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            코스 탐색 시작하기
          </Link>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">우리 동네 러닝, 다르게 시작해 보세요</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
              {/* Feature 1: Community */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <span className="bg-white/20 text-white rounded-full p-3">
                    {/* Placeholder for an icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">함께 만드는 러닝 커뮤니티</h3>
                <p className="text-blue-100">
                  다른 러너들이 직접 달리고 공유한 코스를 탐색하고, 나만의 코스를 추가해 보세요. 커뮤니티와 함께 더 안전하고 즐거운 러닝을 경험할 수 있습니다.
                </p>
              </div>
              {/* Feature 2: Accuracy */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <span className="bg-white/20 text-white rounded-full p-3">
                    {/* Placeholder for an icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13v-3m6 3v-3m0 0l-6-3m6 3V7" /></svg>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">실제 데이터 기반의 정확성</h3>
                <p className="text-blue-100">
                  추상적인 추천 경로가 아닌, 실제 사용자의 GPS 기록으로 검증된 코스입니다. ±200m의 높은 정확도로 신뢰할 수 있는 경로를 제공합니다.
                </p>
              </div>
              {/* Feature 3: Vivid Reviews */}
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <span className="bg-white/20 text-white rounded-full p-3">
                    {/* Placeholder for an icon */}
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">사진과 후기로 보는 생생함</h3>
                <p className="text-blue-100">
                  코스의 실제 풍경, 노면 상태, 혼잡도 등 방문 전에 꼭 필요한 정보들을 다른 러너들의 사진과 상세한 후기를 통해 미리 확인하세요.
                </p>
              </div>
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">단 3단계로 러닝메이트 시작하기</h2>
              <p className="text-gray-700 mt-2 font-medium">복잡한 과정 없이 바로 시작할 수 있습니다.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <span className="text-3xl font-bold text-blue-600">1</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">코스 탐색</h3>
                <p className="text-gray-700">다른 러너들이 공유한, 검증된 코스들을 지도와 목록에서 찾아보세요.</p>
              </div>
              {/* Step 2 */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <span className="text-3xl font-bold text-blue-600">2</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">함께 달리기</h3>
                <p className="text-gray-700">마음에 드는 코스를 선택하고, GPS 경로를 따라 달려보세요.</p>
              </div>
              {/* Step 3 */}
              <div className="text-center">
                <div className="mb-6">
                  <span className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full">
                    <span className="text-3xl font-bold text-blue-600">3</span>
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">경험 공유</h3>
                <p className="text-gray-700">나만의 러닝 경험과 사진, 후기를 공유하여 커뮤니티에 기여하세요.</p>
              </div>
            </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-100 to-blue-50">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Running Mate 사용자들의 생생한 후기</h2>
            </div>
            <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <p className="text-gray-700 mb-4 leading-relaxed">"부산에 이렇게 좋은 코스가 많은지 몰랐어요! 덕분에 매일 새로운 곳을 달리는 재미가 생겼어요. 특히 저녁에 광안리 코스는 최고예요."</p>
                <div className="font-bold text-gray-900">- 김민준님</div>
                <div className="text-yellow-500 text-lg">★★★★★</div>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
                <p className="text-gray-700 mb-4 leading-relaxed">"초보 러너라서 어디서 달려야 할지 막막했는데, 거리별/난이도별로 코스가 정리되어 있어서 정말 편해요. 이젠 저도 코스 올리는 재미에 빠졌답니다."</p>
                <div className="font-bold text-gray-900">- 이수진님</div>
                <div className="text-yellow-500 text-lg">★★★★★</div>
              </div>
            </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 text-center bg-white">
        <div className="container mx-auto px-4">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
              지금 바로 당신의 러닝메이트를 만나보세요
            </h2>
            <p className="text-lg text-gray-700 mb-8 font-medium">
              부산의 아름다운 코스를 발견하고, 러닝 커뮤니티와 함께 성장하세요.
            </p>
            <a
              href="/signup"
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-full hover:bg-blue-700 transition duration-300 text-lg"
            >
              무료로 회원가입하고 시작하기
            </a>
        </div>
      </section>
    </main>
  );
}

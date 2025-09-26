"use client";

import { useMemo, useState, useEffect } from "react";
import type { SVGProps } from "react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

type Run = {
  run_date: string;
  distance_km: number;
  location: string;
  duration_minutes: number;
  pace_minutes_per_km: number;
  calories_burned: number;
  path_image_url: string; // Placeholder for map image
  path: Array<{ lat: number; lng: number }>; // Actual GPS path data
};

function RunningCalendar({ runs, onDateSelect }: { runs: Run[], onDateSelect: (date: Date | null) => void }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );
  const startingDayOfWeek = firstDayOfMonth.getDay();

  const daysInMonth = Array.from(
    { length: lastDayOfMonth.getDate() },
    (_, i) => i + 1,
  );

  const runsByDate = useMemo(() => {
    return runs.reduce(
      (acc, run) => {
        const runDate = new Date(run.run_date);
        const day = runDate.getDate();
        if (!acc[day]) {
          acc[day] = [];
        }
        acc[day].push(run);
        return acc;
      },
      {} as Record<number, Array<{ run_date: string; distance_km: number }>>,
    );
  }, [runs]);

  const filteredRuns = useMemo(() => {
    return runs.filter(run => {
      const runDate = new Date(run.run_date);
      return runDate.getFullYear() === currentDate.getFullYear() &&
             runDate.getMonth() === currentDate.getMonth();
    });
  }, [runs, currentDate]);

  const monthlyStats = useMemo(() => {
    const stats = {
      totalRuns: filteredRuns.length,
      totalDistance: filteredRuns.reduce((sum, run) => sum + run.distance_km, 0),
      averageDistance: 0,
    };
    stats.averageDistance =
      stats.totalRuns > 0 ? stats.totalDistance / stats.totalRuns : 0;
    return stats;
  }, [filteredRuns]);

  const changeMonth = (offset: number) => {
    setCurrentDate(
      (prevDate) =>
        new Date(prevDate.getFullYear(), prevDate.getMonth() + offset, 1),
    );
    setSelectedDate(null); // Reset selection when month changes
  };

  const handleDayClick = (day: number) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    if (selectedDate && selectedDate.getTime() === newSelectedDate.getTime()) {
      setSelectedDate(null); // Toggle off if same date is clicked
    } else {
      setSelectedDate(newSelectedDate);
    }
    onDateSelect(newSelectedDate);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-4 h-full">
      <div className="flex justify-between items-center mb-3">
        <button
          onClick={() => changeMonth(-1)}
          className="p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-semibold">
          {currentDate.toLocaleString("ko-KR", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button
          onClick={() => changeMonth(1)}
          className="p-1 rounded-md hover:bg-gray-700 transition-colors"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
          <div key={`${day}-${i}`}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {daysInMonth.map((day) => {
          const runsForDay = runsByDate[day];
          const hasRun = runsForDay && runsForDay.length > 0;
          const isSelected = selectedDate?.getDate() === day;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              className={`relative p-1 rounded-full flex items-center justify-center aspect-square text-center text-xs transition-all duration-200 ${
                isSelected
                  ? "bg-blue-600 text-white font-bold ring-1 ring-offset-2 ring-offset-gray-900 ring-blue-500"
                  : hasRun
                  ? "text-white hover:bg-gray-700"
                  : "text-gray-400 hover:bg-gray-700"
              }`}
            >
              {day}
              {hasRun && !isSelected && <span className="absolute bottom-1 w-1 h-1 bg-blue-400 rounded-full"></span>}
            </button>
          );
        })}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-700">
        <h3 className="text-base font-semibold mb-2">월간 통계</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-gray-400 text-xs">횟수</p>
            <p className="text-lg font-bold">{monthlyStats.totalRuns}</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">총 거리</p>
            <p className="text-lg font-bold">
              {monthlyStats.totalDistance.toFixed(1)} <span className="text-sm font-normal text-gray-400">km</span>
            </p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">평균 거리</p>
            <p className="text-lg font-bold">
              {monthlyStats.averageDistance.toFixed(1)} <span className="text-sm font-normal text-gray-400">km</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// This new component will combine the map and the details overlay.
// TODO: npm install react-naver-maps
function RouteView({ runs, selectedDate }: { runs: Run[], selectedDate: Date | null }) {
  const [activeRun, setActiveRun] = useState<Run | null>(null);

  // When the selected date changes, automatically select the first run of that day
  useEffect(() => {
    setActiveRun(runs.length > 0 ? runs[0] : null);
  }, [runs]);

  if (!selectedDate) {
    return (
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 h-full min-h-[400px]">
        <CalendarIcon className="w-12 h-12 mb-4 text-gray-600"/>
        <p className="text-center">달력에서 날짜를 선택하여<br/>러닝 기록과 경로를 확인하세요.</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg h-full overflow-hidden relative min-h-[450px]">
      {/* Map Background */}
      {/* 
        TODO: npm install @react-google-maps/api
        This is where the actual GoogleMap component would go.
        You'll need to wrap your app in a <LoadScript googleMapsApiKey="YOUR_API_KEY"> component.
        
        Example with @react-google-maps/api:

        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={activeRun.path[Math.floor(activeRun.path.length / 2)]} // Center of the path
          zoom={14}
        >
          <Polyline
            path={activeRun.path}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        </GoogleMap>
      */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
           <MapPinIcon className="w-16 h-16 text-gray-700"/>
        </div>
      </div>

      {/* Details Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <h2 className="text-xl font-semibold mb-3 text-white">
          <span className="text-blue-400">{selectedDate.toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}</span> 러닝 기록
        </h2>
        <div className="space-y-2 overflow-y-auto max-h-[200px] rounded-lg p-1">
          {runs.length > 0 ? (
            runs.map((run, index) => (
              <button 
                key={index} 
                onClick={() => setActiveRun(run)}
                className={`w-full text-left flex items-center justify-between p-3 rounded-lg transition-all duration-200 backdrop-blur-sm ${activeRun === run ? 'bg-blue-600/60 shadow-lg' : 'bg-gray-900/60 hover:bg-gray-800/80'}`}
              >
                <div className="flex items-center space-x-3">
                    <RouteIcon className="w-5 h-5 text-teal-400" />
                    <p className="font-medium text-white">{run.location}</p>
                </div>
                <p className="font-semibold text-gray-200">{run.distance_km.toFixed(2)} <span className="text-sm font-normal text-gray-400">km</span></p>
              </button>
            ))
          ) : (
            <div className="flex items-center justify-center h-full p-4 bg-gray-900/60 rounded-lg">
              <p className="text-gray-400 text-center">이 날짜에는 러닝 기록이 없습니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function LastRunCard({ lastRun }: { lastRun: Run | null }) {
  if (!lastRun) return null;
  
  return (
    <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 transition-transform hover:scale-[1.02]">
      <h2 className="text-xl font-semibold mb-4">최근 러닝</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <MapPinIcon className="w-6 h-6 text-blue-400" />
          <div>
            <p className="text-gray-400 text-sm">거리</p>
            <p className="text-lg font-medium">{lastRun.distance_km.toFixed(2)} km</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ClockIcon className="w-6 h-6 text-green-400" />
          <div>
            <p className="text-gray-400 text-sm">시간</p>
            <p className="text-lg font-medium">{lastRun.duration_minutes}분</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <TrendingUpIcon className="w-6 h-6 text-yellow-400" />
          <div>
            <p className="text-gray-400 text-sm">평균 페이스</p>
            <p className="text-lg font-medium">{lastRun.pace_minutes_per_km.toFixed(2)} /km</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <FlameIcon className="w-6 h-6 text-red-400" />
          <div>
            <p className="text-gray-400 text-sm">칼로리</p>
            <p className="text-lg font-medium">{lastRun.calories_burned} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ThisWeekCard({ weeklyStats }: { weeklyStats: { totalDistance: number, totalRuns: number, goal: number } }) {
  const progress = weeklyStats.goal > 0 ? (weeklyStats.totalDistance / weeklyStats.goal) * 100 : 0;

  return (
     <div className="lg:col-span-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 transition-transform hover:scale-[1.02]">
      <h2 className="text-xl font-semibold mb-4">이번 주</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CalendarIcon className="w-6 h-6 text-purple-400" />
            <p>총 거리</p>
          </div>
          <p className="font-medium">{weeklyStats.totalDistance.toFixed(2)} / {weeklyStats.goal} km</p>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-purple-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-gray-400 text-sm">
          <span>횟수: {weeklyStats.totalRuns}</span>
          <span>목표: {weeklyStats.goal} km</span>
        </div>
      </div>
    </div>
  );
}

function TotalStatsCard({ totalStats }: { totalStats: { totalDistance: number, totalRuns: number, avgPace: number } }) {
  return (
    <div className="lg:col-span-1 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 transition-transform hover:scale-[1.02]">
      <h2 className="text-xl font-semibold mb-4">누적 기록</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-400">총 거리</p>
          <p className="text-2xl font-bold">{totalStats.totalDistance.toFixed(2)} <span className="text-base font-normal text-gray-400">km</span></p>
        </div>
        <div>
          <p className="text-sm text-gray-400">총 러닝 횟수</p>
          <p className="text-2xl font-bold">{totalStats.totalRuns} <span className="text-base font-normal text-gray-400">회</span></p>
        </div>
        <div>
          <p className="text-sm text-gray-400">평균 페이스</p>
          {/* <p className="text-2xl font-bold">{Math.floor(totalStats.avgPace)}'{((totalStats.avgPace % 1) * 60).toFixed(0).padStart(2, '0')}" <span className="text-base font-normal text-gray-400">/km</span></p> */}
        </div>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  const router = useRouter();
  // Mock data for runs
  const mockRuns = useMemo(() => {
    const runsData = [
      { run_date: "2025-09-26", distance_km: 5.2, location: "부산 시민공원", duration_minutes: 28, pace_minutes_per_km: 5.38, calories_burned: 350, path: [{lat: 35.168, lng: 129.059}, {lat: 35.170, lng: 129.062}, {lat: 35.166, lng: 129.064}, {lat: 35.168, lng: 129.059}] },
      { run_date: "2025-09-25", distance_km: 2.1, location: "온천천", duration_minutes: 12, pace_minutes_per_km: 5.71, calories_burned: 150, path: [{lat: 35.204, lng: 129.066}, {lat: 35.214, lng: 129.068}, {lat: 35.204, lng: 129.066}] },
      { run_date: "2025-09-24", distance_km: 7.1, location: "해운대 해수욕장", duration_minutes: 35, pace_minutes_per_km: 4.93, calories_burned: 480, path: [{lat: 35.158, lng: 129.159}, {lat: 35.159, lng: 129.171}, {lat: 35.158, lng: 129.159}] },
      { run_date: "2025-09-22", distance_km: 4.5, location: "광안리 해변", duration_minutes: 25, pace_minutes_per_km: 5.56, calories_burned: 300, path: [{lat: 35.153, lng: 129.115}, {lat: 35.154, lng: 129.123}, {lat: 35.153, lng: 129.115}] },
      { run_date: "2025-09-20", distance_km: 8.0, location: "이기대 공원", duration_minutes: 45, pace_minutes_per_km: 5.63, calories_burned: 550, path: [{lat: 35.133, lng: 129.123}, {lat: 35.126, lng: 129.130}, {lat: 35.133, lng: 129.123}] },
      { run_date: "2025-09-18", distance_km: 3.0, location: "데이터 없는 런", duration_minutes: 18, pace_minutes_per_km: 6.00, calories_burned: 200, path: [{lat: 35.179, lng: 129.075}, {lat: 35.180, lng: 129.077}, {lat: 35.178, lng: 129.079}] }, // Example with dummy path
    ];

    return runsData.map(run => {
      const centerLat = run.path.reduce((sum, p) => sum + p.lat, 0) / run.path.length;
      const centerLng = run.path.reduce((sum, p) => sum + p.lng, 0) / run.path.length;
      
      const startMarker = `${run.path[0].lat},${run.path[0].lng},red-pushpin`;
      const endMarker = `${run.path[run.path.length - 1].lat},${run.path[run.path.length - 1].lng},blue-pushpin`;
      const markersString = [startMarker, endMarker].join('|');
      
      const pathCoordsString = run.path.map(p => `${p.lat},${p.lng}`).join('|');
      const pathParams = `color:0000ff|weight:3|${pathCoordsString}`;

      const staticMapUrl = `https://staticmap.vps.karry.cz/?center=${centerLat},${centerLng}&zoom=14&size=600x400&maptype=marathon&markers=${markersString}&path=${pathParams}`;

      return {
        ...run,
        path_image_url: staticMapUrl,
      };
    });
  }, []);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => {
    if (mockRuns.length > 0) {
      // Initialize with the date of the most recent run
      const mostRecentRun = [...mockRuns].sort((a, b) => new Date(b.run_date).getTime() - new Date(a.run_date).getTime())[0];
      return new Date(mostRecentRun.run_date);
    }
    return new Date();
  });

  const runsForSelectedDate = useMemo(() => {
    if (!selectedDate) return [];
    return mockRuns.filter(run => {
        const runDate = new Date(run.run_date);
        return runDate.getFullYear() === selectedDate.getFullYear() &&
               runDate.getMonth() === selectedDate.getMonth() &&
               runDate.getDate() === selectedDate.getDate();
    });
  }, [selectedDate, mockRuns]);
  
  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const lastRun = useMemo(() => {
    return [...mockRuns].sort((a, b) => new Date(b.run_date).getTime() - new Date(a.run_date).getTime())[0] || null;
  }, [mockRuns]);

  const weeklyStats = useMemo(() => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 6));
    
    const thisWeekRuns = mockRuns.filter(run => {
      const runDate = new Date(run.run_date);
      return runDate >= startOfWeek && runDate <= endOfWeek;
    });

    return {
      totalDistance: thisWeekRuns.reduce((sum, run) => sum + run.distance_km, 0),
      totalRuns: thisWeekRuns.length,
      goal: 30, // Weekly goal
    };
  }, [mockRuns]);

  const totalStats = useMemo(() => {
    const totalDistance = mockRuns.reduce((sum, run) => sum + run.distance_km, 0);
    const totalRuns = mockRuns.length;
    const totalPaceMinutes = mockRuns.reduce((sum, run) => sum + run.pace_minutes_per_km * run.distance_km, 0);
    const avgPace = totalRuns > 0 ? totalPaceMinutes / totalDistance : 0;

    return {
      totalDistance,
      totalRuns,
      avgPace,
    };
  }, [mockRuns]);


  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push('/main')}
            className="mr-2 p-2 rounded-full hover:bg-gray-700 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-3xl font-bold">활동</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <RunningCalendar runs={mockRuns} onDateSelect={handleDateSelect} />
          </div>
          <div className="lg:col-span-3">
             <RouteView runs={runsForSelectedDate} selectedDate={selectedDate} />
          </div>
          
          {/* Dynamic Cards */}
          <LastRunCard lastRun={lastRun} />
          <ThisWeekCard weeklyStats={weeklyStats} />
          <TotalStatsCard totalStats={totalStats} />

          {/* Recommended For You Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-lg p-6 transition-transform hover:scale-[1.02]">
            <h2 className="text-xl font-semibold mb-4">추천 코스</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">부산 시민공원 루프</p>
                  <p className="text-sm text-gray-400">3.5 km | 주로 평지</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">온천천 레일웨이</p>
                  <p className="text-sm text-gray-400">5.0 km | 평지</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-lg hover:bg-gray-700 transition-colors">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">해운대 해수욕장 런</p>
                  <p className="text-sm text-gray-400">7.2 km | 소풍 코스</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// SVG Icons as React Components
function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function TrendingUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  );
}

function ChevronLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function FlameIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  );
}

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function RouteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="19" r="3" />
      <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
      <circle cx="18" cy="5" r="3" />
    </svg>
  );
}

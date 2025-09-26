import type { SVGProps } from "react";

export default function DashboardPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <main className="p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Last Run Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Last Run</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <MapPinIcon className="w-6 h-6 text-blue-400" />
                <div>
                  <p className="text-gray-400 text-sm">Distance</p>
                  <p className="text-lg font-medium">5.2 km</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <ClockIcon className="w-6 h-6 text-green-400" />
                <div>
                  <p className="text-gray-400 text-sm">Time</p>
                  <p className="text-lg font-medium">28:15</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <TrendingUpIcon className="w-6 h-6 text-yellow-400" />
                <div>
                  <p className="text-gray-400 text-sm">Avg Pace</p>
                  <p className="text-lg font-medium">5.25 /km</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <FlameIcon className="w-6 h-6 text-red-400" />
                <div>
                  <p className="text-gray-400 text-sm">Calories</p>
                  <p className="text-lg font-medium">350 kcal</p>
                </div>
              </div>
            </div>
          </div>

          {/* This Week Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">This Week</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <CalendarIcon className="w-6 h-6 text-purple-400" />
                  <p>Total Distance</p>
                </div>
                <p className="font-medium">21.5 / 30 km</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-purple-500 h-2.5 rounded-full"
                  style={{ width: `${(21.5 / 30) * 100}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <span>Runs: 3</span>
                <span>Goal: 30 km</span>
              </div>
            </div>
          </div>

          {/* Recommended For You Card */}
          <div className="bg-gray-800 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-md">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">Busan Citizen Park Loop</p>
                  <p className="text-sm text-gray-400">3.5 km | Mostly Flat</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-md">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">Oncheoncheon Riverside Path</p>
                  <p className="text-sm text-gray-400">5.0 km | Flat</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 bg-gray-700/50 p-3 rounded-md">
                <RouteIcon className="w-8 h-8 text-teal-400" />
                <div>
                  <p className="font-semibold">Haeundae Beach Run</p>
                  <p className="text-sm text-gray-400">7.2 km | Scenic Views</p>
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

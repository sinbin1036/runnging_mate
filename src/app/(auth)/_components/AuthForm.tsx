'use client';

import { useSearchParams } from 'next/navigation';

interface AuthFormProps {
  isSignUp?: boolean;
  action: (formData: FormData) => Promise<void>;
}

const AuthForm = ({ isSignUp = false, action }: AuthFormProps) => {
  const searchParams = useSearchParams();
  const message = searchParams.get('message');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">
          {isSignUp ? '회원가입' : '로그인'}
        </h1>
        <form action={action} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? 'new-password' : 'current-password'}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {isSignUp ? '동의하고 가입하기' : '로그인'}
          </button>
          {message && (
            <p className="mt-4 text-center text-sm text-red-500">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthForm;

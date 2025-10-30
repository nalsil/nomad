import { signup } from './actions';
import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              🏙️ 한국노마드
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            회원가입
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            노마드 커뮤니티에 참여하세요
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">회원가입</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email:
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <button
              formAction={signup}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign up
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

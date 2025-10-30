import Link from 'next/link';

export default function ErrorPage({
  searchParams,
}: {
  searchParams: { message?: string };
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            🏙️ 한국노마드
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">오류 발생</h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="text-center space-y-4">
            <p className="text-red-600 font-semibold">
              {searchParams.message || 'Sorry, something went wrong'}
            </p>
            <div className="space-y-2">
              <Link
                href="/login"
                className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                로그인 페이지로 돌아가기
              </Link>
              <Link
                href="/register"
                className="block w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                회원가입하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Running Mate
        </Link>
        <nav className="space-x-4">
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            로그인
          </Link>
          <Link href="/signup" className="text-gray-600 hover:text-gray-800">
            회원가입
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

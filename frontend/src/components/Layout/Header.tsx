import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  console.log('location', location.pathname);
  return (
    <nav className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center font-semibold">
              <a href="/">
                <h2>Damage Report Solution</h2>
              </a>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <a
                href="/"
                className={`${
                  location.pathname === '/'
                    ? 'border-green-100 '
                    : 'border-transparent'
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900`}
              >
                Dashboard
              </a>
              <a
                href="/shops"
                className={`${
                  location.pathname === '/shops'
                    ? 'border-green-100 '
                    : 'border-transparent'
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}
              >
                Shops
              </a>

              <a
                href="/reports"
                className={`${
                  location.pathname === '/reports'
                    ? 'border-green-100 '
                    : 'border-transparent'
                } inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700`}
              >
                Reports
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 pt-2 pb-3">
          <a
            href="#"
            className="block border-l-4 border-green-100 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-dark-100"
          >
            Dashboard
          </a>
          <a
            href="/shops"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Shops
          </a>
          <a
            href="/customers"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Customers
          </a>
          <a
            href="#"
            className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700"
          >
            Reports
          </a>
        </div>
      </div>
    </nav>
  );
}

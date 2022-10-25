import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import ShopService from '../services/ShopService';

export default function Shop() {
  const [shops, setShops] = useState([]);
  const [links, setLinks] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchShops(page);
  }, []);

  // Fetch all the shops via the shops api
  const fetchShops = async (page: number) => {
    const data = {
      page: page,
    };
    await ShopService.getAll(data).then((response: any) => {
      setShops(response?.data.data);
      setLinks(response?.data.meta);
    });
  };

  const handlePages = (updatePage: number) => {
    setPage(updatePage);
    fetchShops(updatePage);
  };

  return (
    <div className="px-8 sm:px-6 lg:px-28 mt-5 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Shops List</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the shops including their name, email and coordinates.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Latitude
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Longitude
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {shops.length > 0 ? (
                    shops.map((shop, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {shop.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {shop.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {shop.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {shop.latitude}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {shop.longitude}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={4}
                        className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 text-center"
                      >
                        No Records Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {links.last_page !== 1 && (
              <Pagination
                page={page}
                totalPages={links.last_page}
                handlePagination={handlePages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import Pagination from '../components/Pagination/Pagination';
import ReportService from '../services/ReportService';
import { StatusType } from '../types/Status';

export default function Report() {
  const [reports, setReports] = useState<any>([]);
  const [links, setLinks] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReports(page);
  }, []);

  // Fetch all the reports by statuses and page number
  const fetchReports = (page: number) => {
    const data = {
      status: [0, 1, 2],
      page: page,
    };
    ReportService.getAll(data)
      .then((response: any) => {
        setReports(response.data.data);
        setLinks(response?.data.meta);
      })
      .catch((e) => {
        console.warn(e);
      });
  };

  const handlePages = (updatePage: number) => {
    setPage(updatePage);
    fetchReports(updatePage);
  };

  // Get report statuses
  const renderStatus = (type: number) => {
    if (type === 1) {
      return StatusType.Approve;
    } else if (type === 2) {
      return StatusType.Reject;
    } else {
      return StatusType.Pending;
    }
  };

  // Render colors for each status
  const renderColorStatus = (type: number) => {
    if (type === 1) {
      return 'bg-green-400';
    } else if (type === 2) {
      return 'bg-red-400';
    } else {
      return 'bg-gray-400';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-28 mt-5">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Reports List</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the reports including their name, email, description,
            photos and coordinates.
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
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {reports.length > 0 ? (
                    reports.map((report: any, index: number) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.latitude}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {report.longitude}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 capitalize">
                          <span
                            className={`${renderColorStatus(
                              report.status,
                            )} inline-block flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-medium text-white`}
                          >
                            {renderStatus(report.status)}
                          </span>
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

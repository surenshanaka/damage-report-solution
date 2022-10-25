import { useEffect, useState } from 'react';
import { FiPaperclip } from 'react-icons/fi';
import ReportService from '../../services/ReportService';
import IReportData from '../../types/Report';
import { StatusType } from '../../types/Status';
import Loading from '../Loading/Loading';
import MessageModal from '../Modal/MessageModal';
import Modal from '../Modal/Modal';
import Pagination from '../Pagination/Pagination';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [statusTitle, setStatusTitle] = useState(null);
  const [statusType, setStatusType] = useState(0);
  const [reportId, setReportId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [reason, setReason] = useState(null);
  const [links, setLinks] = useState<any>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchReports(page);
  }, []);

  // Fetch all the reports by statuses and page number
  const fetchReports = (page: number) => {
    const data = {
      status: [0],
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

  // Show modal when approve or reject
  const showConfirmationModal = (type: string, status: number, id: number) => {
    setShowModal(true);
    setStatusTitle(type);
    setStatusType(status);
    setReportId(id);
  };

  // Update the report status
  const handleReportStatus = async (status: number, id: number) => {
    // Fetch selected report via the reports api
    await ReportService.get(id).then((response: any) => {
      setShowModal(false);
      setIsLoading(true);

      const data: IReportData = {
        id: response?.data.data.id,
        name: response?.data.data.name,
        email: response?.data.data.email,
        description: response?.data.data.description,
        latitude: response?.data.data.latitude,
        longitude: response?.data.data.longitude,
        reason: reason,
        status: status,
      };

      // Call to the report update api
      ReportService.update(id, data)
        .then((response: any) => {
          if (response) {
            setIsLoading(false);
            setShowSuccessModal(true);
          }
        })
        .catch((error) => {
          console.warn(error.response);
          setIsLoading(false);
          setShowSuccessModal(true);
          setStatusTitle(StatusType.Error);

        });
    });
  };

  // Access reject reason textarea value
  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setReason(event.target.value);
  };

  const handleCloseMessageModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="lg:min-w-0 lg:flex-1 lg:px-24">
          <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
            <div className="flex items-center">
              <h1 className="flex-1 text-lg font-medium">Recent Reports</h1>
            </div>
          </div>
          {reports &&
            reports.map((item) => (
              <div
                className="overflow-hidden bg-white border border-gray-200 shadow sm:rounded-lg mt-10"
                key={item.id}
              >
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">
                    {item.name} Information
                  </h3>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {item.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {item.email}
                      </dd>
                    </div>

                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {item.description}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Attachments
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <ul
                          role="list"
                          className="divide-y divide-gray-200 rounded-md border border-gray-200"
                        >
                          {item.photos.length > 0 ? (
                            item.photos.map((photo: any) => (
                              <li
                                className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                                key={photo.id}
                              >
                                <div className="flex w-0 flex-1 items-center">
                                  <FiPaperclip />
                                  <span className="ml-2 w-0 flex-1 truncate">
                                    {photo.name}
                                  </span>
                                </div>
                                <div className="ml-4 flex-shrink-0">
                                  <a
                                    href={photo.path}
                                    className="font-medium text-green-200 hover:text-green-100"
                                    target="_blank"
                                  >
                                    Preview
                                  </a>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                              No attachments available
                            </li>
                          )}
                        </ul>
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Date and Time
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {item.updated_at}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Actions
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        <button
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-green-200 py-2 px-2 text-xs font-medium text-white shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2"
                          onClick={() =>
                            showConfirmationModal(
                              StatusType.Approve,
                              1,
                              item.id,
                            )
                          }
                        >
                          Approve
                        </button>
                        <button
                          type="button"
                          className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-red-400 py-2 px-4 text-xs font-medium text-white shadow-sm hover:bg-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:ring-offset-2"
                          onClick={() =>
                            showConfirmationModal(StatusType.Reject, 2, item.id)
                          }
                        >
                          Reject
                        </button>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            ))}
          <div className="mt-10">
            {links.last_page !== 1 && (
              <Pagination
                page={page}
                totalPages={links.last_page}
                handlePagination={handlePages}
              />
            )}
          </div>
          {showModal && (
            <Modal
              type={statusTitle}
              onClose={() => setShowModal(false)}
              onClick={() => handleReportStatus(statusType, reportId)}
              onChange={handleMessageChange}
            />
          )}
        </div>
      )}
      {showSuccessModal && (
        <MessageModal type={statusTitle} onClose={handleCloseMessageModal} />
      )}
    </>
  );
}

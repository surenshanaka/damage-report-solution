import { FiAlertTriangle } from 'react-icons/fi';
import { StatusType } from '../../types/Status';

type ModalProps = {
  type: string;
  onClose: () => void;
  onClick: (type: string) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Modal({
  type,
  onClose,
  onClick,
  onChange,
}: ModalProps) {
  const renderStatus = () => {
    return type === StatusType.Approve
      ? 'bg-green-200 hover:bg-green-100'
      : 'bg-red-400 hover:bg-red-300';
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <FiAlertTriangle color="red" size={20} />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  Report Confirmation
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to {type} the report ?
                  </p>
                  <p className="text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
            </div>
            {type === StatusType.Reject && (
              <div className="mt-2">
                <div className="-m-0.5 rounded-lg p-0.5">
                  <div>
                    <textarea
                      rows={5}
                      name="comment"
                      className="block w-full rounded-md border py-2 px-2 border-gray-300 shadow-sm focus:border-green-200 focus:ring-green-100 sm:text-sm"
                      placeholder="Enter reject reason..."
                      onChange={onChange}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`${renderStatus()} inline-flex w-full justify-center rounded-md border border-transparent capitalize px-4 py-2 text-xs font-medium text-white shadow-sm  sm:ml-3 sm:w-auto sm:text-xs`}
                onClick={() => onClick(type)}
              >
                {type}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 capitalize bg-white px-4 py-2 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-xs"
                onClick={() => onClose()}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

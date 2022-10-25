import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { StatusType } from '../../types/Status';

type MessageModalProps = {
  type: string;
  onClose: () => void;
};

export default function MessageModal({ type, onClose }: MessageModalProps) {
  const renderMessage = (type: string) => {
    if (type === StatusType.Approve) {
      return 'Report successfully approved';
    } else if (type === StatusType.Reject) {
      return 'Report successfully rejected';
    } else if (type === StatusType.Error) {
      return 'Sorry no shops available within 25km';
    }
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
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
            <div>
              <div
                className={`${
                  type === StatusType.Error ? 'bg-red-100' : 'bg-green-100'
                } mx-auto flex h-12 w-12 items-center justify-center rounded-full`}
              >
                {type === StatusType.Error ? (
                  <FiXCircle color="red" size={20} />
                ) : (
                  <FiCheckCircle color="white" size={20} />
                )}
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3
                  className="text-lg font-medium leading-6 text-gray-900"
                  id="modal-title"
                >
                  {renderMessage(type)}
                </h3>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-200 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-100 focus:ring-offset-2 sm:text-sm"
                onClick={() => onClose()}
              >
                Go back to dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

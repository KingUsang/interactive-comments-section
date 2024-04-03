export default function DeleteModal({ onDelete, onClose }) {
  return (
    <div className="fixed z-10 grid inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">

        <div className="fixed inset-0 transition-opacity">
          <div className="absolute inset-0 bg-gray-500 opacity-60"></div>
        </div>

        <div className="z-0 bg-white shadow-xl rounded-lg p-6 max-w-sm">
          <h5 className="text-xl font-semibold">Delete Comment</h5>
          <p className="py-4">
            Are you sure you want to delete this comment? This would remove the
            comment and can't be undone.
          </p>
          <div className="flex justify-between text-white font-medium">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-500 rounded-lg">
              NO, CANCEL
            </button>
            <button
              onClick={onDelete}
              className="px-6 py-3 bg-soft-red rounded-lg">
              YES, DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 
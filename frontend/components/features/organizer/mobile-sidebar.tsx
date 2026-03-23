"use client";

export const MobileSidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">
      <div className="bg-white w-64 h-full p-4">
        <button
          onClick={onClose}
          className="mb-4 text-sm text-red-500"
        >
          Close
        </button>
        <p>Sidebar Menu</p>
      </div>
    </div>
  );
};
export default MobileSidebar;
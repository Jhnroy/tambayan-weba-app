export const EventFilters = () => {
  const filters = ["All", "Cleanup", "Feeding", "Seminar", "Other"];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((filter, i) => (
        <button
          key={filter}
          className={`px-4 py-1.5 rounded-full text-sm font-medium ${
            i === 0
              ? "bg-blue-600 text-white"
              : "bg-white border text-gray-600 hover:bg-gray-100"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};
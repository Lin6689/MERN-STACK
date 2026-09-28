export default function Tags({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-10">
      <button
        onClick={() => onSelectCategory("All")}
        className={`px-5 py-2 rounded-full text-sm font-medium transition ${
          selectedCategory === "All"
            ? "bg-indigo-600 text-white"
            : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-400"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            selectedCategory === cat
              ? "bg-indigo-600 text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-400"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
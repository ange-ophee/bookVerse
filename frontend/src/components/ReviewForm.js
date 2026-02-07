export default function ReviewForm({ onSubmit }) {
  return (
    <form
      className="bg-[#FAF7F0] p-4 rounded shadow-md flex flex-col"
      onSubmit={onSubmit}
    >
      <textarea
        className="w-full p-2 border border-[#6D4C41] rounded mb-2"
        placeholder="Write your review..."
        required
      />
      <button className="bg-[#2E7D32] text-[#FAF7F0] px-4 py-2 rounded hover:bg-[#1B5E20] transition">
        Submit
      </button>
    </form>
  );
}

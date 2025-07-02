import BoardsList from "@/components/BoardsList";
import CreateBoardButton from "@/components/AddBoardForm";

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Boards</h1>

      <CreateBoardButton />

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <BoardsList />
      </div>
    </main>
  );
}

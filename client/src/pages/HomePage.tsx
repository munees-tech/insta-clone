import SideBar from "../components/SideBar";
import RandomFollowers from "../components/RandomFollowers";
import AddPostForm from "../components/AddPostForm";
import Feed from "../components/Feed";

const HomeLayout = () => {
  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar (left) */}
      <aside className="sm:block w-64 p-4 lg:border-r border-gray-800 fixed top-0 left-0 h-screen">
        <SideBar />
      </aside>

      {/* Feed (center) */}
      <main className="flex-1 flex justify-center px-4 sm:ml-64">
        <div className="max-w-xl flex flex-col items-center w-full space-y-6 py-10">
          <AddPostForm />
          <Feed />
        </div>
      </main>

      {/* Random Users (right) */}
      <aside className="hidden lg:block w-80 p-6 border-l border-gray-800">
        <RandomFollowers />
      </aside>
    </div>
  );
};

export default HomeLayout;

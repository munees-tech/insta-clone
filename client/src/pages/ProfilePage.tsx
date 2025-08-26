import { useSelector } from "react-redux";
import { selectUser } from "../authSlice/auth.slice";
import SideBar from "../components/SideBar";
import profileImg from "../../public/avatar.png";
import { Link } from "react-router-dom";


const ProfilePage = () => {
  const user = useSelector(selectUser);
 
  
  return (
    <div className="flex bg-black min-h-screen text-white">
      {/* Sidebar */}
      <aside className="sm:block w-64 p-4 lg:border-r border-gray-800 fixed top-0 left-0 h-screen">
        <SideBar />
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4flex justify-center sm:ml-64 px-4 py-10">
        <div className="max-w-2xl p-4 w-full flex flex-col items-center gap-8">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 w-full">
            <img
              src={user?.img || profileImg}
              alt="profile"
              className="w-32 p-4  h-32 md:w-40 md:h-40 rounded-full object-cover border border-gray-700"
            />
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-semibold">{user?.userName}</h2>
                <Link to={"/editprofile"}>
                  <button className="px-4 py-2 text-sm border rounded-lg bg-gray-800 hover:bg-gray-700">
                    Edit Profile
                  </button>
                </Link>
              </div>
              <div className="flex gap-6 text-sm md:text-base">
                <span>
                  <b>{0}</b> posts
                </span>
                <span>
                  <b>{user?.followers || 0}</b> followers
                </span>
                <span>
                  <b>{user?.following || 0}</b> following
                </span>
              </div>
              <div>
                <p className="font-semibold">{user?.userName}</p>
                <p className="text-gray-300">{user?.bio || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;

import { MdHomeFilled, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../authSlice/auth.slice";
import { toast } from "sonner";
import { Link } from "react-router-dom";

const SideBar = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleLogout = (e: any) => {
    e.preventDefault();
    dispatch(logout());
    toast.success("Logout successfully");
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden sm:flex flex-col h-full py-6 px-3 space-y-4">
        <ul className="space-y-4">
          <Link to="/">
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <MdHomeFilled size={22} /> <span>Home</span>
            </li>
          </Link>

          <Link to={`/profile/${user?.userName}`}>
            <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer">
              <FaUserCircle size={22} /> <span>Profile</span>
            </li>
          </Link>

          <li
            onClick={handleLogout}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 cursor-pointer"
          >
            <MdLogout size={22} /> <span>Logout</span>
          </li>
        </ul>
      </div>

      {/* Mobile Bottom Navbar */}
      <div className="lg:hidden md:hidden fixed bottom-0 left-0 w-full flex justify-around py-3 border-t border-gray-800">
        <button className="text-white text-xl">
          <Link to={"/"}>
            <MdHomeFilled size={20} />
          </Link>
        </button>
        <button className="text-white text-xl">
          <Link to={`/profile/${user.userName}`}>
            {" "}
            <FaUserCircle size={20} />{" "}
          </Link>
        </button>
        <button onClick={handleLogout} className="text-white text-xl">
          {" "}
          <MdLogout size={20} />
        </button>
      </div>
    </>
  );
};

export default SideBar;

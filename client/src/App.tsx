import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "sonner";
import SignUpPage from "./pages/SignUpPage";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, getUser } from "./authSlice/auth.slice";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import Loading from "./components/Loading";
import EditProfilePage from "./pages/EditProfilePage";


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await dispatch(getUser()).unwrap();
      } catch (error) {
        console.log("Failed to fetch user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/:userName"
          element={user ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/editprofile"
          element={user ? <EditProfilePage /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;

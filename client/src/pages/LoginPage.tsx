import { useDispatch, useSelector } from "react-redux";
import { authStatus, login } from "../authSlice/auth.slice";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
  const status = useSelector(authStatus);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  if (status === "idle") {
    dispatch(login(formData));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login(formData));
    toast.success("Login succesfully");
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex h-screen justify-center items-center"
      >
        <div className="text-white border border-gray-600 rounded-sm p-13">
          <h3 className="text-gray-300 text-center mb-4 text-2xl">Login</h3>
          <div className="p-2">
            <label htmlFor="Email" className="mb-2 block">
              Email
            </label>
            <input
              type="text"
              className="border border-gray-700 p-2 rounded-sm outline-0"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="p-2">
            <label htmlFor="password" className="mb-2 block mt-2">
              Password
            </label>
            <input
              className="border border-gray-700 p-2 rounded-sm outline-0"
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <button className="w-full bg-gray-600 mt-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800 ">
            Login
          </button>
          <div>
            <p className="mt-8">
              Dont Have an Account ?{" "}
              <a className="text-blue-700" href="/signup">
                signup
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

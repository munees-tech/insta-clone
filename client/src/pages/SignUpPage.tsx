import { useState } from "react";
import { authStatus, signup } from "../authSlice/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";


const SignUpPage = () => {
 


  const dispatch = useDispatch();

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault()
    dispatch(signup(formData))
    toast.success("signup succesful")
}

  const status = useSelector(authStatus);

   const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  if(status === "idle") {
   dispatch(signup(formData))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="text-white">
        <div className="flex justify-center items-center h-screen flex-col">
          <div className=" border p-6 border-gray-500 rounded-lg ">
          <h3 className="text-2xl text-gray-200">signup</h3>
          <div className="mt-2">
            <label className="block" htmlFor="UserName">
              username
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
              className="w-full border border-gray-400 rounded-sm outline-0 p-2"
              type="text"
              placeholder="username"
            />
          </div>
          <div className="mt-2">
            <label className="mt-2 block" htmlFor="Email">
              Email
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, email:e.target.value })
              }
              className="w-full border border-gray-400 rounded-sm outline-0 p-2"
              type="email"
              placeholder="email"
            />
          </div>
          <div className="mt-2">
            <label className="mt-2 block" htmlFor="password">
              Password
            </label>
            <input
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full border border-gray-400 rounded-sm outline-0 p-2"
              type="password"
              placeholder="password"
            />
          </div>
          <button className="w-60 p-2 rounded-sm mt-13 cursor-pointer bg-gray-600">
            signup
          </button>
          <p className="mt-3">Already have an account ? <a href="/login">Login</a></p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

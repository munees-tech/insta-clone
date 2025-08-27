import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axiosInstance";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { useState } from "react";
import profileImg from "../../public/avatar.png";
import { useDispatch, useSelector } from "react-redux";
import { authUser , selectUser } from "../authSlice/auth.slice";
import SideBar from "../components/SideBar";

const EditProfilePage = () => {
  const [img, setImg] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>(profileImg);
  const [bio, setBio] = useState<string>("");
  const profileMutate = useProfileChange();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImg(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const user = useSelector(selectUser);

  const handleProfileChange = () => {
    profileMutate.mutate({ img, bio });
  };

  return (
    <div className="text-white">
       <aside className="sm:block w-64 p-4 lg:border-r border-gray-800 fixed top-0 left-0 h-screen">
        <SideBar />
      </aside>
      <div className="h-screen flex flex-col justify-center items-center">
        <h3 className="sm:text-lg lg:text-xl font-sans text-gray-300 mb-5">
          Edit Profile
        </h3>
        {profileMutate.isError && (
          <p className="text-red-500">
            Failed to update profile: {(profileMutate.error as any)?.message}
          </p>
        )}
        {profileMutate.isSuccess && (
          <p className="text-green-500">Profile updated successfully!</p>
        )}

        {/* Avatar upload */}
        {/* Avatar upload */}
        <div className="relative shrink-0">
          <img
            className="w-36 h-36 rounded-full mb-4 object-cover border border-gray-700"
            src={img ? preview : user?.img || profileImg}
            alt="profile"
          />
          <label
            htmlFor="profile"
            className="absolute bottom-3 right-3 bg-gray-800 p-2 rounded-full cursor-pointer hover:bg-gray-700"
          >
            <MdOutlinePhotoCamera size={18} />
            <input
              hidden
              id="profile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
        </div>

        {/* Bio input */}
        <div className="p-3 w-80">
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full outline-0 mt-2 p-2 rounded-md bg-gray-800 border border-gray-600 text-white resize-none"
            placeholder="Enter bio"
          />
          <button
            onClick={handleProfileChange}
            className="border w-full border-gray-300 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 mt-3 disabled:opacity-50"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};


export const useProfileChange = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: async ({ img, bio }: { img?: File | null; bio: string }) => {
      const formData = new FormData();
      if (img) formData.append("img", img);
      formData.append("bio", bio ?? "");

      const res = await axiosInstance.post("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(authUser(data));
      queryClient.invalidateQueries({ queryKey: ["currentuser"] });
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
    },
  });
};

export default EditProfilePage;
